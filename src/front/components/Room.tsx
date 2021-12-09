import { api, IApiResponse } from 'axiosConfig';
import { mainPageData } from 'data/strings';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/store';
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
  const user = useAppSelector((state) => state.user);
  if (user.room_id == -1) {
    return <CreateRoomForm />;
  }
  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };
  return (
    <StyledDiv>
      <h2 className="h2">{mainPageData.room}</h2>
      <Button onClick={handleBack} variant="text">
        {mainPageData.back}
      </Button>
    </StyledDiv>
  );
};

export default Room;
