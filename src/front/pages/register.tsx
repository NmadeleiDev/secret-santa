import { RegistrationForm } from 'components/RegistrationForm';
import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

interface Props {}

const Register: NextPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <MainWrapper>
        <RegistrationForm />
      </MainWrapper>
    </>
  );
};

export default Register;
