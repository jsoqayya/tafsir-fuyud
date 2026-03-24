import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============================================
// SVG COMPONENTS FOR ISLAMIC PATTERNS
// ============================================

// Eight-Point Star Medallion Pattern
const EightPointStar = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#dac578', stopOpacity: 0.9 }} />
        <stop offset="50%" style={{ stopColor: '#c9b060', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#b8a050', stopOpacity: 0.9 }} />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#starGold)" strokeWidth="0.4">
      {/* Primary eight-point star */}
      <polygon points="50,2 58,38 95,38 65,58 75,95 50,72 25,95 35,58 5,38 42,38" />
      {/* Secondary rotated star */}
      <polygon points="50,8 56,40 88,40 62,56 70,88 50,68 30,88 38,56 12,40 44,40" transform="rotate(22.5 50 50)" />
      {/* Outer circles */}
      <circle cx="50" cy="50" r="48" strokeWidth="0.3" />
      <circle cx="50" cy="50" r="44" strokeWidth="0.2" strokeDasharray="2 2" />
      {/* Inner geometric pattern */}
      <circle cx="50" cy="50" r="35" strokeWidth="0.3" />
      <circle cx="50" cy="50" r="28" strokeWidth="0.2" />
      {/* Cross lines */}
      <line x1="50" y1="15" x2="50" y2="85" strokeWidth="0.2" />
      <line x1="15" y1="50" x2="85" y2="50" strokeWidth="0.2" />
      <line x1="25" y1="25" x2="75" y2="75" strokeWidth="0.15" />
      <line x1="75" y1="25" x2="25" y2="75" strokeWidth="0.15" />
      {/* Decorative inner diamonds */}
      <polygon points="50,20 60,50 50,80 40,50" strokeWidth="0.25" />
      <polygon points="20,50 50,40 80,50 50,60" strokeWidth="0.25" />
    </g>
  </svg>
);

// Andalusian Corner Ornament
const CornerOrnament = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#dac578', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#c9b060', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: '#9a8040', stopOpacity: 0.7 }} />
      </linearGradient>
      <linearGradient id="cornerBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#5a8aab', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#2d5a7b', stopOpacity: 0.4 }} />
      </linearGradient>
    </defs>
    <g fill="none">
      {/* Main arabesque curves - Gold */}
      <g stroke="url(#cornerGold)" strokeWidth="1.5">
        <path d="M0 0 Q60 0 60 60 Q60 120 0 120" />
        <path d="M0 0 Q120 0 120 120" />
        <path d="M25 0 Q70 25 70 70 Q70 115 25 115" />
        <path d="M0 40 Q40 40 40 80 Q40 120 0 120" strokeWidth="1" />
        <path d="M0 60 Q25 60 25 85 Q25 110 0 110" strokeWidth="0.8" />
      </g>
      {/* Blue mosaic accent details */}
      <g stroke="url(#cornerBlue)" strokeWidth="0.8">
        <path d="M45 0 Q80 35 80 80" strokeDasharray="3 2" />
        <path d="M0 45 Q35 45 35 80" strokeDasharray="3 2" />
      </g>
      {/* Central ornament medallion */}
      <circle cx="50" cy="50" r="12" stroke="url(#cornerGold)" strokeWidth="1" />
      <circle cx="50" cy="50" r="8" stroke="url(#cornerGold)" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="4" fill="url(#cornerGold)" fillOpacity="0.5" />
      {/* Decorative leaf shapes */}
      <path d="M75 25 Q85 35 75 45 Q65 35 75 25" fill="url(#cornerGold)" fillOpacity="0.25" stroke="url(#cornerGold)" strokeWidth="0.5" />
      <path d="M25 75 Q35 85 25 95 Q15 85 25 75" fill="url(#cornerGold)" fillOpacity="0.25" stroke="url(#cornerGold)" strokeWidth="0.5" />
      {/* Small geometric accents */}
      <rect x="90" y="45" width="8" height="8" transform="rotate(45 94 49)" stroke="url(#cornerGold)" strokeWidth="0.5" fill="none" />
      <rect x="45" y="90" width="8" height="8" transform="rotate(45 49 94)" stroke="url(#cornerGold)" strokeWidth="0.5" fill="none" />
    </g>
  </svg>
);

