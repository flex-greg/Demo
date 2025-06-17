import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../components/modal"; // Adjust path as necessary
import { useState } from "react";
import { Button } from "../components/button"; // Assuming Button component exists for interaction

// Helper component to manage modal state for stories
const ModalWithState: React.FC<Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onClose'> & { initialOpen?: boolean }> = ({ initialOpen = false, ...args }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...args} />
    </>
  );
};

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered", // Center the button that opens the modal
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls the visibility of the modal. Note: In these stories, use the 'Open Modal' button.",
      table: {
        disable: true, // Disable direct control as it's managed by ModalWithState
      }
    },
    onClose: {
      action: "closed",
      description: "Callback function when the modal is requested to close (e.g., by close button, overlay click, or Esc key).",
      table: {
        disable: true, // Disable direct control as it's managed by ModalWithState
      }
    },
    showCloseIcon: {
      control: "boolean",
      description: "Whether to display the close icon in the top right corner.",
      defaultValue: true,
    },
    maxWidth: {
      control: "text",
      description: "Overrides the default max-width of the modal content area on larger screens (e.g., '600px', '70%').",
    },
    title: {
      control: "text",
      description: "Optional title displayed at the top of the modal."
    },
    children: {
      control: "text",
      description: "Content to be displayed inside the modal.",
    },
  },
  // We use ModalWithState for most stories to handle open/close state
  // so 'args' here are more for the 'ModalWithState' or default props for Modal if used directly.
  args: {
    // Default args for props of Modal, not ModalWithState
    showCloseIcon: true,
    title: "Default Modal Title",
    children: "This is the default modal content. You can customize it via controls.",
    // onClose will be handled by ModalWithState
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story using ModalWithState for interactive open/close
export const Default: Story = {
  render: (args) => <ModalWithState {...args} initialOpen={false} />,
  args: {
    title: "My Awesome Modal",
    children: (
      <>
        <p>This is some content inside the modal.</p>
        <p>It can be any valid React node, like text, or other components.</p>
        <Button variant="primary" onClick={() => alert("Button inside modal clicked!")}>Click Me Inside</Button>
      </>
    ),
  },
};

export const InitiallyOpen: Story = {
  render: (args) => <ModalWithState {...args} initialOpen={true} />,
  args: {
    ...Default.args,
    title: "Initially Open Modal",
    children: "This modal was open when the story loaded.",
  },
};

export const WithoutCloseIcon: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    showCloseIcon: false,
    title: "Modal Without Close Icon",
    children: "You can close this modal by clicking the overlay or pressing the Escape key.",
  },
};

export const CustomMaxWidth: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    title: "Custom Width Modal",
    maxWidth: "500px",
    children: "This modal has a maximum width of 500px.",
  },
};

export const CustomMaxWidthPercentage: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    title: "Custom Width Modal (Percentage)",
    maxWidth: "50%",
    children: "This modal has a maximum width of 50% of the viewport (on larger screens).",
  },
};

export const LongContent: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    title: "Modal with Long Content",
    children: (
      <>
        <p>This modal contains a lot of content to demonstrate the scrolling behavior.</p>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Line {i + 1}</p>
        ))}
      </>
    ),
  },
};

export const NoTitle: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    // Intentionally not spreading Default.args to override title specifically
    children: "This modal does not have a title. The close button will be aligned to the top right of the content area.",
    showCloseIcon: true,
    // title: undefined, // Ensure title is not set
  },
};
