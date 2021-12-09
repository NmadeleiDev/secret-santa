import { LoginForm } from 'components/LoginForm';
import Room from 'components/Room';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from 'store/store';

interface Props {}

const RoomPage: NextPage = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>{mainPageData.roomTitle}</title>
      </Head>
      <MainWrapper>{user.id ? <Room /> : <LoginForm />}</MainWrapper>
    </>
  );
};

export default RoomPage;
