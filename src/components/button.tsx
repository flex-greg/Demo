import { styled } from "@linaria/react";
import { Button as AriaButton } from "react-aria-components";

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
`;
