/// <reference types="vite/client" />

declare module 'virtual:site-content' {
  const content: import('./content/types').SiteContent;
  export default content;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
