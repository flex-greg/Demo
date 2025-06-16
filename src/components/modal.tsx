// src/components/modal.tsx
import { css, styled } from "@linaria/react";
import {
  type DialogProps as AriaDialogProps,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type ModalOverlayProps as AriaModalOverlayProps,
  Dialog,
  Heading,
} from "react-aria-components";
import { theme } from "../theme";
import { Button } from "./button"; // Assuming Button is already created and themed

export interface ModalProps extends Omit<AriaModalOverlayProps, "children"> {
  title?: string;
  children: React.ReactNode;
  dialogProps?: AriaDialogProps;
}

const overlayAnimation = css`
  &[data-entering] {
    animation: fadeIn 0.3s ease-out;
  }

  &[data-exiting] {
    animation: fadeOut 0.2s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const StyledModalOverlay = styled(AriaModalOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensure it's on top
  ${overlayAnimation}
`;

const dialogAnimation = css`
  &[data-entering] {
    animation: zoomIn 0.3s ease-out;
  }

  &[data-exiting] {
    animation: zoomOut 0.2s ease-in;
  }

  @keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes zoomOut {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.9); opacity: 0; }
  }
`;

const StyledDialog = styled(Dialog)`
  background: ${theme.colors.backgroundWhite};
  color: ${theme.colors.textDark};
  padding: 1.5rem; // 24px
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 90vw; // Responsive width
  outline: none; // React Aria handles focus
  ${dialogAnimation}
`;

const ModalHeader = styled(Heading)`
  font-size: 1.25rem; // 20px
  font-weight: 600;
  margin: 0 0 0.5rem 0; // Margin bottom for separation
  color: ${theme.colors.textDark};
`;

const ModalContent = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Modal = ({ title, children, dialogProps, ...overlayProps }: ModalProps) => {
  return (
    <StyledModalOverlay {...overlayProps}>
      <StyledDialog {...dialogProps}>
        {title && <ModalHeader slot="title">{title}</ModalHeader>}
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          {/* Example: Add a close button, users can customize footer via children too */}
          <Button onPress={() => overlayProps.onOpenChange?.(false)} variant="secondary">
            Close
          </Button>
        </ModalFooter>
      </StyledDialog>
    </StyledModalOverlay>
  );
};
