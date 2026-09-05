import React from 'react';
const PageHeader = ({ number, title, description, count }) => (
  <header className="page-heading">
    <div className="eyebrow"><span>{number} / {title}</span>{count !== undefined && <span>{String(count).padStart(2, '0')} entries</span>}</div>
    <h1>{title}<span className="title-period">.</span></h1>
    {description && <p>{description}</p>}
  </header>
);
export default PageHeader;
