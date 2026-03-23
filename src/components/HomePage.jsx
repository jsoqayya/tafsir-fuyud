import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ══════════════════════════════════════════════════════
   COLORS & TOKENS
══════════════════════════════════════════════════════ */
const C = {
  emerald:     '#1a4731',
  emeraldMid:  '#1e5c3a',
  emeraldLight:'#2a7a50',
  teal:        '#0d3d2e',
  gold:        '#b8973a',
  goldLight:   '#d4af5a',
  goldPale:    '#e8d08a',
  ivory:       '#faf7f0',
  parchment:   '#f4efe4',
  cream:       '#ede8dc',
  textDark:    '#1a1a1a',
  textMid:     '#3a3a3a',
  textLight:   '#6b6b6b',
  border:      '#ddd5c0',
  borderLight: '#ece7da',
  white:       '#ffffff',
  navy:        '#0f1e35',
};

/* ══════════════════════════════════════════════════════
   LANGUAGE DATA
══════════════════════════════════════════════════════ */
const LANGUAGES = [
  { code:'ar', label:'العربية',         flag:'🇸🇦', dir:'rtl', greeting:'بِسْمِ اللَّهِ' },
  { code:'en', label:'English',         flag:'🇬🇧', dir:'ltr', greeting:'In the Name of Allah' },
  { code:'ur', label:'اردو',            flag:'🇵🇰', dir:'rtl', greeting:'بِسْمِ اللَّهِ' },
  { code:'id', label:'Bahasa Indonesia',flag:'🇮🇩', dir:'ltr', greeting:'Bismillah' },
  { code:'tr', label:'Türkçe',          flag:'🇹🇷', dir:'ltr', greeting:'Bismillah' },
];

/* ══════════════════════════════════════════════════════
   SVG DECORATIVE ELEMENTS
══════════════════════════════════════════════════════ */
function GeomPattern({ opacity = 0.06, size = 400 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none"
      style={{ opacity, display:'block', pointerEvents:'none' }}>
      {/* outer frame */}
      <rect x="10" y="10" width="380" height="380" fill="none"
        stroke={C.gold} strokeWidth="1" />
      <rect x="20" y="20" width="360" height="360" fill="none"
        stroke={C.gold} strokeWidth="0.5" />
      {/* 8-point star */}
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <g key={i} transform={`translate(200,200) rotate(${a})`}>
          <polygon points="0,-160 18,-100 0,-80 -18,-100" fill={C.gold}/>
        </g>
      ))}
      <circle cx="200" cy="200" r="78" fill="none" stroke={C.gold} strokeWidth="1.2"/>
      <circle cx="200" cy="200" r="56" fill="none" stroke={C.gold} strokeWidth="0.7"/>
      <polygon points="200,122 256,156 256,224 200,258 144,224 144,156"
        fill="none" stroke={C.gold} strokeWidth="1"/>
      {/* corner ornaments */}
      {[[30,30],[370,30],[30,370],[370,370]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`}>
          <circle r="8" fill="none" stroke={C.gold} strokeWidth="1"/>
          <circle r="3" fill={C.gold} opacity="0.6"/>
        </g>
      ))}
      {/* side ornaments */}
      {[[200,30],[370,200],[200,370],[30,200]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`}>
          <polygon points="0,-12 8,-4 12,0 8,4 0,12 -8,4 -12,0 -8,-4"
            fill="none" stroke={C.gold} strokeWidth="0.8"/>
        </g>
      ))}
    </svg>
  );
}

function GoldDivider({ width = '100%', margin = '0' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, margin, width }}>
      <div style={{ flex:1, height:'1px',
        background:`linear-gradient(to right, transparent, ${C.gold}60, transparent)` }}/>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <polygon points="10,1 12.4,7.6 19,10 12.4,12.4 10,19 7.6,12.4 1,10 7.6,7.6"
          fill={C.gold} opacity="0.7"/>
      </svg>
      <div style={{ flex:1, height:'1px',
        background:`linear-gradient(to left, transparent, ${C.gold}60, transparent)` }}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   0. LANGUAGE SELECTION SPLASH (first screen)
