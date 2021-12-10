import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { TextInput } from './Input';
import Button from './Button';
import { api, IApiResponse, makePostRequest } from 'axiosConfig';
import { useAppDispatch } from 'store/store';
import { setUser } from 'store/feaures/user';
import { mainPageData } from 'data/strings';
import { useLocalStorage } from 'hooks/useLocalStorage';

export interface Values {
  name: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

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
      room_id: '',
      name: values.name,
      likes: [],
      dislikes: [],
    };
    const userId = await makePostRequest<IApiResponse<string>>('/user', user);

    setSubmitting(false);
    if (userId?.data) {
      putItem('id', userId.data);
      dispatch(setUser({ ...user, id: userId.data }));
      router.push('/yourCode');
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
