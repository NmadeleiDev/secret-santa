import { CreateRoomForm } from 'components/CreateRoomForm';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const CreateRoom: NextPage = () => {
  return (
    <>
      <Head>
        <title>{mainPageData.createRoom}</title>
      </Head>
      <MainWrapper>
        <CreateRoomForm />
      </MainWrapper>
    </>
  );
};

export default CreateRoom;
