import { useEffect } from 'react';

type ArticleMeta = {
  title: string;
  description: string;
  imagePath: string;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Updates document title + social meta in the browser (link previews use server-injected HTML). */
export function useArticleMeta(meta: ArticleMeta) {
  useEffect(() => {
    const origin = window.location.origin;
    const url = `${origin}${window.location.pathname}`;
    const image = `${origin}${meta.imagePath}`;

    const prevTitle = document.title;
    document.title = meta.title;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', image);

    return () => {
      document.title = prevTitle;
    };
  }, [meta.title, meta.description, meta.imagePath]);
}
