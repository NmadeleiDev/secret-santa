import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Button from './Button';
import { IoIosClose } from 'react-icons/io';
import { mainPageData } from 'data/strings';
import { useAppDispatch, useAppSelector } from 'store/store';
import { userSelector } from 'store/feaures/user';
import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { removeUser, roomSelector } from 'store/feaures/room';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  position: relative;
  min-width: 300px;

  .avatar {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }

  .name {
    margin-left: 1rem;
    font-size: 2rem;
    font-weight: 700;
  }

  .button {
    margin-left: auto;
    padding: 0;
    transform: scale(100%);
    &:hover {
      box-shadow: none;
      transform: scale(110%);
    }
  }
  .cross {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  .tooltip {
    font-size: 0.8rem;
    font-weight: 400;
    display: none;
    position: absolute;
    padding: 0.3rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.base.BG};
    z-index: 2;
    bottom: 0;
    right: -100px;
  }

  &:hover {
    .tooltip {
      display: block;
    }
  }
  @media (max-width: var(--tablet-width)) {
    width: calc(50% - 2rem);
  }
`;

interface Props {
  id: string;
  name: string;
  enableDelete: boolean;
  className?: string;
}

const User = ({ name, id, enableDelete, className }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const url = `http://www.tinygraphs.com/spaceinvaders/${name}?size=100&theme=sugarsweets&numcolors=4`;
  const deleteUser = async () => {
    const res = await makeGetRequest<IApiResponse<string>>(
      `/admin/${user.id}/delete/${id}`,
    );
    console.log({ res });
    if (res.data) {
      dispatch(removeUser(id));
    }
  };
  return (
    <StyledDiv className={className}>
      <Image
        className="avatar"
        src={url}
        width={60}
        height={60}
        alt={`${name}'s' avatar`}
      />
      <div className="name">{name}</div>
      {enableDelete && id !== user.id ? (
        <Button onClick={deleteUser} variant="text" className="button">
          <IoIosClose className="cross" />
          <span className="tooltip">{mainPageData.removeUser}</span>
        </Button>
      ) : null}
    </StyledDiv>
  );
};

export default User;
