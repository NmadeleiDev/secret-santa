import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TextInput } from './Input';
import Button from './Button';
import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'store/store';
import React from 'react';
import { IUser } from 'types/UserType';
import { mainPageData } from 'data/strings';
import { errorSelector, setError } from 'store/feaures/error';
import { setRoom } from 'store/feaures/room';
import { UUID_REGEX, UUID_REGEX_GROUP } from 'utils';

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
  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .matches(UUID_REGEX_GROUP, mainPageData.wrongFormat)
      .required('Введи код'),
  });
  const initialValues: Values = { id: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const match = values.id.match(UUID_REGEX_GROUP);
    if (!match) return setSubmitting(false);

    const id = match[1] || match[3];
    const roomName = await makeGetRequest<IApiResponse<string>>(
      `/room/${id}/name`,
    );
    setSubmitting(false);
    if (roomName?.data) {
      dispatch(setRoom({ id, name: roomName.data }));
      router.push('/signin');
    } else {
      dispatch(setError(mainPageData.roomNotFound));
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
      {({ isSubmitting, isValidating }) => (
        <StyledForm>
          <h2>{mainPageData.enterRoomHeader}</h2>
          <TextInput name="id" type="text" placeholder="Код комнаты" />
          <div className="buttons">
            <Button variant="text" onClick={handleBack}>
              {mainPageData.back}
            </Button>
            <Button
              type="submit"
              disabled={!isValidating && isSubmitting}
              variant="primary"
            >
              {mainPageData.enter}
            </Button>
          </div>
          {error && <div className="error">{error}</div>}
        </StyledForm>
      )}
    </Formik>
  );
};
