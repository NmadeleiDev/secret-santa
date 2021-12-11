import Room from 'components/Room';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { userSelector } from 'store/feaures/user';
import { useAppSelector } from 'store/store';

interface Props {}

const RoomPage: NextPage = (props: Props) => {
  const user = useAppSelector(userSelector);
  return (
    <>
      <Head>
        <title>{mainPageData.roomTitle}</title>
      </Head>
      <MainWrapper>
        <Room />
      </MainWrapper>
    </>
  );
};

export default RoomPage;
