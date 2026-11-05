// The site's content, read from content/site.db at build time (see scripts/vite-plugin-site-content.ts).
import data from 'virtual:site-content';
import type { SectionId, SiteContent } from './types';

export const site: SiteContent = data;
export const section = (id: SectionId) => site.sections[id];
export const isShown = (id: SectionId) => Boolean(site.sections[id]?.visible);

/** Digits only, for tel: links. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** Media paths are relative to the site root (works on the custom domain and on a subpath). */
export const mediaSrc = (src: string) => (/^(https?:)?\/\//.test(src) || src.startsWith('data:') ? src : `./${src.replace(/^\.?\//, '')}`);

export type * from './types';
