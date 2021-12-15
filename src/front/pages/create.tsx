import Head from 'next/head';
import { NextPage } from 'next';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { CreateRoomForm } from 'components/CreateRoomForm';

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
