import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Globe, ChevronLeft, ChevronDown,
  Star, Sparkles, BookMarked, Heart, Brain, Lightbulb,
  Shield, Award, Users, Layers, Map, Volume2,
  Bell, Mail, ArrowLeft, Menu, X, CheckCircle,
  Compass, Feather, Flame, Eye, Zap, BarChart2, MessageSquare
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   CONSTANTS & CONFIG
══════════════════════════════════════════════════════════ */
const COLORS = {
  // Olive-Sage Green Tones (darker, richer, more elegant)
  BG:        '#2a3a1a',      // Darkest olive
  BG2:       '#3a4a2a',      // Deep olive
  BG3:       '#4a5a3a',      // Primary olive
  BG4:       '#5a6a4a',      // Medium olive-sage
  CARD:      '#3a4a2a',      // Card background
  CARD2:     '#4a5a3a',      // Card hover
  BORDER:    'rgba(201,162,39,0.30)',
  BORDER2:   'rgba(201,162,39,0.55)',
  // Warm Ivory/Cream
  IVORY:     '#f5f0e6',
  CREAM:     '#ebe5d8',
  CREAM2:    '#e0d8c8',
  // RICH DEEP GOLD - Like the calligraphy logo (dark, rich, precious)
  GOLD:      '#b8960f',      // Deep rich gold (darkest)
  GOLD2:     '#c9a227',      // Classic deep gold (like the logo)
  GOLD3:     '#d4aa30',      // Medium rich gold
  GOLD4:     '#deb838',      // Lighter rich gold
  GOLD_DIM:  'rgba(201,162,39,0.22)',
  GOLD_MID:  'rgba(201,162,39,0.45)',
  GOLD_TXT:  '#c9a227',      // Gold text - matches logo
  GOLD_SHINE: '#e8c848',     // Gold highlight
  // Andalusian Mosaic Blue
  BLUE:      '#2d5a7b',
  BLUE2:     '#4a7a9b',
  BLUE_DIM:  'rgba(45,90,123,0.20)',
  // Text
  TXT:       '#f5f0e6',
  TXT2:      'rgba(245,240,230,0.80)',
  TXT3:      'rgba(245,240,230,0.55)',
  // Accent
  TEAL:      '#5a7a6a',
  TEAL2:     '#6a8a7a',
};

// Background images for mosque silhouettes
const MOSQUE_IMAGES = {
  sunset: 'https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  golden: 'https://images.pexels.com/photos/161276/moscow-cathedral-mosque-prospekt-mira-ramadan-sky-161276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  dome: 'https://images.pexels.com/photos/161404/dome-gold-arabic-cathedral-161404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  pattern: 'https://images.pexels.com/photos/19038943/pexels-photo-19038943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};

const LANGUAGES = [
  { code: 'ar', label: 'العربية',   flag: '🇸🇦', native: 'Arabic',    dir: 'rtl' },
  { code: 'en', label: 'English',   flag: '🇬🇧', native: 'English',   dir: 'ltr' },
  { code: 'ur', label: 'اردو',      flag: '🇵🇰', native: 'Urdu',      dir: 'rtl' },
  { code: 'id', label: 'Bahasa',    flag: '🇮🇩', native: 'Indonesia', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe',    flag: '🇹🇷', native: 'Turkish',   dir: 'ltr' },
];

const NAV_LINKS = [
  { href: '#about',    label: 'عن المشروع' },
  { href: '#surahs',   label: 'تصفح السور' },
  { href: '#paths',    label: 'مسارات التأويل' },
  { href: '#features', label: 'الخصائص' },
];

/* ══════════════════════════════════════════════════════════
   UTILITY COMPONENTS
══════════════════════════════════════════════════════════ */

// Islamic 8-point Rub el Hizb star (الرُّبع) - authentic Islamic geometric pattern
function IslamicStar({ size = 40, color = COLORS.GOLD, opacity = 0.6, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${rotate}deg)`, opacity }}>
      {/* Outer octagon frame */}
      <polygon 
        points="50,2 71,15 85,35 85,65 71,85 50,98 29,85 15,65 15,35 29,15" 
        fill="none" stroke={color} strokeWidth="0.8" opacity="0.4"/>
      {/* First square (0° rotation) */}
      <rect x="22" y="22" width="56" height="56" 
        fill="none" stroke={color} strokeWidth="1.2" 
        transform="rotate(0 50 50)"/>
      {/* Second square (45° rotation) - creates 8-point star */}
      <rect x="22" y="22" width="56" height="56" 
        fill="none" stroke={color} strokeWidth="1.2" 
        transform="rotate(45 50 50)"/>
      {/* Inner decorative circle */}
      <circle cx="50" cy="50" r="18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6"/>
      {/* Center dot */}
      <circle cx="50" cy="50" r="4" fill={color} fillOpacity="0.4"/>
    </svg>
  );
}

// Decorative divider
function GoldDivider({ my = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: `${my}px 0` }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${COLORS.GOLD}40, transparent)` }} />
      <IslamicStar size={20} color={COLORS.GOLD2} opacity={0.8} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${COLORS.GOLD}40, transparent)` }} />
    </div>
  );
}

// Section title
function SectionTitle({ title, subtitle, light = false, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'right', marginBottom: 40 }} dir="rtl">
      <GoldDivider my={0} />
      <h2 style={{
        fontFamily: 'Amiri, serif',
        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
        color: light ? COLORS.GOLD3 : COLORS.GOLD2,
        margin: '16px 0 10px',
        fontWeight: 700,
        letterSpacing: '0.02em',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: 'Noto Naskh Arabic, serif',
          fontSize: '1.05rem',
          color: COLORS.TXT2,
          maxWidth: 560,
          margin: center ? '0 auto' : '0',
          lineHeight: 1.9,
        }}>
          {subtitle}
        </p>
      )}
      <GoldDivider my={8} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   GEOMETRIC BACKGROUND PATTERN
══════════════════════════════════════════════════════════ */
function GeometricPattern({ opacity = 0.04 }) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke={COLORS.GOLD} strokeWidth="0.5" opacity={opacity * 10}/>
          <circle cx="40" cy="40" r="20" fill="none" stroke={COLORS.GOLD} strokeWidth="0.3" opacity={opacity * 8}/>
          <path d="M40 20 L60 40 L40 60 L20 40 Z" fill="none" stroke={COLORS.GOLD} strokeWidth="0.3" opacity={opacity * 6}/>
        </pattern>
        <pattern id="arabesq" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="50" fill="none" stroke={COLORS.GOLD} strokeWidth="0.4" opacity={opacity * 5}/>
          <path d="M60 10 L110 60 L60 110 L10 60 Z" fill="none" stroke={COLORS.GOLD} strokeWidth="0.5" opacity={opacity * 7}/>
          <path d="M60 25 L95 60 L60 95 L25 60 Z" fill="none" stroke={COLORS.GOLD} strokeWidth="0.3" opacity={opacity * 4}/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   HEADER COMPONENT
══════════════════════════════════════════════════════════ */
function Header({ lang, onLangChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <>
      {/* ── Language Switcher Bar (Top) ── */}
      <div style={{
        background: `linear-gradient(to right, ${COLORS.BG}, ${COLORS.BG3}, ${COLORS.BG})`,
        borderBottom: `1px solid ${COLORS.BORDER2}`,
        padding: '9px 20px',
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            onClick={() => onLangChange(l.code)}
            style={{
              background: lang === l.code
                ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`
                : `rgba(255,255,255,0.04)`,
              color: lang === l.code ? COLORS.BG : COLORS.TXT,
              border: `1.5px solid ${lang === l.code ? COLORS.GOLD : COLORS.BORDER2}`,
              borderRadius: 24,
              padding: '6px 18px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: l.code === 'ar' || l.code === 'ur' ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              boxShadow: lang === l.code ? `0 2px 12px ${COLORS.GOLD}35` : 'none',
            }}
            onMouseEnter={e => {
              if (lang !== l.code) {
                e.currentTarget.style.background = `rgba(201,164,60,0.12)`;
                e.currentTarget.style.borderColor = COLORS.GOLD;
                e.currentTarget.style.color = COLORS.GOLD2;
              }
            }}
            onMouseLeave={e => {
              if (lang !== l.code) {
                e.currentTarget.style.background = `rgba(255,255,255,0.04)`;
                e.currentTarget.style.borderColor = COLORS.BORDER2;
                e.currentTarget.style.color = COLORS.TXT;
              }
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>

      {/* ── Main Sticky Header ── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled
          ? `rgba(11,31,20,0.97)`
          : `linear-gradient(to bottom, ${COLORS.BG2}f0, ${COLORS.BG2}d0)`,
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? COLORS.BORDER2 : COLORS.BORDER}`,
        transition: 'all 0.3s',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          {/* Logo + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{
              width: 72, height: 72,
              borderRadius: 14,
              border: `2px solid ${COLORS.GOLD}70`,
              overflow: 'hidden',
              flexShrink: 0,
              background: '#1a1200',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 18px ${COLORS.GOLD}25, 0 0 0 4px ${COLORS.GOLD}10`,
            }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <div dir="rtl">
              <div style={{
                fontFamily: 'Amiri, serif',
                fontSize: '1.55rem',
                fontWeight: 700,
                color: COLORS.GOLD2,
                lineHeight: 1.25,
                letterSpacing: '0.02em',
                textShadow: `0 0 20px ${COLORS.GOLD}40`,
              }}>
                فيوض التأويل المعاصر
              </div>
              <div style={{
                fontSize: '0.88rem',
                color: COLORS.TXT2,
                fontFamily: 'Noto Naskh Arabic, serif',
                fontWeight: 500,
                marginTop: 3,
                letterSpacing: '0.01em',
              }}>
                تفسير سورة البقرة • قراءة معاصرة
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}
            className="hidden-mobile" dir="rtl">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} style={{
                color: COLORS.TXT2,
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontFamily: 'Noto Naskh Arabic, serif',
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: 8,
                transition: 'all 0.2s',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                e.target.style.color = COLORS.GOLD2;
                e.target.style.borderColor = COLORS.BORDER;
                e.target.style.background = COLORS.GOLD_DIM;
              }}
              onMouseLeave={e => {
                e.target.style.color = COLORS.TXT2;
                e.target.style.borderColor = 'transparent';
                e.target.style.background = 'transparent';
              }}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/part1')}
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`,
              color: COLORS.BG,
              border: 'none',
              borderRadius: 12,
              padding: '12px 26px',
              fontSize: '1rem',
              fontWeight: 800,
              fontFamily: 'Noto Naskh Arabic, serif',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: `0 4px 16px ${COLORS.GOLD}40`,
              transition: 'all 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = `0 8px 24px ${COLORS.GOLD}55`;
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = `0 4px 16px ${COLORS.GOLD}40`;
            }}
          >
            ابدأ التفسير ←
          </button>
        </div>
      </header>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   PREMIUM BACKGROUND WITH REAL MOSQUE IMAGES
══════════════════════════════════════════════════════════ */

// Left Side - Beautiful Mosque Image
function MosqueImageLeft() {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${MOSQUE_IMAGES.sunset})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        opacity: 0.15,
        filter: 'sepia(30%) hue-rotate(60deg) saturate(80%)',
      }} />
      {/* Fade to center */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to right, transparent 0%, transparent 30%, ${COLORS.BG} 100%)`,
      }} />
      {/* Fade to bottom */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to bottom, transparent 0%, transparent 60%, ${COLORS.BG} 100%)`,
      }} />
    </div>
  );
}

