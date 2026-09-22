import React from 'react';
import { Link } from 'react-router-dom';
import ProjectList from '../components/common/ProjectList';
import PostList from '../components/common/PostList';
import { projectSummaries } from '../data/projectSummaries';
import { postSummaries } from '../data/contentSummaries';
import { sortPostsByDateDesc } from '../utils/posts';
import { siteContent } from '../data/siteContent';
import { usePageMetadata } from '../utils/metadata';

const HomePage = () => {
  usePageMetadata({ title: 'Mustafa Khan — Independent engineer', description: 'Projects and writing across software, hardware, and autonomous systems.' });
  return (
    <main className="site-main home-page">
      <header className="home-intro">
        <div className="eyebrow"><span>Independent engineer</span><span>Software / Hardware / Autonomy</span></div>
        <h1>Mustafa Khan<span className="title-period">.</span></h1>
        <div className="intro-bottom">
          <p>I build systems to understand them.<br />Software, hardware, and the space between.</p>
          <div className="intro-aside"><span>All projects are solo builds.</span><span>Software, hardware, and experiments.</span></div>
        </div>
        <nav className="intro-links" aria-label="More of my work">
          <a className="text-link" href={siteContent.footer.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="text-link" href={siteContent.footer.twitter} target="_blank" rel="noopener noreferrer">X ↗</a>
          <Link className="text-link" to="/posts/why-robotics-is-hard-to-break-into-personal-experience">My path into robotics ↗</Link>
        </nav>
      </header>

      <section className="indexed-section" aria-labelledby="work-heading">
        <div className="section-label"><span className="eyebrow">01 / Work</span><h2 id="work-heading">Selected<br />projects</h2><Link className="text-link" to="/projects">All projects <span aria-hidden="true">↗</span></Link></div>
        <ProjectList projects={projectSummaries.slice(0, 3)} />
      </section>

      <section className="indexed-section" aria-labelledby="writing-heading">
        <div className="section-label"><span className="eyebrow">02 / Writing</span><h2 id="writing-heading">Notes from<br />the work</h2><Link className="text-link" to="/posts">All writing <span aria-hidden="true">↗</span></Link></div>
        <PostList posts={[postSummaries.find((post) => post.id === 7), ...sortPostsByDateDesc(postSummaries).filter((post) => post.id !== 7).slice(0, 3)].filter(Boolean)} compact />
      </section>

      <section className="indexed-section approach-section" aria-labelledby="approach-heading">
        <div className="section-label"><span className="eyebrow">03 / Approach</span><h2 id="approach-heading">A short<br />feedback loop.</h2></div>
        <div className="approach-content">
          <p className="approach-lead">Start with a problem. Build the smallest test.<br />Let the result decide what comes next.</p>
          <div className="approach-grid"><div><span className="eyebrow">Constraints</span><p>Small budgets. Short cycles.<br />Only the tools the work needs.</p></div><div><span className="eyebrow">Current focus</span><p>Building a physical hardware lab.<br />Making it easier to test ideas.</p></div></div>
          <div className="contact-line"><p>For collaboration, start with the technical problem.</p><a className="text-link" href={`mailto:${siteContent.footer.email}`}>Get in touch <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
    </main>
  );
};
export default HomePage;
