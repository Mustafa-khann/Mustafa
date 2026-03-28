import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectDetails } from '../data/projects';

// Hero image with graceful fallback for missing files
const HeroImage = ({ project }) => {
  const [failed, setFailed] = useState(false);

  if (!project.image || failed) {
    // Gradient banner fallback
    return (
      <div className="mb-12 -mx-6 md:mx-0 opacity-0 animate-fade-in animation-delay-100">
        <div className="relative h-56 md:h-72 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <span className="relative text-white/15 font-bold text-4xl md:text-5xl tracking-widest select-none font-mono uppercase">
            {project.title.split(' - ')[0].split(' — ')[0].trim()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 -mx-6 md:mx-0 opacity-0 animate-fade-in animation-delay-100">
      <div className="relative overflow-hidden bg-neutral-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto max-h-[480px] object-cover"
          onError={() => setFailed(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = projectDetails.find((p) => p.slug === slug);
  const contentRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [readProgress, setReadProgress] = useState(0);

  // Extract h3 headings for the table of contents
  useEffect(() => {
    if (!contentRef.current) return;
    const h3s = contentRef.current.querySelectorAll('h3');
    const items = Array.from(h3s).map((el, i) => {
      const id = `section-${i}`;
      el.id = id;
      return { id, text: el.textContent };
    });
    setSections(items);
  }, [project]);

  // Track scroll for active section and read progress
  useEffect(() => {
    const handleScroll = () => {
      // Read progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);

      // Active section
      if (!contentRef.current) return;
      const h3s = contentRef.current.querySelectorAll('h3');
      let current = '';
      h3s.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = el.id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-20">
          <Link to="/projects" className="back-link mb-8 inline-flex">← Back to Projects</Link>
          <h1 className="page-title">Not Found</h1>
        </header>
        <p className="text-neutral-600">Project not found.</p>
      </main>
    );
  }

  // Clean content — strip inline color styles for minimal lab theme
  const cleanContent = (html) => {
    return html
      .replace(/style="color:[^"]*"/g, '')
      .replace(/<span[^>]*>/g, '')
      .replace(/<\/span>/g, '')
      .replace(/<br\s*\/?>/g, '<br>')
      .replace(/<br>\s*<br>/g, '</p><p>');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Read progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-neutral-100">
        <div
          className="h-full bg-neutral-900 transition-[width] duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <header className="mb-10 opacity-0 animate-fade-in">
          <Link to="/projects" className="back-link mb-8 inline-flex">← Back to Projects</Link>
          <h1 className="page-title">{project.title}</h1>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-neutral-400 font-mono text-sm">{project.date}</span>
            {project.techStack && (
              <>
                <span className="text-neutral-200">·</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.split(',').map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 bg-neutral-50 border border-neutral-100 text-neutral-500 tracking-wide"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold uppercase tracking-wider text-neutral-500 no-underline hover:text-neutral-900 transition-colors border border-neutral-200 px-3 py-1.5 hover:border-neutral-400"
            >
              ↗ View on GitHub
            </a>
          )}
        </header>

        {/* Hero image — full bleed with fallback */}
        <HeroImage project={project} />

        {/* Abstract callout */}
        <div className="mb-14 opacity-0 animate-fade-in animation-delay-200">
          <div className="border-l-2 border-neutral-900 pl-6 py-2">
            <p className="text-neutral-600 leading-relaxed text-lg">{project.abstract}</p>
          </div>
        </div>

        {/* Table of contents - mobile */}
        {sections.length > 0 && (
          <div className="mb-12 lg:hidden opacity-0 animate-fade-in animation-delay-300">
            <details className="border border-neutral-100 bg-neutral-50/50">
              <summary className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 cursor-pointer select-none hover:text-neutral-600 transition-colors">
                Table of Contents
              </summary>
              <nav className="px-5 pb-4">
                <ol className="list-none p-0 m-0 space-y-2">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollToSection(s.id)}
                        className="text-left text-sm text-neutral-500 hover:text-neutral-900 transition-colors bg-transparent border-none cursor-pointer p-0 font-mono"
                      >
                        <span className="text-neutral-300 mr-2 text-xs">{String(i + 1).padStart(2, '0')}</span>
                        {s.text}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          </div>
        )}

        {/* Main content area with optional sidebar ToC on desktop */}
        <div className="relative lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
          {/* Full guide content */}
          <article
            className="leading-relaxed prose prose-neutral max-w-none text-neutral-700 opacity-0 animate-fade-in animation-delay-300
              [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-xs [&_h2]:tracking-widest [&_h2]:text-neutral-400 [&_h2]:border-b [&_h2]:border-neutral-100 [&_h2]:pb-3
              [&_h3]:mt-14 [&_h3]:mb-5 [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:text-lg [&_h3]:scroll-mt-24
              [&_p]:mb-6 [&_p]:leading-[1.8]
              [&_ul]:mb-6 [&_ol]:mb-6 [&_li]:mb-2
              [&_a]:text-neutral-900 [&_a]:underline [&_a]:decoration-neutral-300 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:decoration-neutral-500
              [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:text-sm
              [&_th]:border [&_th]:border-neutral-200 [&_th]:p-3 [&_th]:text-left [&_th]:bg-neutral-50 [&_th]:font-bold [&_th]:tracking-wide
              [&_td]:border [&_td]:border-neutral-200 [&_td]:p-3
              [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-300 [&_blockquote]:pl-5 [&_blockquote]:text-neutral-500 [&_blockquote]:italic [&_blockquote]:mb-8
              [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-neutral-100 [&_img]:p-1 [&_img]:bg-neutral-50
              [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-neutral-800
              [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-6 [&_pre_code]:bg-transparent [&_pre_code]:p-0
              [&_strong]:text-neutral-800"
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: cleanContent(project.content) }}
          />

          {/* Desktop sidebar ToC */}
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <nav className="sticky top-16">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
                  On this page
                </p>
                <ol className="list-none p-0 m-0 space-y-2 border-l border-neutral-100">
                  {sections.map((s, i) => (
                    <li key={s.id} className="relative">
                      <button
                        onClick={() => scrollToSection(s.id)}
                        className={`block text-left text-xs leading-relaxed pl-4 py-0.5 bg-transparent border-none cursor-pointer transition-all duration-200 w-full
                          ${activeSection === s.id
                            ? 'text-neutral-900 font-semibold border-l-2 border-neutral-900 -ml-px'
                            : 'text-neutral-400 hover:text-neutral-700'
                          }`}
                      >
                        {s.text}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>

        {/* Footer navigation */}
        <div className="mt-20 pt-8 border-t border-neutral-100 opacity-0 animate-fade-in">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 no-underline hover:text-neutral-900 transition-colors"
          >
            ← All Projects
          </Link>
        </div>
      </main>
    </>
  );
};

export default ProjectDetailPage;
