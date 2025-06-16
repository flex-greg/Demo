import { styled } from "@linaria/react";
import { Button as AriaButton } from "react-aria-components";

interface ClickableParent {
  children: React.ReactNode;
  onClick: () => void;
}

interface ButtonProps extends ClickableParent {
  variant?: "primary" | "secondary";
  rounded?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = styled(AriaButton)<ButtonProps>`
  background-color: ${({ variant }) =>
    variant === "primary" ? "red" : "blue"};
  border-radius: ${({ rounded }) => (rounded ? "9999px" : "0")};
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;
