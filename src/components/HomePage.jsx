import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Globe, ChevronDown, BookMarked,
  Heart, Brain, Shield, Layers, Map, Volume2,
  Mail, Compass, Feather, Flame, Eye,
  Zap, Sparkles
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   PALETTE — ذهبي داكن فاخر مع ألوان فاتحة ومضيئة
   الخلفية: الصورة الإسلامية + طبقة شفافة فاتحة
   الصناديق: ألوان مشبعة فاتحة بشفافية عالية
═══════════════════════════════════════════════════════════ */
const C = {
  /* خلفيات — دافئة ذهبية فاتحة نسبياً */
  BG:    '#1a1000',
  BG1:   '#221400',
  BG2:   '#2a1a00',
  BG3:   '#201000',
  BG4:   '#180c00',
  CARD:  '#2a1800',

  /* ذهب ناصع */
  G1: '#8a6800',
  G2: '#b88c10',
  G3: '#d4a820',
  G4: '#e8c040',
  G5: '#f5d460',
  G6: '#fbe880',
  G7: '#fff3b0',

  /* ألوان الصناديق الملونة — مشبعة فاتحة مضيئة */
  /* فيروزي زمردي مضيء */
  TEAL:  '#0a5c45',
  TEAL2: '#0e7a5c',
  TEAL3: '#14a878',
  TEAL4: '#2fd49a',
  /* أزرق ملكي مضيء */
  BLUE:  '#0e2d6a',
  BLUE2: '#1a4898',
  BLUE3: '#2868c8',
  BLUE4: '#5898f8',
  /* بنفسجي مضيء */
  PURP:  '#2d1258',
  PURP2: '#4a20a0',
  PURP3: '#7040d8',
  PURP4: '#b080ff',
  /* نحاسي دافئ مضيء */
  COPP:  '#5a2800',
  COPP2: '#8a4010',
  COPP3: '#c06820',
  COPP4: '#f09050',
  /* زيتوني مضيء */
  OLIV:  '#1e3c10',
  OLIV2: '#2e5a1e',
  OLIV3: '#4a8030',
  OLIV4: '#7ab850',
  /* وردي مسكي مضيء */
  ROSE:  '#4a0a28',
  ROSE2: '#7a1a40',
  ROSE3: '#b03060',
  ROSE4: '#f060a0',

  /* نص أبيض دافئ */
  TW:  '#fff8e8',
  TW2: 'rgba(255,248,232,0.92)',
  TW3: 'rgba(255,248,232,0.68)',
  TW4: 'rgba(255,248,232,0.42)',

  /* حدود ذهبية */
  BD1: 'rgba(232,192,64,0.18)',
  BD2: 'rgba(232,192,64,0.38)',
  BD3: 'rgba(232,192,64,0.60)',
  BD4: 'rgba(232,192,64,0.85)',

  /* توهجات */
  GLOW:  'rgba(232,192,64,0.14)',
  GLOW2: 'rgba(232,192,64,0.30)',
};

const LANGS = [
  { code:'ar', label:'العربية', flag:'🇸🇦', dir:'rtl' },
  { code:'en', label:'English', flag:'🇬🇧', dir:'ltr' },
  { code:'ur', label:'اردو',    flag:'🇵🇰', dir:'rtl' },
  { code:'id', label:'Bahasa',  flag:'🇮🇩', dir:'ltr' },
  { code:'tr', label:'Türkçe',  flag:'🇹🇷', dir:'ltr' },
];

/* ═══════════════════════════════
   SVG — نمط هندسي إسلامي
═══════════════════════════════ */
function GeomPattern({ opacity = 0.07 }) {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 48,26 70,26 53,40 60,62 40,49 20,62 27,40 10,26 32,26"
            fill="none" stroke={C.G4} strokeWidth="0.8"/>
          <polygon points="40,14 46,28 62,28 50,38 55,54 40,45 25,54 30,38 18,28 34,28"
            fill={C.G4} fillOpacity="0.06" stroke={C.G3} strokeWidth="0.5"/>
          <circle cx="40" cy="40" r="2.5" fill={C.G5} fillOpacity="0.35"/>
          <line x1="0" y1="40" x2="80" y2="40" stroke={C.G3} strokeWidth="0.3" opacity="0.4"/>
          <line x1="40" y1="0" x2="40" y2="80" stroke={C.G3} strokeWidth="0.3" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gp)" opacity={opacity}/>
    </svg>
  );
}

/* ═══════════════════════════════
   SVG — شريط مقرنصات
═══════════════════════════════ */
function Muqarnas({ h = 44, flip = false }) {
  const n = 22, uw = 60, total = n * uw;
  return (
    <div style={{ width:'100%', overflow:'hidden', lineHeight:0,
      transform: flip ? 'scaleY(-1)' : 'none' }}>
      <svg width="100%" height={h} viewBox={`0 0 ${total} ${h}`} preserveAspectRatio="none">
        {Array.from({length:n}).map((_,i) => {
          const x = i*uw, cx = x+uw/2;
          return (
            <g key={i}>
              <path d={`M${x},${h} L${x},${h*.52} Q${cx},${-h*.12} ${x+uw},${h*.52} L${x+uw},${h}`}
                fill="rgba(20,10,0,0.7)" stroke={C.G4} strokeWidth="0.9" opacity="0.7"/>
              <path d={`M${x+7},${h} L${x+7},${h*.63} Q${cx},${h*.16} ${x+uw-7},${h*.63} L${x+uw-7},${h}`}
                fill="none" stroke={C.G5} strokeWidth="0.5" opacity="0.6"/>
              <circle cx={cx} cy={h*.1} r="2" fill={C.G5} fillOpacity="0.75"/>
            </g>
          );
        })}
        <line x1="0" y1={h*.97} x2={total} y2={h*.97} stroke={C.G4} strokeWidth="1.2" opacity="0.55"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════
   SVG — فاصل ذهبي
═══════════════════════════════ */
function Divider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, margin:'16px 0' }}>
      <div style={{ flex:1, height:1, background:`linear-gradient(to left,${C.G4}80,transparent)` }}/>
      <svg width="30" height="30" viewBox="0 0 30 30">
        <rect x="5" y="5" width="20" height="20" rx="1" fill="none"
          stroke={C.G4} strokeWidth="1.2" transform="rotate(45 15 15)" opacity="0.9"/>
        <rect x="8" y="8" width="14" height="14" rx="1"
          fill={C.G4} fillOpacity="0.18" stroke={C.G5} strokeWidth="0.7" opacity="0.8"/>
        <circle cx="15" cy="15" r="2.8" fill={C.G5} fillOpacity="0.8"/>
      </svg>
      <div style={{ flex:1, height:1, background:`linear-gradient(to right,${C.G4}80,transparent)` }}/>
    </div>
  );
}

/* ═══════════════════════════════
   SVG — قوس مغربي
═══════════════════════════════ */
function Arch({ w=300, h=80, col=C.G4, op=0.5 }) {
  const cx = w/2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:'block'}}>
      <path d={`M${w*.05},${h} L${w*.05},${h*.5} Q${cx},${-h*.3} ${w*.95},${h*.5} L${w*.95},${h}`}
        fill="none" stroke={col} strokeWidth="1.8" opacity={op}/>
      <path d={`M${w*.15},${h} L${w*.15},${h*.6} Q${cx},${-h*.05} ${w*.85},${h*.6} L${w*.85},${h}`}
        fill="none" stroke={col} strokeWidth="0.7" opacity={op*.6}/>
      <circle cx={cx} cy={h*.04} r="3.5" fill={col} fillOpacity={op}/>
    </svg>
  );
}

