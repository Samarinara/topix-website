import { Download, PackageOpen, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoSvg from "/logo.svg";

const topics = [
  {
    name: "Watchlists",
    color: "#7f22d9",
    glow: "rgba(127, 34, 217, 0.52)",
    note: "Keep half-formed scenes, references, and loglines in one place.",
  },
  {
    name: "Projects",
    color: "#ff2d1f",
    glow: "rgba(255, 45, 31, 0.62)",
    note: "Collect build notes, bugs, snippets, and experiments as they arrive.",
  },
  {
    name: "Ideas",
    color: "#24273A",
    glow: "rgba(141, 74, 111, 0.42)",
    note: "Turn passing recommendations into a list you will actually revisit.",
  },
  {
    name: "Cool Tech",
    color: "#a5bd38",
    glow: "rgba(165, 189, 56, 0.5)",
    note: "Save tools, demos, papers, and products without losing the thread.",
  },
  {
    name: "Braindumps",
    color: "#8d4a6f",
    glow: "rgba(141, 74, 111, 0.42)",
    note: "Turn passing recommendations into a list you will actually revisit.",
  },
];

const releaseUrl = "https://github.com/Samarinara/topix/releases/";

const features = [
  [
    "Infinite Topics",
    "Create the categories that match your work, taste, and side ideas.",
  ],
  [
    "Color-reactive Glow",
    "Choose a colour to help you get to a topic faster and change the theme of the app to match.",
  ],
  [
    "Speed as a Focus",
    "Move between categories quickly when you are collecting, refining, or resurfacing notes.",
  ],
];

function parseColor(str) {
  const rgba = str.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/,
  );
  if (rgba) {
    return {
      r: parseInt(rgba[1]),
      g: parseInt(rgba[2]),
      b: parseInt(rgba[3]),
      a: rgba[4] !== undefined ? parseFloat(rgba[4]) : 1,
    };
  }
  const hex = str.replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
      a: 1,
    };
  }
  return null;
}

function lerpColor(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
    a: a.a + (b.a - a.a) * t,
  };
}

function formatRGBA(c) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
}

let animFrame = null;

function animateVars(el, vars, duration) {
  if (animFrame) {
    cancelAnimationFrame(animFrame);
    animFrame = null;
  }

  const parsed = vars.map((v) => {
    const from = parseColor(v.from);
    const to = parseColor(v.to);
    return { prop: v.prop, from, to };
  });

  if (parsed.some((p) => !p.from || !p.to)) {
    vars.forEach((v) => el.style.setProperty(v.prop, v.to));
    return;
  }

  const start = performance.now();

  function frame(time) {
    const t = Math.min((time - start) / duration, 1);

    parsed.forEach((p) => {
      const cur = lerpColor(p.from, p.to, t);
      el.style.setProperty(p.prop, formatRGBA(cur));
    });

    if (t < 1) {
      animFrame = requestAnimationFrame(frame);
    }
  }

  animFrame = requestAnimationFrame(frame);
}

function App() {
  const [activeIndex, setActiveIndex] = useState(1);
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const topic = topics[activeIndex];

    if (firstRender.current) {
      firstRender.current = false;
      main.style.setProperty("--topic-color", topic.color);
      main.style.setProperty("--topic-glow", topic.glow);
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      main.style.setProperty("--topic-color", topic.color);
      main.style.setProperty("--topic-glow", topic.glow);
      return;
    }

    const oldColor =
      main.style.getPropertyValue("--topic-color") || topics[0].color;
    const oldGlow =
      main.style.getPropertyValue("--topic-glow") || topics[0].glow;

    animateVars(
      main,
      [
        { prop: "--topic-color", from: oldColor, to: topic.color },
        { prop: "--topic-glow", from: oldGlow, to: topic.glow },
      ],
      700,
    );
  }, [activeIndex]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % topics.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  const activeTopic = topics[activeIndex];

  return (
    <main ref={mainRef} className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />

        <nav className="top-nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Topix home">
            <span className="brand-mark">
              <img src={logoSvg} alt="" />
            </span>
            <span>Topix</span>
          </a>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="headline-static">Topix is a place for</span>
              <span className="topic-slot" aria-live="polite">
                <span key={activeTopic.name} className="topic-word">
                  {activeTopic.name}
                </span>
              </span>
            </h1>
            <p className="hero-subcopy">
              A fast notes app with user-defined topics, tactile category
              switching, and a glow that follows the thing you are thinking
              about.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={releaseUrl}>
                <Download size={19} aria-hidden="true" />
                Download Topix
              </a>
            </div>
          </div>

          <div className="device-stage" aria-label="Animated topic selector">
            <div className="phone-frame">
              <div className="app-logo">
                <img src={logoSvg} alt="" />
              </div>
              <div className="rolodex" role="list" aria-label="Topix topics">
                <div className="selector-line top" aria-hidden="true" />
                <div className="selector-line bottom" aria-hidden="true" />
                {topics.map((topic, index) => (
                  <button
                    className="topic-row"
                    type="button"
                    role="listitem"
                    key={topic.name}
                    style={getTopicStyle(index, activeIndex)}
                    aria-current={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span
                      className="topic-dot"
                      style={{ backgroundColor: topic.color }}
                      aria-hidden="true"
                    />
                    <span className="topic-label">{topic.name}</span>
                  </button>
                ))}
              </div>
              <button className="new-topic" type="button">
                <span aria-hidden="true">+</span>
                New Topic
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-section" aria-labelledby="intro-title">
        <div className="section-inner">
          <h2 id="intro-title">Sort thoughts before they turn into clutter.</h2>
          <p>
            Topix gives every note a home. Define the topics you care about,
            flip between them with a rolodex-style picker, and keep each stream
            of ideas close without forcing everything into folders.
          </p>
        </div>
      </section>

      <section className="features-section" id="features" aria-label="Features">
        <div className="feature-grid">
          {features.map(([title, body]) => (
            <article className="feature" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="download-section" aria-labelledby="download-title">
        <div>
          <h2 id="download-title">Download Now</h2>
        </div>
        <a className="button primary" href={releaseUrl}>
          <PackageOpen size={19} aria-hidden="true" />
          View releases
        </a>
      </section>
    </main>
  );
}

function getTopicStyle(index, activeIndex) {
  const count = topics.length;
  let offset = index - activeIndex;

  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;

  const distance = Math.abs(offset);

  return {
    "--offset": offset,
    "--row-opacity": distance === 0 ? 1 : distance === 1 ? 0.5 : 0.2,
    "--row-scale": distance === 0 ? 1 : distance === 1 ? 0.86 : 0.72,
    "--row-blur": distance === 0 ? "0px" : distance === 1 ? "0.3px" : "1.2px",
  };
}

export default App;
