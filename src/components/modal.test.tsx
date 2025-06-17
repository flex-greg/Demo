import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from 'vitest';
import "@testing-library/jest-dom";
import { Modal } from "./modal"; // Adjust path as necessary
import React, { useState } from "react";

// Helper component to manage modal state for testing
const ModalTestWrapper: React.FC<Partial<React.ComponentProps<typeof Modal>>> = ({
  initialOpen = false,
  onClose: onCloseProp,
  children,
  ...modalProps
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const handleClose = () => {
    setIsOpen(false);
    onCloseProp?.();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
        {children || <p>Test Content</p>}
      </Modal>
    </>
  );
};

describe("Modal Component", () => {
  test("does not render when isOpen is false", () => {
    render(<ModalTestWrapper initialOpen={false} />);
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  test("renders when isOpen is true", () => {
    render(<ModalTestWrapper initialOpen={true} />);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const handleCloseMock = vi.fn();
    render(
      <ModalTestWrapper
        initialOpen={true}
        onClose={handleCloseMock}
        showCloseIcon={true}
      />
    );
    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when overlay is clicked", () => {
    const handleCloseMock = vi.fn();
    render(
      <ModalTestWrapper
        initialOpen={true}
        onClose={handleCloseMock}
      />
    );
    // The overlay is the parent of the modal content.
    // We need to be careful to click the overlay itself, not content within it.
    // The Overlay has a 'role' or 'data-testid' for easier selection.
    // For now, let's assume the overlay is the first div element with specific styling,
    // or we can click outside the modal content.
    // The current Modal implementation has Overlay -> ModalContent -> ModalHeader/ModalBody
    // Overlay has onClick={onClose}. ModalContent has onClick={e.stopPropagation()}

    // Click the overlay (the element with background color rgba(0, 0, 0, 0.5))
    // This is a bit fragile. A data-testid on Overlay would be better.
    // For now, we get the content and click its parent (the overlay).
    // const modalContent = screen.getByText("Test Content");
    // fireEvent.click(modalContent.parentElement!.parentElement!); // ModalContent -> Overlay
    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.click(overlay);

    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  test("does not call onClose when content is clicked", () => {
    const handleCloseMock = vi.fn();
    render(
      <ModalTestWrapper
        initialOpen={true}
        onClose={handleCloseMock}
      />
    );
    const modalContent = screen.getByText("Test Content");
    fireEvent.click(modalContent); // Click directly on the content (or a child of ModalContent)
    expect(handleCloseMock).not.toHaveBeenCalled();
  });

  test("calls onClose when Escape key is pressed", async () => {
    const handleCloseMock = vi.fn();
    render(
      <ModalTestWrapper
        initialOpen={true}
        onClose={handleCloseMock}
      />
    );
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    await waitFor(() => { // useEffect updates might be async
        expect(handleCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  test("renders title when provided", () => {
    const testTitle = "My Test Modal";
    render(<ModalTestWrapper initialOpen={true} title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  test("does not show close button if showCloseIcon is false", () => {
    render(
      <ModalTestWrapper
        initialOpen={true}
        showCloseIcon={false}
      />
    );
    expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
  });

  test("shows close button by default", () => {
    render(<ModalTestWrapper initialOpen={true} />);
    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
  });

  test("applies maxWidth style when provided", () => {
    render(<ModalTestWrapper initialOpen={true} maxWidth="300px" />);
    const modalContentElement = screen.getByTestId("modal-content");
    // Debugging: Log style attribute and computed styles
    // console.log("Element style attribute for modal-content:", modalContentElement.getAttribute('style'));
    // const computedStyle = window.getComputedStyle(modalContentElement);
    // console.log("Computed max-width for modal-content:", computedStyle.maxWidth);
    // expect(modalContentElement).toHaveStyle("max-width: 300px");
    // Check if a CSS variable is set to 300px due to Linaria's behavior
    expect(modalContentElement.getAttribute('style')).toMatch(/--[a-zA-Z0-9_-]+:\s*300px;/);
  });
});

// Add a placeholder test to ensure the file is picked up by the test runner.
// If no tests are found, some runners exit with an error.
// describe('Placeholder', () => {
//   test('true to be true', () => {
//     expect(true).toBe(true);
//   });
// });
