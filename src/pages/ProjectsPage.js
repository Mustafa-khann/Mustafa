import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';
import { projectSummaries } from '../data/projectSummaries';

// Gradient palettes keyed by project type
const typeGradients = {
  Hardware:   'from-neutral-800 to-neutral-600',
  System:     'from-neutral-700 to-neutral-500',
  Experiment: 'from-neutral-900 to-neutral-700',
  Tool:       'from-neutral-600 to-neutral-400',
};

// Extract initials from project name (up to 2 chars)
const getInitials = (name) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

// Thumbnail with graceful fallback for missing images
const ProjectThumbnail = ({ project }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const image = project.thumbnail || project.image;

  if (!image || imgFailed) {
    // Gradient placeholder with initials
    return (
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${typeGradients[project.type] || typeGradients.Experiment} flex items-center justify-center`}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <span className="relative text-3xl font-bold text-white/30 tracking-widest select-none">
          {getInitials(project.name)}
        </span>
        {/* Category label */}
        <span className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-white/25">
          {project.type}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-44 overflow-hidden bg-neutral-100">
      <img
        src={image}
        alt={project.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width="640"
        height="360"
        onError={() => setImgFailed(true)}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

const typeOrder = ['Hardware', 'System', 'Experiment', 'Tool'];

const ProjectsPage = () => {
  // Group by type
  const grouped = projectSummaries.reduce((acc, project) => {
    if (!acc[project.type]) acc[project.type] = [];
    acc[project.type].push(project);
    return acc;
  }, {});

  // Sort groups by typeOrder
  const sortedGroups = typeOrder
    .filter((t) => grouped[t])
    .map((t) => [t, grouped[t]]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-16">
        <Link to="/" className="back-link mb-8 inline-flex">← Back</Link>
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Artifacts with source or documentation.</p>
      </header>

      {sortedGroups.map(([type, typeProjects]) => (
        <section key={type} className="mb-20">
          <h2 className="section-header">{type}</h2>

          <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {typeProjects.map((project) => (
              /* The card title carries a stretched anchor so the whole card is
                 clickable, and the GitHub anchor sits above it. Both stay real
                 links — the click-handler-on-a-span this replaced was
                 unreachable by keyboard and invisible to assistive tech. */
              <article
                key={project.slug}
                className="relative group border border-neutral-100 bg-white overflow-hidden transition-transform duration-transition hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1"
              >
                <ProjectThumbnail project={project} />

                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-bold text-neutral-900 tracking-tight text-base leading-tight m-0">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="no-underline text-neutral-900 group-hover:text-neutral-700 transition-colors after:absolute after:inset-0 after:content-['']"
                      >
                        {project.name}
                      </Link>
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-mono whitespace-nowrap flex-shrink-0">
                      {project.date}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.split(',').slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-50 border border-neutral-100 text-neutral-500 tracking-wide"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                      {project.stack.split(',').length > 3 && (
                        <span className="text-[10px] font-mono text-neutral-400">
                          +{project.stack.split(',').length - 3}
                        </span>
                      )}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 no-underline flex-shrink-0 text-[10px] font-mono text-neutral-400 hover:text-neutral-900 transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 group-hover:text-neutral-500 transition-colors">
                    Read guide →
                  </span>
                </div>
              </article>
            ))}
          </Reveal>
        </section>
      ))}
    </main>
  );
};

export default ProjectsPage;
