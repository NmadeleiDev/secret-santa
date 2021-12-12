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

export interface Values {
  name: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .p {
    margin-top: 2rem;
    font-size: 1rem;
  }

  .error {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1rem;
  }
`;

export const RegistrationForm = () => {
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
  }, []);

  if (!room.id) {
    return null;
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Введите имя'),
  });
  const initialValues: Values = { name: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    if (!room.id) {
      return;
    }

    const user = {
      room_id: room.id,
      name: values.name,
      likes: [],
      dislikes: [],
    };
    const userId = await makePostRequest<IApiResponse<string>>('/user', user);

    setSubmitting(false);
    if (userId?.data) {
      putItem('id', userId.data);
      dispatch(setUser({ ...user, id: userId.data }));
      router.push(`/room?userid=${userId.data}&roomid=${room.id}`);
    } else {
      setError(mainPageData.genericError);
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
        <p className="p">
          {mainPageData.regFormText}&quot;{room.name}&quot;
        </p>
        <TextInput name="name" type="text" placeholder="Имя пользователя" />
        {error && <div className="error">{error}</div>}
        <div className="buttons">
          <Button variant="primary">{mainPageData.create}</Button>
          <Button onClick={handleBack} variant="text">
            {mainPageData.back}
          </Button>
        </div>
      </StyledForm>
    </Formik>
  );
};
