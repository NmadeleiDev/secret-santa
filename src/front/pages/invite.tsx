import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { useAppDispatch } from 'store/store';
import { setRoom } from 'store/feaures/room';
import { setError } from 'store/feaures/error';
import { mainPageData } from 'data/strings';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  if (!id) return { props: { user: null } };
  const room = await makeGetRequest<IApiResponse<string>>(`room/${id}/name`);
  if (room?.data) {
    const users = await makeGetRequest<IApiResponse<string[]>>(
      `room/${id}/users`,
    );
    return { props: { room: { name: room.data, users: users.data, id } } };
  }
  return { props: { room: null } };
};

const Invite = ({
  room,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log({ room });

  useEffect(() => {
    const login = async () => {
      if (!room) {
        // TODO: show error message
        dispatch(setError(mainPageData.roomNotFound));
        setTimeout(() => dispatch(setError('')), 3000);
        return router.replace('/');
      }
      dispatch(setRoom(room));
      router.replace(`/register`);
    };
    login();
  }, [dispatch, router, room]);
  return null;
};

export default Invite;
