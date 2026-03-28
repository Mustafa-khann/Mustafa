import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectDetails } from '../data/projects';

// Derive a type category from project metadata
const getType = (p) => {
  const t = p.title.toLowerCase();
  if (t.includes('drone') || t.includes('robotic') || t.includes('arm')) return 'Hardware';
  if (t.includes('os') || t.includes('compiler')) return 'System';
  if (t.includes('stabilizer') || t.includes('analyzer')) return 'Tool';
  return 'Experiment';
};

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

  if (!project.image || imgFailed) {
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
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={() => setImgFailed(true)}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

// Build listing entries from the detail data
const projects = projectDetails.map((p) => ({
  name: p.title.split(' - ')[0].split(' — ')[0].trim(),
  fullTitle: p.title,
  type: getType(p),
  description: p.abstract,
  stack: p.techStack,
  link: p.link,
  image: p.image,
  date: p.date,
  slug: p.slug,
}));

const typeOrder = ['Hardware', 'System', 'Experiment', 'Tool'];

const ProjectsPage = () => {
  // Group by type
  const grouped = projects.reduce((acc, project) => {
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
      <header className="mb-20 opacity-0 animate-fade-in">
        <Link to="/" className="back-link mb-8 inline-flex">← Back</Link>
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Artifacts with source or documentation.</p>
      </header>

      {sortedGroups.map(([type, typeProjects], groupIndex) => (
        <section
          key={type}
          className="mb-20 opacity-0 animate-fade-in"
          style={{ animationDelay: `${(groupIndex + 1) * 100}ms` }}
        >
          <h2 className="section-header">{type}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {typeProjects.map((project, idx) => (
              <Link
                key={idx}
                to={`/projects/${project.slug}`}
                className="group block no-underline"
              >
                <article className="border border-neutral-100 bg-white overflow-hidden transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Thumbnail with fallback */}
                  <ProjectThumbnail project={project} />

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-bold text-neutral-900 tracking-tight group-hover:text-neutral-700 transition-colors text-base leading-tight">
                        {project.name}
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
                        {project.stack.split(',').slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
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
                        <span
                          className="text-[10px] font-mono text-neutral-400 hover:text-neutral-900 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.link, '_blank');
                          }}
                        >
                          GitHub ↗
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <div className="px-5 pb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 group-hover:text-neutral-500 transition-colors">
                      Read guide →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default ProjectsPage;
