import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TextInput } from './Input';
import Button from './Button';
import { api, IApiResponse } from 'axiosConfig';
import { useRouter } from 'next/router';

interface Props {}

export interface Values {
  name: string;
  email: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegistrationForm = (props: Props) => {
  const router = useRouter();
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Введите имя'),
    email: Yup.string().email('Неверный email адрес').required('Введите email'),
  });
  const initialValues: Values = { name: '', email: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const { data } = await api.post<IApiResponse<string>>('/user', {
      room_id: -1,
      name: values.name,
      likes: [],
      dislikes: [],
    });
    console.log({ values, data });
    setSubmitting(false);
    router.push('/');
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      <StyledForm>
        <h2>Форма регистрации</h2>
        <TextInput
          name="name"
          //   label="Имя пользователя"
          type="text"
          placeholder="Имя пользователя"
        />
        <TextInput
          name="email"
          //   label="Email адрес"
          type="email"
          placeholder="present@santa.com"
        />
        <Button variant="primary">Создать</Button>
      </StyledForm>
    </Formik>
  );
};
