import { useEffect, useId, useRef, type ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Optional line under the title. */
  subtitle?: string;
  children: ReactNode;
}

/**
 * A modal dialog on the native <dialog> element: focus stays inside, Escape closes it, and
 * focus returns to whatever opened it.
 */
export function Dialog({ open, onClose, title, subtitle, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="dialog on-rest"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {open && (
        <div className="dialog__inner">
          <div className="dialog__top">
            <div>
              <h2 id={titleId} className="t-head">{title}</h2>
              {subtitle && <p className="t-lead muted" style={{ marginTop: '0.75rem' }}>{subtitle}</p>}
            </div>
            <button type="button" className="dialog__close" onClick={onClose}>Close</button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
