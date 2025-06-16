// src/components/checkbox.tsx
import { styled } from "@linaria/react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
  Label,
  composeRenderProps,
} from "react-aria-components";
import { theme } from "../theme";

export interface CheckboxProps extends AriaCheckboxProps {
  label?: string;
}

const StyledCheckboxContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledAriaCheckbox = styled(AriaCheckbox)`
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.borderLight};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &[data-selected] {
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  &[data-focus-visible] {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  & .checkmark {
    width: 12px;
    height: 12px;
    stroke: ${theme.colors.textLight};
    stroke-width: 3px;
    display: none;
  }

  &[data-selected] .checkmark {
    display: block;
  }
`;

export const Checkbox = ({ label, ...props }: CheckboxProps) => (
  <StyledCheckboxContainer>
    <StyledAriaCheckbox {...props}>
      {composeRenderProps(props.children, (children) => (
        <>
          <svg viewBox="0 0 18 18" aria-hidden="true" className="checkmark">
            <polyline points="1 9 7 14 17 4" />
          </svg>
          {children}
        </>
      ))}
    </StyledAriaCheckbox>
    {label && <Label>{label}</Label>}
  </StyledCheckboxContainer>
);
