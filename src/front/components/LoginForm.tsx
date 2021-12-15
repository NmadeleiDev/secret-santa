import { useEffect } from 'react';
import Link from 'next/link';
import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { mainPageData } from 'data/strings';
import { TextInput } from './Input';
import Button from './Button';
import { UUID_REGEX } from 'utils';
import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setUser } from 'store/feaures/user';
import { roomSelector } from 'store/feaures/room';
import { IUser } from 'types/UserType';
import toast from 'react-hot-toast';

export interface Values {
  uuid: string;
}

const StyledDiv = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 4rem;

    .legend {
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: 2rem;
      text-align: center;
      max-width: 70%;
    }

    .disclamer {
      text-align: center;
      margin: 2rem 0;
      font-size: 1.2rem;
    }

    .buttons {
      text-align: center;
    }
  }
`;

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const room = useAppSelector(roomSelector);

  useEffect(() => {
    if (!room.id) {
      toast.error(mainPageData.roomNotFoundGoHome);
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!room.id) {
    return null;
  }
  const validationSchema = Yup.object().shape({
    uuid: Yup.string()
      .matches(UUID_REGEX, mainPageData.wrongFormat)
      .required('Обязательное поле'),
  });
  const initialValues: Values = { uuid: '' };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    if (!room.id) {
      return;
    }

    const isMember = await makeGetRequest<IApiResponse<boolean>>(
      `/user/${values.uuid}/enter/${room.id}`,
    );

    if (isMember.status) {
      const user = await makeGetRequest<IApiResponse<IUser>>(
        `/user/${values.uuid}/info`,
      );
      if (user.data) {
        dispatch(setUser({ ...user.data, id: values.uuid }));
        router.push(`/room?userid=${values.uuid}&roomid=${room.id}`);
      }
    } else {
      toast.error(mainPageData.userNotFound);
    }
    setSubmitting(false);
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
              <legend className="legend">
                {mainPageData.ifHasUUID}
                <Link href="/signup" replace>
                  <a>{mainPageData.register}</a>
                </Link>
              </legend>
              <TextInput
                name="uuid"
                type="text"
                placeholder="Код пользователя"
              />
            </fieldset>
            <fieldset className="disclamer">
              {mainPageData.signupText}
              <Link href="/signup" replace>
                <a>{mainPageData.signup}</a>
              </Link>
            </fieldset>
            <fieldset className="buttons">
              <Button
                type="submit"
                variant="primary"
                disabled={!isValidating && isSubmitting}
              >
                {mainPageData.enter}
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
