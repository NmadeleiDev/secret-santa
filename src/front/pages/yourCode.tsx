import { useEffect } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mainPageData } from 'data/strings';
import { userSelector } from 'store/feaures/user';
import { MainWrapper } from 'layouts/MainWrapper';
import { useAppSelector } from 'store/store';
import Button from 'components/Button';
import CodeBlock from 'components/CodeBlock';
import { roomSelector } from 'store/feaures/room';
import { getUserLink, getRoomLink } from 'utils';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .h2 {
    color: ${({ theme }) => theme.colors.primary.main};
    text-align: center;
  }

  .links {
    max-width: var(--desktop-width);
    width: 100%;

    .main {
      padding: 1.5rem;
    }

    .personal {
      margin-top: 2rem;
    }
  }
`;

const YourCode: NextPage = () => {
  const router = useRouter();
  const user = useAppSelector(userSelector);
  const room = useAppSelector(roomSelector);

  useEffect(() => {
    if (!user.id || !room.id) {
      router.replace('/');
    }
  }, [user.id, room.id, router]);

  if (!user.id || !room.id) {
    return null;
  }

  const handleClick = () => {
    router.push('/room');
  };

  const roomlink = getRoomLink(room.id);

  return (
    <MainWrapper>
      <StyledDiv>
        <h2 className="h2">{mainPageData.successRegHeader}</h2>
        <div className="links">
          {mainPageData.yourRoomLink}
          <CodeBlock className="main" main text={roomlink}>
            <Link href={roomlink}>
              <a>{roomlink}</a>
            </Link>
          </CodeBlock>
          <div className="personal">
            {mainPageData.yourCode}
            <CodeBlock text={user.id} />
          </div>
        </div>
        <Button variant="text" onClick={handleClick}>
          {mainPageData.enterRoom}
        </Button>
      </StyledDiv>
    </MainWrapper>
  );
};

export default YourCode;
