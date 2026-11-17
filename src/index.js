import { htmlDashboard } from './html.js';
import { initialLeads, initialPedidos, initialListos } from './data.js';

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
            tasa: d.promedio || 911.62,
            fecha: d.fechaActualizacion || 'Hoy',
            source: 'live'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (e) {
        // Fallback
      }
      return new Response(JSON.stringify({ tasa: 911.62, source: 'fallback' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 2. Leads que no han comprado todavía (18 leads depurados con teléfonos de Supabase)
    if (path === '/api/leads-recuperar') {
      return new Response(JSON.stringify(initialLeads), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 2.1 Conexión directa a Supabase Viking Spicy en vivo
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

    // 3. Envíos activos en Dropanas (18 pedidos)
    if (path === '/api/pedidos') {
      return new Response(JSON.stringify(initialPedidos), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 3.1 Pedidos en Oficina Tealca (cobro inmediato)
    if (path === '/api/pedidos-oficina') {
      const oficina = initialPedidos.filter(p => (p.estado || '').includes('oficina') || (p.estado || '').includes('Taquilla'));
      return new Response(JSON.stringify(oficina), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 4. Ventas por montar en Dropanas (José Medina, Yorge Guerrero)
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
            'Authorization': 'Bearer live_sk_i9tJdb1OCeZZ3ArVM7YPZhy4FY4lofzPkghmH0gTNJnYUg2RJlgd',
            'Accept': 'application/json',
            'User-Agent': 'Cloudflare-Worker-CRM'
          }
        });
        if (resp.ok) {
          const data = await resp.json();
          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
            'Authorization': 'Bearer live_sk_i9tJdb1OCeZZ3ArVM7YPZhy4FY4lofzPkghmH0gTNJnYUg2RJlgd',
            'Accept': 'application/json',
            'User-Agent': 'Cloudflare-Worker-CRM'
          }
        });
        if (resp.ok) {
          const data = await resp.json();
          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
