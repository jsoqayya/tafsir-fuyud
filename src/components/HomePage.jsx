import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Globe, ChevronDown, BookMarked,
  Heart, Brain, Shield, Layers, Map, Volume2,
  Mail, Compass, Feather, Flame, Eye,
  Zap, Sparkles
} from 'lucide-react';
import TRANSLATIONS from '../i18n';
import { THEMES } from '../themes';

/* ─── Language Route Map ─────────────────────── */
const LANG_ROUTES = { ar:'/', en:'/en', ur:'/ur', id:'/id', tr:'/tr' };

const LANGS = [
  { code:'ar', label:'العربية', flag:'🇸🇦', dir:'rtl' },
  { code:'en', label:'English', flag:'🇬🇧', dir:'ltr' },
  { code:'ur', label:'اردو',    flag:'🇵🇰', dir:'rtl' },
  { code:'id', label:'Bahasa',  flag:'🇮🇩', dir:'ltr' },
  { code:'tr', label:'Türkçe',  flag:'🇹🇷', dir:'ltr' },
];

/* ─── Theme + Translation Context ───────────────*/
const PageCtx = createContext({});
function usePage() { return useContext(PageCtx); }

/* ═══════════════════════════════════════════════════════════
   SVG — نمط هندسي إسلامي
═══════════════════════════════════════════════════════════ */
function GeomPattern({ opacity = 0.18, id = 'gp' }) {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
      aria-hidden="true">
      <defs>
        <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 76,22 76,58 40,76 4,58 4,22"
            fill="none" stroke="#b08500" strokeWidth="0.9" opacity={opacity}/>
          <polygon points="40,14 66,28 66,52 40,66 14,52 14,28"
            fill="none" stroke="#c9a000" strokeWidth="0.6" opacity={opacity}/>
          <polygon points="40,24 56,34 56,46 40,56 24,46 24,34"
            fill="#b08500" fillOpacity={opacity * 0.3} stroke="#d4ae20" strokeWidth="0.4" opacity={opacity}/>
          <circle cx="40" cy="40" r="2.5" fill="#b08500" opacity={opacity * 1.1}/>
          <line x1="4" y1="4" x2="40" y2="40" stroke="#c9a000" strokeWidth="0.4" opacity={opacity * 0.5}/>
          <line x1="76" y1="4" x2="40" y2="40" stroke="#c9a000" strokeWidth="0.4" opacity={opacity * 0.5}/>
          <line x1="4" y1="76" x2="40" y2="40" stroke="#c9a000" strokeWidth="0.4" opacity={opacity * 0.5}/>
          <line x1="76" y1="76" x2="40" y2="40" stroke="#c9a000" strokeWidth="0.4" opacity={opacity * 0.5}/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`}/>
    </svg>
  );
}

/* ═══════════════════════════════
   SVG — مقرنصات
═══════════════════════════════ */
function Muqarnas({ h = 44, flip = false, dark = false }) {
  const { C } = usePage();
  const n = 22, uw = 60, total = n * uw;
  const fill = dark ? 'rgba(20,12,0,.62)' : C.BG1;
  const stroke = dark ? C.G5 : C.G3;
  const units = Array.from({length:n});
  return (
    <div style={{width:'100%',overflow:'hidden',transform:flip?'scaleY(-1)':'none',lineHeight:0}}>
      <svg width="100%" height={h} viewBox={`0 0 ${total} ${h*2}`} preserveAspectRatio="xMidYMid slice">
        {units.map((_,i)=>{
          const x=i*uw,w=uw,hh=h*2;
          return (
            <g key={i} fill={fill} stroke={stroke} strokeWidth="1.2">
              <path d={`M${x},${hh} L${x},${hh*0.55} Q${x+w*0.5},${hh*0.10} ${x+w},${hh*0.55} L${x+w},${hh} Z`}/>
              <path d={`M${x+w*0.15},${hh} L${x+w*0.15},${hh*0.70} Q${x+w*0.50},${hh*0.38} ${x+w*0.85},${hh*0.70} L${x+w*0.85},${hh} Z`}
                opacity="0.65"/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════
   SVG — قوس
═══════════════════════════════ */
function Arch({ w=300, h=40, col, op=0.6 }) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M0,${h} Q${w/2},0 ${w},${h}`} fill="none" stroke={col} strokeWidth="1.5" opacity={op}/>
      <path d={`M${w*0.08},${h} Q${w/2},${h*0.2} ${w*0.92},${h}`} fill="none" stroke={col} strokeWidth="0.7" opacity={op*0.5}/>
    </svg>
  );
}

/* ═══════════════════════════════
   SVG — فاصل ذهبي
═══════════════════════════════ */
function Divider({ dark = false }) {
  const { C } = usePage();
  const c1 = dark ? C.G5 : C.G3;
  const c2 = dark ? C.G6 : C.G4;
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,margin:'18px 0'}}>
      <div style={{height:'1px',flex:1,maxWidth:200,background:`linear-gradient(90deg,transparent,${c1})`}}/>
      <div style={{width:10,height:10,background:c2,transform:'rotate(45deg)',opacity:.85,
        boxShadow:`0 0 10px ${c2}60`}}/>
      <div style={{height:'1px',flex:1,maxWidth:200,background:`linear-gradient(270deg,transparent,${c1})`}}/>
    </div>
  );
}

/* ═══════════════════════════════
   SVG — زخرفة ركنية
═══════════════════════════════ */
function Corner({ size=70, fx=false, fy=false, dark=false }) {
  const { C } = usePage();
  const col = dark ? C.G5 : C.G3;
  const col2 = dark ? C.G6 : C.G4;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80"
      style={{transform:`scale(${fx?-1:1},${fy?-1:1})`,display:'block'}}>
      <path d="M4,4 L38,4 Q46,4 46,12 L46,46" fill="none" stroke={col} strokeWidth="1.4" opacity="0.8"/>
      <path d="M4,4 L4,38 Q4,46 12,46 L46,46" fill="none" stroke={col} strokeWidth="1.4" opacity="0.8"/>
      <path d="M10,10 Q20,6 24,16 Q28,26 18,28 Q8,30 10,20" fill="none" stroke={col2} strokeWidth="0.8" opacity="0.65"/>
      <path d="M10,10 Q6,20 16,24 Q26,28 28,18 Q30,8 20,10" fill="none" stroke={col2} strokeWidth="0.8" opacity="0.65"/>
      <polygon points="7,7 9,13 15,13 10.5,17 12.5,23 7,19 1.5,23 3.5,17 -1,13 5,13"
        fill={col} fillOpacity="0.7" stroke={col2} strokeWidth="0.5"/>
    </svg>
  );
}

