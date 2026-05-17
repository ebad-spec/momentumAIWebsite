export type ResearchArticleMeta = {
  slug: string;
  chip: string;
  title: string;
  dek: string;
  date: string;
  readTime: string;
  thumbnailPath: string;
};

export const RESEARCH_ARTICLES: ResearchArticleMeta[] = [
  {
    slug: 'mindtrace',
    chip: 'Research',
    title:
      'Introducing MindTrace: a cognitive profile model that learns how you think, built from implicit student feedback signals',
    dek: 'MindTrace builds a cognitive profile from behavioral residue of each session—latency, hesitation, error clustering—without asking students to rate their own confidence.',
    date: 'May 2026',
    readTime: '12 min read',
    thumbnailPath: '/research/mindtrace/image-1.png',
  },
];

export function getArticleBySlug(slug: string): ResearchArticleMeta | undefined {
  return RESEARCH_ARTICLES.find((a) => a.slug === slug);
}
