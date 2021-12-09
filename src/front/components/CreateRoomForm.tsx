import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TextInput } from './Input';
import Button from './Button';
import { api, IApiResponse } from 'axiosConfig';
import { useRouter } from 'next/router';
import { useAppSelector } from 'store/store';
import React from 'react';
import { mainPageData } from 'data/strings';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { IRoom } from 'types/RoomType';
import { userSelector } from 'store/feaures/user';

export interface Values {
  name: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CreateRoomForm = () => {
  const router = useRouter();
  const { putItem } = useLocalStorage();
  const user = useAppSelector(userSelector);
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
    const room: IRoom = {
      name: values.name,
      admin_id: user.id,
    };
    const { data } = await api.post<IApiResponse<string>>('/room', room);
    setSubmitting(false);
    console.log(data);

    if (data.data) {
      putItem('roomId', data.data);
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
