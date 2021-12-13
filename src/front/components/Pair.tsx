import { IApiResponse, makeGetRequest } from 'axiosConfig';
import React, { useEffect, useState } from 'react';
import { IUser } from 'types/UserType';
import styled from 'styled-components';
import { IBasicUser } from 'store/feaures/room';
import { mainPageData } from 'data/strings';

const StyledDiv = styled.div`
  .success {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text.dark};
    margin-bottom: 1rem;
    .name {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
  .error {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text.dark};
  }

  .interests {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    .text .value {
      color: ${({ theme }) => theme.colors.text.dark};
      font-weight: 400;
    }

    .value {
      font-weight: 600;
    }
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
  }, [userid, users]);

  return (
    <StyledDiv>
      {pair && (
        <>
          <h4 className="success">
            Тебе выпало быть Сантой для{' '}
            <span className="name">{pair?.name}</span>
          </h4>
          <div className="interests">
            <span className="text">{mainPageData.likes}</span>
            <span className="value">{pair.likes}</span>
            <span className="text">{mainPageData.dislikes}</span>
            <span className="value">{pair.dislikes}</span>
          </div>
        </>
      )}
      {error && <h4 className="error">{error}</h4>}
    </StyledDiv>
  );
};

export default Pair;
