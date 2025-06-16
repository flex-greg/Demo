// src/components/card.tsx
import { styled } from "@linaria/react";
import type React from "react";
import { theme } from "../theme";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const StyledCard = styled.div`
  background-color: ${theme.colors.backgroundWhite};
  color: ${theme.colors.textDark};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem; // 24px
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Optional: Define styled sub-components for structure if desired
export const CardHeader = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.borderLight};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CardBody = styled.div`
  // Styles for card body if needed, otherwise children are placed directly
`;

export const CardFooter = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${theme.colors.borderLight};
  display: flex;
  justify-content: flex-end; // Example: align buttons to the right
  gap: 0.5rem;
`;

export const Card = ({ children, ...props }: CardProps) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};
