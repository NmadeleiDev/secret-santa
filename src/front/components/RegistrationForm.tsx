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
  name: string;
  likes: string;
  dislikes: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .h3 {
    font-size: 1.2rem;
    margin-top: 2rem;
    text-align: center;
    width: 100%;
  }

  .h4 {
    font-weight: 600;
    width: 100%;
    text-align: center;
  }

  .disclamer {
    margin: 2rem 0;
    font-size: 1.2rem;
    a {
      color: ${({ theme }) => theme.colors.primary.main};
    }
    a:visited {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  .interests {
    width: 100%;
  }

  .error {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1rem;
  }
`;

export const RegistrationForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const room = useAppSelector(roomSelector);
  const { error } = useAppSelector(errorSelector);

  useEffect(() => {
    if (!room.id) {
      console.log('Комната не найдена, попробуйте зайти с главной страницы', {
        room,
      });
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!room.id) {
    return null;
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов'),
    uuid: Yup.string().matches(UUID_REGEX, mainPageData.wrongFormat),
  });
  const initialValues: Values = { name: '', likes: '', dislikes: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    if (!room.id) {
      return;
    }
    console.log({ values });

    const user = {
      room_id: room.id,
      name: values.name,
      likes: values.likes,
      dislikes: values.dislikes,
    };
    const userId = await makePostRequest<IApiResponse<string>>('/user', user);

    setSubmitting(false);
    if (userId?.data) {
      dispatch(setUser({ ...user, id: userId.data }));
      router.push(`/room?userid=${userId.data}&roomid=${room.id}`);
    } else {
      dispatch(setError(mainPageData.genericError));
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
        <TextInput name="name" type="text" placeholder="Имя пользователя" />
        <div className="interests">
          <h4 className="h4">{mainPageData.interests}</h4>
          <TextInput name="likes" type="text" placeholder="Что тебе нравится" />
          <TextInput
            name="dislikes"
            type="text"
            placeholder="Что тебе не нравится"
          />
        </div>
        <div className="disclamer">
          {mainPageData.signinText}
          <Link href="/signin">
            <a>{mainPageData.enter}</a>
          </Link>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="buttons">
          <Button onClick={handleBack} variant="text">
            {mainPageData.back}
          </Button>
          <Button type="submit" variant="primary">
            {mainPageData.signup}
          </Button>
        </div>
      </StyledForm>
    </Formik>
  );
};
