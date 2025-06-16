// src/components/textfield.tsx
import { styled } from "@linaria/react";
import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  FieldError,
  Label,
  Text,
} from "react-aria-components";
import { theme } from "../theme";

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export const StyledTextField = styled(AriaTextField)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 1rem; // Add some default spacing
`;

export const StyledLabel = styled(Label)`
  font-size: 0.875rem;
  color: ${theme.colors.textDark};
  font-weight: 500;
`;

export const StyledInput = styled(AriaInput)<AriaInputProps>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: 4px;
  font-size: 1rem;
  color: ${theme.colors.textDark};
  background-color: ${theme.colors.backgroundWhite};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}40; // a light blue glow
  }

  &[data-invalid] {
    border-color: ${theme.colors.error};
    &:focus {
      box-shadow: 0 0 0 2px ${theme.colors.error}40;
    }
  }
`;

const StyledDescription = styled(Text)`
  font-size: 0.75rem;
  color: ${theme.colors.secondary};
`;

const StyledFieldError = styled(FieldError)`
  font-size: 0.75rem;
  color: ${theme.colors.error};
`;

export const TextField = ({ label, description, errorMessage, ...props }: TextFieldProps) => {
  return (
    <StyledTextField {...props}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput />
      {description && !errorMessage && (
        <StyledDescription slot="description">{description}</StyledDescription>
      )}
      {errorMessage && <StyledFieldError>{errorMessage}</StyledFieldError>}
    </StyledTextField>
  );
};