/* ═══════════════════════════════
   SVG — زخرفة ركنية
═══════════════════════════════ */
function Corner({ size=70, fx=false, fy=false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80"
      style={{transform:`scale(${fx?-1:1},${fy?-1:1})`,display:'block'}}>
      <path d="M4,4 L38,4 Q46,4 46,12 L46,46" fill="none" stroke={C.G4} strokeWidth="1.4" opacity="0.75"/>
      <path d="M4,4 L4,38 Q4,46 12,46 L46,46" fill="none" stroke={C.G4} strokeWidth="1.4" opacity="0.75"/>
      <path d="M10,10 Q20,6 24,16 Q28,26 18,28 Q8,30 10,20" fill="none" stroke={C.G5} strokeWidth="0.8" opacity="0.65"/>
      <path d="M10,10 Q6,20 16,24 Q26,28 28,18 Q30,8 20,10" fill="none" stroke={C.G5} strokeWidth="0.8" opacity="0.65"/>
      <polygon points="7,7 9,13 15,13 10.5,17 12.5,23 7,19 1.5,23 3.5,17 -1,13 5,13"
        fill={C.G4} fillOpacity="0.65" stroke={C.G5} strokeWidth="0.5"/>
    </svg>
  );
}

/* ═══════════════════════════════
   عنوان القسم
═══════════════════════════════ */
function SecTitle({ title, sub }) {
  return (
    <div style={{textAlign:'center', marginBottom:50, direction:'rtl'}}>
      <div style={{display:'flex',justifyContent:'center',marginBottom:4,opacity:.65}}>
        <Arch w={180} h={30} col={C.G4} op={.8}/>
      </div>
      <Divider/>
      <h2 style={{
        fontFamily:'Amiri,serif',
        fontSize:'clamp(1.85rem,3vw,2.8rem)',
        fontWeight:700, margin:'8px 0 12px',
        background:`linear-gradient(135deg,${C.G3} 0%,${C.G5} 35%,${C.G7} 60%,${C.G5} 85%,${C.G4} 100%)`,
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
        filter:`drop-shadow(0 2px 18px ${C.G4}55)`,
        letterSpacing:'0.02em',
        textShadow:'none',
      }}>{title}</h2>
      {sub && <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'1rem',
        color:C.TW3,lineHeight:1.9,maxWidth:500,margin:'0 auto'}}>{sub}</p>}
      <Divider/>
    </div>
  );
}

/* ═══════════════════════════════
   HEADER
═══════════════════════════════ */
function Header({ lang, onLangChange }) {
  const [sc, setSc] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{position:'sticky',top:0,zIndex:300}}>
      {/* شريط اللغات */}
      <div style={{
        background:`linear-gradient(180deg,rgba(20,12,0,0.95),rgba(28,16,0,0.92))`,
        backdropFilter:'blur(16px)',
        borderBottom:`1px solid ${C.BD3}`,
        padding:'7px 18px',
        display:'flex', justifyContent:'center', alignItems:'center', gap:7, flexWrap:'wrap',
      }}>
        <Globe size={14} color={C.G5} style={{opacity:.8}}/>
        {LANGS.map(l => (
          <button key={l.code} onClick={() => onLangChange(l.code)} style={{
            background: lang===l.code ? `linear-gradient(135deg,${C.G2},${C.G4},${C.G5})` : 'transparent',
            color: lang===l.code ? '#150a00' : C.TW2,
            border:`1.5px solid ${lang===l.code ? C.G4 : C.BD2}`,
            borderRadius:20, padding:'4px 16px',
            fontSize:'0.86rem', fontWeight:700, cursor:'pointer',
            fontFamily: ['ar','ur'].includes(l.code) ? 'Noto Naskh Arabic,serif':'Inter,sans-serif',
            display:'flex', alignItems:'center', gap:6,
            transition:'all .2s',
            boxShadow: lang===l.code ? `0 2px 12px ${C.G4}60` : 'none',
          }}
          onMouseEnter={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.G4;e.currentTarget.style.color=C.G6;e.currentTarget.style.background=C.GLOW2;}}}
          onMouseLeave={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.BD2;e.currentTarget.style.color=C.TW2;e.currentTarget.style.background='transparent';}}}>
            <span style={{fontSize:'1rem'}}>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>

      {/* الهيدر الرئيسي */}
      <header style={{
        background: sc ? 'rgba(18,10,0,0.97)' : 'rgba(20,12,0,0.92)',
        backdropFilter:'blur(24px)',
        borderBottom:`1px solid ${sc?C.BD3:C.BD2}`,
        boxShadow: sc ? `0 4px 35px rgba(0,0,0,.75)` : 'none',
        transition:'all .3s',
      }}>
        <div style={{height:2,background:`linear-gradient(90deg,transparent,${C.G3},${C.G6},${C.G4},transparent)`}}/>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'10px 26px',
          display:'flex',alignItems:'center',justifyContent:'space-between',gap:14}}>

          {/* شعار + عنوان */}
          <div style={{display:'flex',alignItems:'center',gap:13,cursor:'pointer'}}
            onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
            <div style={{
              width:60,height:60,flexShrink:0,
              borderRadius:'50% 50% 12px 12px',
              border:`2px solid ${C.G4}90`,
              overflow:'hidden',background:'rgba(10,6,0,0.9)',
              boxShadow:`0 0 22px ${C.G4}45`,
              display:'flex',alignItems:'center',justifyContent:'center',
            }}>
              <img src="/logo.png" alt="Logo"
                style={{width:'92%',height:'92%',objectFit:'contain'}}/>
            </div>
            <div dir="rtl">
              <div style={{
                fontFamily:'Amiri,serif',
                fontSize:'clamp(1.1rem,1.9vw,1.6rem)',
                fontWeight:700,
                background:`linear-gradient(135deg,${C.G4},${C.G6},${C.G5})`,
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                filter:`drop-shadow(0 0 14px ${C.G4}55)`,
                lineHeight:1.2,
              }}>فيوض التأويل المعاصر</div>
              <div style={{fontSize:'.77rem',color:C.TW3,fontFamily:'Noto Naskh Arabic,serif',marginTop:2}}>
                تفسير سورة البقرة · قراءة معاصرة متعددة اللغات
              </div>
            </div>
          </div>

          {/* ناف */}
          <nav className="nav-desktop" dir="rtl" style={{display:'flex',gap:2}}>
            {[['#about','عن المشروع'],['#surahs','تصفح السور'],['#paths','مسارات التأويل'],['#features','الخصائص']].map(([h,l])=>(
              <a key={h} href={h} style={{color:C.TW2,textDecoration:'none',fontSize:'.9rem',
                fontFamily:'Noto Naskh Arabic,serif',fontWeight:600,
                padding:'7px 14px',borderRadius:8,transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.color=C.G6;e.currentTarget.style.background=C.GLOW2;}}
              onMouseLeave={e=>{e.currentTarget.style.color=C.TW2;e.currentTarget.style.background='transparent';}}>{l}</a>
            ))}
          </nav>

          <button onClick={()=>nav('/part1')} style={{
            background:`linear-gradient(135deg,${C.G2},${C.G4},${C.G5})`,
            color:'#150a00',border:'none',borderRadius:11,
            padding:'11px 24px',fontSize:'.93rem',fontWeight:800,
            fontFamily:'Noto Naskh Arabic,serif',cursor:'pointer',
            boxShadow:`0 4px 20px ${C.G4}60`,transition:'all .25s',whiteSpace:'nowrap',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 28px ${C.G4}80`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 20px ${C.G4}60`;}}>
            ابدأ التفسير ←
          </button>
        </div>
      </header>
    </div>
  );
}

