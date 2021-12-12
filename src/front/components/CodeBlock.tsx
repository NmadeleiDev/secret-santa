import React, { FC } from 'react';
import { CopyButton } from './Button';
import styled from 'styled-components';

const StyledDiv = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.dark};
  background-color: ${({ theme }) => theme.colors.secondary.light};
  border: 1px solid ${({ theme }) => theme.colors.secondary.dark};
  border-radius: 5px;

  a {
    color: ${({ theme }) => theme.colors.text.dark};
  }
`;

interface Props {
  className?: string;
  text: string;
}

const CodeBlock: FC<Props> = ({ className, text, children }) => {
  return (
    <StyledDiv className={className}>
      {children || text}
      <CopyButton text={text || ''} />
    </StyledDiv>
  );
};

export default CodeBlock;
