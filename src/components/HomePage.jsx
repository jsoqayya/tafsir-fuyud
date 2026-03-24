import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Globe, ChevronDown, BookMarked,
  Heart, Brain, Shield, Award, Layers, Map, Volume2,
  Mail, CheckCircle, Compass, Feather, Flame, Eye,
  Zap, BarChart2, MessageSquare, Sparkles, Star
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   🎨 PALETTE — مستلهم من الفن المعماري الإسلامي العربي
   المحراب المذهب · الجص الأبيض · الفسيفساء الفيروزية
   قصر الحمراء · مسجد الشاه · المسجد الكبير في قرطبة
═══════════════════════════════════════════════════════════ */
const C = {
  /* ── خلفيات داكنة ذهبية دافئة (مستلهمة من الخشب المنقوش والرخام الداكن) */
  BG0:    '#06040a',   /* أسود بنفسجي عميق جداً */
  BG1:    '#0c0800',   /* أسود ذهبي دافئ */
  BG2:    '#130d02',   /* بني ذهبي عميق */
  BG3:    '#1b1204',   /* كهرماني ليلي */
  BG4:    '#231806',   /* كهرماني داكن */
  CARD:   '#100900',   /* بطاقة داكنة */
  CARD2:  '#170d01',   /* بطاقة ثانوية */

  /* ── ذهب معدني متعدد الدرجات (مستلهم من المحاريب والتيجان الذهبية) */
  G1:     '#6b4f06',   /* ذهب قديم داكن */
  G2:     '#9a7312',   /* ذهب عتيق */
  G3:     '#c0911c',   /* ذهب كلاسيكي */
  G4:     '#d4a843',   /* ذهب معدني */
  G5:     '#e8c060',   /* ذهب مضيء */
  G6:     '#f2d07a',   /* ذهب فاتح */
  G7:     '#fbe9b0',   /* ذهب كريمي */

  /* ── ألوان فاتحة (الجص الأبيض والرخام الذي يزيّن قصور الأندلس والمساجد) */
  IVORY:  '#faf5e8',   /* عاجي نقي */
  CREAM:  '#f0e8cc',   /* كريمي دافئ */
  PLASTER:'#e4d9b8',   /* لون الجص القديم */
  WARM:   '#cfc0a0',   /* دافئ خافت */
  PARCHM: '#b8a882',   /* لون المخطوطات القديمة */

  /* ── فيروزي كالفسيفساء الإسلامية */
  TEAL0:  '#0a3a32',   /* فيروزي عميق جداً */
  TEAL:   '#12584a',   /* فيروزي داكن */
  TEAL2:  '#1a7858',   /* فيروزي كلاسيكي */
  TEAL3:  '#28a07a',   /* فيروزي فاتح */
  TEAL4:  '#4dc89a',   /* فيروزي لامع */

  /* ── أزرق كحلي أندلسي (من فسيفساء قصر الحمراء) */
  NAVY:   '#0a1428',   /* كحلي ليلي */
  BLUE:   '#162044',   /* كحلي غامق */
  BLUE2:  '#224878',   /* أزرق أندلسي */
  BLUE3:  '#3874b8',   /* أزرق فاتح */
  BLUE4:  '#74aade',   /* أزرق سماوي */

  /* ── أحمر ياقوتي (من الزجاج الملون في المساجد) */
  RUBY0:  '#3a0808',   /* ياقوتي داكن جداً */
  RUBY:   '#680c0c',   /* ياقوتي */
  RUBY2:  '#c43030',   /* ياقوتي فاتح */

  /* ── أبيض فاتح للنص على الخلفيات الداكنة */
  TW:     '#faf5e8',   /* أبيض دافئ */
  TW2:    'rgba(250,245,232,0.80)',
  TW3:    'rgba(250,245,232,0.55)',
  TW4:    'rgba(250,245,232,0.32)',
  TW5:    'rgba(250,245,232,0.16)',

  /* ── نص داكن على الخلفيات الفاتحة */
  DARK:   '#1a1200',
  DARK2:  '#2c1e04',

  /* ── حدود ذهبية */
  BD1:    'rgba(212,168,67,0.12)',
  BD2:    'rgba(212,168,67,0.28)',
  BD3:    'rgba(212,168,67,0.52)',
  BD4:    'rgba(212,168,67,0.78)',
  BD5:    'rgba(212,168,67,0.95)',

  /* ── توهجات وبريق */
  GLOW:   'rgba(212,168,67,0.10)',
  GLOW2:  'rgba(212,168,67,0.22)',
  GLOW3:  'rgba(212,168,67,0.40)',
  TGLOW:  'rgba(40,160,122,0.15)',
};

