import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { mainPageData } from 'data/strings';
import { TextInput } from './Input';
import Button from './Button';
import { IApiResponse, makePostRequest } from 'axiosConfig';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setUser } from 'store/feaures/user';
import { roomSelector } from 'store/feaures/room';
import toast from 'react-hot-toast';

export interface Values {
  name: string;
  likes: string;
  dislikes: string;
}

const StyledDiv = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 4rem;

    .h3 {
      font-weight: 600;
      margin-top: 2rem;
      text-align: center;
    }

    .h4 {
      font-weight: 600;
      width: 100%;
      text-align: center;
    }

    .disclamer {
      margin: 1rem 0;
      font-size: 1.2rem;
    }

    .disclamer,
    .buttons {
      text-align: center;
    }
  }
`;

export const RegistrationForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const room = useAppSelector(roomSelector);

  useEffect(() => {
    if (!room.id) {
      console.log('Комната не найдена, попробуйте зайти с главной страницы', {
        room,
      });
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!room.id) {
    return null;
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Обязательное поле'),
    likes: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(1000, 'Максимум 1000 символов'),
    dislikes: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(1000, 'Максимум 1000 символов'),
  });
  const initialValues: Values = { name: '', likes: '', dislikes: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    console.log({ values });
    if (!room.id) {
      return;
    }
    if (room.users?.find((user) => user.name === values.name)) {
      toast.error(mainPageData.chooseAnotherName);
      return;
    }

    const user = {
      room_id: room.id,
      name: values.name,
      likes: values.likes,
      dislikes: values.dislikes,
    };
    const userId = await makePostRequest<IApiResponse<string>>('/user', user);

    setSubmitting(false);
    if (userId?.data) {
      dispatch(setUser({ ...user, id: userId.data }));
      router.push(`/room?userid=${userId.data}&roomid=${room.id}`);
    } else {
      toast.error(mainPageData.genericError);
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
        <StyledDiv>
          <h1>{mainPageData.regForm}</h1>
          <Form className="form">
            <fieldset>
              <legend className="h3">
                {mainPageData.regFormText}&quot;{room.name}&quot;
              </legend>
              <TextInput
                name="name"
                type="text"
                placeholder="Имя пользователя"
              />
            </fieldset>
            <fieldset className="interests">
              <legend className="h4">{mainPageData.interests}</legend>
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
            </fieldset>
            <fieldset className="disclamer">
              {mainPageData.signinText}
              <Link href="/signin" replace>
                <a>{mainPageData.enter}</a>
              </Link>
            </fieldset>
            <fieldset className="buttons">
              <Button
                type="submit"
                variant="primary"
                disabled={!isValidating && isSubmitting}
              >
                {mainPageData.signup}
              </Button>
              <Button onClick={handleBack} variant="text">
                {mainPageData.back}
              </Button>
            </fieldset>
          </Form>
        </StyledDiv>
      )}
    </Formik>
  );
};
