import fs from 'fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1106" height="486" viewBox="0 0 1106 486" fill="none">
  <defs>
    <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f66234" />
      <stop offset="100%" stop-color="#c8370b" />
    </linearGradient>
    <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f66234" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#f66234" stop-opacity="0" />
    </linearGradient>
    <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="0.75" />
    </pattern>
  </defs>

  <!-- Background Blueprint Technical Grid -->
  <rect width="1106" height="486" fill="url(#gridPattern)" />

  <!-- Upper Technical Header Rule -->
  <line x1="40" y1="35" x2="1066" y2="35" stroke="#a7a3a2" stroke-width="1" stroke-opacity="0.35" />
  <circle cx="40" cy="35" r="3" fill="#f66234" />
  <circle cx="1066" cy="35" r="3" fill="#f66234" />
  <text x="52" y="28" fill="#a7a3a2" font-family="monospace" font-size="10" letter-spacing="0.1em">ONOS MANUFACTURING ARCHITECTURE // MULTI-TRACK APPAREL &amp; PRINT CAPABILITIES</text>
  <text x="890" y="28" fill="#a7a3a2" font-family="monospace" font-size="10" letter-spacing="0.1em">PARALLEL PRODUCTION LINES</text>

  <!-- Lower Technical Baseline Rule -->
  <line x1="40" y1="450" x2="1066" y2="450" stroke="#a7a3a2" stroke-width="1" stroke-opacity="0.35" />
  <line x1="40" y1="455" x2="1066" y2="455" stroke="#a7a3a2" stroke-width="0.5" stroke-dasharray="4 4" stroke-opacity="0.25" />
  <text x="52" y="468" fill="#a7a3a2" font-family="monospace" font-size="9" letter-spacing="0.08em">FACTORIES: THAI NGUYEN (VN) · ME LINH (VN) · CALIFORNIA (USA) | QUALITY CONTROL: 5-STEP PROTOCOL</text>

  <!-- Parallel Branch Connectors into QC Hub (Independent Capability Tracks) -->
  <path d="M 230 245 L 260 245 M 460 245 L 490 245 M 690 245 L 720 245 M 920 245 L 945 245" stroke="#f66234" stroke-width="1.5" stroke-dasharray="3 3" />
  <polygon points="943,241 951,245 943,249" fill="#f66234" />

  <!-- ========================================================================= -->
  <!-- TRACK 01: DTG DIRECT-TO-GARMENT PRINTING (x: 50 - 230) -->
  <!-- ========================================================================= -->
  <g id="track-dtg" transform="translate(50, 65)">
    <rect x="0" y="0" width="180" height="360" rx="4" fill="none" stroke="#a7a3a2" stroke-width="1.2" stroke-opacity="0.4" />
    <rect x="0" y="0" width="180" height="24" rx="4" fill="#a7a3a2" fill-opacity="0.1" />
    <text x="10" y="16" fill="#a7a3a2" font-family="monospace" font-size="10" font-weight="700">TRACK 01 // DTG PRINT</text>
    <circle cx="168" cy="12" r="3" fill="#f66234" />

    <!-- Machine Frame: SL-DTG-X2S -->
    <rect x="16" y="44" width="148" height="205" rx="3" fill="none" stroke="#a7a3a2" stroke-width="1.2" />
    <!-- Dual Guide Rails -->
    <line x1="12" y1="68" x2="168" y2="68" stroke="#a7a3a2" stroke-width="3" />
    <line x1="12" y1="74" x2="168" y2="74" stroke="#a7a3a2" stroke-width="1.5" />
    <!-- Carriage -->
    <rect x="68" y="56" width="44" height="26" rx="2" fill="#a7a3a2" />
    <path d="M 76 56 C 76 48 84 46 90 46" fill="none" stroke="#f66234" stroke-width="1.5" />
    
    <!-- Garment Platen Tray with Cotton T-Shirt -->
    <rect x="34" y="92" width="112" height="142" fill="#a7a3a2" fill-opacity="0.08" stroke="#a7a3a2" stroke-width="1" />
    <path d="M 58 110 C 68 116 92 116 102 110 L 124 122 L 114 140 L 106 134 L 106 215 L 54 215 L 54 134 L 46 140 L 36 122 Z" fill="#ffffff" fill-opacity="0.05" stroke="#a7a3a2" stroke-width="1" />
    <!-- Detailed Print on Chest -->
    <rect x="66" y="138" width="48" height="42" rx="2" fill="url(#brandGrad)" fill-opacity="0.85" />
    <line x1="70" y1="148" x2="110" y2="148" stroke="#ffffff" stroke-width="1.5" />
    <line x1="70" y1="155" x2="105" y2="155" stroke="#ffffff" stroke-width="1" stroke-opacity="0.8" />
    <circle cx="104" cy="167" r="3" fill="#ffffff" />

    <!-- Verified ONOS Business Content -->
    <text x="14" y="272" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">EQUIP: SL-DTG-X2S</text>
    <text x="14" y="290" fill="#a7a3a2" font-family="monospace" font-size="8.5">MATERIAL: 100% COTTON</text>
    <text x="14" y="306" fill="#a7a3a2" font-family="monospace" font-size="8.5">OUTPUT: DETAILED ARTWORK</text>
    <text x="14" y="322" fill="#a7a3a2" font-family="monospace" font-size="8.5">RUNS: 1 PC TO BULK</text>
    <rect x="14" y="334" width="76" height="15" rx="2" fill="url(#brandGrad)" />
    <text x="19" y="345" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">DIRECT LINE</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TRACK 02: COMPUTERISED EMBROIDERY (x: 280 - 460) -->
  <!-- ========================================================================= -->
  <g id="track-embroidery" transform="translate(280, 65)">
    <rect x="0" y="0" width="180" height="360" rx="4" fill="none" stroke="#a7a3a2" stroke-width="1.2" stroke-opacity="0.4" />
    <rect x="0" y="0" width="180" height="24" rx="4" fill="#a7a3a2" fill-opacity="0.1" />
    <text x="10" y="16" fill="#a7a3a2" font-family="monospace" font-size="10" font-weight="700">TRACK 02 // EMBROIDERY</text>
    <circle cx="168" cy="12" r="3" fill="#f66234" />

    <!-- Thread Spool Cone Rack (Top) -->
    <rect x="25" y="44" width="130" height="8" rx="2" fill="#a7a3a2" />
    <path d="M 35 44 L 41 30 L 47 44 Z" fill="#f66234" />
    <path d="M 65 44 L 71 30 L 77 44 Z" fill="#a7a3a2" />
    <path d="M 95 44 L 101 30 L 107 44 Z" fill="#f66234" />
    <path d="M 125 44 L 131 30 L 137 44 Z" fill="#a7a3a2" />

    <!-- Thread Guides -->
    <line x1="41" y1="44" x2="75" y2="78" stroke="#f66234" stroke-width="0.75" />
    <line x1="71" y1="44" x2="82" y2="78" stroke="#a7a3a2" stroke-width="0.75" />
    <line x1="101" y1="44" x2="88" y2="78" stroke="#f66234" stroke-width="0.75" />
    <line x1="131" y1="44" x2="95" y2="78" stroke="#a7a3a2" stroke-width="0.75" />

    <!-- Multi-Needle Head -->
    <rect x="66" y="78" width="48" height="42" rx="3" fill="#a7a3a2" />
    <rect x="74" y="88" width="32" height="12" fill="#191919" />
    <line x1="78" y1="120" x2="78" y2="148" stroke="#a7a3a2" stroke-width="1.5" />
    <line x1="86" y1="120" x2="86" y2="152" stroke="#f66234" stroke-width="2" />
    <line x1="94" y1="120" x2="94" y2="148" stroke="#a7a3a2" stroke-width="1.5" />
    <line x1="102" y1="120" x2="102" y2="148" stroke="#a7a3a2" stroke-width="1.5" />

    <!-- Embroidery Hoop with Headwear/Garment -->
    <rect x="22" y="160" width="136" height="85" rx="3" fill="none" stroke="#a7a3a2" stroke-width="1.2" />
    <circle cx="90" cy="195" r="32" fill="#ffffff" fill-opacity="0.05" stroke="#f66234" stroke-width="1.8" />
    <path d="M 80 185 L 100 185 L 104 205 L 76 205 Z" fill="url(#brandGrad)" />
    <text x="83" y="198" fill="#ffffff" font-family="sans-serif" font-size="9" font-weight="900">ON</text>

    <!-- Verified ONOS Business Content -->
    <text x="14" y="272" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">EQUIP: MULTI-HEAD LINES</text>
    <text x="14" y="290" fill="#a7a3a2" font-family="monospace" font-size="8.5">MATERIAL: TWILL / FLEECE</text>
    <text x="14" y="306" fill="#a7a3a2" font-family="monospace" font-size="8.5">FINISH: 3D PUFF &amp; FLAT</text>
    <text x="14" y="322" fill="#a7a3a2" font-family="monospace" font-size="8.5">ITEMS: CAPS, POLOS, HOODIES</text>
    <rect x="14" y="334" width="76" height="15" rx="2" fill="url(#brandGrad)" />
    <text x="19" y="345" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">DIRECT LINE</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TRACK 03: SUBLIMATION PRINTING & HEAT FUSION (x: 510 - 690) -->
  <!-- ========================================================================= -->
  <g id="track-sublimation" transform="translate(510, 65)">
    <rect x="0" y="0" width="180" height="360" rx="4" fill="none" stroke="#a7a3a2" stroke-width="1.2" stroke-opacity="0.4" />
    <rect x="0" y="0" width="180" height="24" rx="4" fill="#a7a3a2" fill-opacity="0.1" />
    <text x="10" y="16" fill="#a7a3a2" font-family="monospace" font-size="10" font-weight="700">TRACK 03 // SUBLIMATION</text>
    <circle cx="168" cy="12" r="3" fill="#f66234" />

    <!-- Industrial Heat Press & Printer -->
    <rect x="20" y="52" width="140" height="195" rx="3" fill="none" stroke="#a7a3a2" stroke-width="1.2" />
    <rect x="35" y="68" width="110" height="26" rx="2" fill="#a7a3a2" />
    <text x="44" y="85" fill="#191919" font-family="monospace" font-size="9" font-weight="700">HEAT PRESS BED</text>
    <path d="M 45 104 Q 50 110 55 104 Q 60 98 65 104 M 85 104 Q 90 110 95 104 Q 100 98 105 104 M 125 104 Q 130 110 135 104 Q 140 98 145 104" fill="none" stroke="#f66234" stroke-width="1.5" />

    <!-- Sportswear Jersey Outline (All-Over Print) -->
    <g transform="translate(42, 120)">
      <rect x="0" y="0" width="96" height="110" fill="#a7a3a2" fill-opacity="0.08" stroke="#a7a3a2" stroke-width="1" />
      <path d="M 24 16 L 40 8 L 56 8 L 72 16 L 86 28 L 74 42 L 68 36 L 68 100 L 28 100 L 28 36 L 22 42 L 10 28 Z" fill="none" stroke="#f66234" stroke-width="1.5" />
      <path d="M 28 50 L 68 70 M 28 65 L 68 85 M 28 35 L 68 55" stroke="#f66234" stroke-width="1" stroke-opacity="0.5" />
      <circle cx="82" cy="88" r="8" fill="url(#brandGrad)" />
      <text x="76" y="91" fill="#ffffff" font-family="monospace" font-size="7" font-weight="700">AOP</text>
    </g>

    <!-- Verified ONOS Business Content -->
    <text x="14" y="272" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">EQUIP: SC-F11030</text>
    <text x="14" y="290" fill="#a7a3a2" font-family="monospace" font-size="8.5">PRESS: PD-1800D-800</text>
    <text x="14" y="306" fill="#a7a3a2" font-family="monospace" font-size="8.5">MATERIAL: 100% POLYESTER</text>
    <text x="14" y="322" fill="#a7a3a2" font-family="monospace" font-size="8.5">TYPE: ALL-OVER SPORTSWEAR</text>
    <rect x="14" y="334" width="76" height="15" rx="2" fill="url(#brandGrad)" />
    <text x="19" y="345" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">DIRECT LINE</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TRACK 04: LASER CUTTING & DECORATIVE GOODS (x: 740 - 920) -->
  <!-- ========================================================================= -->
  <g id="track-laser" transform="translate(740, 65)">
    <rect x="0" y="0" width="180" height="360" rx="4" fill="none" stroke="#a7a3a2" stroke-width="1.2" stroke-opacity="0.4" />
    <rect x="0" y="0" width="180" height="24" rx="4" fill="#a7a3a2" fill-opacity="0.1" />
    <text x="10" y="16" fill="#a7a3a2" font-family="monospace" font-size="10" font-weight="700">TRACK 04 // LASER CUT</text>
    <circle cx="168" cy="12" r="3" fill="#f66234" />

    <!-- Cutting Bed Frame -->
    <rect x="18" y="44" width="144" height="205" fill="none" stroke="#a7a3a2" stroke-width="1.2" />
    <path d="M 18 80 L 162 80 M 18 120 L 162 120 M 18 160 L 162 160 M 18 200 L 162 200" stroke="#a7a3a2" stroke-width="0.5" stroke-opacity="0.3" stroke-dasharray="2 4" />
    <path d="M 50 44 L 50 249 M 90 44 L 90 249 M 130 44 L 130 249" stroke="#a7a3a2" stroke-width="0.5" stroke-opacity="0.3" stroke-dasharray="2 4" />

    <!-- Geometric Custom Goods Outline on Bed -->
    <rect x="45" y="100" width="90" height="110" rx="6" fill="#f66234" fill-opacity="0.08" stroke="#f66234" stroke-width="1.5" stroke-dasharray="4 2" />
    <!-- Laser Gantry and Head -->
    <line x1="12" y1="125" x2="168" y2="125" stroke="#a7a3a2" stroke-width="2.5" />
    <rect x="78" y="115" width="24" height="20" rx="2" fill="#a7a3a2" />
    <polygon points="90,135 86,165 94,165" fill="url(#beamGrad)" />
    <circle cx="90" cy="165" r="3" fill="#f66234" />

    <!-- Verified ONOS Business Content -->
    <text x="14" y="272" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">EQUIP: FW-1822 / LP-2219</text>
    <text x="14" y="290" fill="#a7a3a2" font-family="monospace" font-size="8.5">MATERIAL: WOOD · ACRYLIC</text>
    <text x="14" y="306" fill="#a7a3a2" font-family="monospace" font-size="8.5">CAPABILITY: CUT &amp; ENGRAVE</text>
    <text x="14" y="322" fill="#a7a3a2" font-family="monospace" font-size="8.5">OUTPUT: GIFTS &amp; DECOR</text>
    <rect x="14" y="334" width="76" height="15" rx="2" fill="url(#brandGrad)" />
    <text x="19" y="345" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">DIRECT LINE</text>
  </g>

  <!-- ========================================================================= -->
  <!-- COMMON DESTINATION: QC & GLOBAL FULFILLMENT (x: 955 - 1065) -->
  <!-- ========================================================================= -->
  <g id="hub-fulfillment" transform="translate(955, 65)">
    <rect x="0" y="0" width="110" height="360" rx="4" fill="none" stroke="#a7a3a2" stroke-width="1.2" stroke-opacity="0.4" />
    <rect x="0" y="0" width="110" height="24" rx="4" fill="#a7a3a2" fill-opacity="0.1" />
    <text x="10" y="16" fill="#a7a3a2" font-family="monospace" font-size="9.5" font-weight="700">05 // QC &amp; HUB</text>
    <circle cx="98" cy="12" r="3" fill="#f66234" />

    <!-- Fulfillment Carton Box -->
    <polygon points="20,110 55,92 90,110 55,128" fill="#a7a3a2" fill-opacity="0.2" stroke="#a7a3a2" stroke-width="1" />
    <polygon points="20,110 55,128 55,170 20,152" fill="#a7a3a2" fill-opacity="0.3" stroke="#a7a3a2" stroke-width="1" />
    <polygon points="90,110 55,128 55,170 90,152" fill="#a7a3a2" fill-opacity="0.4" stroke="#a7a3a2" stroke-width="1" />
    
    <!-- Barcode Laser Scan Line -->
    <line x1="12" y1="138" x2="98" y2="138" stroke="#f66234" stroke-width="2" />
    <text x="22" y="195" fill="#a7a3a2" font-family="monospace" font-size="8.5">VN ↔ USA</text>
    <text x="18" y="210" fill="#a7a3a2" font-family="monospace" font-size="8.5">CONNECTED</text>

    <!-- Inspection Pass Checkmark -->
    <circle cx="55" cy="238" r="15" fill="url(#brandGrad)" />
    <path d="M 48 238 L 53 243 L 63 233" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Verified ONOS Business Content -->
    <text x="10" y="272" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">5-STEP QC</text>
    <text x="10" y="290" fill="#a7a3a2" font-family="monospace" font-size="8">FULL INSPECT</text>
    <text x="10" y="306" fill="#a7a3a2" font-family="monospace" font-size="8">PACK &amp; DISPATCH</text>
    <text x="10" y="322" fill="#a7a3a2" font-family="monospace" font-size="8">DIRECT CARRIER</text>
    <rect x="10" y="334" width="90" height="15" rx="2" fill="url(#brandGrad)" />
    <text x="16" y="345" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">DISPATCHED</text>
  </g>

  <!-- Technical Calibration Markings (Manufactt-style Crosshairs) -->
  <g stroke="#a7a3a2" stroke-width="0.75" opacity="0.4">
    <line x1="20" y1="20" x2="30" y2="20" />
    <line x1="25" y1="15" x2="25" y2="25" />
    <line x1="1076" y1="20" x2="1086" y2="20" />
    <line x1="1081" y1="15" x2="1081" y2="25" />
    <line x1="20" y1="466" x2="30" y2="466" />
    <line x1="25" y1="461" x2="25" y2="471" />
    <line x1="1076" y1="466" x2="1086" y2="466" />
    <line x1="1081" y1="461" x2="1081" y2="471" />
  </g>
</svg>`;

fs.writeFileSync('public/assets/onos-apparel-production-diagram.svg', svg);
console.log('Updated verified apparel production diagram written successfully.');
