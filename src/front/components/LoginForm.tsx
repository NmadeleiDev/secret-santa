import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { TextInput } from './Input';
import Button from './Button';
import {
  api,
  IApiResponse,
  makeGetRequest,
  makePostRequest,
} from 'axiosConfig';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setUser } from 'store/feaures/user';
import { mainPageData } from 'data/strings';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { roomSelector } from 'store/feaures/room';
import { IUser } from 'types/UserType';
import { UUID_REGEX } from 'utils';
import { errorSelector, setError } from 'store/feaures/error';
import Link from 'next/link';

export interface Values {
  uuid: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .h3 {
    font-size: 1.2rem;
    margin-top: 2rem;
  }

  .p {
    margin-top: 1rem;
    font-size: 1rem;
  }

  .error {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1rem;
  }
`;

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { putItem } = useLocalStorage();
  const room = useAppSelector(roomSelector);
  const { error } = useAppSelector(errorSelector);

  useEffect(() => {
    if (!room.id) {
      console.log('Комната не найдена, попробуйте зайти с главной страницы', {
        room,
      });
      //   dispatch(setError(mainPageData.roomNotFoundGoHome));
      //   setTimeout(() => dispatch(setError('')), 3000);
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!room.id) {
    return null;
  }
  const validationSchema = Yup.object({
    uuid: Yup.string().matches(UUID_REGEX, mainPageData.wrongFormat),
  });
  const initialValues: Values = { uuid: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    if (!room.id) {
      return;
    }
    console.log({ values });

    setSubmitting(false);
    const isMember = await makeGetRequest<IApiResponse<boolean>>(
      `/room/${room.id}/ismember/${values.uuid}`,
    );
    console.log({ isMember });

    if (isMember?.data) {
      const user = await makeGetRequest<IApiResponse<IUser>>(
        `/user/${values.uuid}/info`,
      );
      if (user.data) {
        dispatch(setUser({ ...user.data, id: values.uuid }));
        router.push(`/room?userid=${values.uuid}&roomid=${room.id}`);
      }
    } else {
      dispatch(setError(mainPageData.userNotFound));
      setTimeout(() => dispatch(setError('')), 3000);
    }
  };
  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      <StyledForm>
        <h2>{mainPageData.regForm}</h2>
        <h3 className="h3">
          {mainPageData.regFormText}&quot;{room.name}&quot;
        </h3>
        <TextInput name="uuid" type="text" placeholder="Код пользователя" />
        <div className="login">
          {mainPageData.signupText}
          <Link href="/signup">
            <a>{mainPageData.signup}</a>
          </Link>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="buttons">
          <Button onClick={handleBack} variant="text">
            {mainPageData.back}
          </Button>
          <Button type="submit" variant="primary">
            {mainPageData.enter}
          </Button>
        </div>
      </StyledForm>
    </Formik>
  );
};