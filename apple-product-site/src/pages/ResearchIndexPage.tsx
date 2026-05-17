import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mindtrace-article.css';
import { RESEARCH_ARTICLES } from '../data/researchArticles';

const ResearchIndexPage: React.FC = () => {
  return (
    <div className="mindtrace-article">
      <div className="wrapper">
        <div className="meta-bar">
          <span className="meta-logo">Momentum Research</span>
        </div>

        <h1 style={{ marginBottom: 12 }}>Research Index</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 48, fontSize: 15 }}>
          Reports on the science and engineering behind our learning infrastructure.
        </p>

        {RESEARCH_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            to={`/research/${article.slug}`}
            className="research-index-card"
          >
            <div className="research-index-card-body">
              <span className="meta-tag" style={{ marginBottom: 12, display: 'inline-block' }}>
                {article.chip}
              </span>
              <h2 className="research-index-card-title">{article.title}</h2>
              <p className="research-index-card-dek">{article.dek}</p>
              <p className="research-index-card-meta">
                {article.date} · {article.readTime}
              </p>
            </div>
            <div className="research-index-card-media">
              <img
                src={article.thumbnailPath}
                alt=""
                className="research-index-thumb"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResearchIndexPage;
