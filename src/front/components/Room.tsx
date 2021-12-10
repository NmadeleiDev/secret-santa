import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { mainPageData } from 'data/strings';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { roomSelector, setRoom } from 'store/feaures/room';
import { userSelector } from 'store/feaures/user';
import { useAppDispatch, useAppSelector } from 'store/store';
import styled from 'styled-components';
import Button from './Button';
import { CreateRoomForm } from './CreateRoomForm';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: var(--desktop-width);
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
      const users = await makeGetRequest<IApiResponse<string[]>>(
        `/room/${id}/users`,
      );
      if (room?.data && users?.data)
        dispatch(setRoom({ name: room.data, users: users.data }));
    };
    getRoomInfo(user.room_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.room_id === '') {
    return <CreateRoomForm />;
  }

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };

  return (
    <StyledDiv>
      <h2 className="h2">{mainPageData.room}</h2>
      <span className="info">
        {mainPageData.usersQuantity} {room.users?.length}
      </span>
      <Button onClick={handleBack} variant="text">
        {mainPageData.back}
      </Button>
    </StyledDiv>
  );
};

export default Room;