/* ═══════════════════════════════
   عنوان القسم
═══════════════════════════════ */
function SecTitle({ title, sub, dark = false }) {
  const { C } = usePage();
  const titleColor = dark
    ? `linear-gradient(135deg,${C.G5} 0%,${C.G7} 40%,#fffde0 60%,${C.G6} 85%,${C.G5} 100%)`
    : `linear-gradient(135deg,${C.G2} 0%,${C.G4} 35%,${C.G5} 60%,${C.G3} 100%)`;
  const subColor = dark ? C.TW3 : C.TXT3;
  return (
    <div style={{textAlign:'center', marginBottom:50, direction:'rtl'}}>
      <div style={{display:'flex',justifyContent:'center',marginBottom:4,opacity:.7}}>
        <Arch w={180} h={30} col={dark ? C.G5 : C.G3} op={.85}/>
      </div>
      <Divider dark={dark}/>
      <h2 style={{
        fontFamily:'Amiri,serif',
        fontSize:'clamp(1.85rem,3vw,2.8rem)',
        fontWeight:700, margin:'8px 0 12px',
        background: titleColor,
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
        filter:`drop-shadow(0 2px 12px ${dark ? C.G5+'40' : C.G3+'30'})`,
        letterSpacing:'0.02em',
      }}>{title}</h2>
      {sub && <p style={{fontFamily:'Noto Naskh Arabic,serif',fontSize:'1rem',
        color:subColor,lineHeight:1.9,maxWidth:500,margin:'0 auto'}}>{sub}</p>}
      <Divider dark={dark}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════ */
function Header() {
  const { C, lang, t } = usePage();
  const [sc, setSc] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const goLang = (code) => {
    nav(LANG_ROUTES[code] || '/');
  };

  return (
    <div style={{position:'sticky',top:0,zIndex:300}}>
      {/* شريط اللغات */}
      <div style={{
        background:`linear-gradient(180deg,${C.BG},${C.BG1})`,
        borderBottom:`1px solid ${C.BD3}`,
        padding:'7px 18px',
        display:'flex', justifyContent:'center', alignItems:'center', gap:7, flexWrap:'wrap',
      }}>
        <Globe size={14} color={C.G2} style={{opacity:.85}}/>
        {LANGS.map(l => (
          <button key={l.code} onClick={() => goLang(l.code)} style={{
            background: lang===l.code ? `linear-gradient(135deg,${C.G3},${C.G5},${C.G6})` : 'transparent',
            color: lang===l.code ? '#2a1000' : C.TXT2,
            border:`1.5px solid ${lang===l.code ? C.G4 : C.BD2}`,
            borderRadius:20, padding:'4px 16px',
            fontSize:'0.86rem', fontWeight:700, cursor:'pointer',
            fontFamily: ['ar','ur'].includes(l.code) ? 'Noto Naskh Arabic,serif':'Inter,sans-serif',
            display:'flex', alignItems:'center', gap:6,
            transition:'all .2s',
            boxShadow: lang===l.code ? `0 2px 10px ${C.G4}50` : 'none',
          }}
          onMouseEnter={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.G3;e.currentTarget.style.color=C.G1;e.currentTarget.style.background=C.GLOW2;}}}
          onMouseLeave={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.BD2;e.currentTarget.style.color=C.TXT2;e.currentTarget.style.background='transparent';}}}>
            <span style={{fontSize:'1rem'}}>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>

      {/* الهيدر الرئيسي */}
      <header style={{
        background: sc ? `${C.BG}f8` : `${C.BG}f0`,
        backdropFilter:'blur(20px)',
        borderBottom:`1px solid ${sc ? C.BD3 : C.BD2}`,
        boxShadow: sc ? `0 4px 28px rgba(150,100,0,.18)` : 'none',
        transition:'all .3s',
      }}>
        <div style={{height:3,background:`linear-gradient(90deg,transparent,${C.G3},${C.G6},${C.G4},transparent)`}}/>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'10px 26px',
          display:'flex',alignItems:'center',justifyContent:'space-between',gap:14}}>

          <div style={{display:'flex',alignItems:'center',gap:13,cursor:'pointer'}}
            onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
            <div style={{
              width:60,height:60,flexShrink:0,
              borderRadius:'50% 50% 12px 12px',
              border:`2px solid ${C.G4}80`,
              overflow:'hidden',background:C.CARD,
              boxShadow:`0 0 18px ${C.G4}35`,
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
                background:`linear-gradient(135deg,${C.G2},${C.G4},${C.G3})`,
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                filter:`drop-shadow(0 0 10px ${C.G3}30)`,
                lineHeight:1.2,
              }}>فيوض التأويل المعاصر</div>
              <div style={{fontSize:'.77rem',color:C.TXT3,fontFamily:'Noto Naskh Arabic,serif',marginTop:2,
                direction:t.dir}}>
                {t.siteName}
              </div>
            </div>
          </div>

          <nav className="nav-desktop" dir={t.dir} style={{display:'flex',gap:2}}>
            {[[`#about`,t.navAbout],[`#surahs`,t.navSurahs],[`#paths`,t.navPaths],[`#features`,t.navFeatures]].map(([h,l])=>(
              <a key={h} href={h} style={{color:C.TXT2,textDecoration:'none',fontSize:'.9rem',
                fontFamily:['ar','ur'].includes(lang)?'Noto Naskh Arabic,serif':'Inter,sans-serif',
                fontWeight:600,padding:'7px 14px',borderRadius:8,transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.color=C.G1;e.currentTarget.style.background=C.GLOW2;}}
              onMouseLeave={e=>{e.currentTarget.style.color=C.TXT2;e.currentTarget.style.background='transparent';}}>{l}</a>
            ))}
          </nav>

          <button onClick={()=>nav('/surahs')} style={{
            background:`linear-gradient(135deg,${C.G2},${C.G4},${C.G5})`,
            color:'#2a1000',border:'none',borderRadius:11,
            padding:'11px 24px',fontSize:'.93rem',fontWeight:800,
            fontFamily:['ar','ur'].includes(lang)?'Noto Naskh Arabic,serif':'Inter,sans-serif',
            cursor:'pointer',
            boxShadow:`0 4px 18px ${C.G4}50`,transition:'all .25s',whiteSpace:'nowrap',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 26px ${C.G4}70`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 18px ${C.G4}50`;}}>
            {t.startBtn}
          </button>
        </div>
      </header>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  const { C, lang, t } = usePage();
  const nav = useNavigate();
  const isRtl = ['ar','ur'].includes(lang);
  const fontTitle = isRtl ? 'Amiri,serif' : (lang==='tr'?'"Playfair Display",Georgia,serif':'"Playfair Display",Georgia,serif');
  const fontBody  = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  return (
    <section style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      {/* الصورة الإسلامية */}
      <div style={{
        position:'absolute', inset:0, zIndex:0,
        backgroundImage:'url(/bg_islamic.jpg)',
        backgroundSize:'cover',
        backgroundPosition:'center center',
        backgroundRepeat:'no-repeat',
      }}/>

      {/* تدرج أسفل */}
      <div style={{
        position:'absolute', inset:0, zIndex:1,
        background: C.heroOverlay || `linear-gradient(180deg,transparent 0%,transparent 40%,rgba(0,0,0,.30) 75%,rgba(0,0,0,.65) 100%)`,
        pointerEvents:'none',
      }}/>

      {/* توهج ذهبي */}
      <div style={{
        position:'absolute', inset:0, zIndex:2,
        background:`radial-gradient(ellipse 50% 45% at 50% 45%, rgba(255,200,50,.08) 0%, transparent 60%)`,
        pointerEvents:'none',
      }}/>

      {/* مقرنصات أعلى */}
      <div style={{position:'absolute',top:0,left:0,right:0,zIndex:3,opacity:0.95}}>
        <Muqarnas h={60} dark/>
      </div>

      {/* خطوط ذهبية جانبية */}
      {[{s:'right',d:30},{s:'right',d:60},{s:'left',d:30},{s:'left',d:60}].map((p,i)=>(
        <div key={i} style={{
          position:'absolute',top:0,bottom:0,zIndex:3,
          [p.s]:p.d, width:'1px',
          background:`linear-gradient(180deg,transparent,${i%2===0?C.G6+'c0':C.G5+'80'},${i%2===0?C.G7+'d0':C.G6+'90'},${i%2===0?C.G6+'c0':C.G5+'80'},transparent)`,
        }}/>
      ))}

      {/* زخرفة الأركان */}
      <div style={{position:'absolute',top:60,right:22,zIndex:4}}><Corner size={90} dark/></div>
      <div style={{position:'absolute',top:60,left:22,zIndex:4}}><Corner size={90} fx dark/></div>
      <div style={{position:'absolute',bottom:72,right:22,zIndex:4}}><Corner size={72} fy dark/></div>
      <div style={{position:'absolute',bottom:72,left:22,zIndex:4}}><Corner size={72} fx fy dark/></div>

      {/* المحتوى */}
      <div style={{
        position:'relative', zIndex:5,
        textAlign:'center', maxWidth:880, padding:'140px 30px 100px',
        direction: isRtl ? 'rtl' : 'ltr',
      }}>
        {/* الشعار */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:36}}>
          <div style={{position:'relative',width:200,height:200}}>
            <div style={{
              position:'absolute',inset:-24,borderRadius:'50%',
              background:`radial-gradient(circle,${C.G6}50 0%,${C.G5}25 40%,transparent 70%)`,
              animation:'glow 3.5s ease-in-out infinite',
            }}/>
            <div style={{position:'absolute',top:-28,left:'50%',transform:'translateX(-50%)',opacity:.9,zIndex:2}}>
              <Arch w={160} h={28} col={C.G6} op={1}/>
            </div>
            <div style={{
              width:200,height:200,
              borderRadius:'50% 50% 18px 18px',
              border:`2px solid ${C.G6}b0`,
              overflow:'hidden',background:`rgba(30,18,0,.75)`,
              boxShadow:`0 0 0 6px ${C.G5}30, 0 0 60px ${C.G5}55, 0 0 120px ${C.G4}25, inset 0 0 40px rgba(0,0,0,.4)`,
              position:'relative',zIndex:1,
            }}>
              <img src="/logo.png" alt="فيوض التأويل المعاصر"
                style={{width:'100%',height:'100%',objectFit:'contain',padding:12}}/>
            </div>
            {[{t:-10,r:-10},{t:-10,l:-10},{b:-10,r:-10},{b:-10,l:-10}].map((p,i)=>(
              <div key={i} style={{position:'absolute',...p,zIndex:6}}>
                <svg width="19" height="19" viewBox="0 0 17 17">
                  <polygon points="8.5,1 10.5,6.5 16.5,6.5 12,10 14,16 8.5,12.5 3,16 5,10 0.5,6.5 6.5,6.5"
                    fill={C.G6} fillOpacity=".95"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* بسملة */}
        <div style={{
          display:'inline-block',
          background:`rgba(30,18,0,.55)`,
          border:`1.5px solid ${C.G6}c0`,
          borderRadius:16, padding:'14px 50px', marginBottom:32,
          boxShadow:`0 0 50px ${C.G5}35, inset 0 1px 0 ${C.G7}40`,
          backdropFilter:'blur(10px)',
        }}>
          <p style={{fontFamily:'Amiri,serif',fontSize:'clamp(1.35rem,2.8vw,2.05rem)',
            color:C.G7,margin:0,letterSpacing:'.08em',textShadow:`0 0 35px ${C.G5}90, 0 2px 8px rgba(0,0,0,.6)`}}>
            {t.basmala}
          </p>
        </div>

        {/* العنوان */}
        <h1 style={{
          fontFamily: fontTitle,
          fontSize:'clamp(2.8rem,6.5vw,5.5rem)',
          fontWeight:700,margin:'0 0 8px',
          background:`linear-gradient(135deg,${C.G5} 0%,${C.G7} 30%,#ffffff 50%,${C.G7} 70%,${C.G5} 100%)`,
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
          lineHeight:1.2,
          filter:`drop-shadow(0 0 60px ${C.G5}80) drop-shadow(0 4px 12px rgba(0,0,0,.8))`,
          letterSpacing:'.03em',
        }}>{t.heroTitle}</h1>

        <div style={{margin:'6px 0 20px'}}>
          <span style={{
            fontFamily: isRtl ? 'Amiri,serif' : 'Georgia,"Times New Roman",serif',
            fontSize:'clamp(0.95rem,1.8vw,1.25rem)',
            color:'rgba(255,248,220,0.78)',
            fontStyle:'italic',
            letterSpacing:'0.04em',
            textShadow:'0 1px 8px rgba(0,0,0,0.55)',
          }}>
            {t.heroSubtitle}
          </span>
        </div>

        {/* آية الهيرو — للغات غير العربية */}
        {t.heroAyah && (
          <div style={{
            display:'inline-block',
            background:`rgba(30,18,0,.38)`,
            border:`1px solid ${C.G5}80`,
            borderRadius:12, padding:'10px 28px', marginBottom:12,
            backdropFilter:'blur(8px)',
          }}>
            <p style={{fontFamily:'Amiri,serif',fontSize:'clamp(1rem,1.8vw,1.3rem)',
              color:`rgba(255,248,220,0.92)`,margin:0,lineHeight:1.9,
              textShadow:'0 1px 8px rgba(0,0,0,.6)'}}>
              {t.heroAyah}
            </p>
            {t.heroAyahRef && <p style={{fontSize:'.75rem',color:`rgba(255,220,100,.70)`,
              margin:'4px 0 0',fontFamily:'Inter,sans-serif',fontStyle:'italic'}}>{t.heroAyahRef}</p>}
          </div>
        )}

        <Divider dark/>

        <p style={{
          fontFamily: fontBody,
          fontSize:'clamp(1rem,1.85vw,1.22rem)',
          color:'rgba(255,248,220,.92)',lineHeight:2.15,
          maxWidth:660,margin:'0 auto 42px',
          textShadow:'0 1px 10px rgba(0,0,0,.75)',
        }}>
          {t.heroDesc}
        </p>

        {/* أزرار */}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:52}}>
          {[
            {label:t.btnBrowse,  pri:true,  to:'/surahs'},
            {label:t.btnSurahs,  pri:false, to:'/surahs'},
            {label:t.btnSearch,  pri:false, href:'#search-sec'},
            {label:t.btnAbout,   pri:false, href:'#about'},
          ].map((b,i)=><HBtn key={i} {...b} dark/>)}
        </div>

        {/* إحصائيات */}
        <div style={{
          display:'flex',gap:0,justifyContent:'center',flexWrap:'wrap',
          background:'rgba(20,12,0,.55)',
          border:`1px solid ${C.G6}a0`,borderRadius:22,overflow:'hidden',
          backdropFilter:'blur(18px)',
          boxShadow:`0 8px 50px rgba(0,0,0,.55), inset 0 1px 0 ${C.G6}30`,
        }}>
          {[
            {n:t.stat1n, l:t.stat1l, c:C.G7},
            {n:t.stat2n, l:t.stat2l, c:C.TEAL4},
            {n:t.stat3n, l:t.stat3l, c:C.BLUE4},
            {n:t.stat4n, l:t.stat4l, c:C.G7},
          ].map((s,i)=>(
            <div key={i} style={{flex:'1 1 120px',padding:'24px 18px',textAlign:'center',
              borderLeft:i>0?`1px solid rgba(255,220,100,.18)`:'none',
              background:i%2===0?'rgba(255,255,255,.03)':'transparent'}}>
              <div style={{fontFamily:'Amiri,serif',fontSize:'2.5rem',fontWeight:700,
                color:s.c,lineHeight:1,marginBottom:7,textShadow:`0 0 20px ${s.c}70`}}>{s.n}</div>
              <div style={{fontFamily: isRtl ? 'Noto Naskh Arabic,serif':'Inter,sans-serif',
                fontSize:'.83rem',color:'rgba(255,248,220,.75)'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* مقرنصات أسفل */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:3,opacity:0.95}}>
        <Muqarnas h={56} flip dark/>
      </div>

      {/* سهم تمرير */}
      <div style={{position:'absolute',bottom:50,left:'50%',transform:'translateX(-50%)',
        display:'flex',flexDirection:'column',alignItems:'center',gap:3,opacity:.7,zIndex:5}}>
        <span style={{fontSize:'.72rem',color:C.G6,fontFamily:'Noto Naskh Arabic,serif'}}>{t.scrollLabel}</span>
        <ChevronDown size={18} color={C.G6}/>
      </div>
    </section>
  );
}

/* ─── زر عام ─────────────────── */
function HBtn({label, pri, to, href, dark=false}) {
  const { C, lang } = usePage();
  const nav = useNavigate();
  const [h,setH]=useState(false);
  const go=()=>to?nav(to):document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
  const isRtl = ['ar','ur'].includes(lang);
  return (
    <button onClick={go} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background: pri
        ? `linear-gradient(135deg,${C.G3},${C.G5},${C.G6})`
        : h
          ? (dark ? 'rgba(255,255,255,.15)' : C.GLOW2)
          : (dark ? 'rgba(255,255,255,.08)' : 'rgba(180,130,0,.08)'),
      color: pri ? '#2a1000' : (dark ? (h?C.G6:'rgba(255,248,220,.90)') : (h?C.G1:C.TXT2)),
      border:`1.5px solid ${pri?C.G5:(dark?(h?C.G6:'rgba(255,220,100,.50)'):( h?C.G3:C.BD2))}`,
      borderRadius:12,padding:'12px 24px',
      fontSize:'.96rem',fontWeight:700,
      fontFamily: isRtl ? 'Noto Naskh Arabic,serif' : 'Inter,sans-serif',
      cursor:'pointer',transition:'all .22s',
      transform:h?'translateY(-3px)':'none',
      boxShadow: pri
        ? `0 6px 22px ${C.G4}60`
        : h ? `0 6px 18px ${dark?'rgba(0,0,0,.35)':C.G3+'28'}` : 'none',
      backdropFilter: pri ? 'none' : 'blur(10px)',
    }}>{label}</button>
  );
}

