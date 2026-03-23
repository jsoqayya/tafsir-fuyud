import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ===================================================
   زخارف SVG إسلامية – خماسية / ثمانية / نجمة
=================================================== */
function IslamicOrnament({ className = '', size = 120, opacity = 0.18 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* نجمة ثمانية */}
      <g transform="translate(100,100)">
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <polygon
              points="0,-90 12,-55 0,-40 -12,-55"
              fill="#c9a84c"
            />
          </g>
        ))}
        <circle cx="0" cy="0" r="38" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="28" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
        {/* مثمن داخلي */}
        <polygon
          points="0,-35 24.7,-24.7 35,0 24.7,24.7 0,35 -24.7,24.7 -35,0 -24.7,-24.7"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1.2"
        />
        {/* نجمة صغيرة مركزية */}
        {[0,60,120,180,240,300].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <polygon
              points="0,-16 4,-8 0,-4 -4,-8"
              fill="#c9a84c"
            />
          </g>
        ))}
      </g>
      {/* دائرة خارجية */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="4 3" />
    </svg>
  );
}

/* ===================================================
   زخرفة شريط أفقي
=================================================== */
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div style={{ width: 60, height: 1, background: 'linear-gradient(to left, #c9a84c, transparent)' }} />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" fill="#c9a84c" opacity="0.9" />
        <circle cx="14" cy="14" r="9" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <circle key={i}
            cx={14 + 13*Math.cos(a*Math.PI/180)}
            cy={14 + 13*Math.sin(a*Math.PI/180)}
            r="1.5" fill="#c9a84c" opacity="0.5"
          />
        ))}
      </svg>
      <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
    </div>
  );
}

