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
import { userSelector } from 'store/feaures/user';
import { roomSelector, setRoom } from 'store/feaures/room';
import CodeBlock from './CodeBlock';
import { host, protocol } from 'pages/_app';

export interface Values {
  name: string;
}
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CreateRoomForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { putItem } = useLocalStorage();
  const user = useAppSelector(userSelector);
  const room = useAppSelector(roomSelector);

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
    const roomData: IRoom = {
      name: values.name,
      admin_id: user.id,
    };
    const roomId = await makePostRequest<IApiResponse<string>>(
      '/room',
      roomData,
    );
    setSubmitting(false);
    console.log({ roomId });

    if (roomId?.data) {
      putItem('roomId', roomId.data);
      dispatch(setRoom({ ...room, id: roomId.data }));
    }
  };
  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };
  return (
    <>
      {room?.id ? (
        <StyledDiv>
          <h2>Ваша комната</h2>
          <CodeBlock text={`${protocol}://${host}/invite/${room.id}`} />
        </StyledDiv>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          <StyledForm>
            <h2>{mainPageData.createRoomForm}</h2>
            <TextInput name="name" type="text" placeholder="Название комнаты" />
            <div className="buttons">
              <Button variant="primary">{mainPageData.create}</Button>
              <Button onClick={handleBack} variant="text">
                {mainPageData.back}
              </Button>
            </div>
          </StyledForm>
        </Formik>
      )}
    </>
  );
};