══════════════════════════════════════════════════════ */
function LanguageSplash({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      background:`linear-gradient(160deg, ${C.teal} 0%, ${C.emerald} 40%, ${C.emeraldMid} 100%)`,
      position:'relative', overflow:'hidden', padding:'40px 20px',
    }}>
      {/* bg pattern */}
      <div style={{ position:'absolute', top:-100, right:-100, opacity:0.07 }}>
        <GeomPattern size={500}/>
      </div>
      <div style={{ position:'absolute', bottom:-100, left:-100, opacity:0.05 }}>
        <GeomPattern size={400}/>
      </div>

      {/* gold top line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
        background:`linear-gradient(90deg, transparent, ${C.gold}, ${C.goldPale}, ${C.gold}, transparent)` }}/>

      {/* logo */}
      <div style={{ marginBottom:36, textAlign:'center' }}>
        <img src="/logo.png" alt="فيوض التأويل المعاصر"
          style={{ width:160, height:'auto', display:'block', margin:'0 auto 20px',
            filter:'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
          onError={e=>{e.target.style.display='none'}}/>
        <div style={{ height:1, width:200, margin:'0 auto 16px',
          background:`linear-gradient(90deg, transparent, ${C.gold}80, transparent)` }}/>
        <p style={{ color:`${C.goldPale}90`, fontSize:'0.8rem',
          fontFamily:'Noto Naskh Arabic, serif', letterSpacing:2 }}>
          اختر لغتك • Choose Your Language
        </p>
      </div>

      {/* language cards */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',
        gap:14, width:'100%', maxWidth:780,
      }}>
        {LANGUAGES.map(lang => (
          <button key={lang.code}
            onClick={() => onSelect(lang.code)}
            onMouseEnter={() => setHovered(lang.code)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered===lang.code
                ? `linear-gradient(135deg, ${C.gold}25, ${C.gold}10)`
                : `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`,
              border: `1px solid ${hovered===lang.code ? C.gold+'90' : C.gold+'28'}`,
              borderRadius:14, padding:'22px 18px',
              cursor:'pointer', textAlign:'center',
              transform: hovered===lang.code ? 'translateY(-4px)' : 'none',
              boxShadow: hovered===lang.code ? `0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px ${C.gold}30` : 'none',
              transition:'all 0.25s ease',
            }}>
            <div style={{ fontSize:'2.2rem', marginBottom:10, lineHeight:1 }}>{lang.flag}</div>
            <div style={{
              fontFamily: lang.dir==='rtl' ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              fontSize: lang.code==='id' ? '0.82rem' : '1.05rem',
              fontWeight:700, color: C.goldPale, marginBottom:6,
            }}>{lang.label}</div>
            <div style={{
              fontFamily:'Amiri, serif', fontSize:'0.78rem',
              color:`${C.goldPale}60`, fontStyle:'italic',
            }}>{lang.greeting}</div>
          </button>
        ))}
      </div>

      <div style={{ marginTop:32, color:`${C.goldPale}40`, fontSize:'0.72rem',
        fontFamily:'Inter, sans-serif', letterSpacing:1 }}>
        يمكن تغيير اللغة في أي وقت • Language can be changed anytime
      </div>

      {/* gold bottom line */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${C.gold}, ${C.goldPale}, ${C.gold}, transparent)` }}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   1. HEADER
══════════════════════════════════════════════════════ */
function Header({ lang, setLang, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isRTL = ['ar','ur'].includes(lang);

  const navItems = {
    ar: ['الرئيسية','السور','البحث','المسارات','عن المشروع'],
    en: ['Home','Surahs','Search','Pathways','About'],
    ur: ['ہوم','سورتیں','تلاش','راستے','منصوبے کے بارے میں'],
    id: ['Beranda','Surah','Cari','Jalur','Tentang'],
    tr: ['Ana Sayfa','Sureler','Ara','Yollar','Hakkında'],
  };

  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background: scrolled
        ? `${C.emerald}f8`
        : `linear-gradient(180deg, ${C.teal}ee 0%, ${C.teal}aa 100%)`,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.gold}30` : '1px solid transparent',
      boxShadow: scrolled ? `0 4px 24px rgba(0,0,0,0.25)` : 'none',
      transition:'all 0.3s ease',
    }}>
      {/* top language bar */}
      <div style={{
        borderBottom:`1px solid ${C.gold}18`,
        padding:'6px 32px', display:'flex', justifyContent:'flex-end',
        alignItems:'center', gap:6, direction:'ltr',
      }}>
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => setLang(l.code)}
            style={{
              background: lang===l.code ? `${C.gold}25` : 'transparent',
              border: `1px solid ${lang===l.code ? C.gold+'60' : 'transparent'}`,
              color: lang===l.code ? C.goldPale : `${C.goldPale}60`,
              padding:'2px 10px', borderRadius:20, fontSize:'0.7rem',
              fontFamily: l.dir==='rtl' ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              cursor:'pointer', transition:'all 0.2s',
              fontWeight: lang===l.code ? 700 : 400,
            }}>
            {l.flag} {l.label}
          </button>
        ))}
      </div>

      {/* main header */}
      <div style={{
        maxWidth:1280, margin:'0 auto', padding:'12px 32px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        {/* logo + title */}
        <div style={{ display:'flex', alignItems:'center', gap:14, cursor:'pointer' }}
          onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <img src="/logo.png" alt="logo"
            style={{ width:52, height:'auto', filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
            onError={e=>{e.target.style.display='none'}}/>
          <div>
            <div style={{
              fontFamily:'Amiri, serif', fontSize:'1.2rem', color:C.goldPale,
              lineHeight:1.2, fontWeight:700,
            }}>فيوض التأويل المعاصر</div>
            <div style={{
              fontFamily:'Inter, sans-serif', fontSize:'0.65rem',
              color:`${C.goldPale}60`, letterSpacing:1, marginTop:2,
            }}>FUYUD AL-TAWEEL AL-MU'ASIR</div>
          </div>
        </div>

        {/* nav */}
        <nav style={{ display:'flex', gap:28, alignItems:'center' }}>
          {(navItems[lang]||navItems.ar).map((item,i) => (
            <span key={i} style={{
              color:`${C.goldPale}85`, fontSize:'0.82rem',
              fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              cursor:'pointer', transition:'color 0.2s',
              fontWeight:500,
            }}
            onMouseEnter={e => e.target.style.color=C.goldPale}
            onMouseLeave={e => e.target.style.color=`${C.goldPale}85`}
            >{item}</span>
          ))}
          {/* CTA */}
          <button onClick={() => navigate('/ar/baqarah/1')}
            style={{
              background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              color:C.teal, border:'none', borderRadius:24,
              padding:'8px 20px', fontSize:'0.8rem', fontWeight:700,
              fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              cursor:'pointer', boxShadow:`0 4px 14px ${C.gold}40`,
              whiteSpace:'nowrap',
            }}>
            {lang==='ar'?'ابدأ التفسير': lang==='en'?'Start Reading': lang==='ur'?'پڑھنا شروع کریں': lang==='id'?'Mulai Membaca':'Okumaya Başla'}
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════
   2. HERO SECTION
══════════════════════════════════════════════════════ */
function HeroSection({ lang, navigate }) {
  const isRTL = ['ar','ur'].includes(lang);

  const heroText = {
    ar: {
      title:'فيوض التأويل المعاصر',
      sub:'منصة تفسيرية معرفية تجمع بين أصالة التفسير ووعي الإنسان المعاصر',
      desc:'قراءة تفسيرية رصينة بلغة تصل إلى الروح والعقل والحياة، تجمع بين البيان القرآني والتدبر التربوي والبصيرة النفسية',
      btn1:'ابدأ التصفح', btn2:'تصفح السور', btn3:'عن المشروع',
      tagline:'أصالة التفسير... ووعي الإنسان المعاصر',
    },
    en: {
      title:'Fuyud Al-Taweel Al-Muasir',
      sub:'A scholarly tafsir platform combining classical authenticity with contemporary insight',
      desc:'A refined Quranic reading that reaches the soul, mind, and life — uniting linguistic excellence, pedagogical reflection, and spiritual depth',
      btn1:'Start Reading', btn2:'Browse Surahs', btn3:'About',
      tagline:'Rooted scholarship for the contemporary mind',
    },
    ur: {
      title:'فيوض التأويل المعاصر',
      sub:'ایک علمی تفسیری پلیٹ فارم جو کلاسیکی اصالت اور عصری بصیرت کو یکجا کرتا ہے',
      desc:'قرآنی تفسیر کی ایک باوقار قرائت جو روح، عقل اور زندگی تک پہنچتی ہے',
      btn1:'پڑھنا شروع کریں', btn2:'سورتیں دیکھیں', btn3:'منصوبے کے بارے میں',
      tagline:'تفسیر کی اصالت اور معاصر انسان کا شعور',
    },
    id: {
      title:'Fuyud Al-Taweel Al-Muasir',
      sub:'Platform tafsir ilmiah yang memadukan keaslian klasik dengan wawasan kontemporer',
      desc:'Bacaan tafsir yang halus menjangkau jiwa, akal, dan kehidupan',
      btn1:'Mulai Membaca', btn2:'Jelajahi Surah', btn3:'Tentang',
      tagline:'Keaslian tafsir untuk pikiran kontemporer',
    },
    tr: {
      title:'Fuyud Al-Taweel Al-Muasir',
      sub:'Klasik özgünlüğü çağdaş içgörüyle birleştiren ilmi tefsir platformu',
      desc:'Ruha, akla ve hayata ulaşan rafine bir Kuran okuması',
      btn1:'Okumaya Başla', btn2:'Sureleri Gözat', btn3:'Hakkında',
      tagline:'Çağdaş zihin için köklü ilim',
    },
  };
  const t = heroText[lang] || heroText.ar;

  return (
    <section style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:`linear-gradient(160deg, ${C.teal} 0%, ${C.emerald} 50%, ${C.emeraldMid} 100%)`,
      position:'relative', overflow:'hidden', paddingTop:120,
    }}>
      {/* bg ornaments */}
      <div style={{ position:'absolute', top:-80, right:-80, opacity:0.07 }}>
        <GeomPattern size={480}/>
      </div>
      <div style={{ position:'absolute', bottom:-60, left:-60, opacity:0.05 }}>
        <GeomPattern size={360}/>
      </div>
      {/* soft radial glow */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:600, height:600, borderRadius:'50%',
        background:`radial-gradient(circle, ${C.gold}10 0%, transparent 70%)`,
        pointerEvents:'none',
      }}/>

      <div style={{
        maxWidth:900, margin:'0 auto', padding:'60px 32px',
        textAlign:'center', position:'relative', zIndex:1,
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        {/* bismillah */}
        <div style={{
          fontFamily:'Amiri, serif', fontSize:'1.4rem',
          color:`${C.goldPale}70`, marginBottom:24, lineHeight:1.6,
        }}>
          ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾
        </div>

        <GoldDivider margin="0 auto 32px" width="300px"/>

        {/* main title */}
        <h1 style={{
          fontFamily:'Amiri, serif',
          fontSize:'clamp(2.6rem, 6vw, 4.2rem)',
          color:C.goldPale,
          margin:'0 0 20px',
          lineHeight:1.2,
          textShadow:`0 4px 40px ${C.gold}40`,
          fontWeight:700,
        }}>{t.title}</h1>

        {/* subtitle */}
        <p style={{
          fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
          fontSize:'clamp(1rem, 2.5vw, 1.25rem)',
          color:`${C.goldPale}90`,
          maxWidth:700, margin:'0 auto 16px',
          lineHeight:1.9, fontWeight:500,
        }}>{t.sub}</p>

        <p style={{
          fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
          fontSize:'clamp(0.88rem, 2vw, 1rem)',
          color:`${C.goldPale}65`,
          maxWidth:580, margin:'0 auto 36px', lineHeight:1.9,
        }}>{t.desc}</p>

        <GoldDivider margin="0 auto 36px" width="200px"/>

        {/* tagline */}
        <div style={{
          fontFamily:'Amiri, serif', fontSize:'1.1rem',
          color:`${C.gold}`, marginBottom:44,
          fontStyle:'italic',
        }}>"{t.tagline}"</div>

        {/* CTA buttons */}
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          {[
            { label:t.btn1, primary:true, path:'/ar/baqarah/1' },
            { label:t.btn2, primary:false },
            { label:t.btn3, primary:false },
          ].map((btn,i) => (
            <button key={i}
              onClick={() => btn.path && navigate(btn.path)}
              style={{
                background: btn.primary
                  ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`
                  : 'transparent',
                color: btn.primary ? C.teal : C.goldPale,
                border: btn.primary
                  ? 'none'
                  : `1.5px solid ${C.gold}55`,
                borderRadius:32, padding:'13px 30px',
                fontSize:'0.9rem', fontWeight:700,
                fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
                cursor:'pointer',
                boxShadow: btn.primary ? `0 6px 24px ${C.gold}40` : 'none',
                transition:'all 0.25s',
              }}
              onMouseEnter={e => {
                if(!btn.primary){ e.currentTarget.style.background=`${C.gold}15`; e.currentTarget.style.borderColor=C.gold; }
                else e.currentTarget.style.transform='translateY(-2px)';
              }}
              onMouseLeave={e => {
                if(!btn.primary){ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor=`${C.gold}55`; }
                else e.currentTarget.style.transform='translateY(0)';
              }}
            >{btn.label}</button>
          ))}
        </div>

        {/* scroll indicator */}
        <div style={{ marginTop:60, animation:'bounce 2s infinite' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            style={{ margin:'0 auto', display:'block', opacity:0.4 }}>
            <path d="M7 10l5 5 5-5" stroke={C.goldPale} strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   3. SEARCH SECTION
══════════════════════════════════════════════════════ */
function SearchSection({ lang }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('الآية');
  const isRTL = ['ar','ur'].includes(lang);

  const filters = {
    ar:['الآية','السورة','الموضوع','الكلمة','الجذر'],
    en:['Verse','Surah','Topic','Word','Root'],
    ur:['آیت','سورت','موضوع','لفظ','جذر'],
    id:['Ayat','Surah','Topik','Kata','Akar'],
    tr:['Ayet','Sure','Konu','Kelime','Kök'],
  };

  const quickCards = {
    ar:[
      { icon:'📖', title:'السياق التفسيري',   color:'#1a5c38' },
      { icon:'✨', title:'الفيوض البيانية',    color:'#1a4a5c' },
      { icon:'🌿', title:'الفيوض التدبرية',   color:'#2a5c1a' },
      { icon:'💫', title:'الفيوض الروحانية',  color:'#4a2a5c' },
      { icon:'🔬', title:'الفيوض الإعجازية',  color:'#5c3a1a' },
      { icon:'🌐', title:'الفيوض المعاصرة',   color:'#1a3a5c' },
    ],
    en:[
      { icon:'📖', title:'Tafsir Context',     color:'#1a5c38' },
      { icon:'✨', title:'Linguistic Gems',    color:'#1a4a5c' },
      { icon:'🌿', title:'Contemplative Flow', color:'#2a5c1a' },
      { icon:'💫', title:'Spiritual Insights', color:'#4a2a5c' },
      { icon:'🔬', title:'Scientific Miracles',color:'#5c3a1a' },
      { icon:'🌐', title:'Contemporary Gems',  color:'#1a3a5c' },
    ],
  };
  const cards = quickCards[lang] || quickCards.ar;
  const filterList = filters[lang] || filters.ar;

  return (
    <section style={{
      background:C.ivory, padding:'64px 32px',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        {/* title */}
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <h2 style={{
            fontFamily: isRTL ? 'Amiri, serif' : 'Playfair Display, serif',
            fontSize:'clamp(1.6rem, 4vw, 2.2rem)',
            color:C.emerald, marginBottom:10,
          }}>
            {lang==='ar'?'البحث في التفسير': lang==='en'?'Search the Tafsir': lang==='ur'?'تفسیر میں تلاش': lang==='id'?'Cari di Tafsir':'Tefsirde Ara'}
          </h2>
          <GoldDivider margin="0 auto 0" width="160px"/>
        </div>

        {/* search filters */}
        <div style={{
          display:'flex', gap:8, justifyContent:'center',
          flexWrap:'wrap', marginBottom:16,
        }}>
          {filterList.map((f,i) => (
            <button key={i} onClick={() => setFilter(f)}
              style={{
                background: filter===f ? C.emerald : 'transparent',
                color: filter===f ? C.white : C.emerald,
                border:`1.5px solid ${filter===f ? C.emerald : C.border}`,
                borderRadius:24, padding:'6px 18px', fontSize:'0.82rem',
                fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
                cursor:'pointer', transition:'all 0.2s', fontWeight:500,
              }}>{f}</button>
          ))}
        </div>

        {/* search bar */}
        <div style={{
          display:'flex', gap:0, marginBottom:48,
          boxShadow:`0 4px 24px rgba(0,0,0,0.12)`,
          borderRadius:14, overflow:'hidden',
          border:`1.5px solid ${C.border}`,
        }}>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder={lang==='ar'?'ابحث في فيوض التأويل المعاصر...':
              lang==='en'?'Search in Fuyud Al-Taweel...':
              lang==='ur'?'فیوض التأویل میں تلاش کریں...':
              lang==='id'?'Cari di Fuyud Al-Taweel...':'Fuyud Al-Taweel\'de Ara...'}
            style={{
              flex:1, padding:'18px 24px', border:'none', outline:'none',
              fontSize:'1rem', background:C.white, color:C.textDark,
              fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          />
          <button style={{
            background:`linear-gradient(135deg, ${C.emerald}, ${C.emeraldLight})`,
            color:C.white, border:'none', padding:'0 32px',
            fontSize:'0.9rem', fontWeight:700, cursor:'pointer',
            fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
          }}>
            {lang==='ar'?'بحث': lang==='en'?'Search': lang==='ur'?'تلاش': lang==='id'?'Cari':'Ara'}
          </button>
        </div>

        {/* quick access cards */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',
          gap:14,
        }}>
          {cards.map((card,i) => (
            <button key={i} style={{
              background:`linear-gradient(135deg, ${card.color}18, ${card.color}08)`,
              border:`1px solid ${card.color}30`,
              borderRadius:12, padding:'20px 14px',
              cursor:'pointer', textAlign:'center',
              transition:'all 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background=`linear-gradient(135deg, ${card.color}28, ${card.color}14)`;
              e.currentTarget.style.transform='translateY(-3px)';
              e.currentTarget.style.boxShadow=`0 8px 20px ${card.color}20`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background=`linear-gradient(135deg, ${card.color}18, ${card.color}08)`;
              e.currentTarget.style.transform='none';
              e.currentTarget.style.boxShadow='none';
            }}>
              <div style={{ fontSize:'1.8rem', marginBottom:10 }}>{card.icon}</div>
              <div style={{
                fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
                fontSize:'0.82rem', fontWeight:700, color:C.textDark, lineHeight:1.4,
              }}>{card.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   4. PROJECT INTRO SECTION
══════════════════════════════════════════════════════ */
function ProjectIntroSection({ lang }) {
  const isRTL = ['ar','ur'].includes(lang);

  const pillars = [
    { icon:'🏛️', ar:'الأصالة',      en:'Authenticity',  desc_ar:'مرتبط بالمصادر التفسيرية الكبرى', desc_en:'Grounded in classical tafsir sources' },
    { icon:'🔍', ar:'العمق',        en:'Depth',         desc_ar:'يغوص في أغوار المعاني القرآنية',    desc_en:'Diving deep into Quranic meanings' },
    { icon:'🌿', ar:'التدبر',       en:'Contemplation', desc_ar:'يستنطق الآيات لبناء الإنسان',        desc_en:'Inviting reflection and spiritual growth' },
    { icon:'🌐', ar:'المعاصرة',     en:'Contemporaneity',desc_ar:'لغة تصل إلى الإنسان المعاصر',       desc_en:'Language that reaches the modern person' },
    { icon:'🧠', ar:'البناء النفسي',en:'Psychological',  desc_ar:'يعالج أعماق النفس البشرية',         desc_en:'Addressing the depths of the human psyche' },
    { icon:'🌟', ar:'الهداية العملية',en:'Practical Guidance', desc_ar:'تفسير يُترجم إلى حياة',      desc_en:'Tafsir that translates into living' },
  ];

  return (
    <section style={{
      background:C.parchment, padding:'80px 32px',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <p style={{
            fontFamily:'Amiri, serif', fontSize:'1rem',
            color:C.gold, marginBottom:12, letterSpacing:2,
          }}>✦ تعرّف على المشروع ✦</p>
          <h2 style={{
            fontFamily: isRTL ? 'Amiri, serif' : 'Playfair Display, serif',
            fontSize:'clamp(1.7rem, 4vw, 2.4rem)',
            color:C.emerald, marginBottom:14,
          }}>
            {lang==='ar'?'ما هو فيوض التأويل المعاصر؟':
             lang==='en'?'What is Fuyud Al-Taweel?':
             lang==='ur'?'فیوض التأویل المعاصر کیا ہے؟':
             lang==='id'?'Apa itu Fuyud Al-Taweel?':'Fuyud Al-Taweel Nedir?'}
          </h2>
          <GoldDivider margin="0 auto 24px" width="120px"/>
          <p style={{
            fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
            fontSize:'clamp(0.95rem, 2vw, 1.1rem)',
            color:C.textMid, maxWidth:720, margin:'0 auto',
            lineHeight:2,
          }}>
            {lang==='ar'
              ? 'مشروع تفسيري معاصر يسعى إلى إعادة تقديم معاني القرآن الكريم بلغة تلامس واقع الإنسان اليوم، دون إخلال بأصالة العلم ورصانة المنهج. يجمع بين البيان اللغوي، والتدبر التربوي، والبصيرة النفسية، والوعي الحضاري.'
              : lang==='en'
              ? 'A contemporary tafsir project seeking to present the meanings of the Holy Quran in language that touches today\'s human reality, without compromising scholarly authenticity. It combines linguistic brilliance, pedagogical reflection, psychological insight, and civilizational awareness.'
              : 'مشروع تفسیری معاصر جو قرآن کریم کے معانی کو آج کے انسان کی حقیقت سے ہم آہنگ زبان میں پیش کرنے کی کوشش کرتا ہے۔'
            }
          </p>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',
          gap:20,
        }}>
          {pillars.map((p,i) => (
            <div key={i} style={{
              background:C.white, borderRadius:16, padding:'28px 24px',
              border:`1px solid ${C.borderLight}`,
              boxShadow:'0 2px 16px rgba(0,0,0,0.06)',
              transition:'all 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform='translateY(-4px)';
              e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px ${C.gold}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform='none';
              e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.06)';
            }}>
              <div style={{ fontSize:'2rem', marginBottom:14 }}>{p.icon}</div>
              <h3 style={{
                fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
                fontSize:'1.05rem', fontWeight:700, color:C.emerald, marginBottom:8,
              }}>{isRTL ? p.ar : p.en}</h3>
              <p style={{
                fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
                fontSize:'0.85rem', color:C.textLight, lineHeight:1.8, margin:0,
              }}>{isRTL ? p.desc_ar : p.desc_en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   5. BROWSE QURAN SECTION
══════════════════════════════════════════════════════ */
function BrowseSection({ lang, navigate }) {
  const isRTL = ['ar','ur'].includes(lang);

  const surahs = [
    { num:1,  name:'الفاتحة',   en:'Al-Fatiha',  ayahs:7,   type:'مكية', available:false },
    { num:2,  name:'البقرة',    en:'Al-Baqarah', ayahs:286, type:'مدنية', available:true  },
  ];

  return (
    <section style={{
      background:C.ivory, padding:'80px 32px',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <p style={{ fontFamily:'Amiri, serif', fontSize:'0.95rem', color:C.gold, marginBottom:10, letterSpacing:2 }}>
            ✦ استكشف القرآن ✦
          </p>
          <h2 style={{
            fontFamily: isRTL ? 'Amiri, serif' : 'Playfair Display, serif',
            fontSize:'clamp(1.7rem, 4vw, 2.3rem)', color:C.emerald, marginBottom:12,
          }}>
            {lang==='ar'?'تصفح السور': lang==='en'?'Browse the Surahs': lang==='ur'?'سورتیں دیکھیں': lang==='id'?'Jelajahi Surah':'Sureleri Gözat'}
          </h2>
          <GoldDivider margin="0 auto 0" width="120px"/>
        </div>

        {/* filter tabs */}
        <div style={{
          display:'flex', gap:8, justifyContent:'center',
          flexWrap:'wrap', marginBottom:36,
        }}>
          {(isRTL
            ? ['اسم السورة','رقم السورة','مكية / مدنية','عدد الآيات']
            : ['Surah Name','Surah Number','Makki / Madani','Verse Count']
          ).map((f,i) => (
            <button key={i} style={{
              background: i===0 ? C.emerald : 'transparent',
              color: i===0 ? C.white : C.emerald,
              border:`1.5px solid ${i===0 ? C.emerald : C.border}`,
              borderRadius:24, padding:'6px 18px', fontSize:'0.8rem',
              fontFamily: isRTL ? 'Noto Naskh Arabic, serif' : 'Inter, sans-serif',
              cursor:'pointer', fontWeight:500,
            }}>{f}</button>
          ))}
        </div>

        {/* surah cards */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
          gap:20, marginBottom:32,
        }}>
          {surahs.map(s => (
            <div key={s.num} style={{
              background:C.white, borderRadius:16,
              border:`1px solid ${s.available ? C.gold+'40' : C.borderLight}`,
              overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.07)',
              opacity: s.available ? 1 : 0.65,
              transition:'all 0.25s', cursor: s.available ? 'pointer' : 'default',
            }}
            onClick={() => s.available && navigate('/ar/baqarah/1')}
            onMouseEnter={e => s.available && (e.currentTarget.style.boxShadow=`0 10px 28px rgba(0,0,0,0.14), 0 0 0 1.5px ${C.gold}50`)}
            onMouseLeave={e => s.available && (e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.07)')}>

              {/* header strip */}
              <div style={{
                background: s.available
                  ? `linear-gradient(135deg, ${C.emerald}, ${C.emeraldLight})`
                  : `linear-gradient(135deg, #666, #888)`,
                padding:'14px 20px', display:'flex',
                justifyContent:'space-between', alignItems:'center',
              }}>
                <div style={{
                  fontFamily:'Amiri, serif', fontSize:'1.3rem',
                  color:C.goldPale, fontWeight:700,
                }}>{s.name}</div>
                <div style={{
                  width:36, height:36, borderRadius:'50%',
                  background:'rgba(255,255,255,0.15)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:C.goldPale, fontWeight:700, fontSize:'0.9rem',
                  border:`1px solid rgba(255,255,255,0.2)`,
                }}>{s.num}</div>
              </div>

              <div style={{ padding:'16px 20px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
                  <span style={{ fontSize:'0.78rem', color:C.textLight,
                    fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif' }}>
                    {s.ayahs} {isRTL?'آية':'verses'}
                  </span>
                  <span style={{
                    background: s.type==='مدنية' ? '#1a4a2c20' : '#2a1a5c20',
                    color: s.type==='مدنية' ? C.emerald : '#4a2a8c',
                    fontSize:'0.72rem', padding:'2px 10px', borderRadius:12, fontWeight:600,
                    fontFamily:'Noto Naskh Arabic, serif',
                  }}>{s.type}</span>
                </div>

                {s.available ? (
                  <div style={{ display:'flex', gap:8 }}>
                    {[
                      { label: isRTL?'الجزء الأول':'Part 1', path:'/ar/baqarah/1' },
                      { label: isRTL?'الجزء الثاني':'Part 2', path:'/ar/baqarah/2' },
                    ].map((btn,i) => (
                      <button key={i}
                        onClick={e => { e.stopPropagation(); navigate(btn.path); }}
                        style={{
                          flex:1, background: i===0
                            ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`
                            : 'transparent',
                          color: i===0 ? C.teal : C.emerald,
                          border: i===0 ? 'none' : `1.5px solid ${C.gold}50`,
                          borderRadius:10, padding:'9px 8px',
                          fontSize:'0.78rem', fontWeight:700,
                          fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                          cursor:'pointer', transition:'all 0.2s',
                        }}>{btn.label}</button>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign:'center', padding:'8px',
                    fontSize:'0.78rem', color:C.textLight,
                    fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                  }}>{isRTL?'قريباً إن شاء الله':'Coming soon'}</div>
                )}
              </div>
            </div>
          ))}

          {/* coming soon card */}
          <div style={{
            background:C.parchment, borderRadius:16,
            border:`1.5px dashed ${C.border}`,
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            padding:'40px 20px', textAlign:'center', minHeight:180,
          }}>
            <div style={{ fontSize:'2rem', marginBottom:12, opacity:0.4 }}>📚</div>
            <p style={{
              fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              fontSize:'0.85rem', color:C.textLight,
            }}>{isRTL?'سور أخرى قريباً إن شاء الله':'More surahs coming soon'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   6. THEMATIC PATHWAYS SECTION
══════════════════════════════════════════════════════ */
function PathwaysSection({ lang }) {
  const isRTL = ['ar','ur'].includes(lang);

  const pathways = [
    { icon:'🏔️', color:'#1a4a5c',
      ar:'مسار الإيمان والعقيدة',      en:'Faith & Creed',
      ar_d:'آيات تبني صرح الإيمان في القلب',  en_d:'Verses that build the edifice of faith' },
    { icon:'⚖️', color:'#2a4a1a',
      ar:'مسار الأخلاق والسلوك',        en:'Ethics & Conduct',
      ar_d:'القيم الإنسانية في ضوء التأويل',  en_d:'Human values through the lens of tafsir' },
    { icon:'🌍', color:'#4a2a1a',
      ar:'مسار القضايا المعاصرة',       en:'Contemporary Issues',
      ar_d:'معالجة قرآنية لإشكاليات عصرنا',  en_d:'Quranic treatment of modern challenges' },
    { icon:'💎', color:'#1a1a4a',
      ar:'مسار الإعجاز البياني',        en:'Linguistic Miracle',
      ar_d:'روائع البيان القرآني وأسراره',    en_d:'The wonders of Quranic rhetoric' },
    { icon:'🌱', color:'#1a3a2a',
      ar:'مسار التربية والتزكية',       en:'Pedagogy & Purification',
      ar_d:'تأويل يبني الإنسان من الداخل',   en_d:'Tafsir that builds from within' },
    { icon:'🧘', color:'#3a1a3a',
      ar:'مسار الطمأنينة النفسية',      en:'Psychological Serenity',
      ar_d:'الآيات التي تشفي الجراح الروحية', en_d:'Verses that heal spiritual wounds' },
  ];

  return (
    <section style={{
      background:`linear-gradient(160deg, ${C.teal} 0%, ${C.emerald} 100%)`,
      padding:'80px 32px', direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <p style={{ fontFamily:'Amiri, serif', color:C.gold, fontSize:'0.95rem', marginBottom:10, letterSpacing:2 }}>
            ✦ {isRTL?'مداخل موضوعية':'Thematic Gateways'} ✦
          </p>
          <h2 style={{
            fontFamily: isRTL?'Amiri, serif':'Playfair Display, serif',
            fontSize:'clamp(1.7rem, 4vw, 2.3rem)', color:C.goldPale, marginBottom:14,
          }}>
            {lang==='ar'?'مسارات التأويل': lang==='en'?'Interpretation Pathways':
             lang==='ur'?'تأویل کے راستے': lang==='id'?'Jalur Penafsiran':'Tefsir Yolları'}
          </h2>
          <GoldDivider margin="0 auto 16px" width="120px"/>
          <p style={{
            fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
            fontSize:'0.95rem', color:`${C.goldPale}70`, maxWidth:600, margin:'0 auto',
          }}>
            {isRTL
              ? 'مداخل موضوعية تأخذك في رحلة عبر القرآن الكريم'
              : 'Thematic gateways that take you on a journey through the Holy Quran'}
          </p>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
          gap:18,
        }}>
          {pathways.map((p,i) => (
            <div key={i} style={{
              background:`linear-gradient(135deg, ${p.color}cc, ${p.color}88)`,
              border:`1px solid ${C.gold}20`,
              borderRadius:18, padding:'28px 24px',
              cursor:'pointer', transition:'all 0.25s',
              backdropFilter:'blur(8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform='translateY(-5px)';
              e.currentTarget.style.borderColor=`${C.gold}50`;
              e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform='none';
              e.currentTarget.style.borderColor=`${C.gold}20`;
              e.currentTarget.style.boxShadow='none';
            }}>
              <div style={{ fontSize:'2.2rem', marginBottom:14 }}>{p.icon}</div>
              <h3 style={{
                fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                fontSize:'1.02rem', fontWeight:700, color:C.goldPale, marginBottom:8,
              }}>{isRTL?p.ar:p.en}</h3>
              <p style={{
                fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                fontSize:'0.82rem', color:`${C.goldPale}70`, lineHeight:1.7, margin:0,
              }}>{isRTL?p.ar_d:p.en_d}</p>
              <div style={{
                marginTop:16, display:'inline-flex', alignItems:'center', gap:6,
                fontSize:'0.76rem', color:C.gold, fontWeight:600,
                fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              }}>
                {isRTL?'استكشف المسار':'Explore Pathway'}
                <span style={{ transform: isRTL?'rotate(180deg)':'none', display:'inline-block' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   7. FEATURED TAFSIR EXCERPTS
══════════════════════════════════════════════════════ */
function FeaturedExcerptsSection({ lang, navigate }) {
  const isRTL = ['ar','ur'].includes(lang);

  const excerpts = [
    {
      tag_ar:'آية اليوم', tag_en:'Verse of the Day',
      verse:'﴿ وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ﴾',
      ref_ar:'البقرة: 186', ref_en:'Al-Baqarah: 186',
      excerpt_ar:'تكشف هذه الآية عن سرّ من أعظم أسرار العلاقة بين العبد وربه؛ فالله يُجيب بنفسه دون واسطة، ويُقرِّر القرب الإلهي قبل الإجابة، لأن القرب هو الأصل.',
      excerpt_en:'This verse reveals one of the greatest secrets of the relationship between the servant and his Lord; Allah answers Himself without intermediary.',
      type:'ruhani',
    },
    {
      tag_ar:'فيض بياني', tag_en:'Linguistic Gem',
      verse:'﴿ وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ﴾',
      ref_ar:'البقرة: 216', ref_en:'Al-Baqarah: 216',
      excerpt_ar:'جاءت "عسى" هنا للتوقع الراجح، وهي من الله للتحقيق. فالله يقول: ربما تكرهون أمراً وهو خير — لا على سبيل الاحتمال بل على سبيل الحقيقة.',
      excerpt_en:'The word "perhaps" here from Allah is not probability but near-certainty. What you dislike may be exactly what\'s best for you.',
      type:'bayani',
    },
    {
      tag_ar:'وقفة تدبرية', tag_en:'Contemplative Pause',
      verse:'﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ﴾',
      ref_ar:'البقرة: 153', ref_en:'Al-Baqarah: 153',
      excerpt_ar:'العجيب أن الله لم يقل استعينوا بالتخطيط والحكمة وحدهما، بل قدَّم الصبر والصلاة. لأن من لا صبر له لا يُحسن التخطيط، ومن لا صلاة له لا يُحسن الحكمة.',
      excerpt_en:'Remarkably, Allah did not say: seek help through planning alone, but through patience and prayer — because without patience, no plan holds.',
      type:'tarbawi',
    },
  ];

  const typeColors = { ruhani:'#4a2a5c', bayani:'#1a4a5c', tarbawi:'#2a4a1a' };

  return (
    <section style={{
      background:C.parchment, padding:'80px 32px',
      direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <p style={{ fontFamily:'Amiri, serif', color:C.gold, fontSize:'0.95rem', marginBottom:10, letterSpacing:2 }}>
            ✦ {isRTL?'من فيوض التأويل':'From the Tafsir'} ✦
          </p>
          <h2 style={{
            fontFamily: isRTL?'Amiri, serif':'Playfair Display, serif',
            fontSize:'clamp(1.7rem, 4vw, 2.3rem)', color:C.emerald, marginBottom:12,
          }}>
            {lang==='ar'?'مختارات تفسيرية': lang==='en'?'Featured Tafsir Excerpts':
             lang==='ur'?'منتخب تفسیری اقتباسات':'Seçilmiş Tefsir Alıntıları'}
          </h2>
          <GoldDivider margin="0 auto 0" width="120px"/>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',
          gap:24,
        }}>
          {excerpts.map((ex,i) => (
            <div key={i} style={{
              background:C.white, borderRadius:18,
              border:`1px solid ${C.borderLight}`,
              overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.07)',
              transition:'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,0,0,0.14)`; e.currentTarget.style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.07)'; e.currentTarget.style.transform='none'; }}>

              {/* colored top bar */}
              <div style={{ height:4, background:`linear-gradient(90deg, ${typeColors[ex.type]}, ${C.gold})` }}/>

              <div style={{ padding:'24px' }}>
                {/* tag */}
                <span style={{
                  background:`${typeColors[ex.type]}15`,
                  color:typeColors[ex.type],
                  fontSize:'0.72rem', fontWeight:700, padding:'3px 12px',
                  borderRadius:20, fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                }}>{isRTL?ex.tag_ar:ex.tag_en}</span>

                {/* verse */}
                <div style={{
                  fontFamily:'Amiri, serif', fontSize:'1.1rem', lineHeight:2,
                  color:C.emerald, margin:'16px 0 8px',
                  direction:'rtl', textAlign: isRTL?'right':'right',
                  padding:'12px 16px',
                  background:`${C.emerald}08`,
                  borderRadius:8,
                  borderRight: isRTL?`3px solid ${C.gold}`:'none',
                  borderLeft: isRTL?'none':`3px solid ${C.gold}`,
                }}>{ex.verse}</div>

                <p style={{
                  fontSize:'0.74rem', color:C.gold, fontWeight:600,
                  fontFamily:'Amiri, serif', marginBottom:14,
                  textAlign: isRTL?'right':'left',
                }}>{isRTL?ex.ref_ar:ex.ref_en}</p>

                <p style={{
                  fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                  fontSize:'0.88rem', color:C.textMid,
                  lineHeight:1.85, margin:'0 0 20px',
                }}>{isRTL?ex.excerpt_ar:ex.excerpt_en}</p>

                <button
                  onClick={() => navigate('/ar/baqarah/1')}
                  style={{
                    background:'transparent',
                    color:C.emerald,
                    border:`1.5px solid ${C.emerald}50`,
                    borderRadius:24, padding:'7px 20px',
                    fontSize:'0.78rem', fontWeight:700,
                    fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                    cursor:'pointer', transition:'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background=C.emerald; e.currentTarget.style.color=C.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=C.emerald; }}>
                  {isRTL?'أكمل القراءة':'Continue Reading'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   8. MULTILINGUAL SECTION
══════════════════════════════════════════════════════ */
function MultilingualSection({ lang, setLang }) {
  const isRTL = ['ar','ur'].includes(lang);

  return (
    <section style={{
      background:C.navy, padding:'80px 32px',
      direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:1000, margin:'0 auto', textAlign:'center' }}>
        <p style={{ fontFamily:'Amiri, serif', color:C.gold, fontSize:'0.95rem', marginBottom:10, letterSpacing:2 }}>
          ✦ {isRTL?'للإنسانية جمعاء':'For All of Humanity'} ✦
        </p>
        <h2 style={{
          fontFamily: isRTL?'Amiri, serif':'Playfair Display, serif',
          fontSize:'clamp(1.7rem, 4vw, 2.3rem)', color:C.white, marginBottom:14,
        }}>
          {isRTL?'التجربة متعددة اللغات':'Multilingual Experience'}
        </h2>
        <GoldDivider margin="0 auto 20px" width="120px"/>
        <p style={{
          fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
          fontSize:'0.95rem', color:`${C.white}70`, maxWidth:600, margin:'0 auto 48px', lineHeight:2,
        }}>
          {isRTL
            ? 'العربية هي لغة القرآن الأصيلة ومصدر التفسير. وقد حرصنا على إتاحة هذا المشروع بلغات عالمية متعددة ليصل إلى قلوب البشر في كل مكان.'
            : 'Arabic is the original language of the Quran and the source of all tafsir. We have made this project available in multiple world languages to reach hearts everywhere.'
          }
        </p>

        <div style={{
          display:'flex', flexWrap:'wrap', justifyContent:'center', gap:16,
        }}>
          {LANGUAGES.map(l => (
            <button key={l.code}
              onClick={() => setLang(l.code)}
              style={{
                background: lang===l.code
                  ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`
                  : `rgba(255,255,255,0.06)`,
                border:`1.5px solid ${lang===l.code ? C.gold : 'rgba(255,255,255,0.12)'}`,
                color: lang===l.code ? C.teal : C.white,
                borderRadius:16, padding:'20px 28px',
                cursor:'pointer', textAlign:'center',
                transition:'all 0.25s', minWidth:140,
              }}
              onMouseEnter={e => { if(lang!==l.code){ e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; }}}
              onMouseLeave={e => { if(lang!==l.code){ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; }}}>
              <div style={{ fontSize:'2rem', marginBottom:8 }}>{l.flag}</div>
              <div style={{
                fontFamily: l.dir==='rtl'?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                fontSize:'0.9rem', fontWeight:700,
              }}>{l.label}</div>
              {lang===l.code && (
                <div style={{ fontSize:'0.65rem', marginTop:4, opacity:0.7,
                  fontFamily:'Inter, sans-serif' }}>✓ Active</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   9. SCHOLARLY CREDIBILITY
══════════════════════════════════════════════════════ */
function CredibilitySection({ lang }) {
  const isRTL = ['ar','ur'].includes(lang);

  const items = [
    { icon:'📚', ar:'المنهج العلمي الرصين',          en:'Rigorous Scholarly Method',      ar_d:'تفسير مرتبط بمصادره', en_d:'Tafsir grounded in its sources' },
    { icon:'📝', ar:'العناية بالتوثيق',               en:'Meticulous Documentation',       ar_d:'استشهاد بالمراجع الكبرى', en_d:'Citing major references' },
    { icon:'🔗', ar:'الارتباط بالتراث التفسيري',      en:'Rooted in Tafsir Heritage',      ar_d:'الطبري، ابن كثير، القرطبي...', en_d:'Al-Tabari, Ibn Kathir, Al-Qurtubi...' },
    { icon:'💡', ar:'إبراز المعنى التربوي والنفسي',    en:'Pedagogical & Psychological',    ar_d:'تفسير يبني ويشفي', en_d:'Tafsir that builds and heals' },
    { icon:'🌉', ar:'جسر بين التراث والمعاصرة',       en:'Bridge: Heritage & Modernity',   ar_d:'للباحث والقارئ العام معاً', en_d:'For both scholar and general reader' },
    { icon:'🌱', ar:'تفسير يُثمر في الحياة',          en:'Tafsir Bearing Life Fruit',      ar_d:'من القرآن إلى السلوك', en_d:'From Quran to lived behavior' },
  ];

  return (
    <section style={{
      background:C.ivory, padding:'80px 32px',
      direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <p style={{ fontFamily:'Amiri, serif', color:C.gold, fontSize:'0.95rem', marginBottom:10, letterSpacing:2 }}>
            ✦ {isRTL?'الثقة والمصداقية العلمية':'Trust & Scholarly Credibility'} ✦
          </p>
          <h2 style={{
            fontFamily: isRTL?'Amiri, serif':'Playfair Display, serif',
            fontSize:'clamp(1.6rem, 4vw, 2.2rem)', color:C.emerald, marginBottom:12,
          }}>
            {isRTL?'لماذا فيوض التأويل المعاصر؟':'Why Fuyud Al-Taweel?'}
          </h2>
          <GoldDivider margin="0 auto 0" width="120px"/>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
          gap:20,
        }}>
          {items.map((item,i) => (
            <div key={i} style={{
              display:'flex', gap:16, alignItems:'flex-start',
              background:C.white, borderRadius:14, padding:'22px 20px',
              border:`1px solid ${C.borderLight}`,
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=C.gold+'50'; e.currentTarget.style.transform='translateX(4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.borderLight; e.currentTarget.style.transform='none'; }}>
              <div style={{
                width:44, height:44, borderRadius:'50%',
                background:`${C.emerald}12`, display:'flex',
                alignItems:'center', justifyContent:'center',
                fontSize:'1.3rem', flexShrink:0,
              }}>{item.icon}</div>
              <div>
                <h4 style={{
                  fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                  fontSize:'0.92rem', fontWeight:700, color:C.emerald, marginBottom:4,
                }}>{isRTL?item.ar:item.en}</h4>
                <p style={{
                  fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                  fontSize:'0.8rem', color:C.textLight, margin:0, lineHeight:1.7,
                }}>{isRTL?item.ar_d:item.en_d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   10. SPECIAL FEATURES
══════════════════════════════════════════════════════ */
function FeaturesSection({ lang }) {
  const isRTL = ['ar','ur'].includes(lang);

  const features = [
    { icon:'🔍', ar:'البحث الذكي',                 en:'Smart Search',              available:true  },
    { icon:'📊', ar:'الخرائط المعرفية',             en:'Knowledge Maps',            available:false },
    { icon:'🔀', ar:'الروابط الموضوعية',            en:'Thematic Links',            available:false },
    { icon:'⚖️', ar:'مقارنة الآيات المتشابهة',     en:'Compare Similar Verses',    available:false },
    { icon:'🌐', ar:'التصفح حسب القضايا المعاصرة', en:'Browse by Modern Issues',   available:false },
    { icon:'❤️', ar:'المفضلة والحفظ',              en:'Favourites & Bookmarks',    available:false },
  ];

  return (
    <section style={{
      background:C.parchment, padding:'80px 32px',
      direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <p style={{ fontFamily:'Amiri, serif', color:C.gold, fontSize:'0.95rem', marginBottom:10, letterSpacing:2 }}>
            ✦ {isRTL?'أدوات المنصة':'Platform Tools'} ✦
          </p>
          <h2 style={{
            fontFamily: isRTL?'Amiri, serif':'Playfair Display, serif',
            fontSize:'clamp(1.6rem, 4vw, 2.2rem)', color:C.emerald, marginBottom:12,
          }}>
            {isRTL?'مميزات فيوض التأويل المعاصر':'Platform Features'}
          </h2>
          <GoldDivider margin="0 auto 0" width="120px"/>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',
          gap:16,
        }}>
          {features.map((f,i) => (
            <div key={i} style={{
              background:C.white, borderRadius:14, padding:'24px 20px',
              border:`1px solid ${f.available ? C.gold+'40' : C.borderLight}`,
              textAlign:'center', opacity: f.available?1:0.65,
              transition:'all 0.25s',
              position:'relative', overflow:'hidden',
            }}
            onMouseEnter={e => { if(f.available){ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 10px 28px rgba(0,0,0,0.1)`; }}}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
              {!f.available && (
                <span style={{
                  position:'absolute', top:10, left:isRTL?'auto':10, right:isRTL?10:'auto',
                  background:'#8888',
                  color:C.white, fontSize:'0.6rem', padding:'2px 8px', borderRadius:10,
                  fontFamily:'Inter, sans-serif',
                }}>
                  {isRTL?'قريباً':'Soon'}
                </span>
              )}
              <div style={{ fontSize:'2rem', marginBottom:12 }}>{f.icon}</div>
              <h4 style={{
                fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                fontSize:'0.85rem', fontWeight:700, color:C.emerald, margin:0,
              }}>{isRTL?f.ar:f.en}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   11. LATEST UPDATES
══════════════════════════════════════════════════════ */
function LatestSection({ lang, navigate }) {
  const isRTL = ['ar','ur'].includes(lang);

  const updates = [
    { type_ar:'سورة مضافة',  type_en:'Surah Added',   title_ar:'سورة البقرة – الجزء الثاني', title_en:'Al-Baqarah – Part 2', path:'/ar/baqarah/2', date:'مارس 2026' },
    { type_ar:'سورة مضافة',  type_en:'Surah Added',   title_ar:'سورة البقرة – الجزء الأول',  title_en:'Al-Baqarah – Part 1', path:'/ar/baqarah/1', date:'مارس 2026' },
    { type_ar:'إطلاق المنصة',type_en:'Platform Launch',title_ar:'إطلاق فيوض التأويل المعاصر', title_en:'Fuyud Platform Launch', path:'/', date:'مارس 2026' },
  ];

  return (
    <section style={{
      background:C.ivory, padding:'72px 32px',
      direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <p style={{ fontFamily:'Amiri, serif', color:C.gold, fontSize:'0.95rem', marginBottom:10, letterSpacing:2 }}>
            ✦ {isRTL?'آخر الإضافات':'Latest Updates'} ✦
          </p>
          <h2 style={{
            fontFamily: isRTL?'Amiri, serif':'Playfair Display, serif',
            fontSize:'clamp(1.5rem, 3.5vw, 2.1rem)', color:C.emerald, marginBottom:12,
          }}>
            {isRTL?'جديد في المنصة':'What\'s New'}
          </h2>
          <GoldDivider margin="0 auto 0" width="100px"/>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {updates.map((u,i) => (
            <div key={i}
              onClick={() => navigate(u.path)}
              style={{
                background:C.white, borderRadius:14, padding:'20px 24px',
                border:`1px solid ${C.borderLight}`,
                display:'flex', justifyContent:'space-between', alignItems:'center',
                cursor:'pointer', transition:'all 0.2s',
                boxShadow:'0 2px 10px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=C.gold+'50'; e.currentTarget.style.boxShadow=`0 6px 20px rgba(0,0,0,0.1)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.borderLight; e.currentTarget.style.boxShadow='0 2px 10px rgba(0,0,0,0.05)'; }}>

              <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                <div style={{
                  width:44, height:44, borderRadius:10,
                  background:`${C.emerald}12`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke={C.emerald} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{ margin:'0 0 3px',
                    fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                    fontSize:'0.95rem', fontWeight:700, color:C.textDark }}>
                    {isRTL?u.title_ar:u.title_en}
                  </p>
                  <span style={{
                    background:`${C.emerald}14`, color:C.emerald,
                    fontSize:'0.68rem', padding:'2px 10px', borderRadius:12, fontWeight:600,
                    fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                  }}>{isRTL?u.type_ar:u.type_en}</span>
                </div>
              </div>

              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <span style={{ fontSize:'0.75rem', color:C.textLight, whiteSpace:'nowrap',
                  fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif' }}>
                  {u.date}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  style={{ transform: isRTL?'rotate(180deg)':'none', flexShrink:0 }}>
                  <path d="M9 6l6 6-6 6" stroke={C.gold} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   12. NEWSLETTER
══════════════════════════════════════════════════════ */
function NewsletterSection({ lang }) {
  const isRTL = ['ar','ur'].includes(lang);
  const [email, setEmail] = useState('');

  return (
    <section style={{
      background:`linear-gradient(135deg, ${C.emerald} 0%, ${C.teal} 100%)`,
      padding:'72px 32px', direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
        <p style={{ fontFamily:'Amiri, serif', color:C.gold, fontSize:'0.95rem', marginBottom:12, letterSpacing:2 }}>
          ✦ {isRTL?'ابقَ على اطلاع':'Stay Informed'} ✦
        </p>
        <h2 style={{
          fontFamily: isRTL?'Amiri, serif':'Playfair Display, serif',
          fontSize:'clamp(1.5rem, 4vw, 2.1rem)', color:C.goldPale, marginBottom:12,
        }}>
          {isRTL?'اشترك في نشرة فيوض التأويل':'Subscribe to Our Newsletter'}
        </h2>
        <GoldDivider margin="0 auto 20px" width="100px"/>
        <p style={{
          fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
          fontSize:'0.9rem', color:`${C.goldPale}70`, maxWidth:480, margin:'0 auto 36px', lineHeight:2,
        }}>
          {isRTL
            ? 'تلقَّ جديد التفسير، والوقفات التدبرية، والمقالات المختارة، وتحديثات المنصة في بريدك الإلكتروني.'
            : 'Receive new tafsir additions, contemplative reflections, selected articles, and platform updates in your inbox.'
          }
        </p>

        <div style={{
          display:'flex', gap:0, borderRadius:50, overflow:'hidden',
          boxShadow:`0 6px 24px rgba(0,0,0,0.2)`,
          border:`1.5px solid ${C.gold}40`,
          maxWidth:480, margin:'0 auto',
        }}>
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder={isRTL?'بريدك الإلكتروني':'Your email address'}
            style={{
              flex:1, padding:'16px 22px', border:'none', outline:'none',
              background:C.white, fontSize:'0.9rem', color:C.textDark,
              fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              direction: isRTL?'rtl':'ltr',
            }}/>
          <button style={{
            background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            color:C.teal, border:'none', padding:'0 26px',
            fontSize:'0.85rem', fontWeight:700, cursor:'pointer',
            fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
            whiteSpace:'nowrap',
          }}>
            {isRTL?'اشترك':'Subscribe'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   13. FOOTER
══════════════════════════════════════════════════════ */
function Footer({ lang, setLang, navigate }) {
  const isRTL = ['ar','ur'].includes(lang);

  return (
    <footer style={{
      background:C.navy, padding:'60px 32px 0',
      direction: isRTL?'rtl':'ltr',
    }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',
          gap:40, marginBottom:48,
        }}>
          {/* brand */}
          <div>
            <img src="/logo.png" alt="logo"
              style={{ width:80, height:'auto', marginBottom:16,
                filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
              onError={e=>{e.target.style.display='none'}}/>
            <h3 style={{
              fontFamily:'Amiri, serif', fontSize:'1.1rem', color:C.goldPale, marginBottom:8,
            }}>فيوض التأويل المعاصر</h3>
            <p style={{
              fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              fontSize:'0.78rem', color:`${C.white}55`, lineHeight:1.8, margin:0,
            }}>
              {isRTL
                ? 'منصة تفسيرية معرفية تجمع بين أصالة التفسير ووعي الإنسان المعاصر'
                : 'A scholarly tafsir platform bridging classical heritage and contemporary insight'
              }
            </p>
          </div>

          {/* quick links */}
          <div>
            <h4 style={{
              fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              fontSize:'0.9rem', color:C.goldPale, marginBottom:16, fontWeight:700,
            }}>{isRTL?'روابط سريعة':'Quick Links'}</h4>
            {[
              { ar:'الرئيسية',      en:'Home',          path:'/' },
              { ar:'سورة البقرة ج١',en:'Al-Baqarah P.1',path:'/ar/baqarah/1' },
              { ar:'سورة البقرة ج٢',en:'Al-Baqarah P.2',path:'/ar/baqarah/2' },
              { ar:'عن المشروع',    en:'About',         path:'/' },
            ].map((l,i) => (
              <div key={i}
                onClick={() => navigate(l.path)}
                style={{
                  fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                  fontSize:'0.8rem', color:`${C.white}55`, marginBottom:10,
                  cursor:'pointer', transition:'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color=C.goldPale}
                onMouseLeave={e => e.target.style.color=`${C.white}55`}
              >{isRTL?l.ar:l.en}</div>
            ))}
          </div>

          {/* languages */}
          <div>
            <h4 style={{
              fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              fontSize:'0.9rem', color:C.goldPale, marginBottom:16, fontWeight:700,
            }}>{isRTL?'اللغات':'Languages'}</h4>
            {LANGUAGES.map(l => (
              <div key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  fontFamily: l.dir==='rtl'?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                  fontSize:'0.8rem', color: lang===l.code ? C.gold : `${C.white}55`,
                  marginBottom:10, cursor:'pointer', transition:'color 0.2s',
                }}>
                {l.flag} {l.label}
              </div>
            ))}
          </div>

          {/* contact */}
          <div>
            <h4 style={{
              fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              fontSize:'0.9rem', color:C.goldPale, marginBottom:16, fontWeight:700,
            }}>{isRTL?'التواصل':'Contact'}</h4>
            <p style={{
              fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
              fontSize:'0.78rem', color:`${C.white}55`, lineHeight:1.9, margin:0,
            }}>
              {isRTL
                ? 'للتواصل والمراسلة العلمية يسعدنا استقبال ملاحظاتكم ومقترحاتكم.'
                : 'For correspondence and scholarly communication, we welcome your feedback.'
              }
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div style={{
          borderTop:`1px solid ${C.gold}18`, padding:'20px 0',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:12,
        }}>
          <p style={{
            fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
            fontSize:'0.73rem', color:`${C.white}40`, margin:0,
          }}>
            {isRTL
              ? '© 2026 فيوض التأويل المعاصر • جميع الحقوق محفوظة'
              : '© 2026 Fuyud Al-Taweel Al-Muasir • All rights reserved'
            }
          </p>
          <div style={{ display:'flex', gap:20 }}>
            {(isRTL
              ? ['سياسة الخصوصية','شروط الاستخدام']
              : ['Privacy Policy','Terms of Use']
            ).map((t,i) => (
              <span key={i} style={{
                fontFamily: isRTL?'Noto Naskh Arabic, serif':'Inter, sans-serif',
                fontSize:'0.72rem', color:`${C.white}40`, cursor:'pointer', transition:'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color=C.gold}
              onMouseLeave={e => e.target.style.color=`${C.white}40`}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN HOMEPAGE ORCHESTRATOR
══════════════════════════════════════════════════════ */
export default function HomePage() {
  const [selectedLang, setSelectedLang] = useState(null);   // null = show splash
  const [scrolled, setScrolled]         = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('fuyud_lang');
    if(saved) setSelectedLang(saved);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLangSelect = (code) => {
    localStorage.setItem('fuyud_lang', code);
    setSelectedLang(code);
  };

  const handleLangChange = (code) => {
    localStorage.setItem('fuyud_lang', code);
    setSelectedLang(code);
  };

  /* show language splash first */
  if(!selectedLang) {
    return <LanguageSplash onSelect={handleLangSelect} />;
  }

  return (
    <div style={{ background:C.ivory }}>
      <style>{`
        @keyframes bounce {
          0%,100%{ transform:translateY(0); }
          50%{ transform:translateY(8px); }
        }
      `}</style>

      <Header
        lang={selectedLang}
        setLang={handleLangChange}
        scrolled={scrolled}
      />

      <HeroSection       lang={selectedLang} navigate={navigate} />
      <SearchSection     lang={selectedLang} />
      <ProjectIntroSection lang={selectedLang} />
      <BrowseSection     lang={selectedLang} navigate={navigate} />
      <PathwaysSection   lang={selectedLang} />
      <FeaturedExcerptsSection lang={selectedLang} navigate={navigate} />
      <MultilingualSection lang={selectedLang} setLang={handleLangChange} />
      <CredibilitySection lang={selectedLang} />
      <FeaturesSection   lang={selectedLang} />
      <LatestSection     lang={selectedLang} navigate={navigate} />
      <NewsletterSection lang={selectedLang} />
      <Footer            lang={selectedLang} setLang={handleLangChange} navigate={navigate} />
    </div>
  );
}
