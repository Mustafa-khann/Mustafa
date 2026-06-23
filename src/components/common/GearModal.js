import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

const getFocusableElements = (container) =>
  Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    const isHidden = element.getAttribute('aria-hidden') === 'true';
    return !isHidden && element.tabIndex !== -1;
  });

const EMPTY_COLLECTIONS = [];

const GearItem = ({ item }) => {
  const itemClassName =
    'flex justify-between items-baseline py-3 no-underline text-neutral-800 border-b border-neutral-100 gap-8 last:border-b-0 hover:bg-neutral-50 px-2 -mx-2 transition-colors duration-200 group';

  const content = (
    <>
      <div className="flex items-center gap-4 min-w-0">
        <span className="text-lg min-w-6 opacity-70 grayscale group-hover:grayscale-0 transition-all" aria-hidden="true">
          {item.emoji || '🔧'}
        </span>
        <div className="min-w-0">
          <h4 className="font-bold tracking-tight text-sm group-hover:text-neutral-900">{item.title}</h4>
          {item.note ? <span className="text-neutral-500 text-xs italic block mt-0.5">{item.note}</span> : null}
        </div>
      </div>
      {item.price ? <div className="text-neutral-500 text-xs font-mono whitespace-nowrap">{item.price}</div> : null}
    </>
  );

  if (!item.link) {
    return <div className={itemClassName}>{content}</div>;
  }

  return (
    <a
      className={itemClassName}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
    >
      {content}
    </a>
  );
};

const GearModal = ({ isOpen, onClose, title = 'Recommended Gear', collections = EMPTY_COLLECTIONS }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousBodyOverflowRef = useRef('');
  const previouslyFocusedElementRef = useRef(null);
  const [showDisclosure, setShowDisclosure] = useState(false);
  const safeCollections = Array.isArray(collections) ? collections : [];

  const visibleCollections = useMemo(
    () => safeCollections.filter((collection) => Array.isArray(collection?.items) && collection.items.length > 0),
    [safeCollections]
  );

  useEffect(() => {
    if (!isOpen) {
      setShowDisclosure(false);
      return undefined;
    }

    previouslyFocusedElementRef.current = document.activeElement;
    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    const focusTimer = window.setTimeout(() => {
      const initialFocusTarget = closeButtonRef.current || modalRef.current;
      initialFocusTarget?.focus();
    }, 0);

    document.addEventListener('keydown', handleEscape);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousBodyOverflowRef.current;

      const previousElement = previouslyFocusedElementRef.current;
      if (previousElement && document.contains(previousElement) && typeof previousElement.focus === 'function') {
        previousElement.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleTabKey = (event) => {
      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = getFocusableElements(modalRef.current);
      if (!focusableElements.length) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-white border border-neutral-200 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gear-modal-title"
        aria-describedby="gear-modal-disclosure-summary"
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-neutral-100 bg-white px-6 py-4">
          <h2 id="gear-modal-title" className="text-sm font-bold uppercase tracking-widest text-neutral-900">
            {title}
          </h2>
          <button
            className="border border-neutral-200 bg-transparent px-2 py-1 text-xs font-bold uppercase text-neutral-500 transition-colors duration-200 hover:border-neutral-400 hover:text-neutral-900"
            aria-label="Close gear modal"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-4 text-xs italic leading-relaxed text-neutral-500 font-mono" role="note">
          <span id="gear-modal-disclosure-summary">
            Disclosure: Some links may be affiliate links. If you purchase through them, I may earn a small commission at no extra cost to you.
          </span>
          <button
            type="button"
            className="ml-4 border border-neutral-200 bg-transparent px-2 py-1 text-[10px] font-bold uppercase text-neutral-800 transition-colors hover:border-neutral-400"
            aria-expanded={showDisclosure}
            aria-controls="gear-modal-disclosure-details"
            onClick={() => setShowDisclosure((value) => !value)}
          >
            {showDisclosure ? 'Hide' : 'Details'}
          </button>
          {showDisclosure && (
            <div id="gear-modal-disclosure-details" className="mt-2 not-italic">
              <p>
                I only recommend tools I genuinely use or believe will add value. Purchases through these links help support the site without adding cost.
              </p>
            </div>
          )}
        </div>

        <div className="p-6">
          {visibleCollections.length > 0 ? (
            visibleCollections.map((collection) => (
              <section key={collection.id || collection.title} className="mb-12 last:mb-0">
                <div className="mb-6">
                  <h3 className="mb-4 border-b border-neutral-100 pb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
                    {collection.title}
                  </h3>
                  {collection.description ? (
                    <p className="mb-4 text-sm italic text-neutral-500 opacity-80">{collection.description}</p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  {collection.items.map((item) => (
                    <GearItem key={item.id || item.title} item={item} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p className="text-sm text-neutral-500">No gear is listed for this article yet.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GearModal;
