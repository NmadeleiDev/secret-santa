import Head from 'next/head';
import { NextPage } from 'next';
import { MainWrapper } from 'layouts/MainWrapper';
import { mainPageData } from 'data/strings';
import { LoginForm } from 'components/LoginForm';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>{mainPageData.registerHeader}</title>
      </Head>
      <MainWrapper>
        <LoginForm />
      </MainWrapper>
    </>
  );
};

export default Register;