/* ═══════════════════════════════
   HERO — الصورة الإسلامية كخلفية مع طبقة فاتحة
═══════════════════════════════ */
function Hero() {
  const nav = useNavigate();
  return (
    <section style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      {/* ── الصورة خلفية */}
      <div style={{
        position:'absolute', inset:0, zIndex:0,
        backgroundImage:'url(/bg_islamic.jpg)',
        backgroundSize:'cover',
        backgroundPosition:'center top',
        backgroundRepeat:'no-repeat',
      }}/>
      {/* ── طبقة ذهبية خفيفة — تُبرز الصورة لا تخفيها */}
      <div style={{
        position:'absolute', inset:0, zIndex:1,
        background:`linear-gradient(180deg,
          rgba(10,5,0,.55) 0%,
          rgba(8,4,0,.38) 25%,
          rgba(10,5,0,.42) 60%,
          rgba(8,4,0,.70) 100%)`,
      }}/>
      {/* ── توهج ذهبي مركزي خفيف */}
      <div style={{
        position:'absolute', inset:0, zIndex:2,
        background:`radial-gradient(ellipse 55% 50% at 50% 42%, rgba(200,140,0,.20) 0%, transparent 65%)`,
        pointerEvents:'none',
      }}/>

      {/* مقرنصات أعلى */}
      <div style={{position:'absolute',top:0,left:0,right:0,zIndex:3}}>
        <Muqarnas h={54}/>
      </div>

      {/* خطوط عمودية ذهبية جانبية */}
      {[{s:'right',d:28},{s:'right',d:56},{s:'left',d:28},{s:'left',d:56}].map((p,i)=>(
        <div key={i} style={{
          position:'absolute',top:0,bottom:0,zIndex:3,
          [p.s]:p.d, width:'1px',
          background:`linear-gradient(180deg,transparent,${i%2===0?C.G5+'a0':C.G4+'60'},${i%2===0?C.G6+'c0':C.G4+'70'},${i%2===0?C.G5+'a0':C.G4+'60'},transparent)`,
        }}/>
      ))}

      {/* زخرفة الأركان */}
      <div style={{position:'absolute',top:60,right:20,zIndex:4}}><Corner size={88}/></div>
      <div style={{position:'absolute',top:60,left:20,zIndex:4}}><Corner size={88} fx/></div>
      <div style={{position:'absolute',bottom:70,right:20,zIndex:4}}><Corner size={70} fy/></div>
      <div style={{position:'absolute',bottom:70,left:20,zIndex:4}}><Corner size={70} fx fy/></div>

      {/* المحتوى */}
      <div style={{
        position:'relative', zIndex:5,
        textAlign:'center', maxWidth:880, padding:'140px 30px 100px',
        direction:'rtl',
      }}>

        {/* الشعار */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:36}}>
          <div style={{position:'relative',width:200,height:200}}>
            {/* هالة ذهبية */}
            <div style={{
              position:'absolute',inset:-24,borderRadius:'50%',
              background:`radial-gradient(circle,${C.G4}38 0%,${C.G3}18 40%,transparent 70%)`,
              animation:'glow 3.5s ease-in-out infinite',
            }}/>
            {/* قوس فوق الشعار */}
            <div style={{position:'absolute',top:-28,left:'50%',transform:'translateX(-50%)',opacity:.8,zIndex:2}}>
              <Arch w={160} h={28} col={C.G5} op={1}/>
            </div>
            {/* الإطار */}
            <div style={{
              width:200,height:200,
              borderRadius:'50% 50% 18px 18px',
              border:`2px solid ${C.G4}a0`,
              overflow:'hidden',background:`rgba(10,5,0,.80)`,
              boxShadow:`0 0 0 6px ${C.G4}28, 0 0 60px ${C.G4}55, 0 0 120px ${C.G3}22, inset 0 0 40px rgba(0,0,0,.5)`,
              position:'relative',zIndex:1,
            }}>
              <img src="/logo.png" alt="فيوض التأويل المعاصر"
                style={{width:'100%',height:'100%',objectFit:'contain',padding:12}}/>
            </div>
            {/* نجوم أركان */}
            {[{t:-10,r:-10},{t:-10,l:-10},{b:-10,r:-10},{b:-10,l:-10}].map((p,i)=>(
              <div key={i} style={{position:'absolute',...p,zIndex:6}}>
                <svg width="19" height="19" viewBox="0 0 17 17">
                  <polygon points="8.5,1 10.5,6.5 16.5,6.5 12,10 14,16 8.5,12.5 3,16 5,10 0.5,6.5 6.5,6.5"
                    fill={C.G5} fillOpacity=".95"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* بسملة */}
        <div style={{
          display:'inline-block',
          background:`linear-gradient(135deg,rgba(210,150,0,.28),rgba(240,192,64,.18))`,
          border:`1.5px solid ${C.BD4}`,
          borderRadius:16, padding:'14px 50px', marginBottom:32,
          boxShadow:`0 0 50px ${C.G4}28, inset 0 1px 0 ${C.G6}35`,
          backdropFilter:'blur(8px)',
        }}>
          <p style={{fontFamily:'Amiri,serif',fontSize:'clamp(1.35rem,2.8vw,2.05rem)',
            color:C.G7,margin:0,letterSpacing:'.08em',textShadow:`0 0 35px ${C.G4}80, 0 2px 8px rgba(0,0,0,.5)`}}>
            ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾
          </p>
        </div>

        {/* العنوان */}
        <h1 style={{
          fontFamily:'Amiri,serif',
          fontSize:'clamp(2.8rem,6.5vw,5.5rem)',
          fontWeight:700,margin:'0 0 8px',
          background:`linear-gradient(135deg,${C.G3} 0%,${C.G5} 25%,${C.G7} 50%,#fffbe8 60%,${C.G6} 80%,${C.G4} 100%)`,
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
          lineHeight:1.2, filter:`drop-shadow(0 0 60px ${C.G4}65)`,letterSpacing:'.03em',
        }}>فيوض التأويل المعاصر</h1>

        <div style={{margin:'6px 0 20px'}}>
          <span style={{fontFamily:'Amiri,serif',fontSize:'clamp(1.15rem,2.5vw,1.8rem)',
            color:C.TEAL4,fontWeight:600,textShadow:`0 0 25px ${C.TEAL3}70`}}>
            تفسير سورة البقرة
          </span>
          <span style={{color:C.TW4,margin:'0 12px'}}>·</span>
          <span style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'clamp(.9rem,1.6vw,1.1rem)',color:C.TW3}}>
            قراءة معاصرة متعددة اللغات
          </span>
        </div>

        <Divider/>

        <p style={{
          fontFamily:'Noto Naskh Arabic,serif',
          fontSize:'clamp(1rem,1.85vw,1.22rem)',
          color:'rgba(255,248,220,.92)',lineHeight:2.15,
          maxWidth:660,margin:'0 auto 42px',
          textShadow:'0 1px 10px rgba(0,0,0,.7)',
        }}>
          قراءة تفسيرية معاصرة تجمع بين البيان القرآني والتدبر التربوي والبصيرة النفسية —
          بلغة تُخاطب الروح وتستنير بنور الوحي
        </p>

        {/* أزرار */}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:52}}>
          {[
            {label:'ابدأ التصفح',pri:true,to:'/part1'},
            {label:'تصفح السور',pri:false,href:'#surahs'},
            {label:'البحث',pri:false,href:'#search-sec'},
            {label:'عن المشروع',pri:false,href:'#about'},
          ].map((b,i)=><HBtn key={i} {...b} nav={nav}/>)}
        </div>

        {/* إحصائيات — صناديق شفافة زجاجية ذهبية */}
        <div style={{
          display:'flex',gap:0,justifyContent:'center',flexWrap:'wrap',
          background:'rgba(220,160,0,.18)',
          border:`1px solid ${C.BD3}`,borderRadius:22,overflow:'hidden',
          backdropFilter:'blur(16px)',
          boxShadow:`0 8px 50px rgba(0,0,0,.55), inset 0 1px 0 ${C.G5}28`,
        }}>
          {[
            {n:'٢٨٦',l:'آية مفسَّرة',   c:C.G6},
            {n:'٧',  l:'أبعاد تفسيرية',c:C.TEAL4},
            {n:'٥',  l:'لغات عالمية',  c:C.BLUE4},
            {n:'١٠٠٪',l:'مصادر موثَّقة',c:C.G7},
          ].map((s,i)=>(
            <div key={i} style={{flex:'1 1 120px',padding:'24px 18px',textAlign:'center',
              borderLeft:i>0?`1px solid ${C.BD1}`:'none',
              background:i%2===0?'rgba(255,255,255,.025)':'transparent'}}>
              <div style={{fontFamily:'Amiri,serif',fontSize:'2.5rem',fontWeight:700,
                color:s.c,lineHeight:1,marginBottom:7,textShadow:`0 0 20px ${s.c}70`}}>{s.n}</div>
              <div style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.83rem',color:C.TW3}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* مقرنصات أسفل */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:3}}>
        <Muqarnas h={44} flip/>
      </div>

      {/* سهم تمرير */}
      <div style={{position:'absolute',bottom:50,left:'50%',transform:'translateX(-50%)',
        display:'flex',flexDirection:'column',alignItems:'center',gap:3,opacity:.6,zIndex:5}}>
        <span style={{fontSize:'.72rem',color:C.G5,fontFamily:'Noto Naskh Arabic'}}>تمرير</span>
        <ChevronDown size={18} color={C.G5}/>
      </div>
    </section>
  );
}

function HBtn({label,pri,to,href,nav}) {
  const [h,setH]=useState(false);
  const go=()=>to?nav(to):document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
  return (
    <button onClick={go} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background:pri?`linear-gradient(135deg,${C.G2},${C.G4},${C.G5})`:h?C.GLOW2:'rgba(255,255,255,.08)',
      color:pri?'#150a00':h?C.G6:C.TW2,
      border:`1.5px solid ${pri?C.G4:h?C.G4:C.BD2}`,
      borderRadius:12,padding:'12px 24px',
      fontSize:'.96rem',fontWeight:700,
      fontFamily:'Noto Naskh Arabic,serif',cursor:'pointer',transition:'all .22s',
      transform:h?'translateY(-3px)':'none',
      boxShadow:pri?`0 6px 25px ${C.G4}58`:h?`0 6px 20px ${C.G4}28`:'0 2px 10px rgba(0,0,0,.4)',
      backdropFilter:pri?'none':'blur(10px)',
    }}>{label}</button>
  );
}

