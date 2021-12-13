import { IApiResponse, makeGetRequest } from 'axiosConfig';
import React, { useEffect, useState } from 'react';
import { IUser } from 'types/UserType';
import styled from 'styled-components';
import { IBasicUser } from 'store/feaures/room';

const StyledDiv = styled.div`
  .name {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text.dark};
  }
`;

interface PairProps {
  userid: string;
  users?: IBasicUser[];
}

const Pair = ({ userid, users }: PairProps) => {
  const [pair, setPair] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPair = async () => {
      const pair = await makeGetRequest<IApiResponse<IUser>>(
        `user/${userid}/recipient`,
      );
      console.log({ pair, users });

      if (pair.error) {
        setError('Пары еще не назначены. Это может сделать админ комнаты');
        return;
      } else if (pair.data) {
        setPair(pair.data);
      }
    };

    getPair();
  }, []);

  return (
    <StyledDiv>
      {pair && <h4 className="name">Ты будешь Сантой для {pair?.name}</h4>}
      {error && <h4 className="name">{error}</h4>}
    </StyledDiv>
  );
};

export default Pair;
