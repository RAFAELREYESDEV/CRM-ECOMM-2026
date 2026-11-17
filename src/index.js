import { htmlDashboard } from './html.js';
import { initialLeads, initialPedidos, initialListos } from './data.js';
import { SHEET_OBJECTIONS } from './sheet_objections.js';

const DROPANAS_TOKEN = 'live_sk_i9tJdb1OCeZZ3ArVM7YPZhy4FY4lofzPkghmH0gTNJnYUg2RJlgd';

// Guías oficiales Tealca conocidas
const OFFICIAL_GUIDES = {
  '77268': '85123666',
  '74990': '85116795',
  '73687': '85110297',
  '73109': '85109525',
  '72873': '85106432',
  '72738': '85104679',
  '72493': '85102431',
  '71387': '85094718',
  '70050': '85087573',
  '79159': '85126366',
  '79155': '85126352',
  '78033': '85123668',
  '77317': '85123509',
  '77306': '85123508',
  '77267': '85123664',
  '74634': '85117354',
  '74638': '85117350',
  '70816': '85093987',
  '70669': '85090982'
};


function normalizeStr(text) {
  if (!text) return '';
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function cleanPhoneStr(phone) {
  if (!phone) return '';
  let digits = String(phone).replace(/[^0-9]/g, '');
  if (digits.startsWith('58') && digits.length > 10) {
    digits = '0' + digits.slice(2);
  } else if (!digits.startsWith('0') && digits.length === 10) {
    digits = '0' + digits;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return String(phone).trim();
}

async function fetchLiveUnclosedLeads() {
  // 1. Obtener compradores en Dropanas en tiempo real
  let dropanasBuyerNames = new Set();
  let dropanasBuyerPhones = new Set();
  try {
    const liveOrders = await fetchDropanasOrdersLive();
    liveOrders.forEach(o => {
      const fn = (o.cliente || '').toLowerCase().trim();
      if (fn) {
        dropanasBuyerNames.add(normalizeStr(fn));
        fn.split(/\s+/).forEach(p => {
          if (p.length > 3) dropanasBuyerNames.add(normalizeStr(p));
        });
      }
      const telDigits = (o.telefono || '').replace(/[^0-9]/g, '');
      if (telDigits.length >= 7) {
        dropanasBuyerPhones.add(telDigits.slice(-7));
      }
    });
  } catch (e) {
    console.warn('Error fetching Dropanas for exclusion:', e);
  }

  // Lista canónica de compradores ya procesados
  const knownBuyers = [
    'carmela', 'galvis', 'galvan', 'salazar', 'romero', 'ramirez', 
    'medina', 'marchan', 'berrios', 'boscan', 'gregorio', 'munoz', 
    'elwin', 'herrera', 'hernandez', 'lobo', 'pico', 'balza', 
    'zambrano', 'mosquera', 'reyes', 'toro', 'pernalete', 'moreno'
  ];

  // 2. Obtener prospectos web desde Supabase en vivo
  const sbResp = await fetch('https://yltjezxhnwmtzuraquhc.supabase.co/rest/v1/gummies_viking_ecomm?select=*&order=id.desc', {
    headers: {
      'apikey': 'sb_publishable_oNHuXs7lM2VnOzqazVyuNw_tu7RQi97',
      'Authorization': 'Bearer sb_publishable_oNHuXs7lM2VnOzqazVyuNw_tu7RQi97'
    }
  });

  if (!sbResp.ok) throw new Error('Supabase error: ' + sbResp.status);
  const sbLeads = await sbResp.json();

  const unclosed = [];
  const seenPhones = new Set();
  const seenNames = new Set();

  sbLeads.forEach(l => {
    const rawName = (l.nombre || '').trim();
    if (!rawName || rawName.toLowerCase().includes('prueba') || rawName.toLowerCase().includes('test')) return;

    const normName = normalizeStr(rawName);
    const rawPhone = cleanPhoneStr(l.telefono);
    const digits = rawPhone.replace(/[^0-9]/g, '');

    // Excluir si ya compró en Dropanas
    let isBuyer = false;
    if (digits.length >= 7 && dropanasBuyerPhones.has(digits.slice(-7))) isBuyer = true;
    if (dropanasBuyerNames.has(normName)) isBuyer = true;
    for (const part of normName.split(/\s+/)) {
      if (part.length > 3 && dropanasBuyerNames.has(part)) {
        if (digits.length >= 7 && dropanasBuyerPhones.has(digits.slice(-7))) isBuyer = true;
      }
    }
    for (const kb of knownBuyers) {
      if (normName.includes(kb)) {
        if (digits.length >= 7 && dropanasBuyerPhones.has(digits.slice(-7))) {
          isBuyer = true;
          break;
        }
      }
    }

    if (normName.includes('freiddy') || normName.includes('carmela') || (normName.includes('victor') && normName.includes('galvan')) || normName.includes('pedro medina') || normName.includes('jorge borges')) {
      isBuyer = true;
    }

    if (isBuyer) return;

    // Deduplicar dentro de Supabase
    const pKey = digits.length >= 7 ? digits.slice(-7) : normName;
    if (seenPhones.has(pKey) || seenNames.has(normName)) return;
    if (digits.length >= 7) seenPhones.add(pKey);
    seenNames.add(normName);

    // Obtener motivo / objeción desde el diccionario de Google Sheet
    let note = SHEET_OBJECTIONS[pKey] || SHEET_OBJECTIONS[normName] || '';
    if (!note) {
      for (const p of normName.split(/\s+/)) {
        if (p.length > 3 && SHEET_OBJECTIONS[p]) {
          note = SHEET_OBJECTIONS[p];
          break;
        }
      }
    }
    if (!note) {
      note = l.notas || '🔥 Prospecto web reciente · Falta cédula y confirmar sede Tealca para emitir guía.';
    }

    // Limpieza de nombre
    let cleanName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    if (normName.includes('pesaida') || normName.includes('betzaida')) cleanName = 'Betzaida Yajuri';
    if (normName.includes('oswar')) cleanName = 'Oswar Mijares Lanza';
    if (normName.includes('vitta') || normName.includes('vita')) cleanName = 'José Luis Vitta Álvarez';
    if (normName.includes('delvis')) cleanName = 'Delvis López (Señor Delvis)';
    if (normName.includes('deiker') || normName.includes('baker')) cleanName = 'Deiker Parra';
    if (normName.includes('andres') && normName.includes('perez')) cleanName = 'Andrés Pérez';
    if (normName.includes('dayaris')) cleanName = 'Dayaris Torrealba';
    if (normName.includes('anderson')) cleanName = 'Anderson Santaella';
    if (normName.includes('francisco') && normName.includes('torres')) cleanName = 'Francisco Torres';

    let prioridad = 'ALTA';
    const monto = parseFloat(l.total_usd) || 25.0;
    if (monto >= 45 || normName.includes('tovar') || normName.includes('villarreal') || normName.includes('parra')) {
      prioridad = '🔥 URGENTE / $45+';
    } else if (normName.includes('dayaris') || normName.includes('anderson') || normName.includes('francisco') || normName.includes('andres')) {
      prioridad = '⚡ NUEVO LEAD HOY';
    }

    unclosed.push({
      id: `LEAD-${String(unclosed.length + 1).padStart(2, '0')}`,
      supabase_id: l.id,
      nombre: cleanName,
      telefono: rawPhone,
      combo: l.producto_pack || 'Combo 3 Pares (6 Gomitas)',
      monto_usd: monto,
      ciudad: l.ciudad_tealca || l.estado || 'Por confirmar',
      traba: note,
      prioridad: prioridad,
      fecha: (l.created_at || '').slice(0, 10),
      contactado: false
    });
  });

  return unclosed;
}

async function fetchDropanasOrdersLive() {
  const resp = await fetch('https://app.dropanas.com/api/v1/ordenes?per_page=100', {
    headers: {
      'Authorization': `Bearer ${DROPANAS_TOKEN}`,
      'Accept': 'application/json',
      'User-Agent': 'Cloudflare-Worker-CRM'
    }
  });

  if (!resp.ok) throw new Error('Dropanas HTTP error ' + resp.status);
  const json = await resp.json();
  const rawOrders = json.data || [];
  const now = new Date();

  return rawOrders.map(o => {
    const cl = o.cliente || {};
    const tr = o.tracking || {};
    const prods = o.productos || [];
    const statusDropanas = tr.status || 'Pendiente';

    // Cálculo dinámico de recaudos
    let totalUsd = prods.reduce((acc, p) => acc + (parseFloat(p.subtotal) || 0), 0);
    if (!totalUsd || totalUsd === 0) totalUsd = parseFloat(o.precio_venta_usd) || 25.0;

    let totalVes = prods.reduce((acc, p) => acc + ((parseFloat(p.precio_unitario_ves) || 0) * (p.cantidad || 1)), 0);
    if (!totalVes || totalVes === 0) totalVes = parseFloat(o.precio_venta_ves) || (totalUsd * 915.75);

    // Cuenta regresiva día a día para taquilla (máx 5 días)
    const dateStr = o.updated_at || o.created_at || new Date().toISOString();
    const orderDate = new Date(dateStr);
    const diffMs = now.getTime() - orderDate.getTime();
    const diasTranscurridos = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const diasRestantes = Math.max(0, 5 - diasTranscurridos);
    const pctTiempo = Math.min(100, Math.round((diasTranscurridos / 5) * 100));

    let nivelAlerta = 'normal';
    let textoCountdown = `Día ${diasTranscurridos} de 5 (${diasRestantes} días restantes)`;
    if (diasTranscurridos >= 5) {
      nivelAlerta = 'critico';
      textoCountdown = `Día ${diasTranscurridos}/5 · ⚠️ ¡VENCE HOY! Riesgo de devolución`;
    } else if (diasTranscurridos === 4) {
      nivelAlerta = 'urgente';
      textoCountdown = `Día 4/5 · 🟠 ¡Queda 1 día para retirar!`;
    } else if (diasTranscurridos === 3) {
      nivelAlerta = 'alerta';
      textoCountdown = `Día 3/5 · 🟡 Mitad de plazo (Quedan 2 días)`;
    }

    let sede = 'Tealca Taquilla';
    const nota = o.nota_cliente || '';
    if (nota.toLowerCase().includes('tealca')) {
      const match = nota.match(/Tealca\s+([^,\.\n]+)/i);
      if (match) sede = 'Tealca ' + match[1].trim();
      else sede = nota.slice(0, 45);
    } else if (cl.ciudad) {
      sede = `Tealca ${cl.ciudad}`;
    }

    const idStr = String(o.id);
    const guiaOficial = OFFICIAL_GUIDES[idStr] || tr.numero_guia || `DP${idStr}`;
    const comboNombre = prods.map(p => `${p.cantidad > 1 ? p.cantidad + 'x ' : ''}${p.nombre}`).join(' + ') || 'Combo Gummies Viking';

    return {
      id: idStr,
      codigo_dropanas: `DP${idStr}`,
      codigo_dp: `DP${idStr}`,
      guia_oficial: guiaOficial,
      guia: guiaOficial,
      tracking_status: statusDropanas,
      cliente: `${cl.nombre || ''} ${cl.apellido || ''}`.trim() || 'Cliente Viking',
      cedula: cl.documento || (cl.documento_estructurado ? `${cl.documento_estructurado.tipo}-${cl.documento_estructurado.numero}` : ''),
      telefono: cl.telefono || '',
      ciudad: cl.ciudad || '',
      sede: sede,
      nota_cliente: nota,
      combo: comboNombre,
      total_usd: totalUsd,
      recaudo_usd: totalUsd,
      total_bs: totalVes,
      recaudo_bs: totalVes,
      estado_dropanas: statusDropanas,
      estado: statusDropanas,
      fecha: (o.created_at || '').slice(0, 16).replace('T', ' '),
      created_at: o.created_at,
      updated_at: o.updated_at,
      dias_en_oficina: diasTranscurridos,
      dias_restantes: diasRestantes,
      porcentaje_tiempo: pctTiempo,
      nivel_alerta: nivelAlerta,
      texto_countdown: textoCountdown,
      es_oficina: statusDropanas.toLowerCase().includes('oficina')
    };
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Tasa BCV Oficial en vivo
    if (path === '/api/bcv') {
      try {
        const resp = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
          headers: { 'User-Agent': 'Cloudflare-Worker-CRM' }
        });
        if (resp.ok) {
          const d = await resp.json();
          return new Response(JSON.stringify({
            tasa: d.promedio || 915.75,
            fecha: d.fechaActualizacion || 'Hoy',
            source: 'live'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (e) {
        // Fallback
      }
      return new Response(JSON.stringify({ tasa: 915.75, source: 'fallback' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 2. Leads que no han comprado todavía (100% EN VIVO: Supabase - Dropanas + Google Sheet)
    if (path === '/api/leads-recuperar') {
      try {
        const liveLeads = await fetchLiveUnclosedLeads();
        return new Response(JSON.stringify(liveLeads), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      } catch (e) {
        return new Response(JSON.stringify(initialLeads), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 2.1 Conexión directa a Supabase Viking en vivo
    if (path === '/api/supabase-leads') {
      try {
        const resp = await fetch('https://yltjezxhnwmtzuraquhc.supabase.co/rest/v1/gummies_viking_ecomm?select=*&order=id.desc', {
          headers: {
            'apikey': 'sb_publishable_oNHuXs7lM2VnOzqazVyuNw_tu7RQi97',
            'Authorization': 'Bearer sb_publishable_oNHuXs7lM2VnOzqazVyuNw_tu7RQi97'
          }
        });
        if (resp.ok) {
          const raw = await resp.json();
          return new Response(JSON.stringify(raw), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 3. Envíos en Dropanas (100% EN VIVO Y AUTÓNOMO DESDE DROPANAS API)
    if (path === '/api/pedidos') {
      try {
        const liveOrders = await fetchDropanasOrdersLive();
        return new Response(JSON.stringify(liveOrders), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      } catch (e) {
        return new Response(JSON.stringify(initialPedidos), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 3.1 Pedidos en Oficina Tealca con Cuenta Regresiva de 5 días (100% EN VIVO Y AUTÓNOMO)
    if (path === '/api/pedidos-oficina') {
      try {
        const liveOrders = await fetchDropanasOrdersLive();
        const oficina = liveOrders.filter(p => p.es_oficina);
        return new Response(JSON.stringify(oficina), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      } catch (e) {
        const oficina = initialPedidos.filter(p => (p.estado || '').includes('oficina'));
        return new Response(JSON.stringify(oficina), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 4. Ventas por montar en Dropanas
    if (path === '/api/listos') {
      return new Response(JSON.stringify(initialListos), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 5. Billetera y Saldo Dropanas en Vivo por API
    if (path === '/api/wallet') {
      try {
        const resp = await fetch('https://app.dropanas.com/api/v1/wallet', {
          headers: {
            'Authorization': `Bearer ${DROPANAS_TOKEN}`,
            'Accept': 'application/json',
            'User-Agent': 'Cloudflare-Worker-CRM'
          }
        });
        if (resp.ok) {
          const data = await resp.json();
          return new Response(JSON.stringify(data), {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
          });
        }
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 5.1 Historial Oficial de Transacciones y Retiros Dropanas en Vivo
    if (path === '/api/wallet/transactions') {
      try {
        const resp = await fetch('https://app.dropanas.com/api/v1/wallet/transactions', {
          headers: {
            'Authorization': `Bearer ${DROPANAS_TOKEN}`,
            'Accept': 'application/json',
            'User-Agent': 'Cloudflare-Worker-CRM'
          }
        });
        if (resp.ok) {
          const data = await resp.json();
          return new Response(JSON.stringify(data), {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
          });
        }
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 6. Dashboard HTML Completo
    return new Response(htmlDashboard, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
};
