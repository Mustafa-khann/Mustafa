import React, { useEffect, useRef } from 'react';

const GearModal = ({ isOpen, onClose, title = 'Recommended Gear', collections = [] }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);
  const [showDisclosure, setShowDisclosure] = React.useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement;
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 0);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      if (previouslyFocusedElementRef.current && previouslyFocusedElementRef.current.focus) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modalElement = modalRef.current;
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      const focusableSelectors = [
        'a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])',
        'button:not([disabled])', 'iframe', 'object', 'embed', '[tabindex]:not([tabindex="-1"])', '[contenteditable="true"]'
      ];
      const focusable = modalElement.querySelectorAll(focusableSelectors.join(','));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const isShift = e.shiftKey;
      const active = document.activeElement;
      if (!isShift && active === last) {
        e.preventDefault();
        first.focus();
      } else if (isShift && active === first) {
        e.preventDefault();
        last.focus();
      }
    };
    modalElement.addEventListener('keydown', handleTabKey);
    return () => modalElement.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-background-primary/95 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      ref={overlayRef}
      role="button"
      aria-label="Close gear modal"
      tabIndex={0}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') onClose?.();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-background-primary border border-border-standard shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gear-modal-title"
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-background-primary border-b border-border-subtle z-10">
          <h2 id="gear-modal-title" className="text-sm font-bold uppercase tracking-widest text-neutral-900">{title}</h2>
          <button
            className="bg-transparent text-text-muted border border-border-standard px-2 py-1 text-xs font-bold uppercase cursor-pointer transition-colors duration-200 hover:border-border-active hover:text-neutral-900"
            aria-label="Close gear modal"
            onClick={onClose}
            ref={closeBtnRef}
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 bg-background-surface border-b border-border-subtle text-text-muted text-xs italic leading-relaxed font-mono" role="note" aria-live="polite">
          <span>
            Disclosure: Some links may be affiliate links. If you purchase through them, I may earn a small commission at no extra cost to you.
          </span>
          <button
            type="button"
            className="ml-4 bg-transparent text-neutral-800 border border-border-standard px-2 py-1 text-[10px] font-bold uppercase cursor-pointer hover:border-border-active transition-colors"
            aria-expanded={showDisclosure}
            onClick={() => setShowDisclosure(v => !v)}
          >
            {showDisclosure ? 'Hide' : 'Details'}
          </button>
          {showDisclosure && (
            <div className="mt-2 not-italic">
              <p>
                I only recommend tools I genuinely use or believe will add value. Purchases made via these links help support my work at no additional cost to you.
                <a href="/disclosure" className="text-neutral-900 underline font-bold decoration-border-active">Learn more</a>.
              </p>
            </div>
          )}
        </div>

        <div className="p-6">
          {collections.map((collection) => (
            <div key={collection.id || collection.title} className="mb-12 last:mb-0">
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 border-b border-border-subtle pb-2">{collection.title}</h3>
                {collection.description ? <p className="text-text-muted text-sm italic mb-4 opacity-80">{collection.description}</p> : null}
              </div>
              <div className="flex flex-col gap-2">
                {collection.items?.map((item) => (
                  <a
                    key={item.id || item.title}
                    className="flex justify-between items-baseline py-3 no-underline text-neutral-800 border-b border-border-subtle gap-8 last:border-b-0 hover:bg-background-surface px-2 -mx-2 transition-colors duration-200 group"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg min-w-6 opacity-70 grayscale group-hover:grayscale-0 transition-all" aria-hidden>
                        {item.emoji || '🔧'}
                      </span>
                      <div>
                        <h4 className="font-bold tracking-tight text-sm group-hover:text-neutral-900">{item.title}</h4>
                        {item.note ? <span className="text-text-muted text-xs italic block mt-0.5">{item.note}</span> : null}
                      </div>
                    </div>
                    {item.price ? <div className="text-text-muted text-xs font-mono whitespace-nowrap">{item.price}</div> : null}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GearModal;
