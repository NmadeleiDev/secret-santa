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
import { setUser } from 'store/feaures/user';
import { setRoom } from 'store/feaures/room';
import { errorSelector, setError, setSuccess } from 'store/feaures/error';
import toast from 'react-hot-toast';

export interface Values {
  username: string;
  roomname: string;
  likes: string;
  dislikes: string;
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

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Введи имя'),
    roomname: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Введи название комнаты'),
  });
  const initialValues: Values = {
    username: '',
    roomname: '',
    likes: '',
    dislikes: '',
  };

  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const user = {
      room_id: '',
      name: values.username,
      likes: values.likes,
      dislikes: values.dislikes,
    };
    const userId = await makePostRequest<IApiResponse<string>>('/user', user);

    if (userId.error || !userId.data) {
      toast.error(mainPageData.genericError);
      return;
    }
    const room: IRoom = {
      name: values.roomname,
      admin_id: userId.data,
    };
    const roomId = await makePostRequest<IApiResponse<string>>('/room', room);
    setSubmitting(false);
    console.log({ roomId });

    if (roomId?.data) {
      putItem('roomId', roomId.data);
      dispatch(
        setUser({
          ...user,
          id: userId.data,
          room_id: roomId.data,
          isAdmin: true,
        }),
      );
      dispatch(setRoom({ ...room, id: roomId.data }));
      router.push(`/room?userid=${userId.data}&roomid=${roomId.data}`);
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
          <h2>{mainPageData.createRoomForm}</h2>
          <TextInput name="username" type="text" placeholder="Твое имя" />
          <TextInput
            name="roomname"
            type="text"
            placeholder="Название комнаты"
          />
          <div className="interests">
            <h4 className="h4">{mainPageData.interests}</h4>
            <TextInput
              name="likes"
              type="text"
              placeholder="Что тебе нравится"
            />
            <TextInput
              name="dislikes"
              type="text"
              placeholder="Что тебе не нравится"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="buttons">
            <Button onClick={handleBack} variant="text">
              {mainPageData.back}
            </Button>
            <Button
              disabled={!isValidating && isSubmitting}
              type="submit"
              variant="primary"
            >
              {mainPageData.create}
            </Button>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};
