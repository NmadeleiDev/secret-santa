import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { mainPageData } from 'data/strings';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { setError, setSuccess } from 'store/feaures/error';
import { roomSelector, setRoom } from 'store/feaures/room';
import { userSelector } from 'store/feaures/user';
import { useAppDispatch, useAppSelector } from 'store/store';
import styled from 'styled-components';
import { getRoomLink } from 'utils';
import Button from './Button';
import CodeBlock from './CodeBlock';
import { CreateRoomForm } from './CreateRoomForm';
import User from './User';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: var(--desktop-width);

  .h2 {
    font-size: 2.5rem;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .users {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }
  .buttons {
    display: flex;
  }
`;

const Room = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const room = useAppSelector(roomSelector);

  useEffect(() => {
    if (user.room_id === '') return;

    const getRoomInfo = async (id: string) => {
      const room = await makeGetRequest<IApiResponse<string>>(
        `/room/${id}/name`,
      );
      const users = await makeGetRequest<
        IApiResponse<{ name: string; id: string }[]>
      >(`/room/${id}/users`);
      const isAdmin = await makeGetRequest<IApiResponse<boolean>>(
        `/room/${id}/isadmin/${user.id}`,
      );
      console.log({ room, users, isAdmin });

      if (room?.data && users?.data) {
        dispatch(setRoom({ name: room.data, users: users.data }));
      } else {
        dispatch(setError(mainPageData.genericError));
        setTimeout(() => dispatch(setError('')), 3000);
      }
    };

    getRoomInfo(user.room_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.room_id === '') {
    return <CreateRoomForm />;
  }

  const lockRoom = async () => {
    const lock = await makeGetRequest<IApiResponse<string>>(
      `/room/${user.room_id}/lock`,
    );
    console.log({ lock });
    if (lock?.data) {
      dispatch(setSuccess('Ура! Пары назначены!'));
    } else {
      dispatch(setError(mainPageData.genericError));
      setTimeout(() => dispatch(setError('')), 3000);
    }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };

  return (
    <StyledDiv>
      <h2 className="h2">
        {mainPageData.room}
        {room.name}
      </h2>
      <span className="info">
        {mainPageData.usersQuantity} {room.users?.length}
        {room?.admin_id === user.id && (
          <div className="invie">
            Ссылка для приглашения в комнату:
            <CodeBlock text={getRoomLink(user.room_id)} />
          </div>
        )}
      </span>
      <div className="users">
        {room?.users &&
          room.users.map((el, i) => <User name={el.name} key={i} />)}
      </div>
      <div className="buttons">
        {room?.admin_id === user.id && (
          <Button onClick={lockRoom} variant="primary">
            {mainPageData.back}
          </Button>
        )}
        <Button onClick={handleBack} variant="text">
          {mainPageData.back}
        </Button>
      </div>
    </StyledDiv>
  );
};

export default Room;
