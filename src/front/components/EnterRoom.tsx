import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TextInput } from './Input';
import Button from './Button';
import { api, IApiResponse, makeGetRequest } from 'axiosConfig';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setUser } from 'store/feaures/user';
import React, { useState } from 'react';
import { IUser } from 'types/UserType';
import { mainPageData } from 'data/strings';
import { errorSelector, setError } from 'store/feaures/error';
import { setRoom } from 'store/feaures/room';

export interface Values {
  id: string;
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

export const EnterRoomForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(errorSelector);
  const validationSchema = Yup.object({
    id: Yup.string().required('Введите код комнаты'),
  });
  const initialValues: Values = { id: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    console.log({ values });

    const roomName = await makeGetRequest<IApiResponse<IUser>>(
      `/room/${values.id}/name`,
    );
    setSubmitting(false);
    if (roomName?.data) {
      dispatch(setRoom({ id: values.id }));
      router.push('/register');
    } else {
      dispatch(setError(mainPageData.roomNotFound));
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
        <h2>{mainPageData.enterRoomHeader}</h2>
        <TextInput name="id" type="text" placeholder="Код комнаты" />
        <div className="buttons">
          <Button variant="primary">{mainPageData.enter}</Button>
          <Button onClick={handleBack} variant="text">
            {mainPageData.back}
          </Button>
        </div>
        {error && <div className="error">{error}</div>}
      </StyledForm>
    </Formik>
  );
};
