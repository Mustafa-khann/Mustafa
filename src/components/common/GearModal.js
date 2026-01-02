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
      className="fixed inset-0 bg-black/30 flex items-center justify-center p-8 z-50"
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
        className="w-full max-w-lab max-h-[90vh] overflow-auto bg-lab-bg border border-lab-border"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gear-modal-title"
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="sticky top-0 flex items-center justify-between px-8 py-4 bg-lab-bg border-b border-lab-border z-10">
          <h2 id="gear-modal-title" className="text-sm font-bold uppercase tracking-widest">{title}</h2>
          <button
            className="bg-transparent text-lab-muted border border-lab-border px-2 py-1 text-xs font-bold uppercase cursor-pointer transition-colors duration-150 hover:border-lab-muted hover:text-lab-text"
            aria-label="Close gear modal"
            onClick={onClose}
            ref={closeBtnRef}
          >
            ✕
          </button>
        </div>

        <div className="px-8 py-4 bg-lab-bg-alt border-b border-lab-border text-lab-muted text-xs italic leading-relaxed" role="note" aria-live="polite">
          <span>
            Disclosure: Some links may be affiliate links. If you purchase through them, I may earn a small commission at no extra cost to you.
          </span>
          <button
            type="button"
            className="ml-4 bg-transparent text-lab-text border border-lab-border px-2 py-1 text-[10px] font-bold uppercase cursor-pointer hover:border-lab-muted"
            aria-expanded={showDisclosure}
            onClick={() => setShowDisclosure(v => !v)}
          >
            {showDisclosure ? 'Hide' : 'Details'}
          </button>
          {showDisclosure && (
            <div className="mt-2 not-italic">
              <p>
                I only recommend tools I genuinely use or believe will add value. Purchases made via these links help support my work at no additional cost to you.
                <a href="/disclosure" className="text-lab-text underline font-bold">Learn more</a>.
              </p>
            </div>
          )}
        </div>

        <div className="p-8">
          {collections.map((collection) => (
            <div key={collection.id || collection.title} className="mb-16 last:mb-0">
              <div className="mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-lab-muted mb-4 border-b border-lab-border pb-1">{collection.title}</h3>
                {collection.description ? <p className="text-lab-muted text-sm italic mb-4 opacity-80">{collection.description}</p> : null}
              </div>
              <div className="flex flex-col">
                {collection.items?.map((item) => (
                  <a
                    key={item.id || item.title}
                    className="flex justify-between items-baseline py-4 no-underline text-lab-text border-b border-lab-border gap-8 last:border-b-0 group"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl min-w-6 opacity-70" aria-hidden>
                        {item.emoji || '🔧'}
                      </span>
                      <div>
                        <h4 className="font-bold tracking-tight underline underline-offset-4 group-hover:text-black">{item.title}</h4>
                        {item.note ? <span className="text-lab-muted text-xs italic">{item.note}</span> : null}
                      </div>
                    </div>
                    {item.price ? <div className="text-lab-muted text-xs italic whitespace-nowrap">{item.price}</div> : null}
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
