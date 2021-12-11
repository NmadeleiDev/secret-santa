import React, { useState } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const room = useAppSelector(roomSelector);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Введите имя или код'),
  });
  const initialValues: Values = { name: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    //   match code
    if (values.name.match(/^\w{8}-(\w{4}-){3}\w{12}$/)) {
      const user = await makeGetRequest<IApiResponse<IUser>>(
        `/user/${values.name}/info`,
      );
      setSubmitting(false);
      if (user?.data) {
        dispatch(setUser({ ...user.data, id: values.name }));
        setError(null);
        router.push('/room');
      } else {
        setError(mainPageData.userNotFound);
        setTimeout(() => setError(''), 3000);
      }
      return;
    }

    const user = {
      room_id: room.id || '',
      name: values.name,
      likes: [],
      dislikes: [],
    };
    const userId = await makePostRequest<IApiResponse<string>>('/user', user);

    setSubmitting(false);
    if (userId?.data) {
      putItem('id', userId.data);
      dispatch(setUser({ ...user, id: userId.data }));
      router.push('/room');
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
        <p className="p">{mainPageData.regFormText}</p>
        <TextInput
          name="name"
          type="text"
          placeholder="Имя пользователя или персональный код"
        />
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
