import { useEffect } from 'react';

export const usePageMetadata = ({ title, description, image, type = 'website' }) => {
  useEffect(() => {
    const previousTitle = document.title;
    const fields = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:type"]': type,
      'meta[property="og:url"]': window.location.href,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
    };
    if (image) {
      fields['meta[property="og:image"]'] = image;
      fields['meta[name="twitter:image"]'] = image;
    }
    const previous = [];
    document.title = title;
    Object.entries(fields).forEach(([selector, value]) => {
      const element = document.head.querySelector(selector);
      if (!element || value === undefined) return;
      previous.push([element, element.getAttribute('content')]);
      element.setAttribute('content', value);
    });
    return () => {
      document.title = previousTitle;
      previous.forEach(([element, value]) => {
        if (value === null) element.removeAttribute('content');
        else element.setAttribute('content', value);
      });
    };
  }, [title, description, image, type]);
};
