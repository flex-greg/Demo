import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "The visual style variant of the button",
    },
    rounded: {
      control: "boolean",
      description: "Whether the button should have rounded corners",
    },
    children: {
      control: "text",
      description: "The button content",
    },
    onClick: {
      action: "clicked",
      description: "Function called when button is clicked",
    },
  },
  args: {
    onClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Rounded: Story = {
  args: {
    variant: "primary",
    rounded: true,
    children: "Rounded Button",
  },
};

export const SecondaryRounded: Story = {
  args: {
    variant: "secondary",
    rounded: true,
    children: "Secondary Rounded",
  },
};

export const LongText: Story = {
  args: {
    variant: "primary",
    children: "Button with longer text content",
  },
};

export const Submit: Story = {
  args: {
    variant: "primary",
    children: "Submit Form",
  },
};

export const Reset: Story = {
  args: {
    variant: "secondary",
    children: "Reset Form",
  },
};
