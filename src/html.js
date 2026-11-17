export const htmlDashboard = `<!DOCTYPE html>
<html lang="es" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Gummies Viking | Centro de Control E-Commerce COD</title>
  <!-- Google Fonts: Inter & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
            mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
          },
          colors: {
            brand: {
              50: '#ecfdf5',
              100: '#d1fae5',
              500: '#10b981',
              600: '#059669',
              700: '#047857',
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #F8FAFC;
      color: #0F172A;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    /* Estilos de badges limpios estilo Dashboard Blanco */
    .badge-taquilla { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
    .badge-camino { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
    .badge-dropanas { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
    .badge-pagado { background: #FAF5FF; color: #7E22CE; border: 1px solid #E9D5FF; }
    .badge-urgente { background: #FEF2F2; color: #B91C1C; border: 1px solid #FECACA; }
    
    .tab-btn-active {
      background-color: #10B981;
      color: #FFFFFF !important;
      font-weight: 700;
      box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.25);
    }
    .lead-contactado {
      opacity: 0.55;
      filter: grayscale(0.6);
    }
    /* Sombra suave de tarjeta corporativa */
    .card-clean {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card-clean:hover {
      border-color: #CBD5E1;
      box-shadow: 0 10px 25px -3px rgba(15, 23, 42, 0.06);
    }
    /* Scrollbar estilizada */
    ::-webkit-scrollbar { height: 6px; width: 6px; }
    ::-webkit-scrollbar-track { background: #F1F5F9; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 9999px; }
  </style>
</head>
<body class="min-h-screen pb-28 md:pb-16 antialiased selection:bg-brand-500 selection:text-white">

  <!-- TOP BAR BLANCA ELEGANTE -->
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 transition-all">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Brand & Status -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white font-extrabold shadow-md shadow-brand-500/20 text-lg">
          V
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-extrabold text-base md:text-lg tracking-tight text-slate-900 leading-none">
              Gummies Viking
            </h1>
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> COD Vnzla
            </span>
          </div>
          <p class="text-xs text-slate-500 font-medium mt-0.5">Control Central · Dropshipping Dropanas & Tealca</p>
        </div>
      </div>

      <!-- Quick Stats & Actions -->
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Tasa BCV Pill -->
        <div class="flex items-center gap-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 px-3.5 py-1.5 rounded-xl transition">
          <span class="text-xs font-semibold text-slate-500 hidden sm:inline">BCV Oficial:</span>
          <span class="text-xs sm:text-sm font-extrabold text-slate-900 font-mono tracking-tight" id="bcv-val">Bs 911.62</span>
        </div>

        <!-- Reload Button -->
        <button onclick="recargarTodo()" class="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm active:scale-95" title="Sincronizar datos en vivo">
          <span class="text-sm">↻</span>
          <span class="hidden sm:inline">Actualizar</span>
        </button>

        <!-- User Profile Pill -->
        <div class="hidden lg:flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
            RA
          </div>
          <div class="text-left text-xs leading-tight">
            <div class="font-bold text-slate-800">Rafael Andrés</div>
            <div class="text-[10px] text-slate-400 font-medium">Store #21017</div>
          </div>
        </div>
      </div>

    </div>
  </header>

  <!-- MAIN WRAPPER -->
  <main class="max-w-7xl mx-auto px-4 md:px-8 mt-6 space-y-6">

    <!-- KPI CARDS HERO: INSPIRADO EN LA PLANTILLA BLANCA -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">

      <!-- Card 1: Dinero en Leads por Cerrar (Foco #1 de Ventas) -->
      <div class="card-clean p-4 md:p-5 relative overflow-hidden flex flex-col justify-between">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] md:text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            Por Recuperar
          </span>
          <span class="text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200/60" id="kpi-recuperar-count">
            18 leads
          </span>
        </div>
        <div class="my-2 md:my-3">
          <div class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight" id="kpi-recuperar-usd">~$517 USD</div>
          <div class="text-[11px] text-slate-500 font-medium mt-0.5">Ventas tibias sin cédula</div>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div class="bg-rose-500 h-1.5 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <!-- Card 2: Facturación Activa en Dropanas -->
      <div class="card-clean p-4 md:p-5 flex flex-col justify-between">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-500">
            📦 Facturación Activa
          </span>
          <span class="text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700" id="kpi-count-activos">
            18 pedidos
          </span>
        </div>
        <div class="my-2 md:my-3">
          <div class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight" id="kpi-facturacion">$591.83 USD</div>
          <div class="text-[11px] text-slate-500 font-mono font-medium mt-0.5" id="kpi-facturacion-bs">Bs 539,524.06</div>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div class="bg-brand-500 h-1.5 rounded-full" style="width: 100%"></div>
        </div>
      </div>

      <!-- Card 3: Ganancia Neta Limpia -->
      <div class="card-clean p-4 md:p-5 flex flex-col justify-between">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] md:text-xs font-bold uppercase tracking-wider text-brand-600">
            💰 Ganancia Billetera
          </span>
          <span class="text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            53.9% Margen
          </span>
        </div>
        <div class="my-2 md:my-3">
          <div class="text-2xl md:text-3xl font-extrabold text-brand-600 tracking-tight" id="kpi-ganancia">+$318.98 USD</div>
          <div class="text-[11px] text-slate-500 font-medium mt-0.5">Costos Dropanas: $272.85</div>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div class="bg-emerald-500 h-1.5 rounded-full" style="width: 54%"></div>
        </div>
      </div>

      <!-- Card 4: Retiro & Flujo de Caja -->
      <div class="card-clean p-4 md:p-5 flex flex-col justify-between">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] md:text-xs font-bold uppercase tracking-wider text-blue-600">
            🏦 Retiro en Tránsito
          </span>
          <span class="text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
            #3835
          </span>
        </div>
        <div class="my-2 md:my-3">
          <div class="text-2xl md:text-3xl font-extrabold text-slate-900 font-mono tracking-tight" id="kpi-retiro-val">Bs 11,529.73</div>
          <div class="text-[11px] text-amber-600 font-semibold mt-0.5">🟡 Pendiente acreditación banco</div>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div class="bg-blue-500 h-1.5 rounded-full" style="width: 85%"></div>
        </div>
      </div>

    </div>

    <!-- PESTAÑAS SEGMENTADAS (ESTILO REAL ESTATE MODERNO) -->
    <div class="bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-1.5 overflow-x-auto">
      <button id="tab-btn-leads" onclick="cambiarVista('leads')" class="tab-btn-active px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95">
        <span>🔥</span> Leads por Atacar
        <span class="bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full font-bold ml-1" id="badge-total-leads">18</span>
      </button>

      <button id="tab-btn-montar" onclick="cambiarVista('montar')" class="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95">
        <span>🛒</span> Listos para Montar
        <span class="bg-amber-100 text-amber-800 text-[11px] px-2 py-0.5 rounded-full font-bold ml-1" id="badge-total-montar">2</span>
      </button>

      <button id="tab-btn-envios" onclick="cambiarVista('envios')" class="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95">
        <span>📦</span> Pedidos Dropanas
        <span class="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-full font-bold ml-1" id="badge-total-envios">18</span>
      </button>

      <button id="tab-btn-wallet" onclick="cambiarVista('wallet')" class="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95">
        <span>💳</span> Billetera & Retiros
        <span class="bg-emerald-100 text-emerald-800 text-[11px] px-2 py-0.5 rounded-full font-bold ml-1">Live API</span>
      </button>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <!-- VISTA 1: LEADS QUE NO HAN COMPRADO TODAVÍA (LA PESTAÑA ESTRELLA) -->
    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <section id="vista-leads" class="space-y-4">

      <!-- Header informativo & Filtros -->
      <div class="card-clean p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 class="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🎯</span> Directorio de Ataque y Cierre Inmediato
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Prospectos extraídos de Supabase y chats web sin orden en Dropanas. Haz clic en WhatsApp o Marcar para cerrar.
          </p>
        </div>

        <!-- Filtros Pill -->
        <div class="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-semibold">
          <button id="flt-todos" onclick="filtrarLeads('todos')" class="bg-slate-900 text-white px-3 py-1.5 rounded-xl transition shadow-sm">
            Todos (18)
          </button>
          <button id="flt-oficina" onclick="filtrarLeads('oficina')" class="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl transition font-bold flex items-center gap-1 active:scale-95">
            <span>🏢</span> En Oficina (6)
          </button>
          <button id="flt-urgente" onclick="filtrarLeads('urgente')" class="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl transition">
            🔥 Urgentes / $45+
          </button>
          <button id="flt-cedula" onclick="filtrarLeads('cedula')" class="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl transition">
            🪪 Falta Cédula
          </button>
          <button id="flt-pago" onclick="filtrarLeads('pago')" class="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl transition">
            💳 Pago Móvil / Prepago
          </button>
          <button id="flt-dinero" onclick="filtrarLeads('dinero')" class="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl transition">
            ⏳ Pospuesto
          </button>
        </div>
      </div>

      <!-- SECCIÓN DESTACADA: PEDIDOS EN OFICINA TEALCA (COBRO INMEDIATO) -->
      <div id="seccion-en-oficina" class="card-clean p-4 md:p-5 border-amber-300 bg-gradient-to-br from-amber-50/60 via-white to-white shadow-sm space-y-3.5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center text-base font-black shadow-sm">🏢</span>
            <div>
              <h3 class="font-extrabold text-sm md:text-base text-slate-900 flex items-center gap-2 flex-wrap">
                En Oficina Tealca · Control de Cobro y Retiro
                <span class="bg-amber-100 text-amber-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300" id="badge-oficina-header">
                  6 Pedidos · $174.35 USD
                </span>
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Paquetes listos en taquilla para entregar y cobrar. Revisa a quién le falta avisar y quién ya confirmó para ir hoy.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 whitespace-nowrap" id="kpi-oficina-total-bs">
              💵 Bs ~158,941 a liquidar
            </span>
          </div>
        </div>

        <!-- Grilla de Cards de En Oficina -->
        <div id="lista-en-oficina-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <!-- Renderizado dinámico vía JavaScript -->
        </div>
      </div>

      <!-- Grilla de Cards de Leads (Diseño Optimizado para Móvil) -->
      <div id="lista-leads-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Renderizado dinámico vía JavaScript -->
      </div>

    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <!-- VISTA 2: VENTAS POR MONTAR (LISTOS PARA MONTAR) -->
    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <section id="vista-montar" class="space-y-4 hidden">

      <div class="card-clean p-4 md:p-5 flex items-center justify-between">
        <div>
          <h2 class="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🛒</span> Ventas Cerradas con Datos Completos
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Tienen nombre, cédula, teléfono y agencia confirmada. Cópialos a Dropanas y guarda el código DP.
          </p>
        </div>
        <span class="text-xs px-3 py-1 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200">
          Prioridad Despacho
        </span>
      </div>

      <div id="lista-por-montar" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Renderizado dinámico -->
      </div>

    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <!-- VISTA 3: PEDIDOS ACTIVOS EN DROPANAS -->
    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <section id="vista-envios" class="space-y-4 hidden">

      <div class="card-clean p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h2 class="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>📦</span> Monitoreo Oficial de Pedidos Dropanas
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Historial de guías, tracking de valija Tealca y recaudos contra entrega.
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="px-2.5 py-1 rounded-lg badge-taquilla font-bold">🏢 7 en Taquilla</span>
          <span class="px-2.5 py-1 rounded-lg badge-camino font-bold">🚚 3 en Camino</span>
          <span class="px-2.5 py-1 rounded-lg badge-dropanas font-bold">📦 7 Pendientes</span>
        </div>
      </div>

      <!-- Tabla Corporativa Blanca con Scroll Horizontal -->
      <div class="card-clean overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="py-3.5 px-4">Cliente</th>
                <th class="py-3.5 px-4">Agencia / Destino</th>
                <th class="py-3.5 px-4">Combo</th>
                <th class="py-3.5 px-4 text-right">Recaudo ($)</th>
                <th class="py-3.5 px-4">Estado</th>
                <th class="py-3.5 px-4 font-mono">Guía Dropanas</th>
                <th class="py-3.5 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody id="tabla-pedidos-body" class="divide-y divide-slate-100 font-medium">
              <!-- Renderizado dinámico -->
            </tbody>
          </table>
        </div>
      </div>

    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <!-- VISTA 4: BILLETERA & RETIROS (EN VIVO POR API) -->
    <!-- ═══════════════════════════════════════════════════════════════════════════ -->
    <section id="vista-wallet" class="space-y-4 hidden">

      <div class="card-clean p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h2 class="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>💳</span> Estado de Cuenta y Billetera Dropanas
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Sincronizado vía API oficial REST v1 (\`/wallet\` y \`/wallet/transactions\`).
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Billetera Activa
          </span>
        </div>
      </div>

      <!-- Wallet Overview Hero Card -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div class="card-clean p-5 bg-gradient-to-br from-white to-slate-50">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Saldo Disponible</div>
          <div class="text-3xl font-extrabold text-slate-900 mt-2 font-mono" id="wallet-saldo-usd">$0.00 USD</div>
          <div class="text-xs text-slate-500 font-mono mt-1" id="wallet-saldo-bs">Bs 0.00</div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Retiros Totales: <strong>1</strong></span>
            <span class="text-amber-600 font-semibold">1 en proceso</span>
          </div>
        </div>

        <div class="card-clean p-5 bg-gradient-to-br from-white to-slate-50">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Último Retiro Solicitado</div>
          <div class="text-2xl font-extrabold text-slate-900 mt-2 font-mono text-blue-600">Bs 11,529.73</div>
          <div class="text-xs text-slate-500 mt-1">Cuenta: Banco de Venezuela · 3960</div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-500">ID Solicitud: #3835</span>
            <span class="px-2 py-0.5 rounded font-bold bg-amber-50 text-amber-700 border border-amber-200">Pendiente</span>
          </div>
        </div>

        <div class="card-clean p-5 bg-gradient-to-br from-white to-slate-50">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Próxima Entrada Estimada</div>
          <div class="text-2xl font-extrabold text-emerald-600 mt-2 font-mono">+$110.96 USD</div>
          <div class="text-xs text-slate-500 mt-1">Al retirar los 7 clientes en taquilla</div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Fecha estimada:</span>
            <span class="font-bold text-slate-900">Martes mañana</span>
          </div>
        </div>

      </div>

      <!-- Historial de Transacciones Oficiales -->
      <div class="card-clean overflow-hidden">
        <div class="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-bold text-sm text-slate-900">Historial Oficial de Operaciones (Dropanas API)</h3>
          <span class="text-xs text-slate-400 font-mono">5 movimientos auditados</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase text-[11px]">
              <tr>
                <th class="py-3 px-4">ID</th>
                <th class="py-3 px-4">Fecha</th>
                <th class="py-3 px-4">Tipo</th>
                <th class="py-3 px-4">Descripción Oficial</th>
                <th class="py-3 px-4 text-right">Monto</th>
                <th class="py-3 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody id="wallet-transactions-body" class="divide-y divide-slate-100 font-medium">
              <!-- Renderizado dinámico -->
            </tbody>
          </table>
        </div>
      </div>

    </section>

  </main>

  <!-- MODAL: YA LO MONTÉ EN DROPANAS -->
  <div id="modal-dp" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
    <div class="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-extrabold text-slate-900 text-base">Registrar Guía Dropanas</h3>
        <button onclick="cerrarModalDP()" class="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
      </div>
      <p class="text-xs text-slate-600 leading-relaxed">
        Escribe el código oficial generado (ej. <code class="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono">DP78040</code>) para <strong id="modal-dp-nombre" class="text-slate-900"></strong>:
      </p>
      <input type="text" id="modal-dp-input" placeholder="Ej: DP78040" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 font-bold">
      <div class="flex items-center justify-end gap-2 pt-2">
        <button onclick="cerrarModalDP()" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
          Cancelar
        </button>
        <button onclick="guardarOrdenMontada()" class="px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-sm">
          Guardar Guía
        </button>
      </div>
    </div>
  </div>

  <!-- FLOATING BOTTOM DOCK: ERGONOMÍA MÓVIL (ZONA DEL PULGAR) -->
  <nav class="md:hidden fixed bottom-3 inset-x-4 z-40 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-1.5 shadow-2xl flex items-center justify-around">
    <button onclick="cambiarVista('leads')" class="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition text-slate-600 focus:text-brand-600">
      <span class="text-lg">🔥</span>
      <span class="text-[10px] font-bold">Leads</span>
    </button>
    <button onclick="cambiarVista('montar')" class="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition text-slate-600 focus:text-brand-600">
      <span class="text-lg">🛒</span>
      <span class="text-[10px] font-bold">Montar</span>
    </button>
    <button onclick="cambiarVista('envios')" class="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition text-slate-600 focus:text-brand-600">
      <span class="text-lg">📦</span>
      <span class="text-[10px] font-bold">Envíos</span>
    </button>
    <button onclick="cambiarVista('wallet')" class="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition text-slate-600 focus:text-brand-600">
      <span class="text-lg">💳</span>
      <span class="text-[10px] font-bold">Billetera</span>
    </button>
  </nav>

  <!-- JAVASCRIPT: LÓGICA 100% INTACTA DE CONEXIÓN A APIS -->
  <script>
    const API = '/api';
    let currentBcv = 911.62;
    let currentListoSelected = null;
    let leadsData = [];
    let filtroActivo = 'todos';

    function cambiarVista(vista) {
      const vLeads = document.getElementById('vista-leads');
      const vMontar = document.getElementById('vista-montar');
      const vEnvios = document.getElementById('vista-envios');
      const vWallet = document.getElementById('vista-wallet');

      const bLeads = document.getElementById('tab-btn-leads');
      const bMontar = document.getElementById('tab-btn-montar');
      const bEnvios = document.getElementById('tab-btn-envios');
      const bWallet = document.getElementById('tab-btn-wallet');

      vLeads.classList.add('hidden');
      vMontar.classList.add('hidden');
      vEnvios.classList.add('hidden');
      vWallet.classList.add('hidden');

      const inactiveClass = 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95';
      bLeads.className = inactiveClass;
      bMontar.className = inactiveClass;
      bEnvios.className = inactiveClass;
      bWallet.className = inactiveClass;

      const activeClass = 'tab-btn-active px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95';

      if (vista === 'leads') {
        vLeads.classList.remove('hidden');
        bLeads.className = activeClass;
      } else if (vista === 'montar') {
        vMontar.classList.remove('hidden');
        bMontar.className = activeClass;
      } else if (vista === 'envios') {
        vEnvios.classList.remove('hidden');
        bEnvios.className = activeClass;
      } else if (vista === 'wallet') {
        vWallet.classList.remove('hidden');
        bWallet.className = activeClass;
        cargarBilletera();
      }
    }

    async function cargarBCV() {
      try {
        const res = await fetch(\`\${API}/bcv\`);
        const data = await res.json();
        currentBcv = Number(data.tasa) || 911.62;
        document.getElementById('bcv-val').textContent = \`Bs \${currentBcv.toFixed(2)}\`;
      } catch (e) {
        console.warn('Error BCV:', e);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 0. PEDIDOS EN OFICINA TEALCA (CONTROL DE COBRO INMEDIATO & AVISO)
    // ─────────────────────────────────────────────────────────────────────────────
    const PEDIDOS_OFICINA_DEFAULT = [
      {
        id: "oficina-willians",
        guia: "85109525",
        cliente: "Willians Balza",
        cedula: "V-18906539",
        telefono: "0414-5592084",
        ciudad: "Barinas",
        sede: "Tealca Barinas Centro (CC Barinas)",
        combo: "Pote 30 Gomitas Viking",
        recaudo_usd: 28.99,
        estado_aviso: "confirmado_hoy", // 'sin_aviso', 'avisado', 'confirmado_hoy', 'reprogramado', 'pagado'
        nota_aviso: "Confirmó que retira HOY martes 17/11"
      },
      {
        id: "oficina-jose-hernandez",
        guia: "85116795",
        cliente: "José Hernández",
        cedula: "V-28226214",
        telefono: "0416-1249548",
        ciudad: "Barinas",
        sede: "Tealca Alto Barinas",
        combo: "Combo 3 Pares (6 Gomitas)",
        recaudo_usd: 25.20,
        estado_aviso: "sin_aviso",
        nota_aviso: "Sin confirmación · Falta avisar para que vaya a buscar y pagar"
      },
      {
        id: "oficina-jose-toro",
        guia: "85094718",
        cliente: "Jose Toro",
        cedula: "V-4536361",
        telefono: "0424-6658035",
        ciudad: "Carora, Lara",
        sede: "Tealca Carora",
        combo: "Pote 30 Gomitas Viking ($45)",
        recaudo_usd: 45.00,
        estado_aviso: "sin_aviso",
        nota_aviso: "Ticket alto $45 USD · Falta avisar para asegurar cobro"
      },
      {
        id: "oficina-giovanni",
        guia: "85090982",
        cliente: "Giovanni González",
        cedula: "V-10214779",
        telefono: "0424-6214353",
        ciudad: "Ciudad Ojeda, Zulia",
        sede: "Tealca Ciudad Ojeda",
        combo: "Combo 3 Pares (6 Gomitas)",
        recaudo_usd: 25.00,
        estado_aviso: "sin_aviso",
        nota_aviso: "Sin confirmación · Falta avisar que ya está en taquilla"
      },
      {
        id: "oficina-edwin",
        guia: "85087573",
        cliente: "Edwin José Moreno Ávila",
        cedula: "V-15032905",
        telefono: "0424-7464111",
        ciudad: "Mérida",
        sede: "Tealca Mérida Norte (Sector Milla)",
        combo: "Combo 3 Pares (6 Gomitas)",
        recaudo_usd: 25.05,
        estado_aviso: "sin_aviso",
        nota_aviso: "Sin confirmación · Falta avisar para que retire en agencia Milla"
      },
      {
        id: "oficina-luis-reyes",
        guia: "85102431",
        cliente: "Luis Reyes",
        cedula: "",
        telefono: "0412-5628358",
        ciudad: "La Victoria, Aragua",
        sede: "Tealca La Victoria",
        combo: "Combo 3 Pares (6 Gomitas)",
        recaudo_usd: 25.11,
        estado_aviso: "reprogramado",
        nota_aviso: "Viajando a Santa Elena de Uairén · Retira el jueves 19/11"
      }
    ];

    let pedidosOficinaData = [];

    function inicializarPedidosOficina() {
      try {
        const guardados = localStorage.getItem('crm_pedidos_oficina_v2');
        if (guardados) {
          pedidosOficinaData = JSON.parse(guardados);
        } else {
          pedidosOficinaData = [...PEDIDOS_OFICINA_DEFAULT];
        }
      } catch (e) {
        pedidosOficinaData = [...PEDIDOS_OFICINA_DEFAULT];
      }
      renderizarPedidosOficina();
    }

    function guardarEstadoOficina(id, nuevoEstado) {
      const p = pedidosOficinaData.find(x => x.id === id);
      if (p) {
        p.estado_aviso = nuevoEstado;
        if (nuevoEstado === 'confirmado_hoy') p.nota_aviso = 'Confirmó que retira HOY martes 17/11';
        else if (nuevoEstado === 'avisado') p.nota_aviso = 'Avisado por WhatsApp · Esperando respuesta';
        else if (nuevoEstado === 'sin_aviso') p.nota_aviso = 'Sin confirmación · Falta avisar';
        else if (nuevoEstado === 'reprogramado') p.nota_aviso = 'Reprogramó fecha de retiro';
        else if (nuevoEstado === 'pagado') p.nota_aviso = 'Entregado y pagado en taquilla';
        localStorage.setItem('crm_pedidos_oficina_v2', JSON.stringify(pedidosOficinaData));
        renderizarPedidosOficina();
      }
    }

    function renderizarPedidosOficina() {
      const cont = document.getElementById('lista-en-oficina-container');
      if (!cont) return;
      cont.innerHTML = '';

      let totalUSD = 0;
      pedidosOficinaData.forEach(p => {
        totalUSD += p.recaudo_usd;
        const totalBs = (p.recaudo_usd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const telClean = p.telefono.replace(/[^0-9]/g, '');
        const waNum = telClean.startsWith('0') ? '58' + telClean.slice(1) : (telClean.startsWith('58') ? telClean : '58' + telClean);

        const waMsg = \`¡Hola \${p.cliente}! 👋 Te saluda Rafael de Gummies Viking Venezuela.\\n\\nTe aviso con alegría que tu paquete con número de guía oficial *\${p.guia}* ya está disponible en la agencia *\${p.sede}* listo para que lo retires y pagues en tus manos (*$\${p.recaudo_usd.toFixed(2)} USD* / *Bs \${totalBs}* a tasa BCV).\\n\\n¿Tienes chance de pasar hoy a buscarlo? 📦🤝\`;

        let badgeStatus = '';
        let borderCard = 'border-slate-200';
        let bgStatusBadge = '';

        if (p.estado_aviso === 'confirmado_hoy') {
          badgeStatus = '🟢 Confirmó Retiro Hoy';
          borderCard = 'border-emerald-300 shadow-emerald-50';
          bgStatusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
        } else if (p.estado_aviso === 'reprogramado') {
          badgeStatus = '⏳ Reprogramado';
          borderCard = 'border-amber-300';
          bgStatusBadge = 'bg-amber-100 text-amber-800 border-amber-300';
        } else if (p.estado_aviso === 'avisado') {
          badgeStatus = '🟡 Avisado (Esperando)';
          borderCard = 'border-blue-200';
          bgStatusBadge = 'bg-blue-100 text-blue-800 border-blue-200';
        } else if (p.estado_aviso === 'pagado') {
          badgeStatus = '💵 Retirado y Pagado';
          borderCard = 'border-slate-200 opacity-60';
          bgStatusBadge = 'bg-slate-100 text-slate-700 border-slate-300';
        } else {
          badgeStatus = '🔴 Sin Confirmar · Falta Avisar';
          borderCard = 'border-rose-300 shadow-rose-50 shadow-sm';
          bgStatusBadge = 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold';
        }

        const card = document.createElement('div');
        card.className = \`card-clean p-3.5 space-y-2.5 border \${borderCard} bg-white flex flex-col justify-between\`;
        card.innerHTML = \`
          <div class="space-y-2">
            <!-- Header Cliente -->
            <div class="flex items-start justify-between gap-1.5">
              <div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <h4 class="font-extrabold text-xs md:text-sm text-slate-900">\${p.cliente}</h4>
                  <span class="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">#\${p.guia}</span>
                </div>
                <div class="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                  <span>📱 \${p.telefono}</span>
                  <a href="tel:\${telClean}" class="text-blue-600 hover:text-blue-800 font-bold font-sans text-[10px]">📞 Llamar</a>
                </div>
              </div>
              <div class="text-right whitespace-nowrap">
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold border \${bgStatusBadge}">
                  \${badgeStatus}
                </span>
                <div class="text-xs font-black text-slate-900 font-mono mt-1">
                  $\${p.recaudo_usd.toFixed(2)} USD
                </div>
              </div>
            </div>

            <!-- Datos de Sede & Combo -->
            <div class="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70 text-[11px] space-y-1">
              <div class="flex items-start justify-between gap-2">
                <span class="text-slate-500 font-medium">🏢 Sede Tealca:</span>
                <span class="text-slate-900 font-bold text-right">\${p.sede}</span>
              </div>
              <div class="flex items-start justify-between gap-2">
                <span class="text-slate-500 font-medium">📦 Producto:</span>
                <span class="text-slate-800 font-medium text-right">\${p.combo}</span>
              </div>
              <div class="flex items-start justify-between gap-2 pt-1 border-t border-amber-200/50">
                <span class="text-slate-500 font-medium">💵 Recaudo en Bs:</span>
                <span class="text-emerald-700 font-bold font-mono">Bs \${totalBs}</span>
              </div>
            </div>

            <!-- Estado de Comunicación / Nota -->
            <div class="text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-between">
              <span class="font-medium truncate mr-1">📝 \${p.nota_aviso}</span>
              <!-- Selector Rápido de Estado -->
              <select onchange="guardarEstadoOficina('\${p.id}', this.value)" class="text-[10px] font-bold bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-800 outline-none">
                <option value="sin_aviso" \${p.estado_aviso === 'sin_aviso' ? 'selected' : ''}>🔴 Falta Avisar</option>
                <option value="avisado" \${p.estado_aviso === 'avisado' ? 'selected' : ''}>🟡 Avisado</option>
                <option value="confirmado_hoy" \${p.estado_aviso === 'confirmado_hoy' ? 'selected' : ''}>🟢 Retira Hoy</option>
                <option value="reprogramado" \${p.estado_aviso === 'reprogramado' ? 'selected' : ''}>⏳ Reprogramó</option>
                <option value="pagado" \${p.estado_aviso === 'pagado' ? 'selected' : ''}>✅ Ya Pagó</option>
              </select>
            </div>
          </div>

          <!-- Botón de Acción WhatsApp -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <a href="https://wa.me/\${waNum}?text=\${encodeURIComponent(waMsg)}" target="_blank" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 active:scale-95">
              <span>💬</span> Mandar Recordatorio de Retiro
            </a>
          </div>
        \`;
        cont.appendChild(card);
      });

      const totalBsOficina = (totalUSD * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      const kpiBsEl = document.getElementById('kpi-oficina-total-bs');
      if (kpiBsEl) kpiBsEl.textContent = \`💵 Bs ~\${totalBsOficina} a liquidar\`;
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. CARGAR LEADS POR ATACAR
    // ─────────────────────────────────────────────────────────────────────────────
    async function cargarLeadsPorAtacar() {
      try {
        const res = await fetch(\`\${API}/leads-recuperar\`);
        leadsData = await res.json();

        document.getElementById('badge-total-leads').textContent = leadsData.length;
        document.getElementById('kpi-recuperar-count').textContent = \`\${leadsData.length} leads\`;

        const totalUSD = leadsData.reduce((acc, curr) => acc + (Number(curr.monto_usd) || 25), 0);
        document.getElementById('kpi-recuperar-usd').textContent = \`~$\${totalUSD.toFixed(0)} USD\`;

        renderizarLeads(leadsData);
      } catch (e) {
        console.error('Error cargando leads:', e);
      }
    }

    function filtrarLeads(tipo) {
      filtroActivo = tipo;
      
      ['todos', 'oficina', 'urgente', 'cedula', 'pago', 'dinero'].forEach(f => {
        const btn = document.getElementById(\`flt-\${f}\`);
        if (!btn) return;
        if (f === tipo) {
          btn.className = 'bg-slate-900 text-white px-3 py-1.5 rounded-xl font-bold transition shadow-sm';
        } else {
          btn.className = (f === 'oficina')
            ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl transition font-bold flex items-center gap-1 active:scale-95'
            : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl font-semibold transition';
        }
      });

      const seccionOficina = document.getElementById('seccion-en-oficina');
      if (tipo === 'oficina') {
        if (seccionOficina) {
          seccionOficina.classList.remove('hidden');
          seccionOficina.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        renderizarLeads([]);
        const cont = document.getElementById('lista-leads-container');
        cont.innerHTML = \`
          <div class="col-span-2 text-center py-8 text-amber-800 text-xs card-clean bg-amber-50/60 border-amber-200 font-bold">
            🏢 Mostrando arriba los 6 paquetes en taquilla Tealca listos para cobro inmediato ($174.35 USD). Haz clic en "Todos" para volver al directorio completo.
          </div>
        \`;
        return;
      } else {
        if (seccionOficina) seccionOficina.classList.remove('hidden');
      }

      let filtrados = leadsData;
      if (tipo === 'urgente') {
        filtrados = leadsData.filter(l => l.prioridad.includes('URGENTE') || l.monto_usd >= 45);
      } else if (tipo === 'cedula') {
        filtrados = leadsData.filter(l => l.traba.toLowerCase().includes('cédula') || l.traba.toLowerCase().includes('cedula'));
      } else if (tipo === 'pago') {
        filtrados = leadsData.filter(l => l.traba.toLowerCase().includes('pago móvil') || l.traba.toLowerCase().includes('capture') || l.combo.toLowerCase().includes('prepago'));
      } else if (tipo === 'dinero') {
        filtrados = leadsData.filter(l => l.traba.toLowerCase().includes('dinero') || l.traba.toLowerCase().includes('aviso') || l.traba.toLowerCase().includes('semana'));
      }

      renderizarLeads(filtrados);
    }

    function renderizarLeads(lista) {
      const cont = document.getElementById('lista-leads-container');
      cont.innerHTML = '';

      if (lista.length === 0) {
        cont.innerHTML = \`
          <div class="col-span-2 text-center py-12 text-slate-400 text-sm card-clean">
            ✨ No hay leads con este filtro.
          </div>
        \`;
        return;
      }

      lista.forEach(l => {
        const card = document.createElement('div');
        const contactadoClass = l.contactado ? 'lead-contactado' : '';
        
        let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
        let accentBorder = 'border-slate-200/90';
        
        if (l.prioridad.includes('URGENTE')) {
          badgeColor = 'badge-urgente font-extrabold';
          accentBorder = 'border-rose-300 shadow-rose-100 shadow-md';
        } else if (l.prioridad.includes('Lunes')) {
          badgeColor = 'badge-taquilla font-bold';
        } else if (l.prioridad.includes('ALTA')) {
          badgeColor = 'badge-dropanas font-bold';
        }

        const telClean = (l.telefono || '').replace(/[^0-9]/g, '');
        const telHref = telClean ? \`tel:\${telClean}\` : '#';
        const waLink = l.wa_num ? \`https://wa.me/\${l.wa_num}?text=\${encodeURIComponent(l.mensaje_ataque)}\` : '#';

        card.className = \`card-clean p-4 md:p-5 space-y-3.5 flex flex-col justify-between \${accentBorder} \${contactadoClass}\`;
        card.id = \`card-lead-\${l.id}\`;

        card.innerHTML = \`
          <div class="space-y-3">
            <!-- Header Lead -->
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">\${l.id}</span>
                  <h3 class="font-extrabold text-sm md:text-base text-slate-900">\${l.nombre}</h3>
                </div>
                <div class="text-xs text-slate-500 mt-1 flex items-center gap-2.5 font-mono">
                  <span>📱 \${l.telefono || 'Por verificar'}</span>
                  \${l.telefono ? \`<a href="\${telHref}" class="text-blue-600 hover:text-blue-800 font-bold text-[11px] font-sans flex items-center gap-0.5">📞 Marcar</a>\` : ''}
                </div>
              </div>
              <div class="text-right">
                <span class="text-[11px] px-2.5 py-1 rounded-full font-bold \${badgeColor}">
                  \${l.prioridad}
                </span>
                <div class="text-base font-extrabold text-slate-900 font-mono mt-1">
                  $\${Number(l.monto_usd).toFixed(2)} USD
                </div>
              </div>
            </div>

            <!-- Datos del Pedido Deseado -->
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
              <div class="flex items-start justify-between gap-2">
                <span class="text-slate-500 font-semibold">Producto Deseado:</span>
                <span class="text-slate-900 font-bold text-right">\${l.combo}</span>
              </div>
              <div class="flex items-start justify-between gap-2">
                <span class="text-slate-500 font-semibold">Destino Tentativo:</span>
                <span class="text-slate-800 font-medium text-right">\${l.sede}</span>
              </div>
              <div class="pt-1.5 border-t border-slate-200/80 text-[11px] text-rose-700 flex items-start gap-1">
                <span>⚠️</span>
                <span><strong>Traba:</strong> \${l.traba}</span>
              </div>
            </div>

            <!-- Estrategia / Plan de Cierre -->
            <div class="text-[11px] bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-emerald-900 leading-relaxed">
              <strong class="text-emerald-800">🎯 Plan de Cierre:</strong> \${l.plan_accion}
            </div>
          </div>

          <!-- Botones de Acción (Grandes y Táctiles) -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button onclick="copiarMensajeAtaque('\${l.id}')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 transition flex items-center gap-1.5 active:scale-95" title="Copiar mensaje de WhatsApp listo para enviar">
              <span>📋</span> Copiar
            </button>

            <div class="flex items-center gap-2">
              \${l.wa_num ? \`
                <a href="\${waLink}" target="_blank" class="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-brand-500/20 active:scale-95">
                  <span>💬</span> WhatsApp
                </a>
              \` : \`
                <button onclick="copiarMensajeAtaque('\${l.id}')" class="bg-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold">
                  Buscar en Chat
                </button>
              \`}
              <button onclick="toggleContactado('\${l.id}')" class="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition" title="Marcar como atendido">
                \${l.contactado ? '↩️' : '✓'}
              </button>
            </div>
          </div>
        \`;

        cont.appendChild(card);
      });
    }

    function copiarMensajeAtaque(id) {
      const lead = leadsData.find(x => x.id === id);
      if (!lead) return;
      navigator.clipboard.writeText(lead.mensaje_ataque);
      alert(\`📋 Mensaje de rescate para \${lead.nombre} copiado al portapapeles:\\n\\n"\${lead.mensaje_ataque.slice(0, 90)}..."\`);
    }

    async function toggleContactado(id) {
      try {
        const res = await fetch(\`\${API}/leads-recuperar/\${id}/contactado\`, {method: 'POST'});
        const data = await res.json();
        const lead = leadsData.find(x => x.id === id);
        if (lead) {
          lead.contactado = data.contactado;
          renderizarLeads(leadsData);
        }
      } catch (e) {
        console.warn('Error marcando contactado:', e);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. CARGAR PEDIDOS ACTIVOS EN DROPANAS
    // ─────────────────────────────────────────────────────────────────────────────
    async function cargarPedidos() {
      try {
        const res = await fetch(\`\${API}/pedidos\`);
        const pedidos = await res.json();

        document.getElementById('badge-total-envios').textContent = pedidos.length;
        document.getElementById('kpi-count-activos').textContent = \`\${pedidos.length} pedidos\`;

        const tbody = document.getElementById('tabla-pedidos-body');
        tbody.innerHTML = '';

        pedidos.forEach(p => {
          let badgeClass = 'badge-dropanas';
          let estadoTexto = p.estado;

          if (p.estado.includes('Taquilla') || p.estado.includes('oficina')) {
            badgeClass = 'badge-taquilla';
            estadoTexto = '🏢 En Taquilla';
          } else if (p.estado.includes('Tránsito') || p.estado.includes('Valija') || p.estado.includes('camino')) {
            badgeClass = 'badge-camino';
            estadoTexto = '🚚 En Camino';
          } else if (p.estado.includes('Entregado') || p.estado.includes('Cobrado') || p.estado.includes('Pagado')) {
            badgeClass = 'badge-pagado';
            estadoTexto = '💵 Pagado';
          } else {
            badgeClass = 'badge-dropanas';
            estadoTexto = '📦 En Bodega';
          }

          const telLimpio = (p.telefono || '').replace(/[^0-9]/g, '');
          const waLink = telLimpio ? \`https://wa.me/58\${telLimpio.startsWith('0') ? telLimpio.slice(1) : telLimpio}\` : '#';
          const guiaMostrar = p.guia_tealca && p.guia_tealca !== 'Por Asignar' ? p.guia_tealca : (p.codigo_dropanas || p.id);

          const tr = document.createElement('tr');
          tr.className = 'hover:bg-slate-50/80 transition';
          tr.innerHTML = \`
            <td class="py-3 px-4">
              <div class="font-bold text-slate-900">\${p.cliente}</div>
              <div class="text-[11px] text-slate-400 font-mono">\${p.cedula || 'Sin cédula'}</div>
            </td>
            <td class="py-3 px-4">
              <div class="text-slate-800 font-semibold">\${p.sede_tealca_asignada || p.ubicacion_solicitada || 'Por definir'}</div>
              <div class="text-[11px] text-slate-500">\${p.ciudad || ''}</div>
            </td>
            <td class="py-3 px-4 text-slate-700">\${p.combo}</td>
            <td class="py-3 px-4 text-right font-extrabold text-slate-900 font-mono">
              $\${Number(p.total_usd).toFixed(2)}
            </td>
            <td class="py-3 px-4">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold \${badgeClass}">
                \${estadoTexto}
              </span>
            </td>
            <td class="py-3 px-4 font-mono text-[11px] text-slate-600 font-bold">
              \${guiaMostrar}
            </td>
            <td class="py-3 px-4 text-center">
              <a href="\${waLink}" target="_blank" class="inline-flex items-center gap-1 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 px-3 py-1 rounded-xl font-bold transition">
                💬 Chat
              </a>
            </td>
          \`;
          tbody.appendChild(tr);
        });

      } catch (e) {
        console.error('Error cargando pedidos:', e);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 3. CARGAR VENTAS POR MONTAR (LISTOS)
    // ─────────────────────────────────────────────────────────────────────────────
    async function cargarPorMontar() {
      try {
        const res = await fetch(\`\${API}/listos\`);
        const listos = await res.json();

        document.getElementById('badge-total-montar').textContent = listos.length;
        const cont = document.getElementById('lista-por-montar');
        cont.innerHTML = '';

        if (listos.length === 0) {
          cont.innerHTML = \`
            <div class="col-span-2 text-center py-12 text-slate-400 text-xs card-clean">
              🎉 ¡Al día! No hay ventas pendientes por subir a Dropanas.
            </div>
          \`;
          return;
        }

        listos.forEach(l => {
          const card = document.createElement('div');
          card.className = 'card-clean p-4 md:p-5 space-y-3';

          const telLimpio = (l.telefono || '').replace(/[^0-9]/g, '');
          const waLink = telLimpio ? \`https://wa.me/58\${telLimpio.startsWith('0') ? telLimpio.slice(1) : telLimpio}\` : '#';

          card.innerHTML = \`
            <div class="flex items-start justify-between">
              <div>
                <h4 class="font-extrabold text-base text-slate-900">\${l.nombre}</h4>
                <div class="text-xs text-slate-500 font-mono mt-0.5">
                  🪪 \${l.cedula} · 📱 \${l.telefono}
                </div>
              </div>
              <div class="text-right">
                <span class="text-base font-extrabold text-slate-900 font-mono">$\${Number(l.total_usd).toFixed(2)}</span>
                <div class="text-[11px] text-brand-600 font-bold">+$$\${Number(l.ganancia_usd || 18.5).toFixed(2)} limpia</div>
              </div>
            </div>

            <div class="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
              <div><strong class="text-slate-500">Destino:</strong> <span class="text-slate-800 font-medium">\${l.sede}</span></div>
              <div><strong class="text-slate-500">Combo:</strong> <span class="text-slate-800 font-medium">\${l.combo}</span></div>
            </div>

            <div class="flex items-center justify-between pt-2 gap-2">
              <a href="\${waLink}" target="_blank" class="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 font-bold">
                💬 Abrir WhatsApp
              </a>
              <div class="flex items-center gap-2">
                <button onclick="copiarFicha('\${l.id}')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 transition">
                  📋 Ficha Dropanas
                </button>
                <button onclick="abrirModalDP('\${l.id}', '\${l.nombre}')" class="bg-brand-500 hover:bg-brand-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm shadow-brand-500/20 transition">
                  ✅ Ya lo monté
                </button>
              </div>
            </div>
          \`;
          cont.appendChild(card);
        });

      } catch (e) {
        console.error('Error por montar:', e);
      }
    }

    async function copiarFicha(id) {
      const res = await fetch(\`\${API}/listos\`);
      const listos = await res.json();
      const l = listos.find(x => x.id === id);
      if (!l) return;

      const texto = \`• Destinatario: \${l.nombre}
• Cédula: \${l.cedula}
• Teléfono: \${l.telefono}
• Ciudad / Estado: \${l.ciudad}
• Agencia Tealca: \${l.sede}
• Producto: \${l.combo}
• Monto Recaudo: $\${Number(l.total_usd).toFixed(2)}\`;

      navigator.clipboard.writeText(texto);
      alert(\`📋 Ficha de \${l.nombre} copiada al portapapeles. ¡Pégala en Dropanas!\`);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 4. CARGAR BILLETERA DROPANAS EN VIVO POR API
    // ─────────────────────────────────────────────────────────────────────────────
    async function cargarBilletera() {
      try {
        const res = await fetch(\`\${API}/wallet/transactions\`);
        const data = await res.json();
        const txs = data.data || [];

        const tbody = document.getElementById('wallet-transactions-body');
        tbody.innerHTML = '';

        if (txs.length === 0) {
          tbody.innerHTML = \`<tr><td colspan="6" class="text-center py-6 text-slate-400 text-xs">Sin transacciones registradas.</td></tr>\`;
          return;
        }

        txs.forEach(t => {
          const isDebito = t.tipo === 'debito';
          const badgeClass = isDebito ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
          const signo = isDebito ? '-' : '+';
          const montoClass = isDebito ? 'text-rose-600' : 'text-emerald-600';

          const tr = document.createElement('tr');
          tr.className = 'hover:bg-slate-50 transition';
          tr.innerHTML = \`
            <td class="py-3 px-4 font-mono font-bold text-slate-500">\${t.id}</td>
            <td class="py-3 px-4 text-slate-600 text-[11px]">\${(t.fecha || '').slice(0, 16).replace('T', ' ')}</td>
            <td class="py-3 px-4">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border \${badgeClass}">
                \${t.tipo.toUpperCase()}
              </span>
            </td>
            <td class="py-3 px-4 text-slate-800 font-medium">\${t.descripcion}</td>
            <td class="py-3 px-4 text-right font-mono font-extrabold \${montoClass}">
              \${signo}Bs \${Number(t.monto).toLocaleString('es-VE', {minimumFractionDigits: 2})}
            </td>
            <td class="py-3 px-4 text-center">
              <span class="px-2 py-0.5 rounded font-bold text-[10px] \${t.estado === 'pendiente' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}">
                \${t.estado}
              </span>
            </td>
          \`;
          tbody.appendChild(tr);
        });

      } catch (e) {
        console.warn('Error cargando billetera:', e);
      }
    }

    function abrirModalDP(id, nombre) {
      currentListoSelected = id;
      document.getElementById('modal-dp-nombre').textContent = nombre;
      document.getElementById('modal-dp-input').value = '';
      document.getElementById('modal-dp').classList.remove('hidden');
      document.getElementById('modal-dp').classList.add('flex');
    }

    function cerrarModalDP() {
      document.getElementById('modal-dp').classList.add('hidden');
      document.getElementById('modal-dp').classList.remove('flex');
      currentListoSelected = null;
    }

    async function guardarOrdenMontada() {
      const dp = document.getElementById('modal-dp-input').value.trim();
      if (!dp) {
        alert('Por favor escribe el código DP generado por Dropanas.');
        return;
      }
      try {
        await fetch(\`\${API}/listos/\${currentListoSelected}/montar\`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({codigo_dp: dp})
        });
        cerrarModalDP();
        recargarTodo();
      } catch (e) {
        alert('Error guardando orden: ' + e);
      }
    }

    function recargarTodo() {
      cargarBCV();
      inicializarPedidosOficina();
      cargarLeadsPorAtacar();
      cargarPedidos();
      cargarPorMontar();
    }

    // Inicio automático
    recargarTodo();
  </script>
</body>
</html>
`;
