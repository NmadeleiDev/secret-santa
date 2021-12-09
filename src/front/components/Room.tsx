import { api, IApiResponse } from 'axiosConfig';
import { mainPageData } from 'data/strings';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/store';
import styled from 'styled-components';
import { CreateRoomForm } from './CreateRoomForm';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: var(--desktop-width);
`;

const Room = () => {
  const user = useAppSelector((state) => state.user);
  if (user.room_id == -1) {
    return <CreateRoomForm />;
  }
  return (
    <StyledDiv>
      <h2 className="h2">{mainPageData.room}</h2>
    </StyledDiv>
  );
};

export default Room;
