import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { TextInput } from './Input';
import Button from './Button';
import { api, IApiResponse } from 'axiosConfig';
import { useAppDispatch } from 'store/store';
import { setUser } from 'store/feaures/user';
import { mainPageData } from 'data/strings';
import { useLocalStorage } from 'hooks/useLocalStorage';

const LOCALSTORAGE_KEY =
  process.env.NEXT_APP_LOCALSTORAGE_KEY || 'SECRET_SANTA_CODE';

export interface Values {
  name: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegistrationForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { putItem } = useLocalStorage();
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
    const user = {
      room_id: -1,
      name: values.name,
      likes: [],
      dislikes: [],
    };
    const { data } = await api.post<IApiResponse<string>>('/user', user);
    setSubmitting(false);
    if (data.data) {
      putItem('id', data.data);
      dispatch(setUser({ ...user, id: data.data }));
      router.push('/yourCode');
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
        <TextInput name="name" type="text" placeholder="Имя пользователя" />
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
