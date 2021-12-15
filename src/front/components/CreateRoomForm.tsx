import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { mainPageData } from 'data/strings';
import { TextInput } from './Input';
import Button from './Button';
import { IApiResponse, makePostRequest } from 'axiosConfig';
import { useAppDispatch } from 'store/store';
import { IRoom } from 'types/RoomType';
import { setUser } from 'store/feaures/user';
import { setRoom } from 'store/feaures/room';
import toast from 'react-hot-toast';

export interface Values {
  username: string;
  roomname: string;
  likes: string;
  dislikes: string;
}
const StyledDiv = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 4rem;

    .legend {
      font-weight: 600;
    }

    .buttons {
      text-align: center;
    }
  }
`;

export const CreateRoomForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
        <StyledDiv>
          <h1>{mainPageData.createRoomForm}</h1>
          <Form className="form">
            <fieldset className="generalInfo">
              <TextInput name="username" type="text" placeholder="Твое имя" />
              <TextInput
                name="roomname"
                type="text"
                placeholder="Название комнаты"
              />
            </fieldset>
            <fieldset className="interests">
              <legend className="legend">{mainPageData.interests}</legend>
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
            <fieldset className="buttons">
              <Button
                disabled={!isValidating && isSubmitting}
                type="submit"
                variant="primary"
              >
                {mainPageData.create}
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