// Mosque Silhouette - Left Side
const MosqueSilhouetteLeft = () => (
  <svg viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid slice">
    <defs>
      <linearGradient id="fadeLeftMosque" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f5f0e6', stopOpacity: 1 }} />
        <stop offset="70%" style={{ stopColor: '#f5f0e6', stopOpacity: 0.5 }} />
        <stop offset="100%" style={{ stopColor: '#f5f0e6', stopOpacity: 0 }} />
      </linearGradient>
    </defs>
    <g fill="url(#fadeLeftMosque)">
      {/* Main Central Dome */}
      <ellipse cx="250" cy="200" rx="140" ry="120" />
      <rect x="110" y="200" width="280" height="400" />
      
      {/* Dome Finial */}
      <ellipse cx="250" cy="85" rx="15" ry="25" />
      <rect x="245" y="70" width="10" height="20" />
      <ellipse cx="250" cy="65" rx="8" ry="12" />
      
      {/* Left Tall Minaret */}
      <rect x="20" y="120" width="50" height="480" />
      <ellipse cx="45" cy="120" rx="32" ry="28" />
      <rect x="35" y="75" width="20" height="45" />
      <ellipse cx="45" cy="70" rx="15" ry="12" />
      <path d="M45 35 L30 70 L60 70 Z" />
      {/* Minaret balcony */}
      <rect x="15" y="250" width="60" height="8" />
      <rect x="15" y="400" width="60" height="8" />
      
      {/* Right Secondary Minaret */}
      <rect x="380" y="180" width="40" height="420" />
      <ellipse cx="400" cy="180" rx="25" ry="22" />
      <rect x="392" y="145" width="16" height="35" />
      <ellipse cx="400" cy="140" rx="12" ry="10" />
      <path d="M400 115 L388 140 L412 140 Z" />
      <rect x="375" y="320" width="50" height="6" />
      
      {/* Andalusian Arches - Row 1 */}
      <path d="M130 520 Q170 450 210 520 L210 600 L130 600 Z" />
      <path d="M220 520 Q260 450 300 520 L300 600 L220 600 Z" />
      <path d="M310 520 Q350 450 390 520 L390 600 L310 600 Z" />
      
      {/* Small Domes on Sides */}
      <ellipse cx="140" cy="350" rx="45" ry="35" />
      <ellipse cx="360" cy="350" rx="45" ry="35" />
      
      {/* Decorative Windows */}
      <ellipse cx="250" cy="320" rx="25" ry="40" fillOpacity="0.5" />
      <ellipse cx="180" cy="420" rx="15" ry="25" fillOpacity="0.5" />
      <ellipse cx="320" cy="420" rx="15" ry="25" fillOpacity="0.5" />
    </g>
  </svg>
);

// Andalusian Architecture - Right Side  
const AndalusianRight = () => (
  <svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
    <defs>
      <linearGradient id="fadeRightArch" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f5f0e6', stopOpacity: 1 }} />
        <stop offset="70%" style={{ stopColor: '#f5f0e6', stopOpacity: 0.5 }} />
        <stop offset="100%" style={{ stopColor: '#f5f0e6', stopOpacity: 0 }} />
      </linearGradient>
    </defs>
    <g fill="url(#fadeRightArch)">
      {/* Tall Elegant Minaret */}
      <rect x="300" y="50" width="55" height="600" />
      <ellipse cx="327" cy="50" rx="38" ry="32" />
      <rect x="315" y="0" width="24" height="50" />
      <ellipse cx="327" cy="-5" rx="16" ry="14" />
      <path d="M327 -40 L310 -5 L344 -5 Z" />
      {/* Balconies */}
      <rect x="292" y="150" width="70" height="8" />
      <rect x="292" y="300" width="70" height="8" />
      <rect x="292" y="450" width="70" height="8" />
      
      {/* Large Horseshoe Arches - Alhambra Style */}
      <path d="M50 380 Q120 260 190 380 L190 650 L50 650 Z" />
      <path d="M70 400 Q120 310 170 400 L170 650 L70 650 Z" fillOpacity="0.6" />
      
      {/* Secondary Arch */}
      <path d="M180 450 Q230 360 280 450 L280 650 L180 650 Z" />
      
      {/* Dome Structure */}
      <ellipse cx="180" cy="220" rx="80" ry="65" />
      <rect x="100" y="220" width="160" height="160" />
      <ellipse cx="180" cy="175" rx="12" ry="18" />
      
      {/* Decorative Geometric Patterns */}
      <circle cx="180" cy="300" r="20" fillOpacity="0.4" />
      <rect x="165" y="285" width="30" height="30" transform="rotate(45 180 300)" fillOpacity="0.3" />
      
      {/* Column Details */}
      <rect x="55" y="500" width="12" height="150" />
      <rect x="183" y="500" width="12" height="150" />
      <rect x="273" y="500" width="12" height="150" />
    </g>
  </svg>
);

