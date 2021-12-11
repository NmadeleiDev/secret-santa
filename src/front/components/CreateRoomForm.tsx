import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TextInput } from './Input';
import Button from './Button';
import { IApiResponse, makePostRequest } from 'axiosConfig';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'store/store';
import React from 'react';
import { mainPageData } from 'data/strings';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { IRoom } from 'types/RoomType';
import { setUser, userSelector } from 'store/feaures/user';
import { roomSelector, setRoom } from 'store/feaures/room';
import CodeBlock from './CodeBlock';
import { host, protocol } from 'pages/_app';
import { errorSelector, setError, setSuccess } from 'store/feaures/error';

export interface Values {
  username: string;
  roomname: string;
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

export const CreateRoomForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { putItem } = useLocalStorage();
  const { error } = useAppSelector(errorSelector);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Введите имя'),
    roomname: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Введите имя'),
  });
  const initialValues: Values = { username: '', roomname: '' };

  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const user = {
      room_id: '',
      name: values.username,
      likes: [],
      dislikes: [],
    };
    const userId = await makePostRequest<IApiResponse<string>>('/user', user);

    if (userId.error || !userId.data) {
      dispatch(setError(mainPageData.genericError));
      return;
    }
    const room: IRoom = {
      name: values.username,
      admin_id: userId.data,
    };
    const roomId = await makePostRequest<IApiResponse<string>>('/room', room);
    setSubmitting(false);
    console.log({ roomId });

    if (roomId?.data) {
      putItem('roomId', roomId.data);
      dispatch(setUser({ ...user, id: userId.data }));
      dispatch(setRoom({ ...room, id: roomId.data }));
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
        <h2>{mainPageData.createRoomForm}</h2>
        <TextInput name="name" type="text" placeholder="Название комнаты" />
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