// Right Side - Golden Dome Image
function MosqueImageRight() {
  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: 0,
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${MOSQUE_IMAGES.golden})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center left',
        opacity: 0.12,
        filter: 'sepia(30%) hue-rotate(60deg) saturate(80%)',
      }} />
      {/* Fade to center */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to left, transparent 0%, transparent 30%, ${COLORS.BG} 100%)`,
      }} />
      {/* Fade to bottom */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to bottom, transparent 0%, transparent 60%, ${COLORS.BG} 100%)`,
      }} />
    </div>
  );
}

// Top Decorative Pattern
function TopPatternOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '250px',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${MOSQUE_IMAGES.pattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
        filter: 'sepia(40%) hue-rotate(50deg)',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to bottom, transparent 0%, ${COLORS.BG} 100%)`,
      }} />
    </div>
  );
}

// Blue Mosaic Strip with Real Pattern
function BlueMosaicStrip({ position = 'left' }) {
  const isLeft = position === 'left';
  return (
    <div style={{
      position: 'absolute',
      [isLeft ? 'left' : 'right']: 0,
      top: '5%',
      width: '100px',
      height: '90%',
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${MOSQUE_IMAGES.dome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
        filter: 'sepia(20%) hue-rotate(180deg) saturate(150%)',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isLeft 
          ? `linear-gradient(to right, ${COLORS.BLUE}60 0%, ${COLORS.BLUE}30 50%, transparent 100%)`
          : `linear-gradient(to left, ${COLORS.BLUE}60 0%, ${COLORS.BLUE}30 50%, transparent 100%)`,
      }} />
    </div>
  );
}

// Dark Gold Vertical Accent
function GoldVerticalAccent({ position = 'left' }) {
  return (
    <div style={{
      position: 'absolute',
      [position]: '100px',
      top: '3%',
      width: '4px',
      height: '94%',
      background: `linear-gradient(to bottom, transparent 0%, ${COLORS.GOLD} 15%, ${COLORS.GOLD2} 50%, ${COLORS.GOLD} 85%, transparent 100%)`,
      opacity: 0.7,
      pointerEvents: 'none',
      boxShadow: `0 0 15px ${COLORS.GOLD}50`,
    }} />
  );
}

/* ══════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════ */
function HeroSection({ onNavigate }) {
  const navigate = useNavigate();

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: `
        radial-gradient(ellipse at 50% 40%, ${COLORS.BG4}50 0%, transparent 40%),
        radial-gradient(ellipse at 15% 80%, ${COLORS.BLUE_DIM} 0%, transparent 30%),
        radial-gradient(ellipse at 85% 80%, ${COLORS.BLUE_DIM} 0%, transparent 30%),
        linear-gradient(170deg, ${COLORS.BG} 0%, ${COLORS.BG2} 20%, ${COLORS.BG3} 45%, ${COLORS.BG4} 60%, ${COLORS.BG3} 75%, ${COLORS.BG2} 90%, ${COLORS.BG} 100%)
      `,
    }}>
      {/* === REAL MOSQUE IMAGES BACKGROUND === */}
      <MosqueImageLeft />
      <MosqueImageRight />
      <TopPatternOverlay />
      
      {/* === MOSAIC & GOLD ACCENTS === */}
      <BlueMosaicStrip position="left" />
      <BlueMosaicStrip position="right" />
      <GoldVerticalAccent position="left" />
      <GoldVerticalAccent position="right" />
      
      {/* === DARK GOLD BORDERS === */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
        background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}90 10%, ${COLORS.GOLD2} 50%, ${COLORS.GOLD}90 90%, transparent)`,
        boxShadow: `0 2px 20px ${COLORS.GOLD}40`,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px',
        background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}90 10%, ${COLORS.GOLD2} 50%, ${COLORS.GOLD}90 90%, transparent)`,
        boxShadow: `0 -2px 20px ${COLORS.GOLD}40`,
      }} />
      
      {/* === BOTTOM FADE === */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '250px',
        background: `linear-gradient(to top, ${COLORS.BG} 0%, ${COLORS.BG}80 50%, transparent 100%)`,
        pointerEvents: 'none',
      }} />

      <GeometricPattern opacity={0.02} />

      {/* === CORNER STARS (Darker Gold) === */}
      <div style={{ position: 'absolute', top: 30, right: 30 }}>
        <IslamicStar size={100} color={COLORS.GOLD2} opacity={0.4} rotate={0} />
      </div>
      <div style={{ position: 'absolute', top: 30, left: 30 }}>
        <IslamicStar size={100} color={COLORS.GOLD2} opacity={0.4} rotate={22.5} />
      </div>
      <div style={{ position: 'absolute', bottom: 100, right: 30 }}>
        <IslamicStar size={70} color={COLORS.GOLD3} opacity={0.3} rotate={45} />
      </div>
      <div style={{ position: 'absolute', bottom: 100, left: 30 }}>
        <IslamicStar size={70} color={COLORS.GOLD3} opacity={0.3} rotate={-22.5} />
      </div>

      {/* === CENTRAL GLOW (Darker Gold) === */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: `radial-gradient(circle, ${COLORS.GOLD_MID} 0%, ${COLORS.GOLD_DIM} 40%, transparent 65%)`,
        pointerEvents: 'none',
        filter: 'blur(70px)',
      }} />

      {/* === CONTENT === */}
      <div style={{ textAlign: 'center', maxWidth: 1000, padding: '40px 24px', position: 'relative', zIndex: 10 }} dir="rtl">

        {/* === LARGE LOGO (Fills the frame) === */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
          <div style={{
            width: 420, height: 420,
            borderRadius: 20,
            overflow: 'hidden',
            background: `linear-gradient(145deg, ${COLORS.BG2}80, ${COLORS.BG}90)`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            {/* Thick dark gold border */}
            <div style={{
              position: 'absolute', inset: 0,
              border: `5px solid ${COLORS.GOLD}`,
              borderRadius: 20,
              boxShadow: `
                0 0 80px ${COLORS.GOLD}50, 
                inset 0 0 60px ${COLORS.GOLD}30,
                0 0 0 12px ${COLORS.GOLD}25
              `,
            }} />
            {/* Corner stars */}
            <div style={{ position: 'absolute', top: 15, right: 15 }}>
              <IslamicStar size={50} color={COLORS.GOLD2} opacity={0.7} rotate={0} />
            </div>
            <div style={{ position: 'absolute', top: 15, left: 15 }}>
              <IslamicStar size={50} color={COLORS.GOLD2} opacity={0.7} rotate={22.5} />
            </div>
            <div style={{ position: 'absolute', bottom: 15, right: 15 }}>
              <IslamicStar size={50} color={COLORS.GOLD2} opacity={0.7} rotate={22.5} />
            </div>
            <div style={{ position: 'absolute', bottom: 15, left: 15 }}>
              <IslamicStar size={50} color={COLORS.GOLD2} opacity={0.7} rotate={0} />
            </div>
            {/* Logo Image - FULL SIZE */}
            <img
              src="/logo_calligraphy.png"
              alt="فيوض التأويل المعاصر"
              style={{
                width: '98%', height: '98%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 40px rgba(160,128,64,0.5))',
              }}
            />
          </div>
        </div>

        {/* === TITLE WITH ENGLISH === */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{
            fontFamily: 'Amiri, serif',
            fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
            color: COLORS.GOLD2,
            margin: '0 0 10px',
            fontWeight: 700,
            textShadow: `0 2px 4px rgba(0,0,0,0.4), 0 0 40px ${COLORS.GOLD}50`,
            letterSpacing: '0.02em',
          }}>
            فيوض التأويل المعاصر
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: COLORS.GOLD3,
            margin: 0,
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            textShadow: `0 1px 3px rgba(0,0,0,0.3)`,
          }}>
            Fuyud Al-Ta'wil Al-Mu'asir
          </p>
        </div>

        {/* Basmala */}
        <div style={{
          display: 'inline-block',
          background: `linear-gradient(135deg, ${COLORS.GOLD_DIM}, ${COLORS.GOLD_MID})`,
          border: `2px solid ${COLORS.GOLD2}80`,
          borderRadius: 16,
          padding: '16px 40px',
          marginBottom: 24,
          boxShadow: `0 0 30px ${COLORS.GOLD}25, inset 0 1px 0 ${COLORS.GOLD_SHINE}30`,
        }}>
          <p style={{
            fontFamily: 'Amiri, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            color: COLORS.GOLD2,
            margin: 0,
            letterSpacing: '0.08em',
            textShadow: `0 1px 2px rgba(0,0,0,0.3)`,
          }}>
            ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾
          </p>
        </div>

        {/* Subtitle */}
        <div style={{ margin: '0 0 16px' }}>
          <span style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2}, ${COLORS.GOLD3})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'Amiri, serif',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 600,
          }}>
            تفسير سورة البقرة
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Noto Naskh Arabic, serif',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: COLORS.TXT2,
          lineHeight: 2,
          maxWidth: 650,
          margin: '0 auto 40px',
        }}>
          قراءة تفسيرية معاصرة تجمع بين البيان القرآني والتدبر التربوي والبصيرة النفسية،
          بلغة قريبة من الإنسان المعاصر
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <CTAButton primary onClick={() => navigate('/part1')} icon={<BookOpen size={17} />}>
            ابدأ التصفح
          </CTAButton>
          <CTAButton onClick={() => document.getElementById('surahs')?.scrollIntoView({ behavior: 'smooth' })} icon={<BookMarked size={17} />}>
            تصفح السور
          </CTAButton>
          <CTAButton onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })} icon={<Search size={17} />}>
            البحث في التفسير
          </CTAButton>
          <CTAButton onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} icon={<Compass size={17} />}>
            عن المشروع
          </CTAButton>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap',
          padding: '24px 32px',
          background: COLORS.GOLD_DIM,
          borderRadius: 16,
          border: `1px solid ${COLORS.BORDER}`,
          backdropFilter: 'blur(8px)',
        }}>
          {[
            { num: '٢٨٦', label: 'آية مفسَّرة' },
            { num: '٧', label: 'أبعاد تفسيرية' },
            { num: '٥', label: 'لغات' },
            { num: '١٠٠٪', label: 'مصادر موثَّقة' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Amiri, serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: COLORS.GOLD2,
                lineHeight: 1,
              }}>{s.num}</div>
              <div style={{
                fontFamily: 'Noto Naskh Arabic, serif',
                fontSize: '0.8rem',
                color: COLORS.TXT3,
                marginTop: 4,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: 0.5,
        animation: 'bounce 2s infinite',
      }}>
        <span style={{ fontSize: '0.7rem', color: COLORS.GOLD, fontFamily: 'Noto Naskh Arabic' }}>تمرير</span>
        <ChevronDown size={18} color={COLORS.GOLD} />
      </div>
    </section>
  );
}

function CTAButton({ children, primary, onClick, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: primary
          ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`
          : hov ? COLORS.GOLD_DIM : 'transparent',
        color: primary ? COLORS.BG : COLORS.GOLD2,
        border: `1.5px solid ${primary ? COLORS.GOLD : COLORS.BORDER2}`,
        borderRadius: 12,
        padding: '11px 22px',
        fontSize: '0.95rem',
        fontWeight: 700,
        fontFamily: 'Noto Naskh Arabic, serif',
        cursor: 'pointer',
        transition: 'all 0.2s',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: primary
          ? `0 6px 20px ${COLORS.GOLD}35`
          : hov ? `0 4px 12px ${COLORS.GOLD}15` : 'none',
      }}
      dir="rtl"
    >
      {icon}
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   SEARCH SECTION
══════════════════════════════════════════════════════════ */
function SearchSection() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filters = [
    { id: 'all',   label: 'الكل' },
    { id: 'ayah',  label: 'آية' },
    { id: 'surah', label: 'سورة' },
    { id: 'topic', label: 'موضوع' },
    { id: 'word',  label: 'كلمة' },
    { id: 'root',  label: 'جذر' },
  ];

  const quickCards = [
    { icon: <Flame size={20} />, label: 'آية اليوم', color: '#b45309', sub: 'البقرة: ٢٨٦' },
    { icon: <Heart size={20} />, label: 'آيات الرحمة', color: '#be123c', sub: '٤٢ آية' },
    { icon: <Shield size={20} />, label: 'آيات التوجيه', color: '#1d4ed8', sub: '٣٨ آية' },
    { icon: <Star size={20} />, label: 'الآيات المكية', color: '#b45309', sub: 'المقدمة' },
    { icon: <Brain size={20} />, label: 'الأبعاد النفسية', color: '#7c3aed', sub: 'علم النفس' },
    { icon: <Lightbulb size={20} />, label: 'المواضيع التربوية', color: '#047857', sub: 'التدبر' },
  ];

  return (
    <section id="search-section" style={{
      background: `linear-gradient(180deg, ${COLORS.BG} 0%, ${COLORS.BG2} 100%)`,
      padding: '80px 24px',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionTitle
          title="البحث في التفسير"
          subtitle="ابحث في آيات سورة البقرة بأساليب متعددة: بالآية، بالموضوع، بالكلمة، بالجذر اللغوي"
        />

        {/* Search Bar */}
        <div style={{
          background: COLORS.CARD,
          border: `1.5px solid ${COLORS.BORDER2}`,
          borderRadius: 18,
          padding: 20,
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${COLORS.GOLD}08`,
          marginBottom: 32,
        }}>
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }} dir="rtl">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  background: filter === f.id
                    ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`
                    : COLORS.GOLD_DIM,
                  color: filter === f.id ? COLORS.BG : COLORS.TXT2,
                  border: `1px solid ${filter === f.id ? COLORS.GOLD : COLORS.BORDER}`,
                  borderRadius: 8,
                  padding: '5px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Noto Naskh Arabic, serif',
                  transition: 'all 0.15s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Search size={20} color={COLORS.GOLD} style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate('/part1')}
              placeholder="ابحث في التفسير... (مثال: الصبر، التوبة، الرزق)"
              dir="rtl"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: COLORS.TXT,
                fontSize: '1rem',
                fontFamily: 'Noto Naskh Arabic, serif',
              }}
            />
            <button
              onClick={() => navigate('/part1')}
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`,
                color: COLORS.BG,
                border: 'none',
                borderRadius: 10,
                padding: '8px 20px',
                fontSize: '0.9rem',
                fontWeight: 800,
                fontFamily: 'Noto Naskh Arabic, serif',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              بحث
            </button>
          </div>
        </div>

        {/* Quick Access */}
        <div style={{ marginTop: 8 }} dir="rtl">
          <p style={{
            color: COLORS.TXT3, fontSize: '0.85rem',
            fontFamily: 'Noto Naskh Arabic, serif', marginBottom: 14,
          }}>
            وصول سريع:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 10,
          }}>
            {quickCards.map(card => (
              <button key={card.label} onClick={() => navigate('/part1')} style={{
                background: COLORS.CARD,
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: 12,
                padding: '14px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = COLORS.GOLD;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = COLORS.GOLD_DIM;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = COLORS.BORDER;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = COLORS.CARD;
              }}>
                <div style={{ color: card.color, marginBottom: 6 }}>{card.icon}</div>
                <div style={{
                  color: COLORS.TXT, fontSize: '0.85rem',
                  fontWeight: 700, fontFamily: 'Noto Naskh Arabic, serif',
                }}>{card.label}</div>
                <div style={{
                  color: COLORS.TXT3, fontSize: '0.7rem',
                  fontFamily: 'Noto Naskh Arabic, serif', marginTop: 3,
                }}>{card.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ABOUT / PROJECT INTRO SECTION
══════════════════════════════════════════════════════════ */
function AboutSection() {
  const cards = [
    {
      icon: <Shield size={28} />, color: '#3a9478',
      title: 'الأصالة العلمية',
      text: 'مصادر موثَّقة من أمهات كتب التفسير والعلوم الإسلامية',
    },
    {
      icon: <Layers size={28} />, color: '#b45309',
      title: 'العمق التأويلي',
      text: 'سبعة أبعاد تفسيرية: بياني، تأويلي، روحاني، نفسي، تربوي، معاصر، استشهادي',
    },
    {
      icon: <Eye size={28} />, color: '#7c3aed',
      title: 'التدبر والتأمل',
      text: 'قراءة في أعماق المعنى تدعو القلب إلى التدبر والتأمل في كلام الله',
    },
    {
      icon: <Zap size={28} />, color: '#1d4ed8',
      title: 'المعاصرة والحياة',
      text: 'ربط الآيات بواقع الإنسان المعاصر وتحدياته الروحية والنفسية',
    },
    {
      icon: <Brain size={28} />, color: '#be123c',
      title: 'البعد النفسي',
      text: 'استلهام الدروس النفسية والعلاجية من آيات القرآن الكريم',
    },
    {
      icon: <Feather size={28} />, color: '#0f766e',
      title: 'الإرشاد والهداية',
      text: 'مناهج تربوية وروحية مستخرجة من نور القرآن للارتقاء بالنفس',
    },
  ];

  return (
    <section id="about" style={{
      background: `linear-gradient(180deg, ${COLORS.BG2} 0%, ${COLORS.BG3} 100%)`,
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <GeometricPattern opacity={0.03} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          title="رؤية المشروع ومنهجيته"
          subtitle="مشروع علمي متكامل يسعى إلى تقديم تفسير قرآني متعدد الأبعاد، يخاطب العقل والروح معاً"
        />

        {/* Vision Box */}
        <div style={{
          background: COLORS.CARD,
          border: `1px solid ${COLORS.BORDER2}`,
          borderRadius: 20,
          padding: '32px 40px',
          marginBottom: 40,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 8px 32px rgba(0,0,0,0.25)`,
        }} dir="rtl">
          <div style={{
            position: 'absolute', top: -20, right: -20, opacity: 0.06,
          }}>
            <IslamicStar size={180} color={COLORS.GOLD} opacity={1} />
          </div>
          <h3 style={{
            fontFamily: 'Amiri, serif',
            fontSize: '1.5rem',
            color: COLORS.GOLD2,
            marginBottom: 16,
          }}>
            العنوان: فيوض التأويل المعاصر
          </h3>
          <p style={{
            fontFamily: 'Noto Naskh Arabic, serif',
            fontSize: '1.08rem',
            color: COLORS.TXT2,
            lineHeight: 2.1,
            borderRight: `3px solid ${COLORS.GOLD}`,
            paddingRight: 20,
          }}>
            قراءة تفسيرية معاصرة تجمع بين البيان القرآني، والتدبر التربوي، والبصيرة النفسية،
            بلغة قريبة من الإنسان المعاصر — مشروع يقف عند نهر المعنى ليغترف منه، لا ليختصره.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 18,
        }}>
          {cards.map(c => (
            <div key={c.title} style={{
              background: COLORS.CARD,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: 16,
              padding: '24px 20px',
              transition: 'all 0.25s',
              cursor: 'default',
            }}
            dir="rtl"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = c.color + '60';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${c.color}20`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: 12,
                background: c.color + '18',
                border: `1px solid ${c.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.color,
                marginBottom: 14,
              }}>
                {c.icon}
              </div>
              <h4 style={{
                fontFamily: 'Noto Naskh Arabic, serif',
                color: COLORS.TXT,
                fontWeight: 700,
                fontSize: '1rem',
                marginBottom: 8,
              }}>{c.title}</h4>
              <p style={{
                fontFamily: 'Noto Naskh Arabic, serif',
                color: COLORS.TXT2,
                fontSize: '0.88rem',
                lineHeight: 1.9,
                margin: 0,
              }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SURAHS SECTION
══════════════════════════════════════════════════════════ */
function SurahsSection() {
  const navigate = useNavigate();

  const parts = [
    {
      part: 'الجزء الأول',
      range: 'الآيات ١ – ١٠١',
      count: 101,
      themes: ['إيمان', 'خلق آدم', 'المنافقون', 'بنو إسرائيل', 'القبلة'],
      path: '/part1',
      badge: 'متاح',
      gradient: `linear-gradient(135deg, ${COLORS.TEAL} 0%, ${COLORS.BG4} 100%)`,
    },
    {
      part: 'الجزء الثاني',
      range: 'الآيات ١٠٢ – ٢٠٠',
      count: 99,
      themes: ['السحر', 'الحج', 'الجهاد', 'الإنفاق', 'الإسلام'],
      path: '/part2',
      badge: 'متاح',
      gradient: `linear-gradient(135deg, ${COLORS.BG4} 0%, #1e3a1a 100%)`,
    },
    {
      part: 'الجزء الثالث',
      range: 'الآيات ٢٠١ – ٢٨٦',
      count: 86,
      themes: ['الذكر', 'الخوف', 'الوحدة', 'الطلاق', 'الدَّين', 'آية الكرسي'],
      path: null,
      badge: 'قريباً',
      gradient: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
    },
  ];

  return (
    <section id="surahs" style={{
      background: COLORS.BG,
      padding: '80px 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionTitle
          title="تصفح سورة البقرة"
          subtitle="سورة البقرة — ٢٨٦ آية مفسَّرة بأسلوب معاصر متعدد الأبعاد"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {parts.map(p => (
            <div key={p.part} style={{
              background: COLORS.CARD,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: 20,
              overflow: 'hidden',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = COLORS.GOLD + '50';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {/* Card header */}
              <div style={{
                background: p.gradient,
                padding: '28px 24px 20px',
                position: 'relative',
                overflow: 'hidden',
              }} dir="rtl">
                <div style={{ position: 'absolute', top: -10, left: -10, opacity: 0.1 }}>
                  <IslamicStar size={100} color={COLORS.GOLD} opacity={1} />
                </div>
                <div style={{ position: 'absolute', top: 12, left: 16 }}>
                  <span style={{
                    background: p.badge === 'متاح'
                      ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`
                      : 'rgba(100,100,120,0.5)',
                    color: p.badge === 'متاح' ? COLORS.BG : COLORS.TXT2,
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 20,
                    fontFamily: 'Noto Naskh Arabic, serif',
                  }}>
                    {p.badge}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'Amiri, serif',
                  fontSize: '1.5rem',
                  color: COLORS.GOLD3,
                  marginBottom: 4,
                }}>{p.part}</div>
                <div style={{
                  fontFamily: 'Noto Naskh Arabic, serif',
                  fontSize: '0.9rem',
                  color: COLORS.TXT2,
                }}>{p.range}</div>
                <div style={{
                  marginTop: 8,
                  fontFamily: 'Amiri, serif',
                  fontSize: '2rem',
                  color: COLORS.GOLD2,
                  fontWeight: 700,
                }}>{p.count}</div>
                <div style={{ fontSize: '0.75rem', color: COLORS.TXT3, fontFamily: 'Noto Naskh Arabic, serif' }}>آية</div>
              </div>

              {/* Card body */}
              <div style={{ padding: '20px 24px' }} dir="rtl">
                <div style={{ marginBottom: 16 }}>
                  <p style={{
                    fontSize: '0.78rem', color: COLORS.TXT3,
                    fontFamily: 'Noto Naskh Arabic, serif', marginBottom: 8,
                  }}>
                    أبرز المواضيع:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.themes.map(t => (
                      <span key={t} style={{
                        background: COLORS.GOLD_DIM,
                        border: `1px solid ${COLORS.BORDER}`,
                        borderRadius: 6,
                        padding: '2px 8px',
                        fontSize: '0.75rem',
                        color: COLORS.GOLD_TXT,
                        fontFamily: 'Noto Naskh Arabic, serif',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => p.path && navigate(p.path)}
                  disabled={!p.path}
                  style={{
                    width: '100%',
                    background: p.path
                      ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`
                      : 'rgba(100,100,120,0.2)',
                    color: p.path ? COLORS.BG : COLORS.TXT3,
                    border: 'none',
                    borderRadius: 10,
                    padding: '11px',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    fontFamily: 'Noto Naskh Arabic, serif',
                    cursor: p.path ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  {p.path ? `اقرأ ${p.part} ←` : 'قريباً...'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   THEMATIC PATHS SECTION
══════════════════════════════════════════════════════════ */
function PathsSection() {
  const paths = [
    { icon: <BookOpen size={24}/>, color: '#3a9478', title: 'المسار البياني', sub: 'جمال الأسلوب القرآني وفصاحته' },
    { icon: <Compass size={24}/>, color: '#b45309', title: 'المسار التأويلي', sub: 'عمق المعنى والدلالة' },
    { icon: <Heart size={24}/>, color: '#be123c', title: 'المسار الروحاني', sub: 'الصلة بالله والتزكية' },
    { icon: <Brain size={24}/>, color: '#7c3aed', title: 'المسار النفسي', sub: 'الأثر النفسي والعلاجي' },
    { icon: <Feather size={24}/>, color: '#1d4ed8', title: 'المسار التربوي', sub: 'الدروس والقيم التربوية' },
    { icon: <Zap size={24}/>, color: '#0f766e', title: 'المسار المعاصر', sub: 'ربط الآيات بالحياة اليوم' },
  ];

  return (
    <section id="paths" style={{
      background: `linear-gradient(180deg, ${COLORS.BG3} 0%, ${COLORS.BG2} 100%)`,
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <GeometricPattern opacity={0.04} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          title="مسارات التأويل"
          subtitle="اختر مسارك في التدبر — كل مسار يفتح لك أفقاً معرفياً جديداً في فهم القرآن الكريم"
          light
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {paths.map(p => (
            <div key={p.title} style={{
              background: COLORS.CARD2,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: 16,
              padding: '24px 20px',
              cursor: 'pointer',
              transition: 'all 0.25s',
              display: 'flex', alignItems: 'flex-start', gap: 16,
            }}
            dir="rtl"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = p.color + '70';
              e.currentTarget.style.background = p.color + '10';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.background = COLORS.CARD2;
              e.currentTarget.style.transform = 'none';
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: p.color + '18',
                border: `1.5px solid ${p.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.color, flexShrink: 0,
              }}>{p.icon}</div>
              <div>
                <div style={{
                  fontFamily: 'Noto Naskh Arabic, serif',
                  fontWeight: 700, color: COLORS.TXT,
                  fontSize: '1rem', marginBottom: 6,
                }}>{p.title}</div>
                <div style={{
                  fontFamily: 'Noto Naskh Arabic, serif',
                  fontSize: '0.83rem', color: COLORS.TXT2,
                  lineHeight: 1.8,
                }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FEATURED TAFSIR SECTION
══════════════════════════════════════════════════════════ */
function FeaturedSection() {
  const navigate = useNavigate();
  const items = [
    {
      label: 'آية اليوم',
      ayah: '﴿ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ﴾',
      ref: 'البقرة: ٢٨٦',
      excerpt: 'هذه الآية الخاتمة لسورة البقرة تُجسِّد قانوناً إلهياً ثابتاً في سنن الله مع الإنسان — فلا تكليف يتجاوز الطاقة، ولا ابتلاء يعجز عن الاحتمال.',
      color: COLORS.GOLD,
      icon: <Flame size={18} />,
    },
    {
      label: 'وقفة تدبرية',
      ayah: '﴿ وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ﴾',
      ref: 'البقرة: ١٨٦',
      excerpt: 'لم يقل: "فقل لهم إني قريب" — بل أجاب الله مباشرةً دون واسطة، وفي هذا إيماء عميق إلى أن الدعاء هو اللقاء الحقيقي بلا حجاب.',
      color: COLORS.TEAL2,
      icon: <Heart size={18} />,
    },
    {
      label: 'فيض تربوي',
      ayah: '﴿ وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ﴾',
      ref: 'البقرة: ٤٥',
      excerpt: 'الصلاة وحدها لا تكفي، والصبر وحده لا يكفي — لكن اجتماعهما يصنع في النفس قدرةً على مواجهة الحياة بكل ثقلها.',
      color: '#7c3aed',
      icon: <Sparkles size={18} />,
    },
  ];

  return (
    <section style={{
      background: COLORS.BG,
      padding: '80px 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionTitle
          title="مختارات التفسير"
          subtitle="لمحات من فيوض البيان — آيات تخاطب العقل والروح"
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {items.map(item => (
            <div key={item.label} style={{
              background: COLORS.CARD,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: 20,
              padding: '28px 24px',
              transition: 'all 0.25s',
              position: 'relative',
              overflow: 'hidden',
            }}
            dir="rtl"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = item.color + '50';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.25), 0 0 0 1px ${item.color}15`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ position: 'absolute', top: -20, left: -20, opacity: 0.05 }}>
                <IslamicStar size={120} color={item.color} opacity={1} />
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: item.color + '15',
                border: `1px solid ${item.color}30`,
                borderRadius: 20,
                padding: '4px 12px',
                marginBottom: 16,
                color: item.color,
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'Noto Naskh Arabic, serif',
              }}>
                {item.icon} {item.label}
              </div>

              <p style={{
                fontFamily: 'Amiri, serif',
                fontSize: '1.25rem',
                color: COLORS.GOLD3,
                lineHeight: 1.9,
                marginBottom: 8,
              }}>{item.ayah}</p>

              <p style={{
                fontSize: '0.72rem',
                color: item.color,
                fontFamily: 'Noto Naskh Arabic, serif',
                marginBottom: 14,
                fontWeight: 700,
              }}>{item.ref}</p>

              <p style={{
                fontFamily: 'Noto Naskh Arabic, serif',
                fontSize: '0.9rem',
                color: COLORS.TXT2,
                lineHeight: 2,
                borderRight: `2px solid ${item.color}50`,
                paddingRight: 12,
              }}>{item.excerpt}</p>

              <button
                onClick={() => navigate('/part1')}
                style={{
                  marginTop: 18,
                  background: 'transparent',
                  border: `1px solid ${item.color}40`,
                  borderRadius: 8,
                  padding: '7px 16px',
                  color: item.color,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  fontFamily: 'Noto Naskh Arabic, serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = item.color + '15'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                اقرأ التفسير كاملاً ←
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   MULTILINGUAL SECTION
══════════════════════════════════════════════════════════ */
function MultilingualSection({ lang, onLangChange }) {
  const samples = {
    ar: { title: 'فيوض التأويل المعاصر', text: 'قراءة تفسيرية معاصرة تجمع بين البيان القرآني والتدبر التربوي والبصيرة النفسية' },
    en: { title: 'Streams of Contemporary Tafsir', text: 'A contemporary exegetical reading combining Quranic eloquence, pedagogical contemplation, and spiritual insight' },
    ur: { title: 'عصری تفسیر کے فیوض', text: 'ایک جدید تفسیری مطالعہ جو قرآنی بیان، تربیتی تدبر اور نفسیاتی بصیرت کو یکجا کرتا ہے' },
    id: { title: 'Tafsir Kontemporer', text: 'Tafsir Quran kontemporer yang memadukan keindahan bayan, kontemplasi pedagogis, dan wawasan spiritual' },
    tr: { title: 'Çağdaş Tefsir Kaynakları', text: 'Kuranın beyan güzelliğini, terbiyevi tefekkürü ve ruhsal kavrayışı bir araya getiren çağdaş bir tefsir' },
  };

  const current = samples[lang] || samples.ar;
  const dir = LANGUAGES.find(l => l.code === lang)?.dir || 'rtl';

  return (
    <section style={{
      background: `linear-gradient(135deg, #0a1628 0%, #0d1f38 50%, #0a1628 100%)`,
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, ${COLORS.TEAL}08 0%, transparent 50%),
                         radial-gradient(circle at 80% 50%, ${COLORS.GOLD}06 0%, transparent 50%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          title="تجربة متعددة اللغات"
          subtitle="استمتع بتفسير القرآن الكريم بلغتك الأم"
          light
        />

        {/* Language Buttons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => onLangChange(l.code)}
              style={{
                background: lang === l.code
                  ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`
                  : 'rgba(255,255,255,0.06)',
                color: lang === l.code ? COLORS.BG : COLORS.TXT2,
                border: `1.5px solid ${lang === l.code ? COLORS.GOLD : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 12,
                padding: '10px 20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: l.code === 'ar' || l.code === 'ur' ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => {
                if (lang !== l.code) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = COLORS.GOLD + '50';
                }
              }}
              onMouseLeave={e => {
                if (lang !== l.code) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{l.flag}</span>
              <span>{l.label}</span>
              <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>{l.native}</span>
            </button>
          ))}
        </div>

        {/* Language Preview Card */}
        <div style={{
          background: COLORS.CARD,
          border: `1px solid ${COLORS.BORDER2}`,
          borderRadius: 20,
          padding: '36px 40px',
          textAlign: dir === 'rtl' ? 'right' : 'left',
          transition: 'all 0.3s',
          boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
        }} dir={dir}>
          <h3 style={{
            fontFamily: dir === 'rtl' ? 'Amiri, serif' : 'Playfair Display, serif',
            fontSize: '1.8rem',
            color: COLORS.GOLD2,
            marginBottom: 16,
            fontWeight: 700,
          }}>
            {current.title}
          </h3>
          <p style={{
            fontFamily: dir === 'rtl' ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
            fontSize: '1rem',
            color: COLORS.TXT2,
            lineHeight: 2,
          }}>
            {current.text}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CREDIBILITY SECTION
══════════════════════════════════════════════════════════ */
function CredibilitySection() {
  const items = [
    { icon: <Award size={26}/>, color: '#b45309', title: 'مصادر علمية موثَّقة', text: 'كل فقرة مستندة إلى مصادر من أمهات كتب التفسير والعلوم' },
    { icon: <CheckCircle size={26}/>, color: '#047857', title: 'مراجعة علمية دقيقة', text: 'تمت مراجعة المحتوى وفق منهجية علمية رصينة' },
    { icon: <Users size={26}/>, color: '#1d4ed8', title: 'للمسلم المعاصر', text: 'بلغة تراعي احتياجات الإنسان العصري ووعيه الثقافي' },
    { icon: <Globe size={26}/>, color: '#7c3aed', title: 'متعدد اللغات', text: 'خمس لغات عالمية لنشر نور القرآن في أرجاء المعمورة' },
    { icon: <BarChart2 size={26}/>, color: '#0f766e', title: 'أبعاد تفسيرية متكاملة', text: 'سبعة أبعاد: بياني، تأويلي، روحاني، نفسي، تربوي، معاصر، استشهادي' },
    { icon: <MessageSquare size={26}/>, color: '#be123c', title: 'لغة الحوار والتأمل', text: 'أسلوب يدعو للتفكر لا يكتفي بالإخبار' },
  ];

  return (
    <section style={{
      background: `linear-gradient(180deg, ${COLORS.BG2} 0%, ${COLORS.BG3} 100%)`,
      padding: '80px 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionTitle
          title="المصداقية العلمية"
          subtitle="مشروع يقف على أسس علمية راسخة مع لغة تُخاطب الروح"
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {items.map(item => (
            <div key={item.title} style={{
              background: COLORS.CARD,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: 14,
              padding: '22px 18px',
              display: 'flex', alignItems: 'flex-start', gap: 14,
              transition: 'all 0.2s',
            }}
            dir="rtl"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = item.color + '50';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.transform = 'none';
            }}>
              <div style={{ color: item.color, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
              <div>
                <div style={{
                  fontFamily: 'Noto Naskh Arabic, serif',
                  fontWeight: 700, color: COLORS.TXT,
                  fontSize: '0.95rem', marginBottom: 5,
                }}>{item.title}</div>
                <div style={{
                  fontFamily: 'Noto Naskh Arabic, serif',
                  fontSize: '0.83rem', color: COLORS.TXT2,
                  lineHeight: 1.9,
                }}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FEATURES SECTION
══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const features = [
    { icon: <Search size={24}/>, color: '#3a9478', title: 'البحث الذكي', text: 'بحث بالآية والكلمة والموضوع والجذر اللغوي', badge: 'متاح' },
    { icon: <Layers size={24}/>, color: '#b45309', title: 'مقارنة الآيات', text: 'مقارنة التفسيرات وربط الآيات ذات الموضوع الواحد', badge: 'قريباً' },
    { icon: <Map size={24}/>, color: '#7c3aed', title: 'خرائط المعرفة', text: 'خرائط ذهنية للمواضيع القرآنية وترابطها', badge: 'قريباً' },
    { icon: <Volume2 size={24}/>, color: '#1d4ed8', title: 'التفسير الصوتي', text: 'الاستماع للتفسير بأصوات عالية الجودة', badge: 'قريباً' },
    { icon: <BookMarked size={24}/>, color: '#be123c', title: 'المسارات الموضوعية', text: 'تصفح التفسير حسب المواضيع والأبعاد', badge: 'متاح' },
    { icon: <Globe size={24}/>, color: '#0f766e', title: 'خمس لغات', text: 'العربية والإنجليزية والأردو والإندونيسية والتركية', badge: 'متاح' },
  ];

  return (
    <section id="features" style={{
      background: COLORS.BG,
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <GeometricPattern opacity={0.04} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          title="خصائص المنصة"
          subtitle="أدوات ذكية وتجربة غنية لفهم القرآن الكريم"
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 18,
        }}>
          {features.map(f => (
            <div key={f.title} style={{
              background: COLORS.CARD,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: 16,
              padding: '26px 22px',
              transition: 'all 0.25s',
              position: 'relative',
            }}
            dir="rtl"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = f.color + '50';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.2)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ position: 'absolute', top: 14, left: 14 }}>
                <span style={{
                  background: f.badge === 'متاح' ? '#047857' + '20' : '#b45309' + '20',
                  color: f.badge === 'متاح' ? '#34d399' : '#fbbf24',
                  border: `1px solid ${f.badge === 'متاح' ? '#34d399' : '#fbbf24'}30`,
                  borderRadius: 20,
                  padding: '2px 9px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  fontFamily: 'Noto Naskh Arabic, serif',
                }}>
                  {f.badge}
                </span>
              </div>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: f.color + '15',
                border: `1.5px solid ${f.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: f.color, marginBottom: 14,
              }}>{f.icon}</div>
              <h4 style={{
                fontFamily: 'Noto Naskh Arabic, serif',
                fontWeight: 700, color: COLORS.TXT,
                fontSize: '1rem', marginBottom: 8,
              }}>{f.title}</h4>
              <p style={{
                fontFamily: 'Noto Naskh Arabic, serif',
                color: COLORS.TXT2, fontSize: '0.87rem',
                lineHeight: 1.9, margin: 0,
              }}>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   NEWSLETTER SECTION
══════════════════════════════════════════════════════════ */
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <section style={{
      background: `linear-gradient(135deg, ${COLORS.BG3} 0%, ${COLORS.BG4} 100%)`,
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, ${COLORS.GOLD}06 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }} dir="rtl">
        <IslamicStar size={50} color={COLORS.GOLD} opacity={0.3} />
        <h2 style={{
          fontFamily: 'Amiri, serif',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          color: COLORS.GOLD2, margin: '20px 0 12px',
        }}>
          تابع الإضافات الجديدة
        </h2>
        <p style={{
          fontFamily: 'Noto Naskh Arabic, serif',
          fontSize: '0.95rem', color: COLORS.TXT2,
          lineHeight: 1.9, marginBottom: 28,
        }}>
          اشترك ليصلك كل جديد من فيوض التأويل المعاصر — آيات وتفسيرات وإضافات سور جديدة
        </p>

        {done ? (
          <div style={{
            background: '#047857' + '20',
            border: `1px solid #34d39950`,
            borderRadius: 12, padding: '14px 24px',
            color: '#34d399', fontFamily: 'Noto Naskh Arabic, serif',
            fontSize: '0.95rem',
          }}>
            ✅ شكراً! تم تسجيل اشتراكك بنجاح
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              dir="rtl"
              style={{
                flex: 1,
                background: COLORS.CARD,
                border: `1.5px solid ${COLORS.BORDER2}`,
                borderRadius: 12,
                padding: '12px 16px',
                color: COLORS.TXT,
                fontSize: '0.9rem',
                fontFamily: 'Noto Naskh Arabic, serif',
                outline: 'none',
              }}
            />
            <button
              onClick={() => email && setDone(true)}
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD2})`,
                color: COLORS.BG,
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: '0.9rem',
                fontWeight: 800,
                fontFamily: 'Noto Naskh Arabic, serif',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              اشترك
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: `linear-gradient(180deg, ${COLORS.BG} 0%, #060f09 100%)`,
      borderTop: `1px solid ${COLORS.BORDER}`,
      padding: '60px 24px 28px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }} dir="rtl">
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 110, height: 110, borderRadius: 16,
                border: `2px solid ${COLORS.GOLD}60`,
                overflow: 'hidden', background: '#120e00',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: `0 0 24px ${COLORS.GOLD}20`,
              }}>
                <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 4 }} />
              </div>
              <div>
                <div style={{
                  fontFamily: 'Amiri, serif', fontSize: '1.1rem',
                  color: COLORS.GOLD2, fontWeight: 700, lineHeight: 1.4,
                }}>
                  فيوض التأويل المعاصر
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '0.82rem', color: COLORS.TXT3, lineHeight: 1.9,
            }}>
              مشروع تفسيري قرآني معاصر يقدم سورة البقرة بأسلوب متعدد الأبعاد
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              color: COLORS.GOLD2, fontSize: '0.9rem',
              fontWeight: 700, marginBottom: 14,
            }}>روابط سريعة</h4>
            {[
              { label: 'الجزء الأول', path: '/part1' },
              { label: 'الجزء الثاني', path: '/part2' },
              { label: 'عن المشروع', href: '#about' },
              { label: 'البحث', href: '#search-section' },
            ].map(link => (
              <div key={link.label} style={{ marginBottom: 8 }}>
                <button onClick={() => link.path ? navigate(link.path) : document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })} style={{
                  background: 'none', border: 'none',
                  color: COLORS.TXT2, fontSize: '0.83rem',
                  fontFamily: 'Noto Naskh Arabic, serif',
                  cursor: 'pointer', padding: 0, transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.GOLD2}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.TXT2}>
                  ← {link.label}
                </button>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div>
            <h4 style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              color: COLORS.GOLD2, fontSize: '0.9rem',
              fontWeight: 700, marginBottom: 14,
            }}>اللغات</h4>
            {LANGUAGES.map(l => (
              <div key={l.code} style={{ marginBottom: 6 }}>
                <span style={{
                  fontSize: '0.82rem', color: COLORS.TXT2,
                  fontFamily: l.code === 'ar' || l.code === 'ur' ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
                }}>
                  {l.flag} {l.label}
                </span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              color: COLORS.GOLD2, fontSize: '0.9rem',
              fontWeight: 700, marginBottom: 14,
            }}>تواصل معنا</h4>
            <p style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '0.82rem', color: COLORS.TXT3, lineHeight: 1.9,
            }}>
              للتواصل والملاحظات العلمية حول المشروع يُرجى المراسلة عبر البريد الإلكتروني
            </p>
            <a href="mailto:info@fuyud-tafsir.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: COLORS.GOLD2, fontSize: '0.82rem',
              fontFamily: 'Inter, sans-serif', textDecoration: 'none',
              marginTop: 8,
            }}>
              <Mail size={14} />
              info@fuyud-tafsir.com
            </a>
          </div>
        </div>

        <GoldDivider />

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
          marginTop: 20, paddingTop: 4,
        }} dir="rtl">
          <p style={{
            fontFamily: 'Noto Naskh Arabic, serif',
            fontSize: '0.78rem', color: COLORS.TXT3, margin: 0,
          }}>
            © ١٤٤٦ هـ | فيوض التأويل المعاصر — جميع الحقوق محفوظة
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['سياسة الخصوصية', 'شروط الاستخدام'].map(t => (
              <span key={t} style={{
                fontSize: '0.75rem', color: COLORS.TXT3,
                fontFamily: 'Noto Naskh Arabic, serif',
                cursor: 'pointer',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN HOMEPAGE COMPONENT
══════════════════════════════════════════════════════════ */
export default function HomePage({ lang, onLangChange }) {
  const navigate = useNavigate();

  return (
    <div style={{
      background: COLORS.BG,
      minHeight: '100vh',
      direction: 'rtl',
      fontFamily: 'Noto Naskh Arabic, serif',
    }}>
      {/* Keyframe animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .hidden-mobile { display: flex; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none; }
        }
      `}</style>

      <Header lang={lang} onLangChange={onLangChange} />
      <HeroSection onNavigate={navigate} />
      <SearchSection />
      <AboutSection />
      <SurahsSection />
      <PathsSection />
      <FeaturedSection />
      <MultilingualSection lang={lang} onLangChange={onLangChange} />
      <CredibilitySection />
      <FeaturesSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
