import { LoginForm } from 'components/LoginForm';
import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { userSelector } from 'store/feaures/user';
import { useAppSelector } from 'store/store';

interface Props {}

const Register: NextPage = (props: Props) => {
  const user = useAppSelector(userSelector);
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <MainWrapper>{user.id ? <div>room</div> : <LoginForm />}</MainWrapper>
    </>
  );
};

export default Register;
