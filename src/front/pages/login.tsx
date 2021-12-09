import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { api, IApiResponse } from 'axiosConfig';
import { useAppDispatch } from 'store/store';
import { setUser } from 'store/feaures/user';
import { IUser } from 'types/UserType';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  if (!id) return { props: { user: null } };
  const { data } = await api.get<IApiResponse<IUser>>(`user/${id}/info`);
  if (data.data) {
    return { props: { user: { ...data.data, id } } };
  }
  return { props: { user: null } };
};

const Login = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log({ user });

  useEffect(() => {
    const login = async () => {
      if (!user) return router.replace('/');
      dispatch(setUser(user));
      router.replace('/room');
    };
    login();
  }, [dispatch, router, user]);
  return null;
};

export default Login;
