import { useEffect } from 'react';

type ArticleMeta = {
  title: string;
  description: string;
  imagePath: string;
};

function removeSocialMeta() {
  document
    .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')
    .forEach((el) => el.remove());
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  const el = document.createElement('meta');
  el.setAttribute(attr, key);
  el.setAttribute('content', content);
  document.head.appendChild(el);
}

/** Updates document title + social meta in the browser (link previews use server-injected HTML). */
export function useArticleMeta(meta: ArticleMeta) {
  useEffect(() => {
    const origin = window.location.origin;
    const url = `${origin}${window.location.pathname}`;
    const image = `${origin}${meta.imagePath}`;

    const prevTitle = document.title;
    document.title = meta.title;

    removeSocialMeta();

    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:site_name', 'Momentum Research');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', image);

    return () => {
      document.title = prevTitle;
    };
  }, [meta.title, meta.description, meta.imagePath]);
}