// Top Arches Pattern
const TopArchesPattern = () => (
  <svg viewBox="0 0 1600 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin slice">
    <defs>
      <linearGradient id="archFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f5f0e6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f5f0e6', stopOpacity: 0 }} />
      </linearGradient>
    </defs>
    <g fill="url(#archFade)">
      {/* Repeating Moroccan/Andalusian arch pattern */}
      {[...Array(16)].map((_, i) => (
        <g key={i} transform={`translate(${i * 100}, 0)`}>
          <path d="M0 180 Q50 60 100 180" fill="none" stroke="url(#archFade)" strokeWidth="2" />
          <path d="M10 180 Q50 80 90 180" fill="none" stroke="url(#archFade)" strokeWidth="1" opacity="0.6" />
          <circle cx="50" cy="100" r="8" fillOpacity="0.3" />
        </g>
      ))}
    </g>
  </svg>
);

// Mosaic Pattern Strip
const MosaicStrip = ({ position }) => (
  <svg viewBox="0 0 60 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`mosaicGrad${position}`} x1={position === 'left' ? '0%' : '100%'} y1="0%" x2={position === 'left' ? '100%' : '0%'} y2="0%">
        <stop offset="0%" style={{ stopColor: '#2d5a7b', stopOpacity: 0.5 }} />
        <stop offset="100%" style={{ stopColor: '#2d5a7b', stopOpacity: 0 }} />
      </linearGradient>
      <linearGradient id={`goldAccent${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#c9b060', stopOpacity: 0.4 }} />
        <stop offset="100%" style={{ stopColor: '#c9b060', stopOpacity: 0.1 }} />
      </linearGradient>
    </defs>
    <g>
      {/* Geometric Islamic tile pattern */}
      {[...Array(10)].map((_, i) => (
        <g key={i} transform={`translate(0, ${i * 40})`}>
          <polygon points="30,0 60,20 30,40 0,20" fill={`url(#mosaicGrad${position})`} />
          <polygon points="30,5 55,20 30,35 5,20" fill="none" stroke={`url(#goldAccent${position})`} strokeWidth="0.5" />
          <circle cx="30" cy="20" r="4" fill={`url(#goldAccent${position})`} />
        </g>
      ))}
    </g>
  </svg>
);

// ============================================
// MAIN HOME COMPONENT
// ============================================

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <section className="hero-section" data-testid="hero-section">
      {/* Architectural Background Layers */}
      <div className="architectural-bg" aria-hidden="true">
        <div className="arch-left">
          <MosqueSilhouetteLeft />
        </div>
        <div className="arch-right">
          <AndalusianRight />
        </div>
        <div className="arch-top">
          <TopArchesPattern />
        </div>
        <div className="pattern-bottom"></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="geometric-overlay" aria-hidden="true">
        <CornerOrnament className="corner-ornament top-left" />
        <CornerOrnament className="corner-ornament top-right" />
        <CornerOrnament className="corner-ornament bottom-left" />
        <CornerOrnament className="corner-ornament bottom-right" />
      </div>

      {/* Mosaic Blue Accent Strips */}
      <div className="mosaic-accent-left" aria-hidden="true">
        <MosaicStrip position="left" />
      </div>
      <div className="mosaic-accent-right" aria-hidden="true">
        <MosaicStrip position="right" />
      </div>

      {/* Gold Border Frames */}
      <div className="gold-frame-top" aria-hidden="true"></div>
      <div className="gold-frame-bottom" aria-hidden="true"></div>
      <div className="gold-frame-left" aria-hidden="true"></div>
      <div className="gold-frame-right" aria-hidden="true"></div>

      {/* Main Hero Content */}
      <div className="hero-content">
        {/* Logo Medallion Frame */}
        <div className="logo-medallion" data-testid="logo-medallion">
          <div className="medallion-outer" aria-hidden="true"></div>
          <div className="medallion-inner" aria-hidden="true"></div>
          <EightPointStar className="medallion-star" />
          <div className="logo-glow" aria-hidden="true"></div>
          <div className="logo-glow-inner" aria-hidden="true"></div>
          
          <div className="logo-container">
            <h1 className="logo-arabic" data-testid="logo-arabic">
              فيوض التأويل المعاصر
            </h1>
            <p className="logo-english" data-testid="logo-english">
              Fuyud Al-Ta'wil Al-Mu'asir
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="divider" aria-hidden="true">
          <div className="divider-line left"></div>
          <div className="divider-ornament"></div>
          <div className="divider-line right"></div>
        </div>

        {/* Tagline */}
        <p className="tagline" data-testid="tagline">
          منصة علمية رائدة للتفسير القرآني والدراسات الإسلامية
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons" data-testid="hero-buttons">
          <button className="btn btn-primary" data-testid="explore-btn">
            <i className="fas fa-book-open"></i>
            استكشف التفاسير
          </button>
          <button className="btn btn-secondary" data-testid="about-btn">
            <i className="fas fa-info-circle"></i>
            تعرف علينا
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>SCROLL</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

// ============================================
// APP COMPONENT
// ============================================

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
