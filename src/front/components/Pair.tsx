import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { mainPageData } from 'data/strings';
import { IApiResponse, makeGetRequest } from 'axiosConfig';
import { IUser } from 'types/UserType';
import { IBasicUser } from 'store/feaures/room';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setRecipient, userSelector } from 'store/feaures/user';

const StyledDiv = styled.div`
  .h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text.dark};
    margin-bottom: 1rem;
    text-align: center;

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

      if (pair.error) {
        setError(mainPageData.pairsNotSet);
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
          <h2 className="h2">
            Тебе выпало быть Сантой для{' '}
            <span className="name">{recipient.name}</span>
          </h2>
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
