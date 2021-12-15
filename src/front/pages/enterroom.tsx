import Head from 'next/head';
import { NextPage } from 'next';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { EnterRoomForm } from 'components/EnterRoomForm';

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
