import React, { useEffect, useRef } from 'react';
import '../../styles/GearModal.css';

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
      // Defer focus to ensure elements exist
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
      // Restore focus to the element that had it before opening
      if (previouslyFocusedElementRef.current && previouslyFocusedElementRef.current.focus) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Basic focus trap within the modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modalElement = modalRef.current;
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      const focusableSelectors = [
        'a[href]','area[href]','input:not([disabled])','select:not([disabled])','textarea:not([disabled])',
        'button:not([disabled])','iframe','object','embed','[tabindex]:not([tabindex="-1"])','[contenteditable="true"]'
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
      className="gear-modal-overlay"
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
        className="gear-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gear-modal-title"
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="gear-modal-header">
          <h2 id="gear-modal-title">{title}</h2>
          <button
            className="gear-close-btn"
            aria-label="Close gear modal"
            onClick={onClose}
            ref={closeBtnRef}
          >
            ✕
          </button>
        </div>

        <div className="gear-disclosure" role="note" aria-live="polite">
          <span>
            Disclosure: Some links may be affiliate links. If you purchase through them, I may earn a small commission at no extra cost to you.
          </span>
          <button
            type="button"
            className="gear-disclosure-toggle"
            aria-expanded={showDisclosure}
            onClick={() => setShowDisclosure(v => !v)}
          >
            {showDisclosure ? 'Hide' : 'Details'}
          </button>
          {showDisclosure && (
            <div className="gear-disclosure-more">
              <p>
                I only recommend tools I genuinely use or believe will add value. Purchases made via these links help support my work at no additional cost to you. 
                <a href="/disclosure" className="gear-disclosure-link">Learn more</a>.
              </p>
            </div>
          )}
        </div>

        <div className="gear-modal-content">
          {collections.map((collection) => (
            <div key={collection.id || collection.title} className="gear-collection">
              <div className="gear-collection-header">
                <h3>{collection.title}</h3>
                {collection.description ? <p className="gear-collection-desc">{collection.description}</p> : null}
              </div>
              <div className="gear-grid">
                {collection.items?.map((item) => (
                  <a
                    key={item.id || item.title}
                    className="gear-card"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                  >
                    <div className="gear-card-top">
                      <div className="gear-card-icon" aria-hidden>
                        {item.emoji || '🔧'}
                      </div>
                      <div className="gear-card-title">
                        <h4>{item.title}</h4>
                        {item.note ? <span className="gear-card-note">{item.note}</span> : null}
                      </div>
                    </div>
                    {item.price ? <div className="gear-price">{item.price}</div> : null}
                    <div className="gear-cta">View on Amazon →</div>
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


