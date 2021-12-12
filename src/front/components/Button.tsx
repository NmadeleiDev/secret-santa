import { useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy, BiCheck } from 'react-icons/bi';

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

interface CopyButtonProps {
  text: string;
}

const StyledSpan = styled.span`
  .icon {
    height: 30px;
    width: 30px;
    padding: 0.3rem;
    font-size: 1.6rem;
    border-radius: 5px;
    border: 1px solid transparent;
  }
  &:hover .icon {
    color: ${({ theme }) => theme.colors.secondary.dark};
    border: 1px solid ${({ theme }) => theme.colors.secondary.dark};
  }

  .success {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <StyledSpan>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        {copied ? (
          <BiCheck className="icon success" />
        ) : (
          <BiCopy className="icon" />
        )}
      </CopyToClipboard>
    </StyledSpan>
  );
};
