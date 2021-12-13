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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: ${({ theme, variant, disabled }) =>
    variant === 'outline' || disabled
      ? `1px solid ${theme.colors.base.line}`
      : 'none'};
  color: ${({ theme, variant = 'text', disabled }) =>
    disabled
      ? theme.colors.text.gray
      : variant === 'text' || variant === 'outline'
      ? theme.colors.black
      : theme.colors.white};
  background-color: ${({ theme, variant = 'text', disabled }) =>
    disabled
      ? theme.colors.base.darkerBG
      : variant === 'primary'
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
  main?: boolean;
}

const StyledSpan = styled.span<{ main?: boolean }>`
  .icon {
    height: 30px;
    width: 30px;
    padding: 0.3rem;
    font-size: 1.6rem;
    border-radius: 5px;
    border: 1px solid transparent;
  }
  &:hover .icon {
    color: ${({ theme, main }) =>
      main ? theme.colors.white : theme.colors.secondary.dark};
    border: 1px solid
      ${({ theme, main }) =>
        main ? theme.colors.white : theme.colors.secondary.dark};
  }

  .success {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

export const CopyButton = ({ text, main }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <StyledSpan main={main}>
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
