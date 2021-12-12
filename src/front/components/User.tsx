import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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
    /* background-color: ${({ theme }) => theme.colors.accent.green}; */
  }

  .name {
    margin-left: 1rem;
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
  const url = `http://www.tinygraphs.com/spaceinvaders/${name}?size=100&theme=sugarsweets&numcolors=4`;
  return (
    <StyledDiv className={className}>
      <Image
        className="avatar"
        src={url}
        width={70}
        height={70}
        alt={`${name}'s' avatar`}
      />
      {/* <div className="avatar"></div> */}
      <div className="name">{name}</div>
    </StyledDiv>
  );
};

export default User;
