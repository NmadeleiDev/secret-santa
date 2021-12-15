import Head from 'next/head';
import { NextPage } from 'next';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { RegistrationForm } from 'components/RegistrationForm';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>{mainPageData.registerHeader}</title>
      </Head>
      <MainWrapper>
        <RegistrationForm />
      </MainWrapper>
    </>
  );
};

export default Register;
