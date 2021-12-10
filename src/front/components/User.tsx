import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;

  .avatar {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    background-color: ${({ theme }) => theme.colors.accent.green};
  }

  .name {
    font-size: 2rem;
    font-weight: 700;
  }

  @media (max-width: var(--tablet-width)) {
    width: calc(50% - 2rem);
  }
`;

interface Props {
  name: string;
  className?: string;
}

const User = ({ name, className }: Props) => {
  return (
    <StyledDiv className={className}>
      <div className="avatar"></div>
      <div className="name">{name}</div>
    </StyledDiv>
  );
};

export default User;
