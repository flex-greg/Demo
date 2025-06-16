import { styled } from "@linaria/react";
import { TextField, Label, Input, Text } from "react-aria-components";

interface TextInputProps {
  type: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  label?: string;
  description?: string;
}

export const TextInput = ({ type, label, description }: TextInputProps) => {
  return (
    <StyledTextField {...{ type }}>
      {label && <Label>{label}</Label>}
      <StyledInput />
      {description && <Text slot="description">{description}</Text>}
    </StyledTextField>
  );
};

const StyledTextField = styled(TextField)`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
`;
