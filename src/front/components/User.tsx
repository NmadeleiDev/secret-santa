import React from 'react';
import styled from 'styled-components';
import { mainPageData } from 'data/strings';
import Image from 'next/image';
import Button from './Button';
import { IoIosClose } from 'react-icons/io';
import { IUser } from 'types/UserType';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setRecipient, userSelector } from 'store/feaures/user';
import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { removeUser } from 'store/feaures/room';
import toast from 'react-hot-toast';

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

    .cross {
      margin-left: 2rem;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    .tooltip {
      font-size: 0.8rem;
      font-weight: 400;
      display: none;
      position: absolute;
      font-size: 0.8rem;
      font-weight: 400;
      padding: 0.4rem 1rem;
      border-radius: 30px;
      border: none;
      color: ${({ theme }) => theme.colors.text.dark};
      background-color: ${({ theme }) => theme.colors.base.darkerBG};
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.base.shadow};
      z-index: 4;
      /* bottom: 0.2rem;
      left: 30px; */
      bottom: -5px;
      left: 60px;
    }

    &:hover {
      .tooltip {
        display: block;
      }
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

  const assignPairs = async () => {
    const pair = await makeGetRequest<IApiResponse<IUser>>(
      `user/${user.id}/recipient`,
    );
    if (!pair.status) {
      return;
    }

    const lock = await makeGetRequest<IApiResponse<string>>(
      `/room/${user?.id}/lock`,
    );

    if (lock?.data) {
      const pair = await makeGetRequest<IApiResponse<IUser>>(
        `user/${user.id}/recipient`,
      );
      if (pair.data) {
        dispatch(setRecipient(pair.data));
        toast.success(mainPageData.relockSuccess);
      }
    }
  };

  const deleteUser = async () => {
    const res = await makeGetRequest<IApiResponse<string>>(
      `/admin/${user.id}/delete/${id}`,
    );
    if (res.data) {
      dispatch(removeUser(id));
      assignPairs();
    }
  };
  return (
    <StyledDiv className={className}>
      {/*<Image*/}
      {/*  className="avatar"*/}
      {/*  src={url}*/}
      {/*  width={60}*/}
      {/*  height={60}*/}
      {/*  alt={`${name}'s' avatar`}*/}
      {/*/>*/}
      <div className="name">{name}</div>
      {enableDelete && id !== user.id ? (
        <Button onClick={deleteUser} variant="text" className="button">
          {/* <IoIosClose className="cross" /> */}
          <span className="cross">❌</span>
          <span className="tooltip">{mainPageData.removeUser}</span>
        </Button>
      ) : null}
    </StyledDiv>
  );
};

export default User;