/* ═══════════════════════════════
   SEARCH
═══════════════════════════════ */
function SearchSection() {
  const [q,setQ]=useState('');
  const [f,setF]=useState('all');
  const nav=useNavigate();

  return (
    <section id="search-sec" style={{
      /* خلفية دافئة ذهبية */
      background:`linear-gradient(180deg, #2a1800 0%, #221200 50%, #2a1800 100%)`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.08}/>
      {/* خط ذهبي أعلى */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg,transparent,${C.G3},${C.G6},${C.G3},transparent)`}}/>

      <div style={{maxWidth:880,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title="البحث في التفسير" sub="ابحث بالآية، الموضوع، الكلمة، أو الجذر اللغوي"/>

        {/* صندوق البحث — زجاجي ذهبي */}
        <div style={{
          background:`rgba(255,220,100,.08)`,
          border:`1.5px solid ${C.BD4}`,
          borderRadius:24,padding:'28px 30px',
          boxShadow:`0 14px 60px rgba(0,0,0,.55), inset 0 1px 0 ${C.G5}30`,
          position:'relative',overflow:'hidden',
          backdropFilter:'blur(12px)',
        }}>
          <div style={{position:'absolute',top:-18,left:'50%',transform:'translateX(-50%)',opacity:.55}}>
            <Arch w={260} h={22} col={C.G4} op={1}/>
          </div>

          <div style={{display:'flex',gap:8,marginBottom:18,flexWrap:'wrap'}} dir="rtl">
            {['الكل','آية','سورة','موضوع','كلمة','جذر'].map((lbl,i)=>{
              const id=['all','ayah','surah','topic','word','root'][i];
              const ac=f===id;
              return (
                <button key={id} onClick={()=>setF(id)} style={{
                  background:ac?`linear-gradient(135deg,${C.G2},${C.G5})`:'rgba(255,220,100,.08)',
                  color:ac?'#150a00':C.TW2,
                  border:`1px solid ${ac?C.G5:C.BD2}`,
                  borderRadius:11,padding:'6px 17px',
                  fontSize:'.84rem',fontWeight:700,cursor:'pointer',
                  fontFamily:'Noto Naskh Arabic,serif',transition:'all .18s',
                  boxShadow:ac?`0 2px 14px ${C.G4}50`:'none',
                }}>{lbl}</button>
              );
            })}
          </div>

          <div style={{
            display:'flex',gap:10,alignItems:'center',
            background:'rgba(255,220,100,.06)',
            border:`1px solid ${C.BD3}`,borderRadius:14,padding:'10px 16px',
          }}>
            <Search size={22} color={C.G4} style={{flexShrink:0}}/>
            <input value={q} onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&nav('/part1')}
              placeholder="ابحث في فيوض التفسير... (مثال: الصبر، التوبة، الرزق)"
              dir="rtl" style={{
                flex:1,background:'transparent',border:'none',outline:'none',
                color:C.TW,fontSize:'1rem',fontFamily:'Noto Naskh Arabic,serif',
              }}/>
            <button onClick={()=>nav('/part1')} style={{
              background:`linear-gradient(135deg,${C.G2},${C.G5})`,
              color:'#150a00',border:'none',borderRadius:11,
              padding:'9px 24px',fontSize:'.92rem',fontWeight:800,
              fontFamily:'Noto Naskh Arabic,serif',cursor:'pointer',flexShrink:0,
              boxShadow:`0 4px 16px ${C.G4}55`,
            }}>بحث</button>
          </div>
        </div>

        {/* صناديق الوصول السريع — ألوان فاتحة مشبعة */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(142px,1fr))',gap:13,marginTop:22}} dir="rtl">
          {[
            {icon:'🔥',label:'آية اليوم',      bg:C.ROSE,  bd:C.ROSE3,  tx:C.ROSE4},
            {icon:'💚',label:'آيات الرحمة',    bg:C.TEAL,  bd:C.TEAL3,  tx:C.TEAL4},
            {icon:'🛡️',label:'آيات التوجيه',   bg:C.BLUE,  bd:C.BLUE3,  tx:C.BLUE4},
            {icon:'✨',label:'البعد النفسي',   bg:C.PURP,  bd:C.PURP3,  tx:C.PURP4},
            {icon:'📖',label:'التدبر التربوي', bg:C.OLIV,  bd:C.OLIV3,  tx:C.OLIV4},
            {icon:'🌍',label:'المعاصرة',       bg:C.COPP,  bd:C.COPP3,  tx:C.COPP4},
          ].map(card=>(
            <button key={card.label} onClick={()=>nav('/part1')} style={{
              background:`linear-gradient(160deg,${card.bg}e0,${card.bg}99)`,
              border:`1.5px solid ${card.bd}80`,
              borderRadius:15,padding:'16px 10px',cursor:'pointer',
              transition:'all .22s',textAlign:'center',
              boxShadow:`0 5px 22px rgba(0,0,0,.4)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=card.bd;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 14px 32px rgba(0,0,0,.5)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${card.bd}80`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 5px 22px rgba(0,0,0,.4)`;}}>
              <div style={{fontSize:'1.6rem',marginBottom:8}}>{card.icon}</div>
              <div style={{color:card.tx,fontSize:'.82rem',fontWeight:700,fontFamily:'Noto Naskh Arabic,serif'}}>{card.label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   ABOUT — بطاقات ملونة فاتحة مشبعة
═══════════════════════════════ */
function About() {
  const cards=[
    {icon:<Shield size={24}/>,    bg:C.TEAL,  bd:C.TEAL3,  ic:C.TEAL4,  title:'الأصالة العلمية',    text:'مصادر موثَّقة من أمهات كتب التفسير والعلوم الإسلامية'},
    {icon:<Layers size={24}/>,    bg:C.G1,    bd:C.G4,     ic:C.G6,     title:'العمق التأويلي',     text:'سبعة أبعاد: بياني، تأويلي، روحاني، نفسي، تربوي، معاصر، استشهادي'},
    {icon:<Eye size={24}/>,       bg:C.BLUE,  bd:C.BLUE3,  ic:C.BLUE4,  title:'التدبر والتأمل',     text:'قراءة تدعو القلب إلى التأمل في أعماق المعنى القرآني'},
    {icon:<Zap size={24}/>,       bg:C.ROSE,  bd:C.ROSE3,  ic:C.ROSE4,  title:'المعاصرة والحياة',   text:'ربط الآيات بواقع الإنسان المعاصر وتحدياته الروحية'},
    {icon:<Brain size={24}/>,     bg:C.PURP,  bd:C.PURP3,  ic:C.PURP4,  title:'البعد النفسي',       text:'استلهام الدروس النفسية والعلاجية من آيات القرآن الكريم'},
    {icon:<Feather size={24}/>,   bg:C.OLIV,  bd:C.OLIV3,  ic:C.OLIV4,  title:'الإرشاد والهداية',   text:'مناهج تربوية مستخرجة من نور القرآن للارتقاء بالنفس'},
  ];

  return (
    <section id="about" style={{
      background:`linear-gradient(160deg,#201000 0%,#281600 50%,#1c0e00 100%)`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.07}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,
        background:`linear-gradient(90deg,transparent,${C.G4},${C.G6},${C.G4},transparent)`}}/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title="رؤية المشروع ومنهجيته"
          sub="مشروع علمي متكامل يُقدّم تفسيراً قرآنياً يخاطب العقل والروح معاً"/>

        {/* بطاقة الرؤية الرئيسية */}
        <div style={{
          background:`linear-gradient(160deg,rgba(200,140,0,.14),rgba(240,192,64,.08))`,
          border:`1.5px solid ${C.BD3}`,borderRadius:24,padding:'34px 44px',marginBottom:42,
          position:'relative',overflow:'hidden',
          boxShadow:`0 14px 60px rgba(0,0,0,.48), inset 0 1px 0 ${C.G5}22`,
          backdropFilter:'blur(8px)',
        }}>
          <div style={{position:'absolute',top:-15,right:'50%',transform:'translateX(50%)',opacity:.1}}>
            <Arch w={650} h={220} col={C.G5} op={1}/>
          </div>
          <div dir="rtl" style={{position:'relative',zIndex:1}}>
            <h3 style={{fontFamily:'Amiri,serif',fontSize:'1.75rem',fontWeight:700,
              background:`linear-gradient(135deg,${C.G4},${C.G6},${C.G7})`,
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
              marginBottom:18}}>فيوض التأويل المعاصر</h3>
            <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'1.08rem',
              color:'rgba(255,248,220,.92)',lineHeight:2.25,
              borderRight:`3px solid ${C.G4}`,paddingRight:22}}>
              قراءة تفسيرية معاصرة تجمع بين البيان القرآني، والتدبر التربوي، والبصيرة النفسية —
              مشروع يقف عند نهر المعنى ليغترف منه، لا ليختصره.
            </p>
          </div>
        </div>

        {/* البطاقات الملونة */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(325px,1fr))',gap:18}}>
          {cards.map(c=>(
            <div key={c.title} dir="rtl" style={{
              background:`linear-gradient(160deg,${c.bg}45,${c.bg}22)`,
              border:`1.5px solid ${c.bd}55`,
              borderRadius:20,padding:'26px 22px',
              transition:'all .28s',cursor:'default',
              boxShadow:`0 5px 26px rgba(0,0,0,.32)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.bd}90`;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 16px 42px rgba(0,0,0,.42),0 0 0 1px ${c.bd}30`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${c.bd}55`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 5px 26px rgba(0,0,0,.32)`;}}>
              <div style={{width:52,height:52,borderRadius:14,marginBottom:16,
                background:`${c.bg}50`,border:`1.5px solid ${c.bd}70`,
                display:'flex',alignItems:'center',justifyContent:'center',color:c.ic}}>{c.icon}</div>
              <div style={{fontFamily:'Noto Naskh Arabic,serif',color:C.TW,fontWeight:700,fontSize:'1.02rem',marginBottom:10}}>{c.title}</div>
              <div style={{fontFamily:'Noto Naskh Arabic,serif',color:C.TW2,fontSize:'.9rem',lineHeight:2.05}}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   SURAHS — بطاقات ملونة أجمل وأكثر إضاءة
═══════════════════════════════ */
function Surahs() {
  const nav=useNavigate();
  const parts=[
    {title:'الجزء الأول',range:'الآيات ١ – ١٠١',count:101,path:'/part1',badge:'متاح',
      bg:C.TEAL,bd:C.TEAL2,ac:C.TEAL3,lt:C.TEAL4,
      desc:'من بداية السورة حتى تحويل القبلة — رحلة الإيمان والاختبار',
      themes:['إيمان','خلق آدم','المنافقون','بنو إسرائيل','القبلة']},
    {title:'الجزء الثاني',range:'الآيات ١٠٢ – ٢٠٠',count:99,path:'/part2',badge:'متاح',
      bg:C.G1,bd:C.G2,ac:C.G3,lt:C.G5,
      desc:'من السحر والبقرة إلى شعائر الحج — قوانين الحضارة الإسلامية',
      themes:['السحر','الحج','الجهاد','الإنفاق','الإسلام']},
    {title:'الجزء الثالث',range:'الآيات ٢٠١ – ٢٨٦',count:86,path:null,badge:'قريباً',
      bg:C.BLUE,bd:C.BLUE2,ac:C.BLUE3,lt:C.BLUE4,
      desc:'من المكارم والجهاد إلى آية الكرسي والحساب — قمة السورة',
      themes:['آية الكرسي','الطلاق','الدَّين','الخوف','الذكر']},
  ];

  return (
    <section id="surahs" style={{
      background:`linear-gradient(180deg,#1c0e00 0%,#281800 50%,#1c0e00 100%)`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.07}/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title="تصفح سورة البقرة"
          sub="٢٨٦ آية في ثلاثة أجزاء — كل جزء باب من أبواب المعرفة القرآنية"/>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))',gap:24}}>
          {parts.map(p=>(
            <div key={p.title} style={{
              background:`linear-gradient(190deg,${p.bg}50,${p.bg}28,#1e1000)`,
              border:`1.5px solid ${p.bd}60`,
              borderRadius:24,overflow:'hidden',transition:'all .3s',
              boxShadow:`0 7px 30px rgba(0,0,0,.42)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${p.bd}95`;e.currentTarget.style.transform='translateY(-7px)';e.currentTarget.style.boxShadow=`0 22px 56px rgba(0,0,0,.52),0 0 0 1px ${p.bd}35`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${p.bd}60`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 7px 30px rgba(0,0,0,.42)`;}}>

              {/* رأس ملون */}
              <div style={{
                background:`linear-gradient(160deg,${p.bg}70,${p.bg}45)`,
                borderBottom:`1px solid ${p.bd}50`,
                padding:'28px 26px 20px',position:'relative',overflow:'hidden',
              }}>
                <div style={{position:'absolute',top:0,left:0,right:0,opacity:.7}}>
                  <Muqarnas h={22}/>
                </div>
                <div style={{position:'absolute',bottom:-14,left:14,opacity:.8}}>
                  <Corner size={50} fx/>
                </div>
                <div dir="rtl" style={{position:'relative',zIndex:1,paddingTop:10}}>
                  <span style={{
                    background:p.badge==='متاح'?`linear-gradient(135deg,${p.ac},${p.lt})`:'rgba(100,100,120,.4)',
                    color:p.badge==='متاح'?'#100800':C.TW3,
                    fontSize:'.74rem',fontWeight:800,padding:'3px 14px',borderRadius:20,
                    fontFamily:'Noto Naskh Arabic,serif',float:'left',marginTop:6,
                  }}>{p.badge}</span>
                  <div style={{fontFamily:'Amiri,serif',fontSize:'1.75rem',color:p.lt,marginBottom:6}}>{p.title}</div>
                  <div style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.87rem',color:C.TW2}}>{p.range}</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:8,marginTop:10}}>
                    <span style={{fontFamily:'Amiri,serif',fontSize:'2.7rem',fontWeight:700,color:p.lt,lineHeight:1}}>{p.count}</span>
                    <span style={{fontSize:'.78rem',color:C.TW3,fontFamily:'Noto Naskh Arabic,serif'}}>آية</span>
                  </div>
                </div>
              </div>

              {/* الجسم */}
              <div style={{padding:'20px 26px 24px'}} dir="rtl">
                <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.87rem',color:C.TW3,lineHeight:1.9,marginBottom:14}}>{p.desc}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:20}}>
                  {p.themes.map(t=>(
                    <span key={t} style={{
                      background:`${p.bg}30`,border:`1px solid ${p.bd}45`,
                      borderRadius:8,padding:'3px 10px',fontSize:'.76rem',
                      color:p.lt,fontFamily:'Noto Naskh Arabic,serif',
                    }}>{t}</span>
                  ))}
                </div>
                <button onClick={()=>p.path&&nav(p.path)} disabled={!p.path} style={{
                  width:'100%',
                  background:p.path?`linear-gradient(135deg,${p.ac},${p.lt})`:'rgba(100,100,120,.22)',
                  color:p.path?'#100800':C.TW4,
                  border:'none',borderRadius:12,padding:'12px',
                  fontSize:'.94rem',fontWeight:800,fontFamily:'Noto Naskh Arabic,serif',
                  cursor:p.path?'pointer':'not-allowed',
                  boxShadow:p.path?`0 5px 20px ${p.ac}55`:'none',
                  transition:'all .22s',
                }}>{p.path?`اقرأ ${p.title} ←`:'قريباً...'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   PATHS — مسارات بصناديق ملونة أكثر تشبعاً
═══════════════════════════════ */
function Paths() {
  const items=[
    {icon:<BookOpen size={22}/>, bg:C.TEAL,  bd:C.TEAL2,  lt:C.TEAL4,  title:'المسار البياني',   sub:'جمال الأسلوب القرآني وفصاحته وبلاغة التعبير'},
    {icon:<Compass size={22}/>,  bg:C.G1,    bd:C.G2,     lt:C.G5,     title:'المسار التأويلي',  sub:'عمق المعنى والدلالة والقراءات التفسيرية'},
    {icon:<Heart size={22}/>,    bg:C.ROSE,  bd:C.ROSE2,  lt:C.ROSE4,  title:'المسار الروحاني',  sub:'الصلة بالله والتزكية والمقامات الروحانية'},
    {icon:<Brain size={22}/>,    bg:C.BLUE,  bd:C.BLUE2,  lt:C.BLUE4,  title:'المسار النفسي',    sub:'الأثر النفسي والعلاجي في ضوء علم النفس'},
    {icon:<Feather size={22}/>,  bg:C.OLIV,  bd:C.OLIV2,  lt:C.OLIV4,  title:'المسار التربوي',   sub:'الدروس والقيم التربوية وتزكية النفس'},
    {icon:<Zap size={22}/>,      bg:C.COPP,  bd:C.COPP2,  lt:C.COPP4,  title:'المسار المعاصر',   sub:'ربط الآيات بالحياة المعاصرة والعصر الحديث'},
  ];

  return (
    <section id="paths" style={{
      background:`linear-gradient(180deg,#281600 0%,#201000 50%,#281600 100%)`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.06}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,
        background:`linear-gradient(90deg,transparent,${C.G4},${C.G6},${C.G4},transparent)`}}/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title="مسارات التأويل" sub="كل مسار يفتح أفقاً معرفياً في فهم القرآن الكريم"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(305px,1fr))',gap:17}}>
          {items.map(p=>(
            <div key={p.title} dir="rtl" style={{
              background:`linear-gradient(160deg,${p.bg}3c,${p.bg}20)`,
              border:`1.5px solid ${p.bd}45`,
              borderRadius:20,padding:'24px 20px',
              display:'flex',alignItems:'flex-start',gap:15,
              cursor:'pointer',transition:'all .27s',
              boxShadow:`0 5px 24px rgba(0,0,0,.30)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${p.bd}80`;e.currentTarget.style.background=`linear-gradient(160deg,${p.bg}52,${p.bg}2e)`;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 16px 42px rgba(0,0,0,.38)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${p.bd}45`;e.currentTarget.style.background=`linear-gradient(160deg,${p.bg}3c,${p.bg}20)`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 5px 24px rgba(0,0,0,.30)`;}}>
              <div style={{width:54,height:54,borderRadius:14,flexShrink:0,
                background:`${p.bg}45`,border:`1.5px solid ${p.bd}65`,
                display:'flex',alignItems:'center',justifyContent:'center',color:p.lt}}>{p.icon}</div>
              <div>
                <div style={{fontFamily:'Noto Naskh Arabic,serif',fontWeight:700,color:C.TW,fontSize:'1rem',marginBottom:7}}>{p.title}</div>
                <div style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.86rem',color:C.TW2,lineHeight:1.9}}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FEATURED — بخلفية الصورة الإسلامية خفيفة أكثر وضوحاً
═══════════════════════════════ */
function Featured() {
  const nav=useNavigate();
  const items=[
    {label:'آية اليوم',    ayah:'﴿ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ﴾',ref:'البقرة: ٢٨٦',
      text:'قانون إلهي ثابت — فلا تكليف يتجاوز الطاقة، ولا ابتلاء يعجز عن الاحتمال.',
      bg:C.G1,bd:C.G3,lt:C.G6,icon:<Flame size={16}/>},
    {label:'وقفة تدبرية', ayah:'﴿ فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ ﴾',ref:'البقرة: ١٨٦',
      text:'أجاب الله مباشرةً دون واسطة — الدعاء هو اللقاء الحقيقي بلا حجاب.',
      bg:C.TEAL,bd:C.TEAL2,lt:C.TEAL4,icon:<Heart size={16}/>},
    {label:'فيض تربوي',   ayah:'﴿ وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ﴾',ref:'البقرة: ٤٥',
      text:'الصبر والصلاة معاً — اجتماعهما يصنع قدرةً على مواجهة الحياة بثقلها.',
      bg:C.BLUE,bd:C.BLUE2,lt:C.BLUE4,icon:<Sparkles size={16}/>},
  ];

  return (
    <section style={{
      position:'relative',
      background:`linear-gradient(160deg,#1c0e00 0%,#201200 100%)`,
      padding:'92px 26px',overflow:'hidden',
    }}>
      {/* صورة إسلامية في الخلف — أكثر وضوحاً */}
      <div style={{
        position:'absolute',inset:0,
        backgroundImage:'url(/bg_islamic.jpg)',
        backgroundSize:'cover',backgroundPosition:'center',
        opacity:.10,
      }}/>
      <GeomPattern opacity={.06}/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title="مختارات التفسير"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(345px,1fr))',gap:22}}>
          {items.map(item=>(
            <div key={item.label} dir="rtl" style={{
              background:`linear-gradient(165deg,${item.bg}40,#1a1000)`,
              border:`1.5px solid ${item.bd}45`,
              borderRadius:24,padding:'30px 26px',
              position:'relative',overflow:'hidden',transition:'all .3s',
              boxShadow:`0 7px 30px rgba(0,0,0,.40)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${item.bd}78`;e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow=`0 20px 48px rgba(0,0,0,.48)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${item.bd}45`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 7px 30px rgba(0,0,0,.40)`;}}>
              <div style={{position:'absolute',bottom:-35,left:'50%',transform:'translateX(-50%)',opacity:.07}}>
                <Arch w={320} h={130} col={item.lt} op={1}/>
              </div>
              <div style={{display:'inline-flex',alignItems:'center',gap:7,
                background:`${item.bg}35`,border:`1px solid ${item.bd}55`,
                borderRadius:20,padding:'5px 15px',marginBottom:18,
                color:item.lt,fontSize:'.83rem',fontWeight:700,fontFamily:'Noto Naskh Arabic,serif'}}>
                {item.icon} {item.label}
              </div>
              <p style={{fontFamily:'Amiri,serif',fontSize:'1.38rem',color:C.G7,lineHeight:2.05,marginBottom:10,textShadow:`0 0 25px ${C.G4}40`}}>{item.ayah}</p>
              <p style={{fontSize:'.74rem',color:item.lt,fontWeight:700,fontFamily:'Noto Naskh Arabic,serif',marginBottom:16}}>{item.ref}</p>
              <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.92rem',color:'rgba(255,248,220,.88)',lineHeight:2.15,margin:0,
                borderRight:`2.5px solid ${item.bd}65`,paddingRight:15}}>{item.text}</p>
              <button onClick={()=>nav('/part1')} style={{
                marginTop:20,background:'transparent',border:`1px solid ${item.bd}50`,
                borderRadius:10,padding:'8px 18px',color:item.lt,fontSize:'.83rem',
                fontWeight:700,fontFamily:'Noto Naskh Arabic,serif',cursor:'pointer',transition:'all .2s',
              }}
              onMouseEnter={e=>e.currentTarget.style.background=`${item.bg}28`}
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

/* ═══════════════════════════════
   MULTILINGUAL
═══════════════════════════════ */
function Multilingual({ lang, onLangChange }) {
  const samples={
    ar:{title:'فيوض التأويل المعاصر',text:'قراءة تفسيرية معاصرة تجمع بين البيان القرآني والتدبر التربوي والبصيرة النفسية'},
    en:{title:'Streams of Contemporary Tafsir',text:'A contemporary exegetical reading combining Quranic eloquence, pedagogical contemplation, and spiritual insight'},
    ur:{title:'عصری تفسیر کے فیوض',text:'ایک جدید تفسیری مطالعہ جو قرآنی بیان، تربیتی تدبر اور نفسیاتی بصیرت کو یکجا کرتا ہے'},
    id:{title:'Tafsir Kontemporer',text:'Tafsir Quran kontemporer yang memadukan keindahan bayan, kontemplasi pedagogis, dan wawasan spiritual'},
    tr:{title:'Çağdaş Tefsir Kaynakları',text:'Kuranın beyan güzelliğini, terbiyevi tefekkürü ve ruhsal kavrayışı bir araya getiren çağdaş bir tefsir'},
  };
  const cur=samples[lang]||samples.ar;
  const dir=['ar','ur'].includes(lang)?'rtl':'ltr';

  return (
    <section style={{
      background:`linear-gradient(135deg,#1a0c00 0%,#241400 50%,#1a0c00 100%)`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.09}/>
      <div style={{position:'absolute',inset:0,
        background:`radial-gradient(ellipse 60% 50% at 50% 50%,rgba(210,150,0,.16) 0%,transparent 65%)`,
        pointerEvents:'none'}}/>
      <div style={{maxWidth:940,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title="تجربة متعددة اللغات" sub="القرآن يخاطب العالم — اقرأ التفسير بلغتك"/>

        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:38}}>
          {LANGS.map(l=>(
            <button key={l.code} onClick={()=>onLangChange(l.code)} style={{
              background:lang===l.code?`linear-gradient(135deg,${C.G2},${C.G4},${C.G5})`:'rgba(255,220,100,.07)',
              color:lang===l.code?'#150a00':C.TW2,
              border:`1.5px solid ${lang===l.code?C.G5:C.BD2}`,
              borderRadius:14,padding:'11px 22px',
              fontSize:'.92rem',fontWeight:700,cursor:'pointer',
              fontFamily:['ar','ur'].includes(l.code)?'Noto Naskh Arabic,serif':'Inter,sans-serif',
              transition:'all .22s',display:'flex',alignItems:'center',gap:8,
              boxShadow:lang===l.code?`0 6px 22px ${C.G4}58`:'0 2px 10px rgba(0,0,0,.30)',
              backdropFilter:lang===l.code?'none':'blur(8px)',
            }}
            onMouseEnter={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.G4;e.currentTarget.style.color=C.G6;e.currentTarget.style.background=C.GLOW2;}}}
            onMouseLeave={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.BD2;e.currentTarget.style.color=C.TW2;e.currentTarget.style.background='rgba(255,220,100,.07)';}}}>
              <span style={{fontSize:'1.15rem'}}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        <div style={{
          position:'relative',
          background:`rgba(210,150,0,.12)`,
          border:`1.5px solid ${C.BD4}`,
          borderRadius:'0 0 22px 22px',
          padding:'44px 50px 42px',
          boxShadow:`0 14px 55px rgba(0,0,0,.52), inset 0 1px 0 ${C.G5}28`,
          backdropFilter:'blur(10px)',
        }}>
          <div style={{position:'absolute',top:-46,left:'50%',transform:'translateX(-50%)',width:'84%'}}>
            <Arch w={700} h={50} col={C.G4} op={.75}/>
          </div>
          <div dir={dir} style={{transition:'all .35s'}}>
            <h3 style={{fontFamily:dir==='rtl'?'Amiri,serif':'Playfair Display,serif',
              fontSize:'2.1rem',fontWeight:700,marginBottom:18,
              background:`linear-gradient(135deg,${C.G4},${C.G6},${C.G7})`,
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
              filter:`drop-shadow(0 0 22px ${C.G3}38)`}}>{cur.title}</h3>
            <p style={{fontFamily:dir==='rtl'?'Noto Naskh Arabic,serif':'Inter,sans-serif',
              fontSize:'1.06rem',color:'rgba(255,248,220,.90)',lineHeight:2.25}}>{cur.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FEATURES
═══════════════════════════════ */
function Features() {
  const items=[
    {icon:<Search size={22}/>,     bg:C.TEAL, bd:C.TEAL2,lt:C.TEAL4,title:'البحث الذكي',        text:'بحث بالآية والكلمة والموضوع والجذر اللغوي',    badge:'متاح'},
    {icon:<Layers size={22}/>,     bg:C.G1,   bd:C.G2,   lt:C.G5,   title:'مقارنة الآيات',      text:'مقارنة التفسيرات وربط الآيات ذات الموضوع الواحد', badge:'قريباً'},
    {icon:<Map size={22}/>,        bg:C.BLUE, bd:C.BLUE2,lt:C.BLUE4,title:'خرائط المعرفة',      text:'خرائط ذهنية للمواضيع القرآنية وترابطها',      badge:'قريباً'},
    {icon:<Volume2 size={22}/>,    bg:C.ROSE, bd:C.ROSE2,lt:C.ROSE4,title:'التفسير الصوتي',     text:'الاستماع للتفسير بأصوات عالية الجودة',         badge:'قريباً'},
    {icon:<BookMarked size={22}/>, bg:C.OLIV, bd:C.OLIV2,lt:C.OLIV4,title:'المسارات الموضوعية', text:'تصفح التفسير حسب المواضيع والأبعاد',           badge:'متاح'},
    {icon:<Globe size={22}/>,      bg:C.PURP, bd:C.PURP2,lt:C.PURP4,title:'خمس لغات',           text:'العربية والإنجليزية والأردو والإندونيسية والتركية',badge:'متاح'},
  ];

  return (
    <section id="features" style={{
      background:`linear-gradient(180deg,#200e00 0%,#2a1600 50%,#200e00 100%)`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.06}/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title="خصائص المنصة"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(325px,1fr))',gap:18}}>
          {items.map(f=>(
            <div key={f.title} dir="rtl" style={{
              background:`linear-gradient(160deg,${f.bg}32,#1a1000)`,
              border:`1.5px solid ${f.bd}38`,
              borderRadius:20,padding:'28px 24px',position:'relative',
              transition:'all .27s',boxShadow:`0 5px 24px rgba(0,0,0,.32)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${f.bd}75`;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,.40)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${f.bd}38`;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 5px 24px rgba(0,0,0,.32)`;}}>
              <span style={{
                position:'absolute',top:14,left:14,
                background:f.badge==='متاح'?`${f.bg}40`:`${C.G1}30`,
                color:f.badge==='متاح'?f.lt:C.G5,
                border:`1px solid ${f.badge==='متاح'?f.bd:C.G2}45`,
                borderRadius:20,padding:'2px 10px',fontSize:'.70rem',fontWeight:700,
                fontFamily:'Noto Naskh Arabic,serif',
              }}>{f.badge}</span>
              <div style={{width:54,height:54,borderRadius:14,marginBottom:16,
                background:`${f.bg}32`,border:`1.5px solid ${f.bd}55`,
                display:'flex',alignItems:'center',justifyContent:'center',color:f.lt}}>{f.icon}</div>
              <div style={{fontFamily:'Noto Naskh Arabic,serif',fontWeight:700,color:C.TW,fontSize:'1.01rem',marginBottom:10}}>{f.title}</div>
              <div style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.88rem',color:C.TW2,lineHeight:2.05}}>{f.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   NEWSLETTER
═══════════════════════════════ */
function Newsletter() {
  const [em,setEm]=useState('');
  const [ok,setOk]=useState(false);
  return (
    <section style={{
      background:`linear-gradient(180deg,#281600 0%,#1e1000 100%)`,
      padding:'82px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.07}/>
      <div style={{position:'absolute',inset:0,
        background:`radial-gradient(ellipse at 50% 50%,rgba(210,150,0,.15) 0%,transparent 60%)`,pointerEvents:'none'}}/>
      <div style={{maxWidth:600,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}} dir="rtl">
        <Divider/>
        <h2 style={{fontFamily:'Amiri,serif',fontSize:'clamp(1.75rem,3vw,2.35rem)',
          background:`linear-gradient(135deg,${C.G4},${C.G6},${C.G7})`,
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
          margin:'10px 0 14px'}}>تابع الإضافات الجديدة</h2>
        <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.95rem',color:C.TW2,lineHeight:2.1,marginBottom:30}}>
          اشترك ليصلك كل جديد — آيات وتفسيرات وسور جديدة
        </p>
        {ok?(
          <div style={{background:`${C.TEAL}35`,border:`1px solid ${C.TEAL4}60`,borderRadius:14,
            padding:'16px 28px',color:C.TEAL4,fontFamily:'Noto Naskh Arabic,serif',fontSize:'.95rem'}}>
            ✅ شكراً! تم تسجيل اشتراكك
          </div>
        ):(
          <div style={{display:'flex',gap:12}}>
            <input type="email" value={em} onChange={e=>setEm(e.target.value)}
              placeholder="بريدك الإلكتروني" dir="rtl" style={{
                flex:1,background:'rgba(255,220,100,.07)',
                border:`1.5px solid ${C.BD2}`,borderRadius:14,
                padding:'13px 18px',color:C.TW,fontSize:'.92rem',
                fontFamily:'Noto Naskh Arabic,serif',outline:'none',
              }}/>
            <button onClick={()=>em&&setOk(true)} style={{
              background:`linear-gradient(135deg,${C.G2},${C.G5})`,
              color:'#150a00',border:'none',borderRadius:14,
              padding:'13px 26px',fontSize:'.92rem',fontWeight:800,
              fontFamily:'Noto Naskh Arabic,serif',cursor:'pointer',
              whiteSpace:'nowrap',flexShrink:0,boxShadow:`0 5px 20px ${C.G4}55`,
            }}>اشترك</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FOOTER
═══════════════════════════════ */
function Footer() {
  const nav=useNavigate();
  return (
    <footer style={{
      background:`linear-gradient(180deg,#1e1000,#150a00)`,
      borderTop:`1px solid ${C.BD3}`,padding:'60px 26px 32px',
      position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.05}/>
      <div style={{position:'absolute',top:0,left:0,right:0}}>
        <Muqarnas h={32}/>
      </div>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,
        background:`linear-gradient(90deg,transparent,${C.G3},${C.G6},${C.G3},transparent)`}}/>

      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:40,marginBottom:40}} dir="rtl">
          <div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:13,marginBottom:16}}>
              <div style={{width:94,height:94,borderRadius:'50% 50% 14px 14px',
                border:`1.5px solid ${C.G4}75`,overflow:'hidden',background:'rgba(10,5,0,.9)',
                boxShadow:`0 0 26px ${C.G4}32`}}>
                <img src="/logo.png" alt="Logo" style={{width:'100%',height:'100%',objectFit:'contain',padding:6}}/>
              </div>
              <div style={{fontFamily:'Amiri,serif',fontSize:'1.15rem',fontWeight:700,
                background:`linear-gradient(135deg,${C.G4},${C.G6})`,
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                فيوض التأويل المعاصر
              </div>
            </div>
            <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.83rem',color:C.TW4,lineHeight:2.1}}>
              مشروع تفسيري قرآني معاصر يقدم سورة البقرة بأسلوب متعدد الأبعاد
            </p>
          </div>

          <div>
            <h4 style={{fontFamily:'Noto Naskh Arabic,serif',color:C.G5,fontSize:'.92rem',fontWeight:700,marginBottom:16}}>روابط سريعة</h4>
            {[['الجزء الأول',()=>nav('/part1')],['الجزء الثاني',()=>nav('/part2')],
              ['عن المشروع',()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'})],
              ['البحث في التفسير',()=>document.getElementById('search-sec')?.scrollIntoView({behavior:'smooth'})]
            ].map(([l,fn])=>(
              <div key={l} style={{marginBottom:10}}>
                <button onClick={fn} style={{background:'none',border:'none',color:C.TW2,
                  fontSize:'.85rem',fontFamily:'Noto Naskh Arabic,serif',cursor:'pointer',padding:0,transition:'color .2s'}}
                onMouseEnter={e=>e.currentTarget.style.color=C.G5}
                onMouseLeave={e=>e.currentTarget.style.color=C.TW2}>← {l}</button>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{fontFamily:'Noto Naskh Arabic,serif',color:C.G5,fontSize:'.92rem',fontWeight:700,marginBottom:16}}>اللغات</h4>
            {LANGS.map(l=>(
              <div key={l.code} style={{marginBottom:9,fontSize:'.84rem',color:C.TW3,
                fontFamily:['ar','ur'].includes(l.code)?'Noto Naskh Arabic,serif':'Inter,sans-serif'}}>
                {l.flag} {l.label}
              </div>
            ))}
          </div>

          <div>
            <h4 style={{fontFamily:'Noto Naskh Arabic,serif',color:C.G5,fontSize:'.92rem',fontWeight:700,marginBottom:16}}>تواصل معنا</h4>
            <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.83rem',color:C.TW4,lineHeight:2.1}}>
              للتواصل والملاحظات العلمية حول المشروع
            </p>
            <a href="mailto:info@fuyud-tafsir.com" style={{
              display:'inline-flex',alignItems:'center',gap:6,
              color:C.G5,fontSize:'.83rem',fontFamily:'Inter,sans-serif',
              textDecoration:'none',marginTop:10,transition:'color .2s'}}
            onMouseEnter={e=>e.currentTarget.style.color=C.G7}
            onMouseLeave={e=>e.currentTarget.style.color=C.G5}>
              <Mail size={14}/> info@fuyud-tafsir.com
            </a>
          </div>
        </div>

        <Divider/>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:13}} dir="rtl">
          <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'.78rem',color:C.TW4,margin:0}}>
            © ١٤٤٦ هـ | فيوض التأويل المعاصر — جميع الحقوق محفوظة
          </p>
          <div style={{display:'flex',gap:22}}>
            {['سياسة الخصوصية','شروط الاستخدام'].map(t=>(
              <span key={t} style={{fontSize:'.75rem',color:C.TW4,fontFamily:'Noto Naskh Arabic,serif',
                cursor:'pointer',transition:'color .2s'}}
              onMouseEnter={e=>e.currentTarget.style.color=C.G5}
              onMouseLeave={e=>e.currentTarget.style.color=C.TW4}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════
   MAIN
═══════════════════════════════ */
export default function HomePage({ lang, onLangChange }) {
  return (
    <div style={{background:'#1a1000',minHeight:'100vh',direction:'rtl'}}>
      <style>{`
        @keyframes glow {
          0%,100%{opacity:.35;transform:scale(1)}
          50%{opacity:.70;transform:scale(1.10)}
        }
        .nav-desktop{display:flex}
        @media(max-width:768px){.nav-desktop{display:none!important}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:8px;background:#150a00}
        ::-webkit-scrollbar-thumb{background:${C.G2};border-radius:8px}
        ::-webkit-scrollbar-thumb:hover{background:${C.G4}}
        ::selection{background:${C.G3}60;color:#fff8e8}
      `}</style>

      <Header lang={lang} onLangChange={onLangChange}/>
      <Hero/>
      <SearchSection/>
      <About/>
      <Surahs/>
      <Paths/>
      <Featured/>
      <Multilingual lang={lang} onLangChange={onLangChange}/>
      <Features/>
      <Newsletter/>
      <Footer/>
    </div>
  );
}
