const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'brand_logos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const logos = {
  'hafele.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <text x="10" y="48" font-family="'Helvetica Neue', Arial, sans-serif" font-size="42" font-weight="900" letter-spacing="4" fill="#E30613">HÄFELE</text>
  </svg>`,
  
  'hettich.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <text x="10" y="48" font-family="'Helvetica Neue', Arial, sans-serif" font-size="42" font-weight="800" letter-spacing="1.5" fill="#004B93">Hettich</text>
    <circle cx="195" cy="22" r="6" fill="#009FE3" />
  </svg>`,

  'epco.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <rect x="8" y="14" width="42" height="42" rx="8" fill="#D32F2F" />
    <path d="M19 25 H38 V30 H25 V34 H35 V39 H25 V44 H38 V49 H19 Z" fill="#FFFFFF" />
    <text x="60" y="48" font-family="'Arial Black', Impact, sans-serif" font-size="38" font-weight="900" letter-spacing="3" fill="#D32F2F">EPCO</text>
  </svg>`,

  'blum.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <text x="12" y="50" font-family="'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="-1" fill="#FF6600">blum</text>
  </svg>`,

  'merino.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <path d="M12 48 V22 Q12 16 20 16 Q28 16 28 24 V48 H36 V24 Q36 16 44 16 Q52 16 52 24 V48" stroke="#8B0000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="60" y="46" font-family="'Helvetica Neue', Arial, sans-serif" font-size="36" font-weight="700" letter-spacing="2" fill="#8B0000">merino</text>
    <text x="62" y="58" font-family="Arial, sans-serif" font-size="9" font-weight="700" letter-spacing="3" fill="#C5A059">LAMINATES</text>
  </svg>`,

  'greenlam.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" fill="none">
    <circle cx="24" cy="35" r="16" fill="#00843D" />
    <path d="M24 22 C32 26 34 38 24 45 C20 38 18 28 24 22 Z" fill="#84BD00" />
    <text x="48" y="46" font-family="'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="800" fill="#00843D" letter-spacing="1">greenlam</text>
  </svg>`,

  'virgo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <polygon points="12,48 24,18 36,48 24,38" fill="#ED1C24" />
    <text x="44" y="46" font-family="'Arial Black', sans-serif" font-size="38" font-weight="900" letter-spacing="4" fill="#ED1C24">VIRGO</text>
    <text x="46" y="58" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="4" fill="#888888">GROUP</text>
  </svg>`,

  'century.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" fill="none">
    <rect x="8" y="16" width="38" height="38" rx="4" fill="#ED1C24" />
    <text x="16" y="45" font-family="Arial Black, sans-serif" font-size="30" font-weight="900" fill="#FFFFFF">C</text>
    <text x="54" y="40" font-family="'Arial Black', Impact, sans-serif" font-size="28" font-weight="900" letter-spacing="1" fill="#ED1C24">CENTURY</text>
    <text x="55" y="55" font-family="Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="5" fill="#333333">PLY</text>
  </svg>`,

  'greenply.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" fill="none">
    <path d="M10 44 C12 20 35 18 38 32 C40 46 22 48 10 44 Z" fill="#009639" />
    <path d="M18 42 C24 28 36 28 32 38 Z" fill="#8DC63F" />
    <text x="48" y="46" font-family="'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="1" fill="#009639">Greenply</text>
  </svg>`,

  'saburi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <polygon points="24,14 38,26 34,48 14,48 10,26" fill="none" stroke="#C5A059" stroke-width="3" />
    <text x="18" y="38" font-family="serif" font-size="22" font-weight="bold" fill="#C5A059">S</text>
    <text x="48" y="45" font-family="'Cinzel', 'Times New Roman', serif" font-size="32" font-weight="700" letter-spacing="3" fill="#C5A059">SABURI</text>
    <text x="50" y="58" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="4" fill="#888888">PLYWOOD</text>
  </svg>`,

  'ganga.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <path d="M12 46 Q24 16 36 46 Q24 38 12 46 Z" fill="#C41230" />
    <circle cx="24" cy="22" r="5" fill="#C5A059" />
    <text x="46" y="45" font-family="'Cinzel', 'Georgia', serif" font-size="32" font-weight="800" letter-spacing="3" fill="#C41230">GANGA</text>
    <text x="48" y="58" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="3" fill="#888888">DOORS &amp; PLY</text>
  </svg>`,

  'agi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
    <rect x="8" y="16" width="40" height="38" rx="6" fill="#008080" />
    <text x="14" y="44" font-family="'Arial Black', sans-serif" font-size="26" font-weight="900" fill="#FFFFFF">A</text>
    <text x="56" y="46" font-family="'Arial Black', Impact, sans-serif" font-size="38" font-weight="900" letter-spacing="2" fill="#008080">AGI</text>
    <text x="58" y="58" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="3" fill="#C5A059">GREENPAC</text>
  </svg>`
};

for (const [filename, content] of Object.entries(logos)) {
  fs.writeFileSync(path.join(targetDir, filename), content.trim());
  console.log('Created ' + filename);
}
console.log('All 12 brand logos created successfully.');
