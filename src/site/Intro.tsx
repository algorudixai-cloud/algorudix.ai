import { mediaSrc, section } from '../content';
import { Rise } from './Rise';

/** "We start with how you work": one paragraph on the axis, one photograph hanging in the side zone. */
export function Intro() {
  const s = section('intro');
  const [square, portrait] = s.images;
  return (
    <section id="intro" className="section on-page" aria-labelledby="intro-title">
      <div className="frame axis-grid">
        <div className="side" />
        <div className="main">
          <Rise id="intro-title" className="t-head intro__heading" text={s.heading} />
          <p className="t-lead intro__text" data-reveal style={{ ['--i' as string]: 1 }}>{s.intro}</p>
        </div>
        {square && (
          <div className="side intro__figure">
            <figure className="intro__picture" data-reveal>
              <picture>
                {portrait && <source media="(max-width: 47.99rem)" srcSet={mediaSrc(portrait.src)} />}
                <img className="photo drift" src={mediaSrc(square.src)} alt={square.alt} width={900} height={900} loading="lazy" decoding="async" />
              </picture>
            </figure>
            {s.body && <p className="t-small intro__note">{s.body}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