const LANGUAGES = [
  { code: 'ar', label: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
  { code: 'en', label: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { code: 'ur', label: 'اردو',     flag: '🇵🇰', dir: 'rtl' },
  { code: 'id', label: 'Bahasa',   flag: '🇮🇩', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe',   flag: '🇹🇷', dir: 'ltr' },
];

/* ═══════════════════════════════════════════════════════════
   🌟 SVG — نمط الجريد الإسلامي الأصيل
   مستلهم من جدران مسجد السلطان حسن بالقاهرة
═══════════════════════════════════════════════════════════ */
function GiridPattern({ opacity = 0.07 }) {
  return (
    <svg
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* النجمة الثمانية — أساس الجريد الإسلامي */}
        <pattern id="girih8" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* نجمة ثمانية من مربعين */}
          <polygon points="50,8 59,27 80,22 74,42 92,50 74,58 80,78 59,73 50,92 41,73 20,78 26,58 8,50 26,42 20,22 41,27"
            fill="none" stroke={C.G4} strokeWidth="0.7" opacity="1"/>
          {/* مربع داخلي */}
          <rect x="36" y="36" width="28" height="28" rx="2"
            fill={C.G4} fillOpacity="0.05" stroke={C.G3} strokeWidth="0.4" transform="rotate(45 50 50)"/>
          {/* نقطة مركزية */}
          <circle cx="50" cy="50" r="2.5" fill={C.G5} fillOpacity="0.30"/>
          {/* خطوط الشبكة الخفية */}
          <line x1="0" y1="50" x2="100" y2="50" stroke={C.G2} strokeWidth="0.25" opacity="0.4"/>
          <line x1="50" y1="0" x2="50" y2="100" stroke={C.G2} strokeWidth="0.25" opacity="0.4"/>
        </pattern>
        {/* نمط ثانوي — دوائر متداخلة كالزخرف المغربي */}
        <pattern id="moresque" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="28" cy="28" r="22" fill="none" stroke={C.G5} strokeWidth="0.35" opacity="0.5"/>
          <circle cx="28" cy="28" r="14" fill="none" stroke={C.G4} strokeWidth="0.25" opacity="0.4"/>
          <circle cx="0" cy="0" r="8" fill="none" stroke={C.G3} strokeWidth="0.3" opacity="0.35"/>
          <circle cx="56" cy="0" r="8" fill="none" stroke={C.G3} strokeWidth="0.3" opacity="0.35"/>
          <circle cx="0" cy="56" r="8" fill="none" stroke={C.G3} strokeWidth="0.3" opacity="0.35"/>
          <circle cx="56" cy="56" r="8" fill="none" stroke={C.G3} strokeWidth="0.3" opacity="0.35"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#girih8)" opacity={opacity}/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   🕌 SVG — مقرنصات (Muqarnas) معمارية أصيلة
   مستلهمة من قبة مسجد الإمام في أصفهان
═══════════════════════════════════════════════════════════ */
function MuqarnasBand({ height = 48, flipped = false }) {
  const units = 20;
  const uw = 64;
  const total = units * uw;
  return (
    <div style={{ width:'100%', overflow:'hidden', lineHeight:0, transform: flipped ? 'scaleY(-1)' : 'none' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${total} ${height}`} preserveAspectRatio="none">
        {Array.from({ length: units }).map((_, i) => {
          const x = i * uw;
          const cx = x + uw / 2;
          return (
            <g key={i}>
              {/* القوس الخارجي */}
              <path d={`M${x},${height} L${x},${height*0.55} Q${cx},${-height*0.1} ${x+uw},${height*0.55} L${x+uw},${height}`}
                fill={C.BG2} stroke={C.G4} strokeWidth="0.6" opacity="0.5"/>
              {/* القوس الداخلي الصغير */}
              <path d={`M${x+8},${height} L${x+8},${height*0.65} Q${cx},${height*0.15} ${x+uw-8},${height*0.65} L${x+uw-8},${height}`}
                fill="none" stroke={C.G5} strokeWidth="0.4" opacity="0.55"/>
              {/* نقطة الذروة */}
              <circle cx={cx} cy={height*0.12} r="2" fill={C.G5} fillOpacity="0.7"/>
              {/* خط أفقي رابط */}
              <line x1={x} y1={height*0.55} x2={x+uw} y2={height*0.55}
                stroke={C.G3} strokeWidth="0.3" opacity="0.3"/>
            </g>
          );
        })}
        {/* خط ذهبي أفقي */}
        <line x1="0" y1={height*0.98} x2={total} y2={height*0.98}
          stroke={C.G4} strokeWidth="1" opacity="0.5"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   🌹 SVG — زخرفة ركنية أرابيسك
═══════════════════════════════════════════════════════════ */
function CornerOrnament({ size = 80, flip = false, flipY = false }) {
  const sx = flip ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      style={{ transform:`scale(${sx},${sy})`, display:'block' }}>
      {/* الإطار الخارجي */}
      <path d="M3,3 L42,3 Q54,3 54,15 L54,54" fill="none" stroke={C.G4} strokeWidth="1.4" opacity="0.6"/>
      <path d="M3,3 L3,42 Q3,54 15,54 L54,54" fill="none" stroke={C.G4} strokeWidth="1.4" opacity="0.6"/>
      {/* الإطار الداخلي */}
      <path d="M10,10 L36,10 Q44,10 44,18 L44,44" fill="none" stroke={C.G3} strokeWidth="0.7" opacity="0.4"/>
      <path d="M10,10 L10,36 Q10,44 18,44 L44,44" fill="none" stroke={C.G3} strokeWidth="0.7" opacity="0.4"/>
      {/* الأرابيسك النباتي */}
      <path d="M12,12 Q22,8 26,18 Q30,28 20,30 Q10,32 12,22" fill="none" stroke={C.G5} strokeWidth="0.7" opacity="0.55"/>
      <path d="M12,12 Q8,22 18,26 Q28,30 30,20 Q32,10 22,12" fill="none" stroke={C.G5} strokeWidth="0.7" opacity="0.55"/>
      {/* النجمة الركنية */}
      <polygon points="8,8 10.5,14.5 17,14.5 12,18.5 14,25 8,21 2,25 4,18.5 -1,14.5 5.5,14.5"
        fill={C.G4} fillOpacity="0.5" stroke={C.G5} strokeWidth="0.4"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   🏛️ SVG — قوس مغربي مدبّب (Horseshoe / Pointed Arch)
   مستلهم من أقواس الجامع الكبير في قرطبة
═══════════════════════════════════════════════════════════ */
function MoorishArch({ width = 320, height = 90, color = C.G4, opacity = 0.45, filled = false }) {
  const w = width, h = height;
  const cx = w / 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:'block' }}>
      {/* الحشوة الداخلية */}
      {filled && (
        <path
          d={`M${w*0.08},${h} L${w*0.08},${h*0.55} Q${cx},${-h*0.25} ${w*0.92},${h*0.55} L${w*0.92},${h} Z`}
          fill={color} fillOpacity={opacity * 0.1}
        />
      )}
      {/* القوس الرئيسي */}
      <path
        d={`M${w*0.05},${h} L${w*0.05},${h*0.52} Q${cx},${-h*0.28} ${w*0.95},${h*0.52} L${w*0.95},${h}`}
        fill="none" stroke={color} strokeWidth="1.8" opacity={opacity}
      />
      {/* القوس الداخلي */}
      <path
        d={`M${w*0.14},${h} L${w*0.14},${h*0.58} Q${cx},${-h*0.08} ${w*0.86},${h*0.58} L${w*0.86},${h}`}
        fill="none" stroke={color} strokeWidth="0.7" opacity={opacity * 0.55}
      />
      {/* نقطة الذروة */}
      <circle cx={cx} cy={h*0.04} r="3.5" fill={color} fillOpacity={opacity * 0.9}/>
      {/* تزيين النقطة */}
      <circle cx={cx} cy={h*0.04} r="6" fill="none" stroke={color} strokeWidth="0.7" opacity={opacity * 0.4}/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ✨ SVG — فاصل زخرفي ذهبي فاخر
═══════════════════════════════════════════════════════════ */
function OrnamentalDivider({ width = '100%', light = false }) {
  const g = light ? '#b8960f' : C.G4;
  const g2 = light ? '#d4a843' : C.G5;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, width, margin:'18px 0' }}>
      {/* الخط */}
      <div style={{ flex:1, height:'1px', background:`linear-gradient(to left, ${g}70, transparent)` }}/>
      {/* نجمة ثمانية مركزية */}
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="6" y="6" width="20" height="20" rx="1.5"
          fill="none" stroke={g} strokeWidth="1.2" transform="rotate(45 16 16)" opacity="0.9"/>
        <rect x="9" y="9" width="14" height="14" rx="1"
          fill={g} fillOpacity="0.12" stroke={g2} strokeWidth="0.7" opacity="0.7"/>
        <circle cx="16" cy="16" r="3" fill={g2} fillOpacity="0.7"/>
        {/* نقاط الجهات */}
        {[0,90,180,270].map(deg => (
          <circle key={deg}
            cx={16 + 11.5*Math.cos(deg*Math.PI/180)}
            cy={16 + 11.5*Math.sin(deg*Math.PI/180)}
            r="1.5" fill={g} fillOpacity="0.55"/>
        ))}
      </svg>
      <div style={{ flex:1, height:'1px', background:`linear-gradient(to right, ${g}70, transparent)` }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   🔆 SVG — تاج الميحراب (نصف قبة علوية)
═══════════════════════════════════════════════════════════ */
function MihrabCrown({ width = 500, height = 120 }) {
  const w = width, h = height;
  const cx = w / 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:'block', pointerEvents:'none' }}>
      <defs>
        <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.G6} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={C.G3} stopOpacity="0.1"/>
        </linearGradient>
        <linearGradient id="crownGold2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="50%" stopColor={C.G4} stopOpacity="0.8"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>

      {/* الشكل الرئيسي */}
      <path d={`M0,${h} Q${cx},${-h*0.6} ${w},${h}`}
        fill="url(#crownGold)" stroke={C.G4} strokeWidth="1"/>

      {/* خطوط ذهبية متوهجة */}
      <path d={`M${w*0.15},${h} Q${cx},${-h*0.3} ${w*0.85},${h}`}
        fill="none" stroke={C.G5} strokeWidth="0.7" opacity="0.5"/>
      <path d={`M${w*0.3},${h} Q${cx},${-h*0.05} ${w*0.7},${h}`}
        fill="none" stroke={C.G6} strokeWidth="0.5" opacity="0.4"/>

      {/* الخط الأفقي الذهبي */}
      <line x1="0" y1={h} x2={w} y2={h} stroke="url(#crownGold2)" strokeWidth="1.5"/>

      {/* نقطة الذروة ومحيطها */}
      <circle cx={cx} cy={h*0.05} r="6" fill={C.G5} fillOpacity="0.8"/>
      <circle cx={cx} cy={h*0.05} r="12" fill="none" stroke={C.G4} strokeWidth="0.8" opacity="0.5"/>
      <circle cx={cx} cy={h*0.05} r="20" fill="none" stroke={C.G3} strokeWidth="0.5" opacity="0.3"/>

      {/* نقاط الزخرفة اليسارية واليمنية */}
      {[-1, 1].map(side => (
        <g key={side}>
          <circle cx={cx + side*80} cy={h*0.35} r="3" fill={C.G4} fillOpacity="0.6"/>
          <circle cx={cx + side*80} cy={h*0.35} r="6" fill="none" stroke={C.G3} strokeWidth="0.5" opacity="0.4"/>
          <circle cx={cx + side*160} cy={h*0.7} r="2.5" fill={C.G3} fillOpacity="0.5"/>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   🌙 SECTION TITLE — عنوان القسم بإطار معماري
═══════════════════════════════════════════════════════════ */
function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ textAlign:'center', marginBottom:52 }} dir="rtl">
      {/* قبة صغيرة فوق العنوان */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:6, opacity:0.5 }}>
        <MoorishArch width={200} height={36} color={C.G4} opacity={0.6}/>
      </div>
      <OrnamentalDivider/>
      <h2 style={{
        fontFamily:'Amiri,serif',
        fontSize:'clamp(1.8rem,3vw,2.7rem)',
        fontWeight:700,
        margin:'10px 0 14px',
        background:`linear-gradient(135deg, ${C.G4} 0%, ${C.G6} 45%, ${C.G7} 65%, ${C.G5} 100%)`,
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        backgroundClip:'text',
        filter:`drop-shadow(0 2px 16px ${C.G3}30)`,
        letterSpacing:'0.02em',
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontFamily:'Noto Naskh Arabic,serif',
          fontSize:'0.98rem', color:C.TW3, lineHeight:1.9,
          maxWidth:500, margin:'0 auto',
        }}>{subtitle}</p>
      )}
      <OrnamentalDivider/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   🏛️ HEADER — رأس الصفحة بطراز القصر الأندلسي
═══════════════════════════════════════════════════════════ */
function Header({ lang, onLangChange }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ position:'sticky', top:0, zIndex:300 }}>

      {/* شريط اللغات — كالكتابة الكوفية على إفريز المسجد */}
      <div style={{
        background:`linear-gradient(180deg, ${C.BG1}, ${C.BG2})`,
        borderBottom:`1px solid ${C.BD3}`,
        padding:'8px 20px',
        display:'flex', justifyContent:'center', alignItems:'center',
        gap:8, flexWrap:'wrap',
        position:'relative', overflow:'hidden',
      }}>
        {/* نمط خفي */}
        <GiridPattern opacity={0.04}/>
        <Globe size={15} color={C.G4} style={{ marginLeft:4, opacity:0.7, flexShrink:0 }}/>
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => onLangChange(l.code)} style={{
            background: lang === l.code
              ? `linear-gradient(135deg, ${C.G2}, ${C.G4}, ${C.G5})`
              : 'transparent',
            color: lang === l.code ? C.DARK : C.TW2,
            border:`1.5px solid ${lang === l.code ? C.G4 : C.BD2}`,
            borderRadius:22, padding:'5px 16px',
            fontSize:'0.88rem', fontWeight:700, cursor:'pointer',
            fontFamily: l.code==='ar'||l.code==='ur' ? 'Noto Naskh Arabic,serif':'Inter,sans-serif',
            display:'flex', alignItems:'center', gap:7,
            transition:'all 0.22s',
            boxShadow: lang===l.code ? `0 2px 12px ${C.G3}50` : 'none',
            letterSpacing: l.code==='ar' || l.code==='ur' ? '0' : '0.01em',
          }}
          onMouseEnter={e => { if(lang!==l.code){ e.currentTarget.style.borderColor=C.G4; e.currentTarget.style.color=C.G6; e.currentTarget.style.background=C.GLOW2; }}}
          onMouseLeave={e => { if(lang!==l.code){ e.currentTarget.style.borderColor=C.BD2; e.currentTarget.style.color=C.TW2; e.currentTarget.style.background='transparent'; }}}
          >
            <span style={{fontSize:'1.05rem'}}>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>

      {/* الهيدر الرئيسي */}
      <header style={{
        background: scrolled
          ? `linear-gradient(180deg, ${C.BG0}fa, ${C.BG1}f5)`
          : `linear-gradient(180deg, ${C.BG1}ec, ${C.BG2}e5)`,
        backdropFilter:'blur(24px)',
        borderBottom:`1px solid ${scrolled ? C.BD4 : C.BD2}`,
        boxShadow: scrolled ? `0 6px 40px rgba(0,0,0,0.7), 0 0 0 1px ${C.BD1}` : 'none',
        transition:'all 0.35s',
      }}>
        {/* شريط ذهبي أعلى الهيدر */}
        <div style={{ height:2, background:`linear-gradient(90deg, transparent 0%, ${C.G3} 20%, ${C.G6} 50%, ${C.G3} 80%, transparent 100%)` }}/>

        <div style={{
          maxWidth:1320, margin:'0 auto', padding:'10px 28px',
          display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
        }}>
          {/* الشعار والعنوان */}
          <div style={{ display:'flex', alignItems:'center', gap:14, cursor:'pointer' }}
            onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            {/* إطار الشعار — نافذة مقرنصة */}
            <div style={{
              width:60, height:60, flexShrink:0,
              position:'relative',
            }}>
              {/* نمط القوس فوق الشعار */}
              <div style={{
                position:'absolute', inset:-2,
                borderRadius:'50% 50% 12px 12px',
                border:`1.5px solid ${C.G4}80`,
                background:`radial-gradient(circle at 50% 0%, ${C.G3}15, transparent 70%)`,
                zIndex:0,
              }}/>
              <div style={{
                width:60, height:60, borderRadius:'50% 50% 12px 12px',
                overflow:'hidden', background:C.BG0,
                boxShadow:`0 0 16px ${C.G3}30, 0 0 6px ${C.G4}20`,
                display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative', zIndex:1,
              }}>
                <img src="/logo.png" alt="Logo"
                  style={{ width:'92%', height:'92%', objectFit:'contain', display:'block' }}/>
              </div>
            </div>

            <div dir="rtl">
              <div style={{
                fontFamily:'Amiri,serif',
                fontSize:'clamp(1.15rem,2vw,1.6rem)',
                fontWeight:700,
                background:`linear-gradient(135deg, ${C.G4}, ${C.G6}, ${C.G5})`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text', lineHeight:1.25,
                filter:`drop-shadow(0 0 14px ${C.G3}45)`,
                letterSpacing:'0.01em',
              }}>
                فيوض التأويل المعاصر
              </div>
              <div style={{
                fontSize:'0.78rem', color:C.TW3,
                fontFamily:'Noto Naskh Arabic,serif', marginTop:2,
                letterSpacing:'0.02em',
              }}>
                تفسير سورة البقرة · قراءة معاصرة متعددة اللغات
              </div>
            </div>
          </div>

          {/* روابط التنقل */}
          <nav style={{ display:'flex', gap:2, alignItems:'center' }}
            className="nav-desktop" dir="rtl">
            {[
              {href:'#about',   label:'عن المشروع'},
              {href:'#surahs',  label:'تصفح السور'},
              {href:'#paths',   label:'مسارات التأويل'},
              {href:'#features',label:'الخصائص'},
            ].map(l => (
              <a key={l.href} href={l.href} style={{
                color:C.TW2, textDecoration:'none', fontSize:'0.9rem',
                fontFamily:'Noto Naskh Arabic,serif', fontWeight:600,
                padding:'7px 14px', borderRadius:8, transition:'all 0.22s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.color=C.G6;e.currentTarget.style.background=C.GLOW2;}}
              onMouseLeave={e=>{e.currentTarget.style.color=C.TW2;e.currentTarget.style.background='transparent';}}
              >{l.label}</a>
            ))}
          </nav>

          {/* زر البدء — بشكل المحراب */}
          <button onClick={() => navigate('/part1')} style={{
            background:`linear-gradient(135deg, ${C.G2}, ${C.G4}, ${C.G5})`,
            color:C.DARK, border:'none', borderRadius:10,
            padding:'11px 24px', fontSize:'0.95rem', fontWeight:800,
            fontFamily:'Noto Naskh Arabic,serif', cursor:'pointer',
            boxShadow:`0 4px 20px ${C.G3}55`, transition:'all 0.25s',
            whiteSpace:'nowrap',
            letterSpacing:'0.01em',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 28px ${C.G3}75`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 20px ${C.G3}55`;}}>
            ابدأ التفسير ←
          </button>
        </div>
      </header>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   🌅 HERO — المحراب الكبير المضاء بالذهب
   مستلهم من محراب مسجد الشاه أصفهان
═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const navigate = useNavigate();
  return (
    <section style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      overflow:'hidden',
      background:`
        radial-gradient(ellipse 100% 80% at 50% 110%, ${C.G2}22 0%, transparent 55%),
        radial-gradient(ellipse 70% 50% at 50% -10%, ${C.TEAL}14 0%, transparent 45%),
        radial-gradient(ellipse 40% 30% at 20% 50%, ${C.BLUE}12 0%, transparent 40%),
        radial-gradient(ellipse 40% 30% at 80% 50%, ${C.NAVY}12 0%, transparent 40%),
        linear-gradient(180deg, ${C.BG0} 0%, ${C.BG1} 45%, ${C.BG2} 75%, ${C.BG3} 100%)
      `,
    }}>
      <GiridPattern opacity={0.10}/>

      {/* مقرنصات الأعلى */}
      <div style={{ position:'absolute', top:0, left:0, right:0, zIndex:3 }}>
        <MuqarnasBand height={54}/>
      </div>

      {/* تاج المحراب العلوي */}
      <div style={{ position:'absolute', top:54, left:'50%', transform:'translateX(-50%)', width:'85%', maxWidth:900, zIndex:2 }}>
        <MihrabCrown width={900} height={130}/>
      </div>

      {/* الأعمدة الجانبية الذهبية */}
      {[-1, 1].map(side => (
        <div key={side} style={{
          position:'absolute', top:0, bottom:0,
          [side === 1 ? 'right' : 'left']: 24,
          width:1,
          background:`linear-gradient(180deg, transparent 0%, ${C.G4}70 25%, ${C.G5}90 50%, ${C.G4}70 75%, transparent 100%)`,
        }}/>
      ))}
      {/* خط عمود ثانوي */}
      {[-1, 1].map(side => (
        <div key={`s${side}`} style={{
          position:'absolute', top:0, bottom:0,
          [side === 1 ? 'right' : 'left']: 48,
          width:'1px',
          background:`linear-gradient(180deg, transparent 0%, ${C.G3}30 30%, ${C.G4}50 50%, ${C.G3}30 70%, transparent 100%)`,
        }}/>
      ))}

      {/* زخرفة الأركان */}
      <div style={{ position:'absolute', top:60, right:16, zIndex:4 }}><CornerOrnament size={88}/></div>
      <div style={{ position:'absolute', top:60, left:16, zIndex:4 }}><CornerOrnament size={88} flip/></div>
      <div style={{ position:'absolute', bottom:70, right:16, zIndex:4 }}><CornerOrnament size={72} flipY/></div>
      <div style={{ position:'absolute', bottom:70, left:16, zIndex:4 }}><CornerOrnament size={72} flip flipY/></div>

      {/* المحتوى الرئيسي */}
      <div style={{ textAlign:'center', maxWidth:900, padding:'140px 32px 100px', position:'relative', zIndex:5 }} dir="rtl">

        {/* الشعار المركزي الكبير — محاط بإطار المحراب */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:36 }}>
          <div style={{ position:'relative', width:200, height:200 }}>
            {/* هالات متعددة */}
            <div style={{
              position:'absolute', inset:-24, borderRadius:'50%',
              background:`radial-gradient(circle, ${C.G3}22 0%, transparent 68%)`,
              animation:'heroGlow 3.5s ease-in-out infinite',
            }}/>
            <div style={{
              position:'absolute', inset:-10, borderRadius:'22px',
              border:`1px solid ${C.G4}25`,
            }}/>
            {/* إطار المحراب فوق الشعار */}
            <div style={{
              position:'absolute', top:-26, left:'50%', transform:'translateX(-50%)',
              opacity:0.6, zIndex:2,
            }}>
              <MoorishArch width={160} height={28} color={C.G5} opacity={1}/>
            </div>
            {/* الإطار الرئيسي */}
            <div style={{
              width:200, height:200,
              borderRadius:'50% 50% 18px 18px',
              border:`2px solid ${C.G4}95`,
              overflow:'hidden', background:C.BG0,
              boxShadow:`
                0 0 0 5px ${C.G3}18,
                0 0 50px ${C.G3}40,
                0 0 100px ${C.G3}18,
                inset 0 0 30px rgba(0,0,0,0.6)
              `,
              position:'relative', zIndex:1,
            }}>
              <img src="/logo.png" alt="فيوض التأويل المعاصر"
                style={{ width:'100%', height:'100%', objectFit:'contain', display:'block', padding:10 }}/>
            </div>
            {/* نجوم الأركان */}
            {[{t:-10,r:-10},{t:-10,l:-10},{b:-10,r:-10},{b:-10,l:-10}].map((pos,i)=>(
              <div key={i} style={{ position:'absolute', ...pos, zIndex:6 }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon points="9,1 11,7 17,7 12.5,10.5 14.5,16.5 9,13 3.5,16.5 5.5,10.5 1,7 7,7"
                    fill={C.G5} fillOpacity="0.95"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* البسملة — على خلفية ذهبية شفافة */}
        <div style={{
          display:'inline-block',
          background:`linear-gradient(135deg, ${C.G2}18, ${C.G4}14)`,
          border:`1.5px solid ${C.BD4}`,
          borderRadius:16, padding:'14px 44px', marginBottom:30,
          boxShadow:`0 0 40px ${C.G3}14, inset 0 1px 0 ${C.G6}22, inset 0 -1px 0 ${C.G1}40`,
          position:'relative',
        }}>
          {/* نقاط زخرفية جانبية */}
          {[-1,1].map(s => (
            <div key={s} style={{ position:'absolute', top:'50%', [s===1?'right':'left']:'14px', transform:'translateY(-50%)', opacity:0.7 }}>
              <svg width="8" height="8" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" fill={C.G5}/>
              </svg>
            </div>
          ))}
          <p style={{
            fontFamily:'Amiri,serif',
            fontSize:'clamp(1.35rem,2.6vw,2rem)',
            color:C.G7, margin:0, letterSpacing:'0.08em',
            textShadow:`0 0 30px ${C.G4}60`,
          }}>
            ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾
          </p>
        </div>

        {/* العنوان الرئيسي */}
        <h1 style={{
          fontFamily:'Amiri,serif',
          fontSize:'clamp(2.8rem,6.5vw,5.2rem)',
          fontWeight:700, margin:'0 0 6px',
          background:`linear-gradient(135deg,
            ${C.G3} 0%, ${C.G5} 25%,
            ${C.G7} 50%, ${C.IVORY} 60%,
            ${C.G6} 80%, ${C.G4} 100%)`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text', lineHeight:1.2,
          filter:`drop-shadow(0 0 50px ${C.G3}50)`,
          letterSpacing:'0.025em',
        }}>
          فيوض التأويل المعاصر
        </h1>

        {/* العنوان الفرعي */}
        <div style={{ margin:'4px 0 18px' }}>
          <span style={{
            fontFamily:'Amiri,serif',
            fontSize:'clamp(1.2rem,2.4vw,1.75rem)',
            color:C.TEAL4, fontWeight:600,
            textShadow:`0 0 20px ${C.TEAL2}50`,
            letterSpacing:'0.03em',
          }}>
            تفسير سورة البقرة
          </span>
          <span style={{ color:C.TW4, margin:'0 10px', fontSize:'1rem' }}>·</span>
          <span style={{
            fontFamily:'Noto Naskh Arabic,serif',
            fontSize:'clamp(0.9rem,1.6vw,1.1rem)',
            color:C.TW3,
          }}>
            قراءة معاصرة متعددة اللغات
          </span>
        </div>

        <OrnamentalDivider/>

        {/* الوصف */}
        <p style={{
          fontFamily:'Noto Naskh Arabic,serif',
          fontSize:'clamp(1rem,1.9vw,1.2rem)',
          color:C.CREAM, lineHeight:2.15,
          maxWidth:660, margin:'0 auto 40px',
          textShadow:'0 1px 8px rgba(0,0,0,0.5)',
        }}>
          قراءة تفسيرية معاصرة تجمع بين البيان القرآني والتدبر التربوي والبصيرة النفسية —
          بلغة تُخاطب الروح وتستنير بنور الوحي
        </p>

        {/* أزرار CTA */}
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:52 }}>
          {[
            { label:'ابدأ التصفح', primary:true, to:'/part1' },
            { label:'تصفح السور',  primary:false, href:'#surahs' },
            { label:'البحث في التفسير', primary:false, href:'#search-sec' },
            { label:'عن المشروع', primary:false, href:'#about' },
          ].map((btn,i) => (
            <HeroBtn key={i} {...btn} navigate={navigate}/>
          ))}
        </div>

        {/* إحصائيات — كالتابلو الذهبي في المساجد */}
        <div style={{
          display:'flex', gap:0, justifyContent:'center', flexWrap:'wrap',
          background:`linear-gradient(135deg, ${C.GLOW}, rgba(255,255,255,0.025))`,
          border:`1px solid ${C.BD3}`,
          borderRadius:22, overflow:'hidden',
          backdropFilter:'blur(10px)',
          boxShadow:`0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 ${C.G5}15`,
        }}>
          {[
            { num:'٢٨٦', label:'آية مفسَّرة',     color:C.G6 },
            { num:'٧',   label:'أبعاد تفسيرية',  color:C.TEAL4 },
            { num:'٥',   label:'لغات عالمية',    color:C.BLUE4 },
            { num:'١٠٠٪', label:'مصادر موثَّقة',  color:C.G7 },
          ].map((s,i) => (
            <div key={i} style={{
              flex:'1 1 110px', padding:'22px 18px', textAlign:'center',
              borderLeft: i>0 ? `1px solid ${C.BD1}` : 'none',
              background: i%2===0 ? 'rgba(255,255,255,0.015)' : 'transparent',
            }}>
              <div style={{
                fontFamily:'Amiri,serif', fontSize:'2.2rem', fontWeight:700,
                color:s.color, lineHeight:1, marginBottom:7,
                textShadow:`0 0 16px ${s.color}50`,
              }}>{s.num}</div>
              <div style={{
                fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.8rem',
                color:C.TW3, letterSpacing:'0.01em',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* مقرنصات السفلى */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:3 }}>
        <MuqarnasBand height={40} flipped/>
      </div>

      {/* مؤشر التمرير */}
      <div style={{
        position:'absolute', bottom:48, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:4, opacity:0.5, zIndex:5,
      }}>
        <span style={{ fontSize:'0.72rem', color:C.G5, fontFamily:'Noto Naskh Arabic' }}>تمرير</span>
        <ChevronDown size={17} color={C.G5}/>
      </div>
    </section>
  );
}

function HeroBtn({ label, primary, to, href, navigate }) {
  const [h, setH] = useState(false);
  const go = () => to ? navigate(to) : document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
  return (
    <button onClick={go}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        display:'flex', alignItems:'center', gap:8,
        background: primary
          ? `linear-gradient(135deg, ${C.G2}, ${C.G4}, ${C.G5})`
          : h ? C.GLOW2 : 'rgba(0,0,0,0.25)',
        color: primary ? C.DARK : h ? C.G6 : C.TW2,
        border:`1.5px solid ${primary ? C.G4 : h ? C.G4 : C.BD2}`,
        borderRadius:12, padding:'12px 24px',
        fontSize:'0.97rem', fontWeight:700,
        fontFamily:'Noto Naskh Arabic,serif', cursor:'pointer',
        transition:'all 0.22s',
        transform: h ? 'translateY(-3px)' : 'none',
        boxShadow: primary
          ? `0 6px 22px ${C.G3}50`
          : h ? `0 6px 18px ${C.G3}20` : '0 2px 8px rgba(0,0,0,0.3)',
        backdropFilter: primary ? 'none' : 'blur(8px)',
      }}
    >{label}</button>
  );
}

/* ═══════════════════════════════════════════════════════════
   🔍 SEARCH — بحث ذكي بخلفية رخامية فاتحة
═══════════════════════════════════════════════════════════ */
function SearchSection() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  return (
    <section id="search-sec" style={{
      background:`linear-gradient(180deg, ${C.BG3} 0%, ${C.BG2} 100%)`,
      padding:'90px 28px', position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.05}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
        background:`linear-gradient(90deg, transparent, ${C.G3}, ${C.G6}, ${C.G3}, transparent)` }}/>

      <div style={{ maxWidth:900, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle title="البحث في التفسير" subtitle="ابحث بالآية، الموضوع، الكلمة، أو الجذر اللغوي"/>

        {/* صندوق البحث — كالجص الأبيض المزيّن */}
        <div style={{
          background:`linear-gradient(160deg,
            rgba(250,245,232,0.06) 0%,
            rgba(250,245,232,0.03) 100%)`,
          border:`1.5px solid ${C.BD4}`,
          borderRadius:24,
          padding:'28px 30px',
          boxShadow:`
            0 12px 50px rgba(0,0,0,0.5),
            inset 0 1px 0 ${C.G5}18,
            inset 0 -1px 0 ${C.G1}30
          `,
          position:'relative', overflow:'hidden',
        }}>
          {/* تاج ذهبي صغير */}
          <div style={{ position:'absolute', top:-18, left:'50%', transform:'translateX(-50%)', opacity:0.4 }}>
            <MoorishArch width={260} height={22} color={C.G4} opacity={1}/>
          </div>

          {/* فلاتر البحث */}
          <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap' }} dir="rtl">
            {['الكل','آية','سورة','موضوع','كلمة','جذر'].map((f,i) => {
              const id = ['all','ayah','surah','topic','word','root'][i];
              const active = filter === id;
              return (
                <button key={id} onClick={()=>setFilter(id)} style={{
                  background: active
                    ? `linear-gradient(135deg, ${C.G2}, ${C.G5})`
                    : 'rgba(250,245,232,0.05)',
                  color: active ? C.DARK : C.TW2,
                  border:`1px solid ${active ? C.G5 : C.BD2}`,
                  borderRadius:10, padding:'6px 16px',
                  fontSize:'0.84rem', fontWeight:700, cursor:'pointer',
                  fontFamily:'Noto Naskh Arabic,serif', transition:'all 0.18s',
                  boxShadow: active ? `0 2px 12px ${C.G3}40` : 'none',
                }}>{f}</button>
              );
            })}
          </div>

          {/* حقل البحث */}
          <div style={{
            display:'flex', gap:10, alignItems:'center',
            background:'rgba(250,245,232,0.04)',
            border:`1px solid ${C.BD2}`, borderRadius:14, padding:'10px 16px',
          }}>
            <Search size={20} color={C.G4} style={{ flexShrink:0 }}/>
            <input
              value={query} onChange={e=>setQuery(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&navigate('/part1')}
              placeholder="ابحث في فيوض التفسير... (مثال: الصبر، التوبة، الرزق)"
              dir="rtl"
              style={{
                flex:1, background:'transparent', border:'none', outline:'none',
                color:C.IVORY, fontSize:'1.02rem',
                fontFamily:'Noto Naskh Arabic,serif',
              }}
            />
            <button onClick={()=>navigate('/part1')} style={{
              background:`linear-gradient(135deg, ${C.G2}, ${C.G5})`,
              color:C.DARK, border:'none', borderRadius:10,
              padding:'9px 24px', fontSize:'0.92rem', fontWeight:800,
              fontFamily:'Noto Naskh Arabic,serif', cursor:'pointer', flexShrink:0,
              boxShadow:`0 4px 16px ${C.G3}45`,
            }}>بحث</button>
          </div>
        </div>

        {/* بطاقات الوصول السريع */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))', gap:12, marginTop:22 }} dir="rtl">
          {[
            { icon:'🔥', label:'آية اليوم',      bg:C.RUBY,  bd:C.RUBY2 },
            { icon:'💚', label:'آيات الرحمة',    bg:C.TEAL,  bd:C.TEAL4 },
            { icon:'🛡️', label:'آيات التوجيه',   bg:C.BLUE,  bd:C.BLUE4 },
            { icon:'✨', label:'الأبعاد النفسية', bg:C.BG4,   bd:C.G4   },
            { icon:'📖', label:'التدبر التربوي', bg:C.BG3,   bd:C.G5   },
            { icon:'🌍', label:'المعاصرة',       bg:C.TEAL0, bd:C.TEAL3 },
          ].map(c => (
            <button key={c.label} onClick={()=>navigate('/part1')} style={{
              background:`linear-gradient(160deg, ${c.bg}ee, ${c.bg}99)`,
              border:`1px solid ${c.bd}40`,
              borderRadius:14, padding:'16px 10px', cursor:'pointer',
              transition:'all 0.22s', textAlign:'center',
              boxShadow:`0 4px 16px rgba(0,0,0,0.3)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=c.bd;e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 10px 24px rgba(0,0,0,0.4)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${c.bd}40`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 16px rgba(0,0,0,0.3)`;}}>
              <div style={{ fontSize:'1.5rem', marginBottom:8 }}>{c.icon}</div>
              <div style={{ color:C.IVORY, fontSize:'0.82rem', fontWeight:700, fontFamily:'Noto Naskh Arabic,serif' }}>{c.label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   📜 ABOUT — رؤية المشروع بتصميم رواق القصر
═══════════════════════════════════════════════════════════ */
function AboutSection() {
  const cards = [
    { icon:<Shield size={26}/>, color:C.TEAL2, colorL:C.TEAL4, title:'الأصالة العلمية',     text:'مصادر موثَّقة من أمهات كتب التفسير والعلوم الإسلامية' },
    { icon:<Layers size={26}/>, color:C.G3,    colorL:C.G6,    title:'العمق التأويلي',      text:'سبعة أبعاد: بياني، تأويلي، روحاني، نفسي، تربوي، معاصر، استشهادي' },
    { icon:<Eye size={26}/>,    color:C.BLUE2, colorL:C.BLUE4, title:'التدبر والتأمل',      text:'قراءة تدعو القلب إلى التأمل في أعماق المعنى القرآني' },
    { icon:<Zap size={26}/>,    color:C.RUBY,  colorL:C.RUBY2, title:'المعاصرة والحياة',    text:'ربط الآيات بواقع الإنسان المعاصر وتحدياته الروحية' },
    { icon:<Brain size={26}/>,  color:C.TEAL,  colorL:C.TEAL3, title:'البعد النفسي',        text:'استلهام الدروس النفسية والعلاجية من آيات القرآن الكريم' },
    { icon:<Feather size={26}/>,color:C.G2,    colorL:C.G5,    title:'الإرشاد والهداية',   text:'مناهج تربوية مستخرجة من نور القرآن للارتقاء بالنفس' },
  ];

  return (
    <section id="about" style={{
      position:'relative', overflow:'hidden',
      padding:'90px 28px',
      background:`linear-gradient(160deg, ${C.BG4} 0%, ${C.BG3} 50%, ${C.BG2} 100%)`,
    }}>
      <GiridPattern opacity={0.045}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${C.G4}, transparent)` }}/>

      <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle title="رؤية المشروع ومنهجيته"
          subtitle="مشروع علمي متكامل يُقدّم تفسيراً قرآنياً يخاطب العقل والروح معاً"/>

        {/* لوحة الرؤية — كالكتابة على جدار المحراب */}
        <div style={{
          position:'relative',
          background:`linear-gradient(160deg,
            rgba(250,245,232,0.065) 0%,
            rgba(212,168,67,0.04) 100%)`,
          border:`1px solid ${C.BD3}`,
          borderRadius:24, padding:'36px 44px', marginBottom:42,
          boxShadow:`
            0 12px 50px rgba(0,0,0,0.4),
            inset 0 1px 0 ${C.G5}18,
            inset 0 0 60px rgba(0,0,0,0.25)
          `,
          overflow:'hidden',
        }}>
          {/* قوس معماري في الخلف */}
          <div style={{ position:'absolute', top:-15, right:'50%', transform:'translateX(50%)', opacity:0.07, pointerEvents:'none' }}>
            <MoorishArch width={640} height={220} color={C.G5} opacity={1}/>
          </div>
          {/* تأثير الإضاءة العليا */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:'40%',
            background:`linear-gradient(180deg, ${C.G3}08, transparent)`,
            pointerEvents:'none',
          }}/>

          <div dir="rtl" style={{ position:'relative', zIndex:1 }}>
            <h3 style={{
              fontFamily:'Amiri,serif', fontSize:'1.7rem', fontWeight:700,
              background:`linear-gradient(135deg, ${C.G4}, ${C.G6}, ${C.G7})`,
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              backgroundClip:'text', marginBottom:20,
            }}>فيوض التأويل المعاصر</h3>
            <p style={{
              fontFamily:'Noto Naskh Arabic,serif', fontSize:'1.08rem',
              color:C.CREAM, lineHeight:2.2,
              borderRight:`3px solid ${C.G4}`, paddingRight:22,
              textShadow:'0 1px 6px rgba(0,0,0,0.4)',
            }}>
              قراءة تفسيرية معاصرة تجمع بين البيان القرآني، والتدبر التربوي، والبصيرة النفسية —
              مشروع يقف عند نهر المعنى ليغترف منه، لا ليختصره.
            </p>
          </div>
        </div>

        {/* البطاقات */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:18 }}>
          {cards.map(c => (
            <div key={c.title} style={{
              background:`linear-gradient(160deg, ${c.color}18, ${c.color}08)`,
              border:`1px solid ${c.color}28`,
              borderRadius:18, padding:'26px 22px',
              transition:'all 0.28s', cursor:'default',
              boxShadow:`0 4px 20px rgba(0,0,0,0.25)`,
            }}
            dir="rtl"
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.color}70`;e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,0,0,0.35), 0 0 0 1px ${c.color}20`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${c.color}28`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,0.25)`;}}>
              <div style={{
                width:52, height:52, borderRadius:14, marginBottom:16,
                background:`${c.color}22`, border:`1px solid ${c.color}45`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:c.colorL,
              }}>{c.icon}</div>
              <div style={{ fontFamily:'Noto Naskh Arabic,serif', color:C.IVORY, fontWeight:700, fontSize:'1.02rem', marginBottom:10 }}>{c.title}</div>
              <div style={{ fontFamily:'Noto Naskh Arabic,serif', color:C.TW2, fontSize:'0.9rem', lineHeight:2 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   📚 SURAHS — بطاقات السور بتصميم أبواب القصر الإسلامي
═══════════════════════════════════════════════════════════ */
function SurahsSection() {
  const navigate = useNavigate();
  const parts = [
    { title:'الجزء الأول', range:'الآيات ١ – ١٠١', count:101, path:'/part1', badge:'متاح', accent:C.TEAL2, light:C.TEAL4,
      themes:['إيمان','خلق آدم','المنافقون','بنو إسرائيل','القبلة'],
      desc:'من بداية السورة إلى الحديث عن تحويل القبلة — رحلة الإيمان والاختبار' },
    { title:'الجزء الثاني', range:'الآيات ١٠٢ – ٢٠٠', count:99, path:'/part2', badge:'متاح', accent:C.G3, light:C.G6,
      themes:['السحر','الحج','الجهاد','الإنفاق','الإسلام'],
      desc:'من السحر والبقرة إلى شعائر الحج — قوانين الحضارة الإسلامية' },
    { title:'الجزء الثالث', range:'الآيات ٢٠١ – ٢٨٦', count:86, path:null, badge:'قريباً', accent:C.BLUE2, light:C.BLUE4,
      themes:['آية الكرسي','الطلاق','الدَّين','الخوف','الذكر'],
      desc:'من المكارم والجهاد إلى آية الكرسي والحساب — قمة السورة' },
  ];

  return (
    <section id="surahs" style={{
      background:`linear-gradient(180deg, ${C.BG3} 0%, ${C.BG2} 100%)`,
      padding:'90px 28px', position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.06}/>
      <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle title="تصفح سورة البقرة"
          subtitle="٢٨٦ آية في ثلاثة أجزاء — كل جزء باب من أبواب المعرفة القرآنية"/>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(350px,1fr))', gap:24 }}>
          {parts.map(p => (
            <div key={p.title} style={{
              background:`linear-gradient(190deg, ${C.CARD2}, ${C.CARD})`,
              border:`1px solid ${C.BD2}`,
              borderRadius:22, overflow:'hidden', transition:'all 0.3s',
              boxShadow:`0 6px 24px rgba(0,0,0,0.35)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${p.accent}65`;e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow=`0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px ${p.accent}22`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.BD2;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 6px 24px rgba(0,0,0,0.35)`;}}>

              {/* رأس البطاقة */}
              <div style={{
                background:`linear-gradient(160deg, ${p.accent}35, ${p.accent}18)`,
                borderBottom:`1px solid ${p.accent}30`,
                padding:'28px 26px 20px', position:'relative', overflow:'hidden',
              }}>
                {/* مقرنصات صغيرة */}
                <div style={{ position:'absolute', top:0, left:0, right:0, opacity:0.55 }}>
                  <MuqarnasBand height={22}/>
                </div>
                {/* قوس ركني */}
                <div style={{ position:'absolute', bottom:-12, left:14, opacity:0.7 }}>
                  <CornerOrnament size={48} flip/>
                </div>

                <div dir="rtl" style={{ position:'relative', zIndex:1, paddingTop:10 }}>
                  <span style={{
                    background: p.badge==='متاح'
                      ? `linear-gradient(135deg, ${p.accent}, ${p.light})`
                      : 'rgba(100,100,120,0.4)',
                    color: p.badge==='متاح' ? C.DARK : C.TW3,
                    fontSize:'0.74rem', fontWeight:800, padding:'3px 14px', borderRadius:20,
                    fontFamily:'Noto Naskh Arabic,serif', float:'left', marginTop:6,
                    letterSpacing:'0.02em',
                  }}>{p.badge}</span>
                  <div style={{ fontFamily:'Amiri,serif', fontSize:'1.7rem', color:p.light, marginBottom:6 }}>{p.title}</div>
                  <div style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.87rem', color:C.TW2 }}>{p.range}</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:8, marginTop:10 }}>
                    <span style={{ fontFamily:'Amiri,serif', fontSize:'2.6rem', fontWeight:700, color:p.light, lineHeight:1 }}>{p.count}</span>
                    <span style={{ fontSize:'0.78rem', color:C.TW3, fontFamily:'Noto Naskh Arabic,serif' }}>آية</span>
                  </div>
                </div>
              </div>

              {/* جسم البطاقة */}
              <div style={{ padding:'20px 26px 24px' }} dir="rtl">
                <p style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.86rem', color:C.TW3, lineHeight:1.85, marginBottom:14 }}>
                  {p.desc}
                </p>
                <p style={{ fontSize:'0.74rem', color:C.TW4, fontFamily:'Noto Naskh Arabic,serif', marginBottom:10 }}>أبرز المواضيع:</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>
                  {p.themes.map(t => (
                    <span key={t} style={{
                      background:`${p.accent}18`, border:`1px solid ${p.accent}32`,
                      borderRadius:7, padding:'3px 10px', fontSize:'0.76rem',
                      color:p.light, fontFamily:'Noto Naskh Arabic,serif',
                    }}>{t}</span>
                  ))}
                </div>
                <button
                  onClick={()=>p.path&&navigate(p.path)}
                  disabled={!p.path}
                  style={{
                    width:'100%',
                    background: p.path
                      ? `linear-gradient(135deg, ${p.accent}, ${p.light})`
                      : 'rgba(100,100,120,0.22)',
                    color: p.path ? C.DARK : C.TW4,
                    border:'none', borderRadius:12, padding:'12px',
                    fontSize:'0.93rem', fontWeight:800,
                    fontFamily:'Noto Naskh Arabic,serif',
                    cursor: p.path ? 'pointer' : 'not-allowed',
                    boxShadow: p.path ? `0 5px 18px ${p.accent}45` : 'none',
                    transition:'all 0.22s',
                    letterSpacing:'0.01em',
                  }}>
                  {p.path ? `اقرأ ${p.title} ←` : 'قريباً...'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   🌐 PATHS — مسارات التأويل بألوان الفسيفساء الإسلامية
═══════════════════════════════════════════════════════════ */
function PathsSection() {
  const items = [
    { icon:<BookOpen size={24}/>, color:C.TEAL2, light:C.TEAL4, title:'المسار البياني',    sub:'جمال الأسلوب القرآني وفصاحته وبلاغة التعبير' },
    { icon:<Compass size={24}/>,  color:C.G3,    light:C.G6,    title:'المسار التأويلي',   sub:'عمق المعنى والدلالة والقراءات التفسيرية' },
    { icon:<Heart size={24}/>,    color:C.RUBY,  light:C.RUBY2, title:'المسار الروحاني',   sub:'الصلة بالله والتزكية والمقامات الروحانية' },
    { icon:<Brain size={24}/>,    color:C.BLUE2, light:C.BLUE4, title:'المسار النفسي',     sub:'الأثر النفسي والعلاجي في ضوء علم النفس' },
    { icon:<Feather size={24}/>,  color:C.TEAL,  light:C.TEAL3, title:'المسار التربوي',    sub:'الدروس والقيم التربوية وتزكية النفس' },
    { icon:<Zap size={24}/>,      color:C.G2,    light:C.G5,    title:'المسار المعاصر',    sub:'ربط الآيات بالحياة المعاصرة والعصر الحديث' },
  ];

  return (
    <section id="paths" style={{
      background:`linear-gradient(180deg, ${C.BG2} 0%, ${C.BG3} 100%)`,
      padding:'90px 28px', position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.05}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${C.G4}, transparent)` }}/>

      <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle title="مسارات التأويل"
          subtitle="كل مسار يفتح أفقاً معرفياً في فهم القرآن الكريم"/>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
          {items.map(p => (
            <div key={p.title} style={{
              background:`linear-gradient(160deg, ${p.color}1e, ${p.color}0a)`,
              border:`1px solid ${p.color}28`,
              borderRadius:18, padding:'24px 20px',
              display:'flex', alignItems:'flex-start', gap:16,
              cursor:'pointer', transition:'all 0.27s',
              boxShadow:`0 4px 18px rgba(0,0,0,0.22)`,
            }}
            dir="rtl"
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${p.color}65`;e.currentTarget.style.background=`linear-gradient(160deg, ${p.color}28, ${p.color}14)`;e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,0,0,0.32)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${p.color}28`;e.currentTarget.style.background=`linear-gradient(160deg, ${p.color}1e, ${p.color}0a)`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 18px rgba(0,0,0,0.22)`;}}>
              <div style={{
                width:54, height:54, borderRadius:14, flexShrink:0,
                background:`${p.color}22`, border:`1.5px solid ${p.color}42`,
                display:'flex', alignItems:'center', justifyContent:'center', color:p.light,
              }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily:'Noto Naskh Arabic,serif', fontWeight:700, color:C.IVORY, fontSize:'1rem', marginBottom:7 }}>{p.title}</div>
                <div style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.85rem', color:C.TW2, lineHeight:1.85 }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ⭐ FEATURED — مختارات التفسير بتصميم المخطوطة الإسلامية
═══════════════════════════════════════════════════════════ */
function FeaturedSection() {
  const navigate = useNavigate();
  const items = [
    { label:'آية اليوم', ayah:'﴿ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ﴾', ref:'البقرة: ٢٨٦',
      text:'هذه الآية الخاتمة تُجسِّد قانوناً إلهياً ثابتاً — فلا تكليف يتجاوز الطاقة، ولا ابتلاء يعجز عن الاحتمال.',
      color:C.G3, colorL:C.G6, icon:<Flame size={17}/> },
    { label:'وقفة تدبرية', ayah:'﴿ فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ ﴾', ref:'البقرة: ١٨٦',
      text:'أجاب الله مباشرةً دون واسطة — وفي هذا إيماء عميق أن الدعاء هو اللقاء الحقيقي بلا حجاب.',
      color:C.TEAL2, colorL:C.TEAL4, icon:<Heart size={17}/> },
    { label:'فيض تربوي', ayah:'﴿ وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ﴾', ref:'البقرة: ٤٥',
      text:'الصبر وحده لا يكفي، والصلاة وحدها لا تكفي — لكن اجتماعهما يصنع قدرةً على مواجهة الحياة بثقلها.',
      color:C.BLUE2, colorL:C.BLUE4, icon:<Sparkles size={17}/> },
  ];

  return (
    <section style={{
      background:`linear-gradient(160deg, ${C.BG3} 0%, ${C.BG4} 100%)`,
      padding:'90px 28px', position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.055}/>
      <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle title="مختارات التفسير"/>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:22 }}>
          {items.map(item => (
            <div key={item.label} style={{
              background:`linear-gradient(165deg, ${item.color}14, ${C.CARD})`,
              border:`1px solid ${item.color}28`,
              borderRadius:22, padding:'30px 26px',
              position:'relative', overflow:'hidden', transition:'all 0.3s',
              boxShadow:`0 6px 24px rgba(0,0,0,0.32)`,
            }}
            dir="rtl"
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${item.color}58`;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 18px 42px rgba(0,0,0,0.38)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${item.color}28`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 6px 24px rgba(0,0,0,0.32)`;}}>

              {/* قوس زخرفي خلفي */}
              <div style={{ position:'absolute', bottom:-32, left:'50%', transform:'translateX(-50%)', opacity:0.06, pointerEvents:'none' }}>
                <MoorishArch width={320} height={130} color={item.colorL} opacity={1}/>
              </div>

              <div style={{
                display:'inline-flex', alignItems:'center', gap:7,
                background:`${item.color}1c`, border:`1px solid ${item.color}38`,
                borderRadius:22, padding:'5px 14px', marginBottom:18,
                color:item.colorL, fontSize:'0.82rem', fontWeight:700,
                fontFamily:'Noto Naskh Arabic,serif',
              }}>
                {item.icon} {item.label}
              </div>

              <p style={{
                fontFamily:'Amiri,serif', fontSize:'1.35rem', color:C.G7,
                lineHeight:2.0, marginBottom:10,
                textShadow:`0 0 20px ${C.G4}30`,
              }}>{item.ayah}</p>
              <p style={{ fontSize:'0.74rem', color:item.colorL, fontWeight:700, fontFamily:'Noto Naskh Arabic,serif', marginBottom:16 }}>{item.ref}</p>

              <p style={{
                fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.92rem',
                color:C.CREAM, lineHeight:2.1, margin:0,
                borderRight:`2.5px solid ${item.color}50`, paddingRight:14,
              }}>{item.text}</p>

              <button onClick={()=>navigate('/part1')} style={{
                marginTop:20, background:'transparent',
                border:`1px solid ${item.color}38`, borderRadius:9,
                padding:'8px 18px', color:item.colorL, fontSize:'0.84rem',
                fontWeight:700, fontFamily:'Noto Naskh Arabic,serif', cursor:'pointer', transition:'all 0.2s',
              }}
              onMouseEnter={e=>e.currentTarget.style.background=`${item.color}18`}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                اقرأ التفسير كاملاً ←
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   🌐 MULTILINGUAL — نافذة معمارية للغات
═══════════════════════════════════════════════════════════ */
function MultilingualSection({ lang, onLangChange }) {
  const samples = {
    ar:{ title:'فيوض التأويل المعاصر', text:'قراءة تفسيرية معاصرة تجمع بين البيان القرآني والتدبر التربوي والبصيرة النفسية' },
    en:{ title:'Streams of Contemporary Tafsir', text:'A contemporary exegetical reading combining Quranic eloquence, pedagogical contemplation, and spiritual insight' },
    ur:{ title:'عصری تفسیر کے فیوض', text:'ایک جدید تفسیری مطالعہ جو قرآنی بیان، تربیتی تدبر اور نفسیاتی بصیرت کو یکجا کرتا ہے' },
    id:{ title:'Tafsir Kontemporer', text:'Tafsir Quran kontemporer yang memadukan keindahan bayan, kontemplasi pedagogis, dan wawasan spiritual' },
    tr:{ title:'Çağdaş Tefsir Kaynakları', text:'Kuranın beyan güzelliğini, terbiyevi tefekkürü ve ruhsal kavrayışı bir araya getiren çağdaş bir tefsir' },
  };
  const cur = samples[lang] || samples.ar;
  const dir = ['ar','ur'].includes(lang) ? 'rtl' : 'ltr';

  return (
    <section style={{
      background:`linear-gradient(135deg, ${C.BG0} 0%, ${C.BG1} 50%, ${C.BG0} 100%)`,
      padding:'90px 28px', position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.08}/>
      <div style={{
        position:'absolute', inset:0,
        background:`radial-gradient(ellipse 60% 50% at 50% 50%, ${C.G2}10 0%, transparent 65%)`,
        pointerEvents:'none',
      }}/>

      <div style={{ maxWidth:950, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle title="تجربة متعددة اللغات"
          subtitle="القرآن يخاطب العالم — اقرأ التفسير بلغتك"/>

        {/* أزرار اللغات الكبيرة */}
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:38 }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={()=>onLangChange(l.code)} style={{
              background: lang===l.code
                ? `linear-gradient(135deg, ${C.G2}, ${C.G4}, ${C.G5})`
                : `rgba(250,245,232,0.05)`,
              color: lang===l.code ? C.DARK : C.TW2,
              border:`1.5px solid ${lang===l.code ? C.G5 : C.BD2}`,
              borderRadius:14, padding:'11px 22px',
              fontSize:'0.92rem', fontWeight:700, cursor:'pointer',
              fontFamily: ['ar','ur'].includes(l.code) ? 'Noto Naskh Arabic,serif':'Inter,sans-serif',
              transition:'all 0.22s', display:'flex', alignItems:'center', gap:9,
              boxShadow: lang===l.code ? `0 6px 20px ${C.G3}50` : '0 2px 8px rgba(0,0,0,0.25)',
              backdropFilter: lang===l.code ? 'none' : 'blur(8px)',
            }}
            onMouseEnter={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.G4;e.currentTarget.style.color=C.G6;e.currentTarget.style.background=C.GLOW2;}}}
            onMouseLeave={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.BD2;e.currentTarget.style.color=C.TW2;e.currentTarget.style.background='rgba(250,245,232,0.05)';}}}
            >
              <span style={{fontSize:'1.15rem'}}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        {/* نافذة العرض المعمارية */}
        <div style={{
          position:'relative',
          background:`linear-gradient(160deg,
            rgba(250,245,232,0.065),
            rgba(212,168,67,0.04) 100%)`,
          border:`1px solid ${C.BD4}`,
          borderRadius:'0 0 22px 22px',
          padding:'44px 48px 40px',
          boxShadow:`
            0 12px 50px rgba(0,0,0,0.45),
            inset 0 1px 0 ${C.G5}20,
            inset 0 0 40px rgba(0,0,0,0.2)
          `,
        }}>
          {/* قوس مغربي علوي */}
          <div style={{ position:'absolute', top:-44, left:'50%', transform:'translateX(-50%)', width:'85%' }}>
            <MoorishArch width={700} height={48} color={C.G4} opacity={0.65}/>
          </div>

          <div dir={dir} style={{ transition:'all 0.35s' }}>
            <h3 style={{
              fontFamily: dir==='rtl' ? 'Amiri,serif' : 'Playfair Display,serif',
              fontSize:'2.1rem', fontWeight:700, marginBottom:18,
              background:`linear-gradient(135deg, ${C.G4}, ${C.G6}, ${C.G7})`,
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              filter:`drop-shadow(0 0 20px ${C.G3}30)`,
            }}>{cur.title}</h3>
            <p style={{
              fontFamily: dir==='rtl' ? 'Noto Naskh Arabic,serif' : 'Inter,sans-serif',
              fontSize:'1.05rem', color:C.CREAM, lineHeight:2.2,
            }}>{cur.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ⚙️ FEATURES — خصائص المنصة
═══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const items = [
    { icon:<Search size={22}/>,     color:C.TEAL2, light:C.TEAL4, title:'البحث الذكي',        text:'بحث بالآية والكلمة والموضوع والجذر اللغوي', badge:'متاح' },
    { icon:<Layers size={22}/>,     color:C.G3,    light:C.G6,    title:'مقارنة الآيات',      text:'مقارنة التفسيرات وربط الآيات ذات الموضوع الواحد', badge:'قريباً' },
    { icon:<Map size={22}/>,        color:C.BLUE2, light:C.BLUE4, title:'خرائط المعرفة',      text:'خرائط ذهنية للمواضيع القرآنية وترابطها', badge:'قريباً' },
    { icon:<Volume2 size={22}/>,    color:C.RUBY,  light:C.RUBY2, title:'التفسير الصوتي',     text:'الاستماع للتفسير بأصوات عالية الجودة', badge:'قريباً' },
    { icon:<BookMarked size={22}/>, color:C.G2,    light:C.G5,    title:'المسارات الموضوعية', text:'تصفح التفسير حسب المواضيع والأبعاد', badge:'متاح' },
    { icon:<Globe size={22}/>,      color:C.TEAL,  light:C.TEAL3, title:'خمس لغات',           text:'العربية والإنجليزية والأردو والإندونيسية والتركية', badge:'متاح' },
  ];

  return (
    <section id="features" style={{
      background:`linear-gradient(180deg, ${C.BG4} 0%, ${C.BG3} 100%)`,
      padding:'90px 28px', position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.05}/>
      <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
        <SectionTitle title="خصائص المنصة"/>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:18 }}>
          {items.map(f => (
            <div key={f.title} style={{
              background:`linear-gradient(160deg, ${f.color}14, ${C.CARD})`,
              border:`1px solid ${f.color}22`,
              borderRadius:18, padding:'28px 24px', position:'relative',
              transition:'all 0.27s',
              boxShadow:`0 4px 18px rgba(0,0,0,0.25)`,
            }}
            dir="rtl"
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${f.color}58`;e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 14px 34px rgba(0,0,0,0.32)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${f.color}22`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 18px rgba(0,0,0,0.25)`;}}>
              {/* شارة الحالة */}
              <span style={{
                position:'absolute', top:14, left:14,
                background: f.badge==='متاح' ? `${C.TEAL2}28` : `${C.G3}22`,
                color: f.badge==='متاح' ? C.TEAL4 : C.G5,
                border:`1px solid ${f.badge==='متاح' ? C.TEAL3 : C.G4}32`,
                borderRadius:20, padding:'3px 10px', fontSize:'0.7rem', fontWeight:700,
                fontFamily:'Noto Naskh Arabic,serif',
              }}>{f.badge}</span>
              {/* أيقونة */}
              <div style={{
                width:54, height:54, borderRadius:14, marginBottom:16,
                background:`${f.color}20`, border:`1.5px solid ${f.color}38`,
                display:'flex', alignItems:'center', justifyContent:'center', color:f.light,
              }}>{f.icon}</div>
              <div style={{ fontFamily:'Noto Naskh Arabic,serif', fontWeight:700, color:C.IVORY, fontSize:'1rem', marginBottom:10 }}>{f.title}</div>
              <div style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.88rem', color:C.TW2, lineHeight:2 }}>{f.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   📧 NEWSLETTER — الاشتراك
═══════════════════════════════════════════════════════════ */
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <section style={{
      background:`linear-gradient(180deg, ${C.BG3} 0%, ${C.BG2} 100%)`,
      padding:'80px 28px', position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.06}/>
      <div style={{
        position:'absolute', inset:0,
        background:`radial-gradient(ellipse at 50% 50%, ${C.G2}10 0%, transparent 60%)`,
        pointerEvents:'none',
      }}/>

      <div style={{ maxWidth:600, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }} dir="rtl">
        <OrnamentalDivider/>
        <h2 style={{
          fontFamily:'Amiri,serif', fontSize:'clamp(1.7rem,3vw,2.3rem)',
          background:`linear-gradient(135deg, ${C.G4}, ${C.G6}, ${C.G7})`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text', margin:'10px 0 14px',
        }}>تابع الإضافات الجديدة</h2>
        <p style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.95rem', color:C.TW2, lineHeight:2, marginBottom:30 }}>
          اشترك ليصلك كل جديد — آيات وتفسيرات وسور جديدة
        </p>

        {done ? (
          <div style={{ background:`${C.TEAL}22`, border:`1px solid ${C.TEAL4}45`, borderRadius:14, padding:'16px 28px', color:C.TEAL4, fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.95rem' }}>
            ✅ شكراً! تم تسجيل اشتراكك
          </div>
        ) : (
          <div style={{ display:'flex', gap:12 }}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني" dir="rtl"
              style={{
                flex:1, background:'rgba(250,245,232,0.05)',
                border:`1.5px solid ${C.BD2}`, borderRadius:14,
                padding:'13px 18px', color:C.IVORY, fontSize:'0.92rem',
                fontFamily:'Noto Naskh Arabic,serif', outline:'none',
              }}/>
            <button onClick={()=>email&&setDone(true)} style={{
              background:`linear-gradient(135deg, ${C.G2}, ${C.G5})`,
              color:C.DARK, border:'none', borderRadius:14,
              padding:'13px 26px', fontSize:'0.92rem', fontWeight:800,
              fontFamily:'Noto Naskh Arabic,serif', cursor:'pointer',
              whiteSpace:'nowrap', flexShrink:0,
              boxShadow:`0 5px 18px ${C.G3}45`,
            }}>اشترك</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   🏰 FOOTER — ذيل الصفحة بطراز القصر الإسلامي
═══════════════════════════════════════════════════════════ */
function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{
      background:`linear-gradient(180deg, ${C.BG2} 0%, ${C.BG0} 100%)`,
      borderTop:`1px solid ${C.BD3}`, padding:'60px 28px 32px',
      position:'relative', overflow:'hidden',
    }}>
      <GiridPattern opacity={0.04}/>

      {/* مقرنصات الأعلى */}
      <div style={{ position:'absolute', top:0, left:0, right:0, opacity:0.45 }}>
        <MuqarnasBand height={32}/>
      </div>

      {/* خط ذهبي علوي */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent 0%, ${C.G3} 20%, ${C.G6} 50%, ${C.G3} 80%, transparent 100%)` }}/>

      <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:40, marginBottom:40 }} dir="rtl">

          {/* العلامة التجارية */}
          <div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:14, marginBottom:16 }}>
              <div style={{
                width:96, height:96, borderRadius:'50% 50% 16px 16px',
                border:`1.5px solid ${C.G4}65`,
                overflow:'hidden', background:C.BG0,
                boxShadow:`0 0 24px ${C.G3}22`,
              }}>
                <img src="/logo.png" alt="Logo" style={{ width:'100%', height:'100%', objectFit:'contain', padding:5 }}/>
              </div>
              <div style={{
                fontFamily:'Amiri,serif', fontSize:'1.15rem',
                background:`linear-gradient(135deg, ${C.G4}, ${C.G6})`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                fontWeight:700,
              }}>فيوض التأويل المعاصر</div>
            </div>
            <p style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.82rem', color:C.TW4, lineHeight:2 }}>
              مشروع تفسيري قرآني معاصر يقدم سورة البقرة بأسلوب متعدد الأبعاد
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 style={{ fontFamily:'Noto Naskh Arabic,serif', color:C.G5, fontSize:'0.92rem', fontWeight:700, marginBottom:16 }}>روابط سريعة</h4>
            {[
              { label:'الجزء الأول', fn:()=>navigate('/part1') },
              { label:'الجزء الثاني', fn:()=>navigate('/part2') },
              { label:'عن المشروع', fn:()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'}) },
              { label:'البحث في التفسير', fn:()=>document.getElementById('search-sec')?.scrollIntoView({behavior:'smooth'}) },
            ].map(l => (
              <div key={l.label} style={{ marginBottom:10 }}>
                <button onClick={l.fn} style={{
                  background:'none', border:'none', color:C.TW2, fontSize:'0.85rem',
                  fontFamily:'Noto Naskh Arabic,serif', cursor:'pointer', padding:0, transition:'color 0.2s',
                }}
                onMouseEnter={e=>e.currentTarget.style.color=C.G5}
                onMouseLeave={e=>e.currentTarget.style.color=C.TW2}>
                  ← {l.label}
                </button>
              </div>
            ))}
          </div>

          {/* اللغات */}
          <div>
            <h4 style={{ fontFamily:'Noto Naskh Arabic,serif', color:C.G5, fontSize:'0.92rem', fontWeight:700, marginBottom:16 }}>اللغات</h4>
            {LANGUAGES.map(l => (
              <div key={l.code} style={{ marginBottom:8, fontSize:'0.84rem', color:C.TW3,
                fontFamily:['ar','ur'].includes(l.code)?'Noto Naskh Arabic,serif':'Inter,sans-serif' }}>
                {l.flag} {l.label}
              </div>
            ))}
          </div>

          {/* تواصل */}
          <div>
            <h4 style={{ fontFamily:'Noto Naskh Arabic,serif', color:C.G5, fontSize:'0.92rem', fontWeight:700, marginBottom:16 }}>تواصل معنا</h4>
            <p style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.82rem', color:C.TW4, lineHeight:2 }}>
              للتواصل والملاحظات العلمية حول المشروع
            </p>
            <a href="mailto:info@fuyud-tafsir.com" style={{
              display:'inline-flex', alignItems:'center', gap:7,
              color:C.G5, fontSize:'0.82rem', fontFamily:'Inter,sans-serif',
              textDecoration:'none', marginTop:10, transition:'color 0.2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.color=C.G7}
            onMouseLeave={e=>e.currentTarget.style.color=C.G5}>
              <Mail size={14}/> info@fuyud-tafsir.com
            </a>
          </div>
        </div>

        <OrnamentalDivider/>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:14 }} dir="rtl">
          <p style={{ fontFamily:'Noto Naskh Arabic,serif', fontSize:'0.78rem', color:C.TW4, margin:0 }}>
            © ١٤٤٦ هـ | فيوض التأويل المعاصر — جميع الحقوق محفوظة
          </p>
          <div style={{ display:'flex', gap:22 }}>
            {['سياسة الخصوصية','شروط الاستخدام'].map(t=>(
              <span key={t} style={{ fontSize:'0.75rem', color:C.TW4, fontFamily:'Noto Naskh Arabic,serif', cursor:'pointer', transition:'color 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.color=C.G5}
              onMouseLeave={e=>e.currentTarget.style.color=C.TW4}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   🏠 MAIN HOMEPAGE
═══════════════════════════════════════════════════════════ */
export default function HomePage({ lang, onLangChange }) {
  return (
    <div style={{ background:C.BG1, minHeight:'100vh', direction:'rtl' }}>
      <style>{`
        @keyframes heroGlow {
          0%, 100% { opacity:0.35; transform:scale(1); }
          50%       { opacity:0.65; transform:scale(1.08); }
        }
        .nav-desktop { display:flex; }
        @media(max-width:768px){ .nav-desktop{display:none!important;} }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::-webkit-scrollbar { width:8px; background:${C.BG1}; }
        ::-webkit-scrollbar-thumb { background:${C.G2}; border-radius:8px; }
        ::-webkit-scrollbar-thumb:hover { background:${C.G4}; }
        ::selection { background:${C.G3}55; color:${C.IVORY}; }
      `}</style>

      <Header lang={lang} onLangChange={onLangChange}/>
      <HeroSection/>
      <SearchSection/>
      <AboutSection/>
      <SurahsSection/>
      <PathsSection/>
      <FeaturedSection/>
      <MultilingualSection lang={lang} onLangChange={onLangChange}/>
      <FeaturesSection/>
      <NewsletterSection/>
      <Footer/>
    </div>
  );
}
