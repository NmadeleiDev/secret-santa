import { LoginForm } from 'components/LoginForm';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

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
