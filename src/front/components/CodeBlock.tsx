import React, { FC } from 'react';
import { CopyButton } from './Button';
import styled from 'styled-components';

const StyledDiv = styled.span<{ main?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-weight: 600;
  color: ${({ theme, main }) =>
    main ? theme.colors.white : theme.colors.text.dark};
  background-color: ${({ theme, main }) =>
    main ? theme.colors.secondary.dark : theme.colors.secondary.light};
  border: 1px solid
    ${({ theme, main }) =>
      main ? theme.colors.white : theme.colors.secondary.dark};
  border-radius: 5px;

  a {
    color: ${({ theme, main }) =>
      main ? theme.colors.white : theme.colors.text.dark};
  }
`;

interface Props {
  className?: string;
  text: string;
  main?: boolean;
}

const CodeBlock: FC<Props> = ({ className, main, text, children }) => {
  return (
    <StyledDiv className={className} main={main}>
      {children || text}
      <CopyButton main={main} text={text || ''} />
    </StyledDiv>
  );
};

export default CodeBlock;
