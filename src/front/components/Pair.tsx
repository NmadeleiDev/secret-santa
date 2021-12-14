import { IApiResponse, makeGetRequest } from 'axiosConfig';
import React, { useEffect, useState } from 'react';
import { IUser } from 'types/UserType';
import styled from 'styled-components';
import { IBasicUser } from 'store/feaures/room';
import { mainPageData } from 'data/strings';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setRecipient, userSelector } from 'store/feaures/user';

const StyledDiv = styled.div`
  .h4-pair {
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
  const dispatch = useAppDispatch();
  const { recipient } = useAppSelector(userSelector);
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
        dispatch(setRecipient(pair.data));
      }
    };

    getPair();
  }, [userid, dispatch, users]);

  return (
    <StyledDiv>
      {recipient && (
        <>
          <h4 className="h4-pair">
            Тебе выпало быть Сантой для{' '}
            <span className="name">{recipient?.name}</span>
          </h4>
          <div className="interests">
            {recipient.likes && (
              <>
                <span className="text">{mainPageData.likes}</span>
                <span className="value">{recipient.likes}</span>
              </>
            )}
            {recipient.dislikes && (
              <>
                <span className="text">{mainPageData.dislikes}</span>
                <span className="value">{recipient.dislikes}</span>
              </>
            )}
          </div>
        </>
      )}
      {error && <h4 className="error">{error}</h4>}
    </StyledDiv>
  );
};

export default Pair;
