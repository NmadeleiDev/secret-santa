import { api, IApiResponse } from 'axiosConfig';
import { mainPageData } from 'data/strings';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/store';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: var(--desktop-width);
`;

const Room = () => {
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    const checkRoom = async () => {
      if (user.room_id === -1) {
        const { data } = await api.get<IApiResponse<string>>(
          `/room/${user.room_id}/name`,
        );
        console.log({ data });

        // const body = {
        //     name: user.name + '_table',
        //     admin_id: user.id
        //   };
        // const { data } = await api.get<IApiResponse<string>>('/room', body);
      }
    };
    checkRoom();
  }, []);

  if (user.room_id == -1) {
    // return <CreateRoomForm />
    return null;
  }
  return (
    <StyledDiv>
      <h2 className="h2">{mainPageData.room}</h2>
    </StyledDiv>
  );
};

export default Room;