/* ===================================================
   بطاقة السورة
=================================================== */
function SurahCard({ surahName, parts, navigate }) {
  return (
    <div
      dir="rtl"
      style={{
        background: 'linear-gradient(135deg, rgba(30,20,5,0.85) 0%, rgba(50,35,10,0.9) 100%)',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: 16,
        padding: '28px 32px',
        marginBottom: 20,
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* اسم السورة */}
      <div className="flex items-center gap-3 mb-5">
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, #b8860b, #c9a84c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(201,168,76,0.4)',
          flexShrink: 0,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
              fill="white" opacity="0.9"/>
            <path d="M12 2C6.48 2 2 6.48 2 12" stroke="white" strokeWidth="1" opacity="0.3"/>
          </svg>
        </div>
        <div>
          <h3 style={{
            fontFamily: 'Amiri, serif',
            fontSize: '1.5rem',
            color: '#e8c96c',
            margin: 0,
            lineHeight: 1.3,
          }}>
            سورة البقرة
          </h3>
          <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.75rem', margin: 0 }}>
            286 آية • مدنية
          </p>
        </div>
      </div>

      {/* أجزاء السورة */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {parts.map((part, idx) => (
          <button
            key={idx}
            onClick={() => navigate(part.path)}
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 12,
              padding: '16px 14px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              textAlign: 'right',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#e8c96c',
              marginBottom: 4,
            }}>
              {part.label}
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'rgba(201,168,76,0.55)',
              marginBottom: 10,
            }}>
              الآيات {part.range}
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: 'linear-gradient(90deg, #b8860b, #c9a84c)',
              color: '#1a1000',
              borderRadius: 20,
              padding: '5px 14px',
              fontSize: '0.72rem',
              fontWeight: 700,
              fontFamily: 'Noto Naskh Arabic, serif',
            }}>
              <span>اقرأ التفسير</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#1a1000" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ===================================================
   الصفحة الرئيسية الكاملة
=================================================== */
export default function HomePage() {
  const navigate = useNavigate();
  // (scroll state reserved for future sticky header effects)

  const surahs = [
    {
      surahName: 'سورة البقرة',
      parts: [
        { label: 'الجزء الأول', range: '١ – ١٠١', path: '/ar/baqarah/1' },
        { label: 'الجزء الثاني', range: '١٠٢ – ٢٠٠', path: '/ar/baqarah/2' },
      ],
    },
  ];

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #1a1000 0%, #2a1a02 40%, #1e1200 70%, #120d00 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Noto Naskh Arabic, serif',
      }}
    >
      {/* ── زخارف الخلفية ── */}
      <IslamicOrnament
        className="absolute"
        size={340}
        opacity={0.10}
        style={{ top: -80, right: -80, position: 'absolute' }}
      />
      <div style={{ position: 'absolute', top: -80, right: -80 }}>
        <IslamicOrnament size={340} opacity={0.10} />
      </div>
      <div style={{ position: 'absolute', top: -80, left: -80 }}>
        <IslamicOrnament size={300} opacity={0.07} />
      </div>
      <div style={{ position: 'absolute', bottom: 60, right: -60 }}>
        <IslamicOrnament size={260} opacity={0.08} />
      </div>
      <div style={{ position: 'absolute', bottom: -40, left: -40 }}>
        <IslamicOrnament size={220} opacity={0.06} />
      </div>

      {/* شريط ذهبي علوي */}
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, transparent, #c9a84c 20%, #e8d08a 50%, #c9a84c 80%, transparent)',
      }} />

      {/* ── المحتوى ── */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px 60px' }}>

        {/* ── قسم الهيرو ── */}
        <div style={{ textAlign: 'center', paddingTop: 60, paddingBottom: 20 }}>

          {/* مكان الشعار – placeholder دائري ذهبي */}
          <div style={{
            width: 120,
            height: 120,
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2a1a02, #3d2804)',
            border: '2px solid rgba(201,168,76,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(201,168,76,0.15), 0 0 80px rgba(201,168,76,0.05)',
            position: 'relative',
          }}>
            {/* حلقة دوارة */}
            <div style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.2)',
            }} />
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              {/* كتاب مفتوح */}
              <path d="M32 10 C32 10 18 14 10 20 L10 52 C18 46 32 44 32 44 C32 44 46 46 54 52 L54 20 C46 14 32 10 32 10Z"
                fill="none" stroke="#c9a84c" strokeWidth="2" opacity="0.9"/>
              <line x1="32" y1="10" x2="32" y2="44" stroke="#c9a84c" strokeWidth="1.5" opacity="0.7"/>
              <path d="M14 26 C20 24 28 24 32 25" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
              <path d="M14 32 C20 30 28 30 32 31" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
              <path d="M14 38 C20 36 28 36 32 37" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
              <path d="M50 26 C44 24 36 24 32 25" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
              <path d="M50 32 C44 30 36 30 32 31" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
              <path d="M50 38 C44 36 36 36 32 37" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>

          {/* العنوان الرئيسي */}
          <h1 style={{
            fontFamily: 'Amiri, serif',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            color: '#e8c96c',
            margin: '0 0 6px',
            lineHeight: 1.25,
            letterSpacing: '0.01em',
            textShadow: '0 2px 20px rgba(201,168,76,0.3)',
          }}>
            فيوض التأويل المعاصر
          </h1>

          {/* فاصل زخرفي صغير */}
          <OrnamentalDivider />

          {/* الوصف */}
          <p style={{
            fontFamily: 'Noto Naskh Arabic, serif',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            color: 'rgba(232,201,108,0.75)',
            lineHeight: 1.9,
            maxWidth: 520,
            margin: '0 auto 32px',
          }}>
            قراءة تفسيرية معاصرة تجمع بين البيان القرآني، والتدبر التربوي،<br/>
            والبصيرة النفسية، بلغة قريبة من الإنسان المعاصر.
          </p>

          {/* شارة البسملة */}
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.06))',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 40,
            padding: '10px 28px',
            marginBottom: 48,
          }}>
            <span style={{
              fontFamily: 'Amiri, serif',
              fontSize: '1.15rem',
              color: 'rgba(232,201,108,0.85)',
            }}>
              ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾
            </span>
          </div>
        </div>

        {/* ── قسم السور ── */}
        <div>
          {/* عنوان القسم */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(to left, rgba(201,168,76,0.3), transparent)',
            }} />
            <span style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '0.85rem',
              color: 'rgba(201,168,76,0.55)',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}>
              السور المتاحة
            </span>
            <div style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)',
            }} />
          </div>

          {/* بطاقات السور */}
          {surahs.map((surah, i) => (
            <SurahCard key={i} {...surah} navigate={navigate} />
          ))}

          {/* قريباً */}
          <div style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px dashed rgba(201,168,76,0.2)',
            borderRadius: 12,
            padding: '18px 24px',
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '0.85rem',
              color: 'rgba(201,168,76,0.4)',
            }}>
              ✦ سور أخرى قريباً إن شاء الله ✦
            </span>
          </div>
        </div>

        {/* ── الفوتر ── */}
        <div style={{
          textAlign: 'center',
          marginTop: 56,
          paddingTop: 24,
          borderTop: '1px solid rgba(201,168,76,0.12)',
        }}>
          <OrnamentalDivider />
          <p style={{
            fontFamily: 'Noto Naskh Arabic, serif',
            fontSize: '0.8rem',
            color: 'rgba(201,168,76,0.35)',
            margin: 0,
          }}>
            فيوض التأويل المعاصر • جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      {/* شريط ذهبي سفلي */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #c9a84c 20%, #e8d08a 50%, #c9a84c 80%, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
