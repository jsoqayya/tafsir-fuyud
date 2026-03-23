import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ===================================================
   زخرفة نجمة ثمانية SVG
=================================================== */
function StarOrnament({ size = 100, opacity = 0.12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none"
      style={{ opacity, display: 'block' }}>
      <g transform="translate(100,100)">
        {[0,45,90,135,180,225,270,315].map((a, i) => (
          <g key={i} transform={`rotate(${a})`}>
            <polygon points="0,-88 11,-54 0,-38 -11,-54" fill="#c9a84c" />
          </g>
        ))}
        <circle r="36" fill="none" stroke="#c9a84c" strokeWidth="1.4" />
        <circle r="26" fill="none" stroke="#c9a84c" strokeWidth="0.7" />
        <polygon
          points="0,-34 24,-24 34,0 24,24 0,34 -24,24 -34,0 -24,-24"
          fill="none" stroke="#c9a84c" strokeWidth="1.1"
        />
        {[0,60,120,180,240,300].map((a, i) => (
          <g key={i} transform={`rotate(${a})`}>
            <polygon points="0,-15 4,-7 0,-3 -4,-7" fill="#c9a84c" />
          </g>
        ))}
      </g>
      <circle cx="100" cy="100" r="94" fill="none"
        stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  );
}

/* ===================================================
   فاصل زخرفي
=================================================== */
function Divider() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, margin:'20px 0' }}>
      <div style={{ width:70, height:1,
        background:'linear-gradient(to left, rgba(201,168,76,0.5), transparent)' }} />
      <svg width="22" height="22" viewBox="0 0 22 22">
        <circle cx="11" cy="11" r="4" fill="#c9a84c" opacity="0.85" />
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <circle key={i}
            cx={11+9*Math.cos(a*Math.PI/180)}
            cy={11+9*Math.sin(a*Math.PI/180)}
            r="1.3" fill="#c9a84c" opacity="0.45" />
        ))}
      </svg>
      <div style={{ width:70, height:1,
        background:'linear-gradient(to right, rgba(201,168,76,0.5), transparent)' }} />
    </div>
  );
}

/* ===================================================
   بطاقة جزء التفسير
=================================================== */
function PartCard({ label, range, path, navigate }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={() => navigate(path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.07) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.22)'}`,
        borderRadius: 14,
        padding: '18px 20px',
        cursor: 'pointer',
        textAlign: 'right',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.25)' : 'none',
      }}
    >
      <div style={{
        fontFamily: 'Noto Naskh Arabic, serif',
        fontSize: '1rem',
        fontWeight: 700,
        color: '#e8d08a',
        marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontSize: '0.75rem',
        color: 'rgba(232,208,138,0.55)',
        marginBottom: 14,
        fontFamily: 'Noto Naskh Arabic, serif',
      }}>الآيات {range}</div>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'linear-gradient(90deg, #b8860b, #d4a843)',
        color: '#1a0e00',
        borderRadius: 20,
        padding: '6px 16px',
        fontSize: '0.76rem',
        fontWeight: 800,
        fontFamily: 'Noto Naskh Arabic, serif',
        boxShadow: '0 2px 8px rgba(180,134,11,0.35)',
      }}>
        اقرأ التفسير
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#1a0e00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
}

