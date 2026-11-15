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

    // 2. Leads que no han comprado todavía (16 leads depurados)
    if (path === '/api/leads-recuperar') {
      return new Response(JSON.stringify(initialLeads), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 3. Envíos activos en Dropanas (18 pedidos)
    if (path === '/api/pedidos') {
      return new Response(JSON.stringify(initialPedidos), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 4. Ventas por montar en Dropanas (José Medina, Yorge Guerrero)
    if (path === '/api/listos') {
      return new Response(JSON.stringify(initialListos), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 5. Dashboard HTML Completo
    return new Response(htmlDashboard, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60'
      }
    });
  }
};
