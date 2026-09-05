import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { usePageMetadata } from './metadata';

const Page = ({ image }) => { usePageMetadata({ title: 'Current page', description: 'Current description', image }); return null; };

test('leaving a product page restores the original social image and description', () => {
  const description = document.createElement('meta');
  description.name = 'description'; description.content = 'Original description';
  const image = document.createElement('meta');
  image.setAttribute('property', 'og:image'); image.content = 'original.png';
  document.head.append(description, image);
  const container = document.createElement('div');
  act(() => { ReactDOM.render(<Page image="shop.png" />, container); });
  expect(image.content).toBe('shop.png');
  act(() => { ReactDOM.render(<Page />, container); });
  expect(image.content).toBe('original.png');
  expect(description.content).toBe('Current description');
  act(() => { ReactDOM.unmountComponentAtNode(container); });
  expect(description.content).toBe('Original description');
  description.remove(); image.remove();
});
