import { styled } from "@linaria/react";
import React, { useEffect } from "react";

// Define an icon for the close button (simple X for now)
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  maxWidth?: string; // e.g., "500px", "60%"
  title?: string; // Optional title for the modal
}

const Overlay = styled.div`
  data-testid: modal-overlay; // Added for testing
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensure it's on top
`;

const ModalContent = styled.div<{ maxWidth?: string }>`
  data-testid: modal-content; // Added for testing
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; // For positioning the close button

  // Mobile first: takes full screen
  width: 100%;
  height: 100%;
  max-width: ${({ maxWidth }) => maxWidth || "90%"}; // Apply directly for testability

  // Larger screens
  @media (min-width: 640px) { // sm breakpoint or similar
    width: auto;
    height: auto;
    min-width: 300px; // Minimum width for content visibility
    // max-width is now outside
    max-height: 90%;
    overflow-y: auto; // Add scroll for content longer than max-height
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  line-height: 1;

  &:hover {
    opacity: 0.7;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const ModalBody = styled.div`
  // Styles for the main content area of the modal
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  showCloseIcon = true, // Default to true as per common UX
  maxWidth,
  title,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // Prevent background click by stopping propagation on the modal content itself
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Overlay onClick={onClose} data-testid="modal-overlay">
      <ModalContent onClick={handleContentClick} maxWidth={maxWidth} data-testid="modal-content">
        {(title || showCloseIcon) && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            {showCloseIcon && (
              <CloseButton onClick={onClose} aria-label="Close modal">
                <CloseIcon />
              </CloseButton>
            )}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Overlay>
  );
};
