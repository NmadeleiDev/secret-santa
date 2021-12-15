import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { mainPageData } from 'data/strings';
import { MainWrapper } from 'layouts/MainWrapper';
import { IApiResponse, ssrGetRequest } from 'axiosConfig';
import { useAppDispatch } from 'store/store';
import { setRoom } from 'store/feaures/room';
import toast from 'react-hot-toast';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  if (!id) return { props: { user: null } };
  const room = await ssrGetRequest<IApiResponse<string>>(`room/${id}/name`);
  if (room?.data) {
    const users = await ssrGetRequest<IApiResponse<string[]>>(
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

  useEffect(() => {
    const login = async () => {
      if (!room) {
        toast.error(mainPageData.roomNotFound);
        return router.replace('/');
      }
      dispatch(setRoom(room));
      router.replace(`/signin`);
    };
    login();
  }, [dispatch, router, room]);
  return <MainWrapper />;
};

export default Invite;
