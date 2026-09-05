import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PostList from '../components/common/PostList';
import { postSummaries } from '../data/contentSummaries';
import { sortPostsByDateDesc } from '../utils/posts';
import { usePageMetadata } from '../utils/metadata';
const NotesPage = () => {
  usePageMetadata({ title: 'Writing — Mustafa Khan', description: 'Notes on building hardware, learning systems, and working across disciplines.' });
  return <main className="site-main"><PageHeader number="02" title="Writing" description="Notes on building hardware, learning systems, and working across disciplines." count={postSummaries.length} /><PostList posts={sortPostsByDateDesc(postSummaries)} /></main>;
};
export default NotesPage;
