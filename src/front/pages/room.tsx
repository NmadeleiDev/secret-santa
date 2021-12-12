import { IApiResponse, makeGetRequest } from 'axiosConfig';
import Button from 'components/Button';
import CodeBlock from 'components/CodeBlock';
import Room from 'components/Room';
import User from 'components/User';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { setError, setSuccess } from 'store/feaures/error';
import { IRoomSlice, roomSelector } from 'store/feaures/room';
import { IUserSlice, userSelector } from 'store/feaures/user';
import { useAppDispatch, useAppSelector } from 'store/store';
import styled from 'styled-components';
import { IRoom } from 'types/RoomType';
import { IUser } from 'types/UserType';
import { getRoomLink } from 'utils';

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

interface Props {
  room: IRoom | null;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { roomid, userid } = query;
  let room: IRoomSlice | null = null;
  let user: IUserSlice | null = null;
  if (roomid) {
    const roomData = await makeGetRequest<IApiResponse<string>>(
      `room/${roomid}/name`,
    );
    if (roomData?.data) {
      const users = await makeGetRequest<
        IApiResponse<{ name: string; id: string }[]>
      >(`room/${roomid}/users`);
      console.log({ users: users.data });

      room = {
        name: roomData.data,
        users: users.data || [],
        id: String(roomid),
        admin_id: '',
      };
    }
  }
  if (userid) {
    const userData = await makeGetRequest<IApiResponse<IUser>>(
      `user/${userid}/info`,
    );
    const isAdminData = await makeGetRequest<IApiResponse<boolean>>(
      `room/${roomid}/isadmin/${userid}`,
    );
    // console.log({ userData, isAdminData });

    if (
      userData.data?.name &&
      userData.data?.room_id &&
      userData.data?.likes &&
      userData.data?.dislikes
    ) {
      user = {
        id: String(userid),
        ...userData.data,
        isAdmin: isAdminData.data || false,
      };
    }
  }
  console.log({ user, room });
  return { props: { room, user } };
};

const RoomPage = ({
  room: roomData,
  user: userData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  // const user = useAppSelector(userSelector);
  // const room = useAppSelector(roomSelector);
  const reduxUser = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const room = roomData ? (roomData as IRoomSlice) : null;
  const user = reduxUser ? reduxUser : (userData as IUserSlice | null);

  const lockRoom = async () => {
    const lock = await makeGetRequest<IApiResponse<string>>(
      `/room/${user?.room_id}/lock`,
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

  if (!room) {
    return (
      <>
        <Head>
          <title>{mainPageData.roomTitle}</title>
        </Head>
        <MainWrapper>
          <StyledDiv>
            <h2 className="h2">{mainPageData.room}не найдена</h2>
          </StyledDiv>
        </MainWrapper>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{mainPageData.roomTitle}</title>
      </Head>
      <MainWrapper>
        <StyledDiv>
          <h2 className="h2">
            {mainPageData.room}
            {room.name}
          </h2>
          <span className="info">
            {mainPageData.usersQuantity} {room.users?.length}
            {user?.isAdmin && user?.room_id && (
              <div className="invie">
                Ссылка для приглашения в комнату:
                <CodeBlock text={getRoomLink(user.room_id)} />
              </div>
            )}
          </span>
          <div className="users">
            {room?.users?.map((el, i) => (
              <User name={el.name} key={i} />
            ))}
          </div>
          <div className="buttons">
            {user?.isAdmin && (
              <Button onClick={lockRoom} variant="primary">
                {mainPageData.back}
              </Button>
            )}
            <Button onClick={handleBack} variant="text">
              {mainPageData.back}
            </Button>
          </div>
        </StyledDiv>
      </MainWrapper>
    </>
  );
};

export default RoomPage;
