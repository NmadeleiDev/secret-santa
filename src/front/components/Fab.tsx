import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  icon?: JSX.Element;
  className?: string;
}

const StyledButton = styled.button<ButtonProps>`
  font-size: 1.5rem;
  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 50%;
  color: ${({ theme, variant = 'text' }) =>
    variant === 'text' ? theme.colors.black : theme.colors.white};
  background-color: ${({ theme, variant = 'text' }) =>
    variant === 'primary'
      ? theme.colors.primary.main
      : variant === 'secondary'
      ? theme.colors.secondary
      : theme.colors.base.darkerBG};

  &:hover {
    box-shadow: 0 5px 15px ${({ theme }) => theme.colors.base.shadow};
  }
`;

interface Props {}

export const Fab: React.FC<ButtonProps> = ({
  icon,
  children,
  className,
  variant,
}) => {
  return (
    <StyledButton variant={variant} className={className}>
      {icon}
      {children}
    </StyledButton>
  );
};
