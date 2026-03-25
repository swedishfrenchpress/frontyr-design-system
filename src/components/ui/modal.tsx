import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Component: Modal
 * Blurred dimmed overlay with a centered modal panel.
 * Reuse this for all popups/modals for consistency.
 */

interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Called when the overlay is clicked */
  onClose: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Modal panel width (default "520px") */
  width?: string;
  /** Extra classes on the modal panel */
  className?: string;
}

const Modal = ({ open, onClose, children, width = "520px", className }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "relative max-h-[90vh] overflow-y-auto",
          "bg-[var(--background-primary)] rounded-[var(--radius-lg)] shadow-[var(--shadows-modal)]",
          className
        )}
        style={{ width }}
      >
        {children}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";

export { Modal };
export type { ModalProps };
