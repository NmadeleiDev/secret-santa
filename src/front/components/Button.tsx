import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
}

const Button = styled.button<ButtonProps>`
  padding: 1rem 2rem;
  margin: 1rem;
  border: none;
  font-size: 1.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: ${({ theme, variant }) =>
    variant === 'outline' ? `1px solid ${theme.colors.base.line}` : 'none'};
  color: ${({ theme, variant = 'text' }) =>
    variant === 'text' || variant === 'outline'
      ? theme.colors.black
      : theme.colors.white};
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

export default Button;