/* ═══════════════════════════════════════════════════════════
   SEARCH SECTION
═══════════════════════════════════════════════════════════ */
function SearchSection() {
  const { C, lang, t } = usePage();
  const [q,setQ]=useState('');
  const [f,setF]=useState('all');
  const nav=useNavigate();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  const filters = [
    {id:'all',  label:t.filterAll},
    {id:'ayah', label:t.filterAyah},
    {id:'surah',label:t.filterSurah},
    {id:'topic',label:t.filterTopic},
    {id:'word', label:t.filterWord},
    {id:'root', label:t.filterRoot},
  ];

  const quickBtns = [
    {icon:'🔥',label:t.quickToday,  bg:C.ROSE,  bd:C.ROSE3,  tx:C.TW},
    {icon:'💚',label:t.quickMercy,  bg:C.TEAL,  bd:C.TEAL3,  tx:C.TW},
    {icon:'🛡️',label:t.quickGuide,  bg:C.BLUE,  bd:C.BLUE3,  tx:C.TW},
    {icon:'✨',label:t.quickPsych,  bg:C.PURP,  bd:C.PURP3,  tx:C.TW},
    {icon:'📖',label:t.quickEdu,    bg:C.OLIV,  bd:C.OLIV3,  tx:C.TW},
    {icon:'🌍',label:t.quickModern, bg:C.COPP,  bd:C.COPP3,  tx:C.TW},
  ];

  return (
    <section id="search-sec" style={{
      background:`linear-gradient(180deg,${C.BG1},${C.BG2})`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.18} id="gp1"/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:4,
        background:`linear-gradient(90deg,transparent,${C.G3},${C.G5},${C.G3},transparent)`}}/>

      <div style={{maxWidth:880,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title={t.searchTitle} sub={t.searchSub}/>

        <div style={{
          background:`rgba(255,255,255,.55)`,
          border:`1.5px solid ${C.BD3}`,
          borderRadius:24,padding:'28px 30px',
          boxShadow:`0 12px 50px rgba(150,100,0,.15), inset 0 1px 0 rgba(255,255,255,.8)`,
          position:'relative',overflow:'hidden',
          backdropFilter:'blur(12px)',
        }}>
          <div style={{position:'absolute',top:-18,left:'50%',transform:'translateX(-50%)',opacity:.4}}>
            <Arch w={260} h={22} col={C.G3} op={1}/>
          </div>

          <div style={{display:'flex',gap:8,marginBottom:18,flexWrap:'wrap'}} dir={t.dir}>
            {filters.map(({id,label})=>{
              const ac=f===id;
              return (
                <button key={id} onClick={()=>setF(id)} style={{
                  background:ac?`linear-gradient(135deg,${C.G3},${C.G5})`:'rgba(180,130,0,.08)',
                  color:ac?'#2a1000':C.TXT2,
                  border:`1px solid ${ac?C.G4:C.BD2}`,
                  borderRadius:11,padding:'6px 17px',
                  fontSize:'.84rem',fontWeight:700,cursor:'pointer',
                  fontFamily:fontBody,transition:'all .18s',
                  boxShadow:ac?`0 2px 12px ${C.G4}40`:'none',
                }}>{label}</button>
              );
            })}
          </div>

          <div style={{
            display:'flex',gap:10,alignItems:'center',
            background:'rgba(255,255,255,.6)',
            border:`1px solid ${C.BD3}`,borderRadius:14,padding:'10px 16px',
          }}>
            <Search size={22} color={C.G3} style={{flexShrink:0}}/>
            <input value={q} onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&nav('/surahs')}
              placeholder={t.searchPlaceholder}
              dir={t.dir} style={{
                flex:1,background:'transparent',border:'none',outline:'none',
                color:C.TXT,fontSize:'1rem',fontFamily:fontBody,
              }}/>
            <button onClick={()=>nav('/surahs')} style={{
              background:`linear-gradient(135deg,${C.G3},${C.G5})`,
              color:'#2a1000',border:'none',borderRadius:11,
              padding:'9px 24px',fontSize:'.92rem',fontWeight:800,
              fontFamily:fontBody,cursor:'pointer',flexShrink:0,
              boxShadow:`0 4px 14px ${C.G4}45`,
            }}>{t.searchBtn}</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(142px,1fr))',gap:13,marginTop:22}} dir={t.dir}>
          {quickBtns.map(card=>(
            <button key={card.label} onClick={()=>nav('/surahs')} style={{
              background:`linear-gradient(160deg,${card.bg},${card.bg}cc)`,
              border:`1.5px solid ${card.bd}90`,
              borderRadius:15,padding:'16px 10px',cursor:'pointer',
              transition:'all .22s',textAlign:'center',
              boxShadow:`0 4px 18px rgba(0,0,0,.22)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.filter='brightness(1.15)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 12px 28px rgba(0,0,0,.28)`;}}
            onMouseLeave={e=>{e.currentTarget.style.filter='none';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 18px rgba(0,0,0,.22)`;}}>
              <div style={{fontSize:'1.6rem',marginBottom:8}}>{card.icon}</div>
              <div style={{color:card.tx,fontSize:'.82rem',fontWeight:700,fontFamily:fontBody}}>{card.label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════ */
function About() {
  const { C, lang, t } = usePage();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  const iconMap = [
    <Shield size={24}/>, <Layers size={24}/>, <Eye size={24}/>,
    <Zap size={24}/>, <Brain size={24}/>, <Feather size={24}/>
  ];
  const bgMap = [C.TEAL,C.G2,C.BLUE,C.ROSE,C.PURP,C.OLIV];
  const bdMap = [C.TEAL3,C.G5,C.BLUE3,C.ROSE3,C.PURP3,C.OLIV3];

  return (
    <section id="about" style={{
      background:`linear-gradient(160deg,${C.BG2},${C.BG} 50%,${C.BG1})`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.17} id="gp2"/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg,transparent,${C.G3},${C.G5},${C.G3},transparent)`}}/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title={t.aboutTitle} sub={t.aboutSub}/>

        {/* بطاقة الرؤية */}
        <div style={{
          background:`rgba(255,255,255,.50)`,
          border:`1.5px solid ${C.BD3}`,borderRadius:24,padding:'34px 44px',marginBottom:42,
          position:'relative',overflow:'hidden',
          boxShadow:`0 12px 50px rgba(150,100,0,.14), inset 0 1px 0 rgba(255,255,255,.8)`,
          backdropFilter:'blur(8px)',
        }}>
          <div style={{position:'absolute',top:-15,right:'50%',transform:'translateX(50%)',opacity:.08}}>
            <Arch w={650} h={220} col={C.G3} op={1}/>
          </div>
          <div dir={t.dir} style={{position:'relative',zIndex:1}}>
            <h3 style={{fontFamily:'Amiri,serif',fontSize:'1.75rem',fontWeight:700,
              background:`linear-gradient(135deg,${C.G2},${C.G4},${C.G5})`,
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
              marginBottom:18}}>{t.aboutVisionTitle}</h3>
            <p style={{fontFamily:fontBody,fontSize:'1.08rem',
              color:C.TXT2,lineHeight:2.25,
              borderRight: isRtl ? `3px solid ${C.G3}` : 'none',
              borderLeft: isRtl ? 'none' : `3px solid ${C.G3}`,
              paddingRight: isRtl ? 22 : 0,
              paddingLeft: isRtl ? 0 : 22,
            }}>
              {t.aboutVisionText}
            </p>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(325px,1fr))',gap:18}}>
          {t.cards.map((c,i)=>(
            <div key={i} dir={t.dir} style={{
              background:`linear-gradient(160deg,${bgMap[i]},${bgMap[i]}dd)`,
              border:`1.5px solid ${bdMap[i]}80`,
              borderRadius:20,padding:'26px 22px',
              transition:'all .28s',cursor:'default',
              boxShadow:`0 5px 22px rgba(0,0,0,.18)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.filter='brightness(1.12)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 16px 38px rgba(0,0,0,.25)`;}}
            onMouseLeave={e=>{e.currentTarget.style.filter='none';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 5px 22px rgba(0,0,0,.18)`;}}>
              <div style={{width:52,height:52,borderRadius:14,marginBottom:16,
                background:'rgba(255,255,255,.18)',border:`1.5px solid rgba(255,255,255,.35)`,
                display:'flex',alignItems:'center',justifyContent:'center',color:C.TW}}>{iconMap[i]}</div>
              <div style={{fontFamily:fontBody,color:C.TW,fontWeight:700,fontSize:'1.02rem',marginBottom:10}}>{c.title}</div>
              <div style={{fontFamily:fontBody,color:C.TW2,fontSize:'.9rem',lineHeight:2.05}}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SURAHS
═══════════════════════════════════════════════════════════ */
function Surahs() {
  const { C, lang, t } = usePage();
  const nav=useNavigate();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  const colors = [
    {bg:C.TEAL, bd:C.TEAL2, ac:C.TEAL3, lt:C.TW},
    {bg:C.G2,   bd:C.G3,   ac:C.G4,   lt:'#fff8e8'},
    {bg:C.BLUE, bd:C.BLUE2, ac:C.BLUE3, lt:C.TW},
  ];
  const paths = ['/part1','/part2',null];

  return (
    <section id="surahs" style={{
      background:`linear-gradient(180deg,${C.BG1},${C.BG2} 50%,${C.BG1})`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.17} id="gp3"/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title={t.surahsTitle} sub={t.surahsSub}/>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))',gap:24}}>
          {t.parts.map((p,i)=>{
            const col = colors[i];
            const path = paths[i];
            const badge = path ? t.partAvail : t.partSoon;
            return (
              <div key={i} style={{
                background:`linear-gradient(190deg,${col.bg},${col.bg}cc)`,
                border:`1.5px solid rgba(255,255,255,.25)`,
                borderRadius:24,overflow:'hidden',transition:'all .3s',
                boxShadow:`0 7px 28px rgba(0,0,0,.20)`,
              }}
              onMouseEnter={e=>{e.currentTarget.style.filter='brightness(1.10)';e.currentTarget.style.transform='translateY(-7px)';e.currentTarget.style.boxShadow=`0 20px 50px rgba(0,0,0,.28)`;}}
              onMouseLeave={e=>{e.currentTarget.style.filter='none';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 7px 28px rgba(0,0,0,.20)`;}}>

                <div style={{
                  background:'rgba(255,255,255,.12)',
                  borderBottom:`1px solid rgba(255,255,255,.20)`,
                  padding:'28px 26px 20px',position:'relative',overflow:'hidden',
                }}>
                  <div style={{position:'absolute',top:0,left:0,right:0,opacity:.5}}>
                    <Muqarnas h={22} dark/>
                  </div>
                  <div style={{position:'absolute',bottom:-14,left:14,opacity:.7}}>
                    <Corner size={50} fx dark/>
                  </div>
                  <div dir={t.dir} style={{position:'relative',zIndex:1,paddingTop:10}}>
                    <span style={{
                      background:path?'rgba(255,255,255,.30)':'rgba(0,0,0,.20)',
                      color:col.lt,
                      fontSize:'.74rem',fontWeight:800,padding:'3px 14px',borderRadius:20,
                      fontFamily:fontBody,float: isRtl ? 'left' : 'right',marginTop:6,
                      border:'1px solid rgba(255,255,255,.30)',
                    }}>{badge}</span>
                    <div style={{fontFamily:'Amiri,serif',fontSize:'1.75rem',color:col.lt,marginBottom:6}}>{p.title}</div>
                    <div style={{fontFamily:fontBody,fontSize:'.87rem',color:C.TW3}}>{p.range}</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:8,marginTop:10}}>
                      <span style={{fontFamily:'Amiri,serif',fontSize:'2.7rem',fontWeight:700,color:col.lt,lineHeight:1}}>{p.count}</span>
                    </div>
                  </div>
                </div>

                <div style={{padding:'20px 26px 24px'}} dir={t.dir}>
                  <p style={{fontFamily:fontBody,fontSize:'.87rem',color:C.TW2,lineHeight:1.9,marginBottom:14}}>{p.desc}</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:20}}>
                    {p.themes.map((th,j)=>(
                      <span key={j} style={{
                        background:'rgba(255,255,255,.18)',border:`1px solid rgba(255,255,255,.30)`,
                        borderRadius:8,padding:'3px 10px',fontSize:'.76rem',
                        color:col.lt,fontFamily:fontBody,
                      }}>{th}</span>
                    ))}
                  </div>
                  <button onClick={()=>path&&nav(path)} disabled={!path} style={{
                    width:'100%',
                    background:path?'rgba(255,255,255,.22)':'rgba(0,0,0,.15)',
                    color:path?col.lt:'rgba(255,255,255,.45)',
                    border:`1.5px solid ${path?'rgba(255,255,255,.40)':'rgba(255,255,255,.15)'}`,
                    borderRadius:12,padding:'12px',
                    fontSize:'.94rem',fontWeight:800,fontFamily:fontBody,
                    cursor:path?'pointer':'not-allowed',
                    boxShadow:path?`0 4px 16px rgba(0,0,0,.15)`:'none',
                    transition:'all .22s',
                  }}
                  onMouseEnter={e=>{if(path)e.currentTarget.style.background='rgba(255,255,255,.35)';}}
                  onMouseLeave={e=>{if(path)e.currentTarget.style.background='rgba(255,255,255,.22)';}}>
                    {path ? t.partReadBtn(p.title) : t.partSoonBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PATHS
═══════════════════════════════════════════════════════════ */
function Paths() {
  const { C, lang, t } = usePage();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  const icons = [
    <BookOpen size={22}/>, <Compass size={22}/>, <Heart size={22}/>,
    <Brain size={22}/>, <Feather size={22}/>, <Zap size={22}/>
  ];
  const bgMap = [C.TEAL,C.G2,C.ROSE,C.BLUE,C.OLIV,C.COPP];
  const bdMap = [C.TEAL2,C.G3,C.ROSE2,C.BLUE2,C.OLIV2,C.COPP2];

  return (
    <section id="paths" style={{
      background:`linear-gradient(180deg,${C.BG2},${C.BG1} 50%,${C.BG2})`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.17} id="gp4"/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg,transparent,${C.G3},${C.G5},${C.G3},transparent)`}}/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title={t.pathsTitle} sub={t.pathsSub}/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(305px,1fr))',gap:17}}>
          {t.paths.map((p,i)=>(
            <div key={i} dir={t.dir} style={{
              background:`linear-gradient(160deg,${bgMap[i]},${bgMap[i]}dd)`,
              border:`1.5px solid rgba(255,255,255,.22)`,
              borderRadius:20,padding:'24px 20px',
              display:'flex',alignItems:'flex-start',gap:15,
              cursor:'pointer',transition:'all .27s',
              boxShadow:`0 4px 20px rgba(0,0,0,.16)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.filter='brightness(1.12)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,0,0,.22)`;}}
            onMouseLeave={e=>{e.currentTarget.style.filter='none';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,.16)`;}}>
              <div style={{width:54,height:54,borderRadius:14,flexShrink:0,
                background:'rgba(255,255,255,.18)',border:`1.5px solid rgba(255,255,255,.30)`,
                display:'flex',alignItems:'center',justifyContent:'center',color:C.TW}}>{icons[i]}</div>
              <div>
                <div style={{fontFamily:fontBody,fontWeight:700,color:C.TW,fontSize:'1rem',marginBottom:7}}>{p.title}</div>
                <div style={{fontFamily:fontBody,fontSize:'.86rem',color:C.TW2,lineHeight:1.9}}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURED
═══════════════════════════════════════════════════════════ */
function Featured() {
  const { C, lang, t } = usePage();
  const nav=useNavigate();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  const cardColors = [
    {bg:C.G2,  bd:C.G4,   lt:'#fff8e8', icon:<Flame size={16}/>},
    {bg:C.TEAL,bd:C.TEAL3,lt:C.TW,     icon:<Heart size={16}/>},
    {bg:C.BLUE,bd:C.BLUE3,lt:C.TW,     icon:<Sparkles size={16}/>},
  ];

  return (
    <section style={{
      position:'relative',
      background:`linear-gradient(160deg,${C.BG},${C.BG1})`,
      padding:'92px 26px',overflow:'hidden',
    }}>
      <GeomPattern opacity={.18} id="gp5"/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title={t.featuredTitle}/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(345px,1fr))',gap:22}}>
          {t.featured.map((item,i)=>{
            const cc = cardColors[i];
            return (
              <div key={i} dir={t.dir} style={{
                background:`linear-gradient(165deg,${cc.bg},${cc.bg}cc)`,
                border:`1.5px solid rgba(255,255,255,.22)`,
                borderRadius:24,padding:'30px 26px',
                position:'relative',overflow:'hidden',transition:'all .3s',
                boxShadow:`0 6px 26px rgba(0,0,0,.18)`,
              }}
              onMouseEnter={e=>{e.currentTarget.style.filter='brightness(1.10)';e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow=`0 18px 42px rgba(0,0,0,.24)`;}}
              onMouseLeave={e=>{e.currentTarget.style.filter='none';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 6px 26px rgba(0,0,0,.18)`;}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:7,
                  background:'rgba(255,255,255,.18)',border:`1px solid rgba(255,255,255,.30)`,
                  borderRadius:20,padding:'5px 15px',marginBottom:18,
                  color:cc.lt,fontSize:'.83rem',fontWeight:700,fontFamily:fontBody}}>
                  {cc.icon} {item.label}
                </div>
                <p style={{fontFamily:'Amiri,serif',fontSize:'1.38rem',color:'#fff8e8',lineHeight:2.05,marginBottom:10}}>{item.ayah}</p>
                <p style={{fontSize:'.74rem',color:cc.lt,fontWeight:700,fontFamily:fontBody,marginBottom:16,opacity:.9}}>{item.ref}</p>
                <p style={{fontFamily:fontBody,fontSize:'.92rem',color:C.TW2,lineHeight:2.15,margin:0,
                  borderRight: isRtl ? `2.5px solid rgba(255,255,255,.40)` : 'none',
                  borderLeft:  isRtl ? 'none' : `2.5px solid rgba(255,255,255,.40)`,
                  paddingRight: isRtl ? 15 : 0,
                  paddingLeft:  isRtl ? 0 : 15,
                }}>{item.text}</p>
                <button onClick={()=>nav('/part1')} style={{
                  marginTop:20,background:'rgba(255,255,255,.15)',border:`1px solid rgba(255,255,255,.35)`,
                  borderRadius:10,padding:'8px 18px',color:cc.lt,fontSize:'.83rem',
                  fontWeight:700,fontFamily:fontBody,cursor:'pointer',transition:'all .2s',
                }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.28)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.15)'}>
                  {t.featuredReadBtn}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MULTILINGUAL
═══════════════════════════════════════════════════════════ */
function Multilingual() {
  const { C, lang, t } = usePage();
  const nav = useNavigate();
  const isRtl = ['ar','ur'].includes(lang);
  const dir = isRtl ? 'rtl' : 'ltr';
  const fontTitle = isRtl ? 'Amiri,serif' : '"Playfair Display",Georgia,serif';
  const fontBody  = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  return (
    <section style={{
      background:`linear-gradient(135deg,${C.BG1},${C.BG} 50%,${C.BG1})`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.18} id="gp6"/>
      <div style={{position:'absolute',inset:0,
        background:`radial-gradient(ellipse 60% 50% at 50% 50%,rgba(180,130,0,.10) 0%,transparent 65%)`,
        pointerEvents:'none'}}/>
      <div style={{maxWidth:940,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title={t.multiTitle} sub={t.multiSub}/>

        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:38}}>
          {LANGS.map(l=>(
            <button key={l.code} onClick={()=>nav(LANG_ROUTES[l.code]||'/')} style={{
              background:lang===l.code?`linear-gradient(135deg,${C.G3},${C.G5})`:'rgba(255,255,255,.55)',
              color:lang===l.code?'#2a1000':C.TXT2,
              border:`1.5px solid ${lang===l.code?C.G4:C.BD2}`,
              borderRadius:14,padding:'11px 22px',
              fontSize:'.92rem',fontWeight:700,cursor:'pointer',
              fontFamily:['ar','ur'].includes(l.code)?'Noto Naskh Arabic,serif':'Inter,sans-serif',
              transition:'all .22s',display:'flex',alignItems:'center',gap:8,
              boxShadow:lang===l.code?`0 6px 20px ${C.G4}50`:'0 2px 8px rgba(150,100,0,.12)',
              backdropFilter:'blur(8px)',
            }}
            onMouseEnter={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.G3;e.currentTarget.style.color=C.G1;e.currentTarget.style.background=C.GLOW2;}}}
            onMouseLeave={e=>{if(lang!==l.code){e.currentTarget.style.borderColor=C.BD2;e.currentTarget.style.color=C.TXT2;e.currentTarget.style.background='rgba(255,255,255,.55)';}}}>
              <span style={{fontSize:'1.15rem'}}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        <div style={{
          position:'relative',
          background:`rgba(255,255,255,.55)`,
          border:`1.5px solid ${C.BD3}`,
          borderRadius:'0 0 22px 22px',
          padding:'44px 50px 42px',
          boxShadow:`0 12px 50px rgba(150,100,0,.14), inset 0 1px 0 rgba(255,255,255,.8)`,
          backdropFilter:'blur(12px)',
        }}>
          <div style={{position:'absolute',top:-46,left:'50%',transform:'translateX(-50%)',width:'84%'}}>
            <Arch w={700} h={50} col={C.G3} op={.75}/>
          </div>
          <div dir={dir} style={{transition:'all .35s'}}>
            <h3 style={{fontFamily:fontTitle,
              fontSize:'2.1rem',fontWeight:700,marginBottom:18,
              background:`linear-gradient(135deg,${C.G2},${C.G4},${C.G5})`,
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{t.multiSample.title}</h3>
            <p style={{fontFamily:fontBody,
              fontSize:'1.06rem',color:C.TXT2,lineHeight:2.25}}>{t.multiSample.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURES
═══════════════════════════════════════════════════════════ */
function Features() {
  const { C, lang, t } = usePage();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  const icons = [<Search size={22}/>,<Layers size={22}/>,<Map size={22}/>,
                 <Volume2 size={22}/>,<BookMarked size={22}/>,<Globe size={22}/>];
  const bgMap = [C.TEAL,C.G2,C.BLUE,C.ROSE,C.OLIV,C.PURP];
  const bdMap = [C.TEAL2,C.G3,C.BLUE2,C.ROSE2,C.OLIV2,C.PURP2];

  return (
    <section id="features" style={{
      background:`linear-gradient(180deg,${C.BG2},${C.BG} 50%,${C.BG2})`,
      padding:'92px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.17} id="gp7"/>
      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <SecTitle title={t.featuresTitle}/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(325px,1fr))',gap:18}}>
          {t.features.map((f,i)=>(
            <div key={i} dir={t.dir} style={{
              background:`linear-gradient(160deg,${bgMap[i]},${bgMap[i]}cc)`,
              border:`1.5px solid rgba(255,255,255,.22)`,
              borderRadius:20,padding:'28px 24px',position:'relative',
              transition:'all .27s',boxShadow:`0 4px 20px rgba(0,0,0,.16)`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.filter='brightness(1.12)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 14px 36px rgba(0,0,0,.22)`;}}
            onMouseLeave={e=>{e.currentTarget.style.filter='none';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,.16)`;}}>
              <span style={{
                position:'absolute',top:14,
                left: isRtl ? 14 : 'auto',
                right: isRtl ? 'auto' : 14,
                background:'rgba(255,255,255,.22)',
                color:C.TW,
                border:`1px solid rgba(255,255,255,.30)`,
                borderRadius:20,padding:'2px 10px',fontSize:'.70rem',fontWeight:700,
                fontFamily:fontBody,
              }}>{f.badge}</span>
              <div style={{width:54,height:54,borderRadius:14,marginBottom:16,
                background:'rgba(255,255,255,.18)',border:`1.5px solid rgba(255,255,255,.30)`,
                display:'flex',alignItems:'center',justifyContent:'center',color:C.TW}}>{icons[i]}</div>
              <div style={{fontFamily:fontBody,fontWeight:700,color:C.TW,fontSize:'1.01rem',marginBottom:10}}>{f.title}</div>
              <div style={{fontFamily:fontBody,fontSize:'.88rem',color:C.TW2,lineHeight:2.05}}>{f.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
═══════════════════════════════════════════════════════════ */
function Newsletter() {
  const { C, lang, t } = usePage();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';
  const [em,setEm]=useState('');
  const [ok,setOk]=useState(false);
  return (
    <section style={{
      background:`linear-gradient(180deg,${C.BG1},${C.BG2})`,
      padding:'82px 26px',position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.18} id="gp8"/>
      <div style={{position:'absolute',inset:0,
        background:`radial-gradient(ellipse at 50% 50%,rgba(180,130,0,.12) 0%,transparent 60%)`,pointerEvents:'none'}}/>
      <div style={{maxWidth:600,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}} dir={t.dir}>
        <Divider/>
        <h2 style={{fontFamily:'Amiri,serif',fontSize:'clamp(1.75rem,3vw,2.35rem)',
          background:`linear-gradient(135deg,${C.G2},${C.G4},${C.G5})`,
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
          margin:'10px 0 14px'}}>{t.newsTitle}</h2>
        <p style={{fontFamily:fontBody,fontSize:'.95rem',color:C.TXT2,lineHeight:2.1,marginBottom:30}}>
          {t.newsDesc}
        </p>
        {ok?(
          <div style={{background:`${C.TEAL}25`,border:`1.5px solid ${C.TEAL3}60`,borderRadius:14,
            padding:'16px 28px',color:C.TEAL2,fontFamily:fontBody,fontSize:'.95rem'}}>
            {t.newsThanks}
          </div>
        ):(
          <div style={{display:'flex',gap:12}}>
            <input type="email" value={em} onChange={e=>setEm(e.target.value)}
              placeholder={t.newsPlaceholder} dir={t.dir} style={{
                flex:1,background:'rgba(255,255,255,.6)',
                border:`1.5px solid ${C.BD2}`,borderRadius:14,
                padding:'13px 18px',color:C.TXT,fontSize:'.92rem',
                fontFamily:fontBody,outline:'none',
              }}/>
            <button onClick={()=>em&&setOk(true)} style={{
              background:`linear-gradient(135deg,${C.G3},${C.G5})`,
              color:'#2a1000',border:'none',borderRadius:14,
              padding:'13px 26px',fontSize:'.92rem',fontWeight:800,
              fontFamily:fontBody,cursor:'pointer',
              whiteSpace:'nowrap',flexShrink:0,boxShadow:`0 5px 18px ${C.G4}45`,
            }}>{t.newsBtn}</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  const { C, lang, t } = usePage();
  const nav=useNavigate();
  const isRtl = ['ar','ur'].includes(lang);
  const fontBody = isRtl ? 'Noto Naskh Arabic,serif' : '"Inter","Segoe UI",sans-serif';

  return (
    <footer style={{
      background:`linear-gradient(180deg,${C.BG2},${C.BG3})`,
      borderTop:`2px solid ${C.BD3}`,padding:'60px 26px 32px',
      position:'relative',overflow:'hidden',
    }}>
      <GeomPattern opacity={.16} id="gp9"/>
      <div style={{position:'absolute',top:0,left:0,right:0}}>
        <Muqarnas h={32}/>
      </div>
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg,transparent,${C.G3},${C.G5},${C.G3},transparent)`}}/>

      <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:40,marginBottom:40}} dir={t.dir}>
          <div>
            <div style={{display:'flex',flexDirection:'column',alignItems: isRtl ? 'flex-start':'flex-start',gap:13,marginBottom:16}}>
              <div style={{width:94,height:94,borderRadius:'50% 50% 14px 14px',
                border:`2px solid ${C.G4}70`,overflow:'hidden',background:C.CARD,
                boxShadow:`0 0 22px ${C.G3}25`}}>
                <img src="/logo.png" alt="Logo" style={{width:'100%',height:'100%',objectFit:'contain',padding:6}}/>
              </div>
              <div style={{fontFamily:'Amiri,serif',fontSize:'1.15rem',fontWeight:700,
                background:`linear-gradient(135deg,${C.G2},${C.G4})`,
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                فيوض التأويل المعاصر
              </div>
            </div>
            <p style={{fontFamily:fontBody,fontSize:'.83rem',color:C.TXT3,lineHeight:2.1}}>
              {t.footerTagline}
            </p>
          </div>

          <div>
            <h4 style={{fontFamily:fontBody,color:C.G2,fontSize:'.92rem',fontWeight:700,marginBottom:16}}>{t.footerQuickLinks}</h4>
            {t.footerLinks.map((lnk,i)=>(
              <div key={i} style={{marginBottom:10}}>
                <button onClick={()=> lnk.path ? nav(lnk.path) : document.getElementById(lnk.anchor)?.scrollIntoView({behavior:'smooth'})}
                  style={{background:'none',border:'none',color:C.TXT2,
                  fontSize:'.85rem',fontFamily:fontBody,cursor:'pointer',padding:0,transition:'color .2s'}}
                onMouseEnter={e=>e.currentTarget.style.color=C.G2}
                onMouseLeave={e=>e.currentTarget.style.color=C.TXT2}>
                  {isRtl ? `← ${lnk.label}` : `→ ${lnk.label}`}
                </button>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{fontFamily:fontBody,color:C.G2,fontSize:'.92rem',fontWeight:700,marginBottom:16}}>{t.footerLangs}</h4>
            {LANGS.map(l=>(
              <div key={l.code} style={{marginBottom:9,fontSize:'.84rem',color:C.TXT3,
                fontFamily:['ar','ur'].includes(l.code)?'Noto Naskh Arabic,serif':'Inter,sans-serif'}}>
                {l.flag} {l.label}
              </div>
            ))}
          </div>

          <div>
            <h4 style={{fontFamily:fontBody,color:C.G2,fontSize:'.92rem',fontWeight:700,marginBottom:16}}>{t.footerContact}</h4>
            <p style={{fontFamily:fontBody,fontSize:'.83rem',color:C.TXT3,lineHeight:2.1}}>
              {t.footerContactDesc}
            </p>
            <a href="mailto:info@fuyud-tafsir.com" style={{
              display:'inline-flex',alignItems:'center',gap:6,
              color:C.G2,fontSize:'.83rem',fontFamily:'Inter,sans-serif',
              textDecoration:'none',marginTop:10,transition:'color .2s'}}
            onMouseEnter={e=>e.currentTarget.style.color=C.G4}
            onMouseLeave={e=>e.currentTarget.style.color=C.G2}>
              <Mail size={14}/> info@fuyud-tafsir.com
            </a>
          </div>
        </div>

        <Divider/>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:13}} dir={t.dir}>
          <p style={{fontFamily:fontBody,fontSize:'.78rem',color:C.TXT4,margin:0}}>
            {t.footerCopy}
          </p>
          <div style={{display:'flex',gap:22}}>
            {[t.footerPrivacy, t.footerTerms].map(tx=>(
              <span key={tx} style={{fontSize:'.75rem',color:C.TXT4,fontFamily:fontBody,
                cursor:'pointer',transition:'color .2s'}}
              onMouseEnter={e=>e.currentTarget.style.color=C.G2}
              onMouseLeave={e=>e.currentTarget.style.color=C.TXT4}>{tx}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════
   MAIN EXPORT
═══════════════════════════════ */
export default function HomePage({ lang = 'ar' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const C = THEMES[lang]     || THEMES.ar;
  const isRtl = ['ar','ur'].includes(lang);

  /* SEO — تحديث عنوان الصفحة وlang الجذر */
  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.lang = t.htmlLang;
    document.documentElement.dir  = t.dir;
    if (t.pageDesc) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.name='description'; document.head.appendChild(meta); }
      meta.content = t.pageDesc;
    }
  }, [lang, t]);

  return (
    <PageCtx.Provider value={{ C, lang, t }}>
      <div style={{background:C.BG,minHeight:'100vh',direction: isRtl ? 'rtl':'ltr'}}>
        <style>{`
          @keyframes glow {
            0%,100%{opacity:.38;transform:scale(1)}
            50%{opacity:.72;transform:scale(1.10)}
          }
          .nav-desktop{display:flex}
          @media(max-width:768px){.nav-desktop{display:none!important}}
          *{box-sizing:border-box;margin:0;padding:0}
          html{scroll-behavior:smooth}
          ::-webkit-scrollbar{width:8px;background:${C.BG2}}
          ::-webkit-scrollbar-thumb{background:${C.G3};border-radius:8px}
          ::-webkit-scrollbar-thumb:hover{background:${C.G5}}
          ::selection{background:${C.G4}50;color:#2a1000}
        `}</style>

        <Header/>
        <Hero/>
        <SearchSection/>
        <About/>
        <Surahs/>
        <Paths/>
        <Featured/>
        <Multilingual/>
        <Features/>
        <Newsletter/>
        <Footer/>
      </div>
    </PageCtx.Provider>
  );
}
