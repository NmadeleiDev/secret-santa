import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import * as Yup from 'yup';
import { mainPageData } from 'data/strings';
import { TextInput } from './Input';
import Button from './Button';
import { UUID_REGEX_GROUP } from 'utils';
import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { useAppDispatch } from 'store/store';
import { setRoom } from 'store/feaures/room';
import toast from 'react-hot-toast';

export interface Values {
  id: string;
}

const StyledDiv = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 400px;
    margin: 0 4rem;

    .buttons {
      text-align: center;
    }
  }
`;

export const EnterRoomForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
      toast.error(mainPageData.roomNotFound);
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
          <h1>{mainPageData.enterRoomHeader}</h1>
          <Form className="form">
            <TextInput name="id" type="text" placeholder="Код комнаты" />
            <fieldset className="buttons">
              <Button
                type="submit"
                disabled={!isValidating && isSubmitting}
                variant="primary"
              >
                {mainPageData.enter}
              </Button>
              <Button variant="text" onClick={handleBack}>
                {mainPageData.back}
              </Button>
            </fieldset>
          </Form>
        </StyledDiv>
      )}
    </Formik>
  );
};
