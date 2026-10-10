const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

const heroStart = code.indexOf('{/* ===================== HERO SECTION ===================== */}');
const heroEnd = code.indexOf('<SectionSeam />');

if (heroStart !== -1 && heroEnd !== -1) {
  const newHero = `{/* ===================== HERO SECTION ===================== */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      >
        <img
          src={campusHero.url}
          alt="Voxel art"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute top-0 right-0 z-50 bg-white px-2 py-4 shadow-md flex flex-col items-center rounded-bl-xl border-l-2 border-b-2 border-gray-300">
          <div className="text-red-600 font-bold text-xs tracking-tighter">MLH</div>
          <div className="bg-gray-100 text-[8px] font-bold mt-1 px-1 text-center leading-tight border border-gray-300">
            OFFICIAL<br />2027<br />SEASON
          </div>
        </div>

        <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-4 pt-16">
          <h1
            className="pixel-heading text-4xl text-center leading-none text-white w-full max-w-[280px]"
            style={{
              textShadow: "4px 4px 0 #000, -2px -2px 0 #fff",
              WebkitTextStroke: "2px black",
            }}
          >
            MIINEARENA<br /><span className="text-3xl">1.0</span>
          </h1>

          <div
            className="mt-6 flex w-full items-center justify-center border-4 border-[#3a2a18] bg-[#7d5331] py-2"
            style={{
              boxShadow: "inset 4px 4px 0 rgba(255,255,255,0.2), inset -4px -4px 0 rgba(0,0,0,0.4)"
            }}
          >
            <span className="pixel-heading text-base text-white text-shadow-sm">24 HOURS HACKTHON</span>
          </div>

          <div
            className="mt-4 flex w-full flex-col items-center justify-center border-[6px] border-[#3a2a18] bg-[#614931] p-4 text-center"
            style={{
              boxShadow: "inset 4px 4px 0 rgba(255,255,255,0.1), inset -4px -4px 0 rgba(0,0,0,0.5)"
            }}
          >
            <p className="font-terminal text-sm font-bold text-[#e8dfd5]">
              JOIN US AT KIET DEEMED TO BE<br />UNIVERSITY
            </p>
            
            <div
              className="mt-3 border-4 border-[#3a2a18] bg-[#cba371] px-4 py-1"
              style={{
                boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.3)"
              }}
            >
              <span className="font-pixel text-xs text-[#3a2a18]">OCT 10-11, 2026</span>
            </div>

            <button
              className="mt-4 flex w-full items-center justify-center gap-2 border-[4px] border-[#1e4210] bg-[#3fd525] py-2 text-[#000000] hover:bg-[#34b51d]"
              style={{
                boxShadow: "inset 4px 4px 0 rgba(255,255,255,0.4), inset -4px -4px 0 rgba(0,0,0,0.3)"
              }}
            >
              <div className="h-3 w-3 rounded-full bg-[#185e0c]"></div>
              <span className="pixel-heading text-sm">REGISTRATIONS OPEN</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="font-pixel text-xs tracking-widest text-white text-shadow-md">
              INNOVATE · BUILD · COMPETE
            </p>
            <p className="mt-2 font-terminal text-xs text-[#d1ccc4]">
              A 24-hour hackathon where ideas<br />become real solutions.
            </p>
          </div>
        </div>
      </section>

      `;
  
  code = code.substring(0, heroStart) + newHero + code.substring(heroEnd);
  fs.writeFileSync('src/routes/index.tsx', code);
}
