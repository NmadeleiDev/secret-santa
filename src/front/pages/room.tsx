import { IApiResponse, makeGetRequest, ssrGetRequest } from 'axiosConfig';
import Button from 'components/Button';
import CodeBlock from 'components/CodeBlock';
import Pair from 'components/Pair';
import User from 'components/User';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { errorSelector, setError, setSuccess } from 'store/feaures/error';
import {
  IBasicUser,
  IRoomSlice,
  roomSelector,
  setRoom,
} from 'store/feaures/room';
import {
  IUserSlice,
  setRecipient,
  setUser,
  userSelector,
} from 'store/feaures/user';
import { useAppDispatch, useAppSelector } from 'store/store';
import styled from 'styled-components';
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

    .primary-button {
      position: relative;

      .tooltip {
        display: none;
        position: absolute;
        right: calc(50% - 5rem);
        bottom: -90px;
        max-width: 10rem;
        height: auto;
        font-size: 0.8rem;
        font-weight: 400;
        padding: 0.4rem 1rem;
        border-radius: 30px;
        border: none;
        color: ${({ theme }) => theme.colors.text.dark};
        background-color: ${({ theme }) => theme.colors.base.darkerBG};
        box-shadow: 0 0 10px ${({ theme }) => theme.colors.base.shadow};
        z-index: 4;
      }

      &:hover {
        .tooltip {
          display: block;
        }
      }
    }
  }
  .success {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { roomid, userid } = query;
  let room: IRoomSlice | null = null;
  let user: IUserSlice | null = null;
  if (roomid) {
    const roomData = await ssrGetRequest<IApiResponse<string>>(
      `room/${roomid}/name`,
    );
    if (roomData?.data) {
      room = {
        name: roomData.data,
        users: [],
        id: String(roomid),
        admin_id: '',
      };
      const users = await ssrGetRequest<IApiResponse<IBasicUser[]>>(
        `room/${roomid}/users?my_id=${userid}`,
      );
      console.log({ users: users.data });
      room.users = users.data || [];
    }
  }
  if (userid) {
    const userData = await ssrGetRequest<IApiResponse<IUser>>(
      `user/${userid}/info`,
    );
    const isAdminData = await ssrGetRequest<IApiResponse<boolean>>(
      `room/${roomid}/isadmin/${userid}`,
    );

    console.log({ userData, isAdminData });

    if (userData.data?.name && userData.data?.room_id) {
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
  const user = useAppSelector(userSelector);
  const room = useAppSelector(roomSelector);
  const { success, error } = useAppSelector(errorSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (roomData?.id) dispatch(setRoom(roomData));
    if (userData?.id) dispatch(setUser(userData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lockRoom = async () => {
    console.log('lockRoom');

    const lock = await makeGetRequest<IApiResponse<string>>(
      `/room/${user?.id}/lock`,
    );
    console.log({ lock });
    if (lock?.data) {
      const pair = await makeGetRequest<IApiResponse<IUser>>(
        `user/${user.id}/recipient`,
      );
      console.log({ pair });

      if (pair.data) {
        dispatch(setRecipient(pair.data));
      }

      dispatch(setSuccess(mainPageData.lockSuccess));
      setTimeout(() => dispatch(setSuccess('')), 3000);
    } else {
      dispatch(setError(mainPageData.genericError));
      setTimeout(() => dispatch(setError('')), 3000);
    }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };

  if (!room.id) {
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
            {user?.room_id && (
              <div className="invite">
                {mainPageData.invitation}
                <CodeBlock text={getRoomLink(user.room_id)} />
              </div>
            )}
            <div className="code">
              {mainPageData.yourCode}
              <CodeBlock text={user.id} />
            </div>
          </span>
          <Pair userid={user.id} users={room.users} />
          <div className="users">
            {room?.users?.map((el, i) => (
              <User
                name={el.name}
                id={el.id}
                key={i}
                enableDelete={user.isAdmin || false}
              />
            ))}
          </div>
          <div className="success">{success}</div>
          <div className="buttons">
            <Button onClick={handleBack} variant="text">
              {mainPageData.back}
            </Button>
            {user?.isAdmin && (
              <Button
                className="primary-button"
                disabled={!room.users || room.users.length < 3}
                onClick={lockRoom}
                variant="primary"
              >
                {mainPageData.lockRoom}
                {room.users && room.users.length < 3 && (
                  <span className="tooltip">
                    {mainPageData.lockRoomTooltip}
                  </span>
                )}
              </Button>
            )}
          </div>
        </StyledDiv>
      </MainWrapper>
    </>
  );
};

export default RoomPage;