/* ===================================================
   الصفحة الرئيسية
=================================================== */
export default function HomePage() {
  const navigate = useNavigate();

  /* ألوان الدرر السنية: أخضر داكن دافئ */
  const BG_DARK   = '#0f2d1a';   /* الأساس – أخضر جداً داكن  */
  const BG_MID    = '#163d24';   /* متوسط                     */
  const BG_ACCENT = '#1a4a2c';   /* أفتح قليلاً               */
  const GOLD      = '#c9a84c';
  const GOLD_LT   = '#e8d08a';
  const GOLD_TEXT = 'rgba(232,208,138,0.85)';

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: `linear-gradient(160deg, ${BG_DARK} 0%, ${BG_MID} 45%, ${BG_DARK} 80%, #0a2014 100%)`,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Noto Naskh Arabic, serif',
      }}
    >
      {/* ── شريط ذهبي علوي ── */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent)`,
      }} />

      {/* ── زخارف الزوايا ── */}
      <div style={{ position:'absolute', top:-60, right:-60, pointerEvents:'none' }}>
        <StarOrnament size={300} opacity={0.10} />
      </div>
      <div style={{ position:'absolute', top:-60, left:-60, pointerEvents:'none' }}>
        <StarOrnament size={260} opacity={0.07} />
      </div>
      <div style={{ position:'absolute', bottom:40, right:-40, pointerEvents:'none' }}>
        <StarOrnament size={240} opacity={0.07} />
      </div>
      <div style={{ position:'absolute', bottom:-30, left:-50, pointerEvents:'none' }}>
        <StarOrnament size={200} opacity={0.05} />
      </div>

      {/* ── المحتوى الرئيسي ── */}
      <div style={{ maxWidth:680, margin:'0 auto', padding:'0 20px 64px' }}>

        {/* ── الهيرو ── */}
        <div style={{ textAlign:'center', paddingTop:52, paddingBottom:8 }}>

          {/* الشعار */}
          <div style={{
            width: 170,
            height: 170,
            margin: '0 auto 28px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${BG_MID}, ${BG_ACCENT})`,
            border: `2.5px solid ${GOLD}55`,
            boxShadow: `0 0 0 6px ${GOLD}18, 0 12px 40px rgba(0,0,0,0.45)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <img
              src="/logo.png"
              alt="فيوض التأويل المعاصر"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            {/* هالة ذهبية حول الشعار */}
            <div style={{
              position: 'absolute',
              inset: -10,
              borderRadius: '50%',
              border: `1px solid ${GOLD}20`,
              pointerEvents: 'none',
            }} />
          </div>

          {/* العنوان */}
          <h1 style={{
            fontFamily: 'Amiri, serif',
            fontSize: 'clamp(2.1rem, 6vw, 3.3rem)',
            color: GOLD_LT,
            margin: '0 0 4px',
            lineHeight: 1.2,
            textShadow: `0 2px 24px ${GOLD}44`,
          }}>
            فيوض التأويل المعاصر
          </h1>

          {/* فاصل */}
          <Divider />

          {/* الوصف */}
          <p style={{
            fontFamily: 'Noto Naskh Arabic, serif',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.08rem)',
            color: GOLD_TEXT,
            lineHeight: 2,
            maxWidth: 500,
            margin: '0 auto 30px',
          }}>
            قراءة تفسيرية معاصرة تجمع بين البيان القرآني،<br />
            والتدبر التربوي، والبصيرة النفسية،<br />
            بلغة قريبة من الإنسان المعاصر.
          </p>

          {/* البسملة */}
          <div style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${GOLD}18, ${GOLD}08)`,
            border: `1px solid ${GOLD}30`,
            borderRadius: 40,
            padding: '10px 30px',
            marginBottom: 52,
          }}>
            <span style={{
              fontFamily: 'Amiri, serif',
              fontSize: '1.15rem',
              color: `${GOLD_LT}cc`,
            }}>
              ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾
            </span>
          </div>
        </div>

        {/* ── قسم السور ── */}
        <div>

          {/* عنوان القسم */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <div style={{ flex:1, height:1,
              background:`linear-gradient(to left, ${GOLD}35, transparent)` }} />
            <span style={{
              fontSize: '0.82rem',
              color: `${GOLD}88`,
              fontFamily: 'Noto Naskh Arabic, serif',
              whiteSpace: 'nowrap',
            }}>السور المتاحة</span>
            <div style={{ flex:1, height:1,
              background:`linear-gradient(to right, ${GOLD}35, transparent)` }} />
          </div>

          {/* بطاقة سورة البقرة */}
          <div style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
            border: `1px solid ${GOLD}28`,
            borderRadius: 18,
            padding: '28px 28px 24px',
            marginBottom: 16,
            boxShadow: '0 6px 32px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(4px)',
          }}>

            {/* رأس البطاقة */}
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:22 }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: `linear-gradient(135deg, #a67c00, ${GOLD})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 14px ${GOLD}44`,
                flexShrink: 0,
              }}>
                {/* أيقونة كتاب */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="1.8"
                    strokeLinecap="round"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                    stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="12" y1="6" x2="12" y2="14" stroke="white" strokeWidth="1.4" opacity="0.7"/>
                  <line x1="8.5" y1="8" x2="11.5" y2="7" stroke="white" strokeWidth="1" opacity="0.6"/>
                  <line x1="8.5" y1="11" x2="11.5" y2="10" stroke="white" strokeWidth="1" opacity="0.6"/>
                  <line x1="13" y1="7" x2="16" y2="8" stroke="white" strokeWidth="1" opacity="0.6"/>
                  <line x1="13" y1="10" x2="16" y2="11" stroke="white" strokeWidth="1" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Amiri, serif',
                  fontSize: '1.5rem',
                  color: GOLD_LT,
                  margin: 0,
                  lineHeight: 1.3,
                }}>سورة البقرة</h3>
                <p style={{
                  fontSize: '0.76rem',
                  color: `${GOLD}70`,
                  margin: '2px 0 0',
                  fontFamily: 'Noto Naskh Arabic, serif',
                }}>286 آية • مدنية • الجزء الأول والثاني</p>
              </div>
            </div>

            {/* أجزاء */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <PartCard
                label="الجزء الأول"
                range="١ – ١٠١"
                path="/ar/baqarah/1"
                navigate={navigate}
              />
              <PartCard
                label="الجزء الثاني"
                range="١٠٢ – ٢٠٠"
                path="/ar/baqarah/2"
                navigate={navigate}
              />
            </div>
          </div>

          {/* قريباً */}
          <div style={{
            background: `${GOLD}06`,
            border: `1px dashed ${GOLD}20`,
            borderRadius: 12,
            padding: '16px 24px',
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '0.83rem',
              color: `${GOLD}45`,
            }}>
              ✦ سور أخرى قريباً إن شاء الله ✦
            </span>
          </div>
        </div>

        {/* ── الفوتر ── */}
        <div style={{ textAlign:'center', marginTop:56 }}>
          <Divider />
          <p style={{
            fontFamily: 'Noto Naskh Arabic, serif',
            fontSize: '0.78rem',
            color: `${GOLD}40`,
            margin: 0,
          }}>
            فيوض التأويل المعاصر • جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      {/* ── شريط ذهبي سفلي ثابت ── */}
      <div style={{
        position: 'fixed', bottom:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent)`,
        pointerEvents:'none',
      }} />
    </div>
  );
}
