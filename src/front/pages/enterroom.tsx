import { EnterRoomForm } from 'components/EnterRoomForm';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const CreateRoom: NextPage = () => {
  return (
    <>
      <Head>
        <title>{mainPageData.enterRoom}</title>
      </Head>
      <MainWrapper>
        <EnterRoomForm />
      </MainWrapper>
    </>
  );
};

export default CreateRoom;
