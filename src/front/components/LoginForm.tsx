import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TextInput } from './Input';
import Button from './Button';
import { api, IApiResponse } from 'axiosConfig';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'store/store';
import { setUser } from 'store/feaures/user';
import React, { useState } from 'react';
import { IUser } from 'types/UserType';
import { mainPageData } from 'data/strings';

export interface Values {
  id: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .error {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const validationSchema = Yup.object({
    id: Yup.string().required('Введите персональный код'),
  });
  const initialValues: Values = { id: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const { data } = await api.get<IApiResponse<IUser>>(
      `/user/${values.id}/info`,
    );
    setSubmitting(false);
    if (data.data) {
      dispatch(setUser({ ...data.data, id: values.id }));
      setError(null);
      router.push('/room');
    } else {
      setError('Пользователь не найден');
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
        <h2>{mainPageData.loginHeader}</h2>
        <TextInput name="id" type="text" placeholder="Id пользователя" />
        <div className="buttons">
          <Button variant="primary">{mainPageData.loginEnter}</Button>
          <Button onClick={handleBack} variant="text">
            {mainPageData.back}
          </Button>
        </div>
        {error && <div className="error">{error}</div>}
      </StyledForm>
    </Formik>
  );
};
