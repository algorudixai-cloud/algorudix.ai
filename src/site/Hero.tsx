import { isShown, mediaSrc, section, site } from '../content';
import { useMediaQuery } from './hooks';

/** Two lines for a display headline: "a | b" sets the break, otherwise the words are balanced. */
export function twoLines(text: string): string[] {
  if (text.includes('|')) return text.split('|').map((s) => s.trim()).filter(Boolean).slice(0, 2);
  const words = text.trim().split(/\s+/);
  if (words.length < 3) return [text.trim()];
  let best = 1, bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ').length, b = words.slice(i).join(' ').length;
    const diff = Math.abs(a - b) + (a < b ? 0.5 : 0); // on a tie, the first line runs longer
    if (diff < bestDiff) { best = i; bestDiff = diff; }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')];
}

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

export function Hero({ onBook, onShowTasks }: { onBook: () => void; onShowTasks: () => void }) {
  const hero = section('hero');
  const photos = hero.images.filter((i) => !isVideo(i.src));
  const video = hero.images.find((i) => isVideo(i.src));
  const [a, c, d] = photos;
  const lines = twoLines(hero.heading);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const cell = (img: typeof a, cls: string, delay: number, eager: boolean) =>
    img ? (
      <figure className={cls} data-open style={{ ['--d' as string]: `${delay}ms` }}>
        <img className="photo" src={mediaSrc(img.src)} alt={img.alt} width={1400} height={1000}
          loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
      </figure>
    ) : <div className={cls} aria-hidden="true" />;

  return (
    <section id="home" className="hero on-page" aria-labelledby="hero-title">
      <div className="mosaic">
        {cell(a, 'mosaic__a', 120, true)}
        <div className="mosaic__b" aria-hidden="true" />
        {video && (
          <figure className="mosaic__v" data-open style={{ ['--d' as string]: '180ms' }}>
            {reduced && video.poster ? (
              <img className="photo" src={mediaSrc(video.poster)} alt={video.alt} width={480} height={360} />
            ) : (
              <video className="photo" src={mediaSrc(video.src)} poster={video.poster ? mediaSrc(video.poster) : undefined}
                autoPlay muted loop playsInline preload="metadata" width={480} height={360} aria-label={video.alt} />
            )}
          </figure>
        )}
        {cell(c, 'mosaic__c', 220, true)}
        {cell(d, 'mosaic__d', 300, false)}
      </div>
      <div className="frame axis-grid hero__body">
        <div className="side hero__side t-small" data-load style={{ ['--d' as string]: '620ms' }}>
          <p className="t-small">{site.settings.location}</p>
          <p className="t-small muted">{site.settings.hours}</p>
        </div>
        <div className="main">
          <h1 id="hero-title" className="t-display lines hero__title">
            {lines.map((l, i) => (
              <span key={i} className="line"><span data-line style={{ ['--i' as string]: i }}>{l}</span></span>
            ))}
          </h1>
          <p className="t-lead hero__standfirst" data-load style={{ ['--d' as string]: '480ms' }}>{hero.intro}</p>
          <div className="hero__actions" data-load style={{ ['--d' as string]: '560ms' }}>
            <button type="button" className="btn" onClick={onBook}>{hero.cta_label || 'Book a free consultation'}</button>
            {isShown('tasks') && (
              <a className="link" href="#tasks" onClick={(e) => { e.preventDefault(); onShowTasks(); }}>See what we automate</a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
