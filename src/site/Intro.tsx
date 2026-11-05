import { useLayoutEffect, useRef, useState } from 'react';
import { section, site } from '../content';
import { Icon, iconFor } from './icons';
import { Rise } from './Rise';

/** The intro's "More text" names the flow: "inputs, comma separated | outputs, comma separated". */
export function parseFlow(body: string) {
  const [a = '', b = ''] = body.split('|');
  const list = (x: string) => x.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 6);
  return { inputs: list(a), outputs: list(b) };
}

type Wire = { id: string; d: string };

/** Your systems on one side, what you get on the other, and the AI in the middle; data runs along the wires. */
function FlowMap({ inputs, outputs }: { inputs: string[]; outputs: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const ins = useRef<(HTMLDivElement | null)[]>([]);
  const outs = useRef<(HTMLDivElement | null)[]>([]);
  const inCol = useRef<HTMLDivElement>(null);
  const outCol = useRef<HTMLDivElement>(null);
  const [wires, setWires] = useState<Wire[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const name = `${site.settings.name.replace(/\.ai$/i, '')} AI`;

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const b = el.getBoundingClientRect();
      const c = core.current?.querySelector('.flow__orb')?.getBoundingClientRect();
      if (!c) return;
      const vertical = window.matchMedia('(max-width: 720px)').matches;
      const rel = (r: DOMRect) => ({ l: r.left - b.left, r: r.right - b.left, t: r.top - b.top, b: r.bottom - b.top, x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 });
      const C = rel(c);
      const curve = (x1: number, y1: number, x2: number, y2: number) => vertical
        ? `M${x1.toFixed(1)},${y1.toFixed(1)} C${x1.toFixed(1)},${((y1 + y2) / 2).toFixed(1)} ${x2.toFixed(1)},${((y1 + y2) / 2).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`
        : `M${x1.toFixed(1)},${y1.toFixed(1)} C${((x1 + x2) / 2).toFixed(1)},${y1.toFixed(1)} ${((x1 + x2) / 2).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      const list: Wire[] = [];
      if (vertical) {
        // on a phone the boxes sit in two columns: one wire per column, into the AI and out of it
        const I = inCol.current && rel(inCol.current.getBoundingClientRect());
        const O = outCol.current && rel(outCol.current.getBoundingClientRect());
        for (const k of [0, 1]) {
          if (I) list.push({ id: `in${k}`, d: curve(I.l + ((I.r - I.l) * (k * 2 + 1)) / 4, I.b, C.x, C.t) });
          if (O) list.push({ id: `out${k}`, d: curve(C.x, C.b, O.l + ((O.r - O.l) * (k * 2 + 1)) / 4, O.t) });
        }
        setWires(list);
        setSize({ w: b.width, h: b.height });
        return;
      }
      ins.current.forEach((n, i) => {
        if (!n) return;
        const N = rel(n.getBoundingClientRect());
        list.push({ id: `in${i}`, d: vertical ? curve(N.x, N.b, C.x, C.t) : curve(N.r, N.y, C.l, C.y) });
      });
      outs.current.forEach((n, i) => {
        if (!n) return;
        const N = rel(n.getBoundingClientRect());
        list.push({ id: `out${i}`, d: vertical ? curve(C.x, C.b, N.x, N.t) : curve(C.r, C.y, N.l, N.y) });
      });
      setWires(list);
      setSize({ w: b.width, h: b.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [inputs.length, outputs.length]);

  return (
    <div className="flow" ref={box} data-reveal="zoom" role="img"
      aria-label={`Your systems (${inputs.join(', ')}) feed ${name}, which turns them into ${outputs.join(', ')}.`}>
      <svg className="flow__wires" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
        <defs>
          <linearGradient id="wire" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={size.w || 1} y2="0">
            <stop offset="0" stopColor="#6c3bff" /><stop offset="1" stopColor="#19c3e6" />
          </linearGradient>
        </defs>
        {wires.map((w) => <path key={w.id} d={w.d} />)}
        {wires.map((w) => <path key={`f${w.id}`} d={w.d} className="flowing" />)}
        {wires.map((w, i) => (
          <circle key={`c${w.id}`} r="3.6">
            <animateMotion dur={`${2.6 + (i % 3) * 0.55}s`} begin={`${(-i * 0.47).toFixed(2)}s`} repeatCount="indefinite" path={w.d} />
          </circle>
        ))}
      </svg>
      <div className="flow__col flow__col--in" ref={inCol} aria-hidden="true">
        {inputs.map((t, i) => (
          <div key={t} ref={(n) => { ins.current[i] = n; }} className="flow__node"><i><Icon name={iconFor(t)} /></i>{t}</div>
        ))}
      </div>
      <div className="flow__core" ref={core} aria-hidden="true">
        <span className="flow__orb"><Icon name="sparkles" /></span>
        <b>{name}</b>
      </div>
      <div className="flow__col flow__col--out" ref={outCol} aria-hidden="true">
        {outputs.map((t, i) => (
          <div key={t} ref={(n) => { outs.current[i] = n; }} className="flow__node"><i><Icon name={iconFor(t)} /></i>{t}</div>
        ))}
      </div>
    </div>
  );
}

/** "We start with how you work": the approach in words, and the flow it produces. */
export function Intro() {
  const s = section('intro');
  const { inputs, outputs } = parseFlow(s.body);
  return (
    <section id="intro" className="section section--soft" aria-labelledby="intro-title">
      <div className="wrap split">
        <div>
          <Rise id="intro-title" className="h2" text={s.heading} />
          <p className="lead" data-reveal>{s.intro}</p>
        </div>
        {inputs.length > 0 && outputs.length > 0 && <FlowMap inputs={inputs} outputs={outputs} />}
      </div>
    </section>
  );
}
