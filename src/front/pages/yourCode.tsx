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
      background-color: ${({ theme }) => theme.colors.secondary.dark};
      color: ${({ theme }) => theme.colors.white};
      a {
        color: ${({ theme }) => theme.colors.white};
        font-weight: 600;
      }
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

  const userlink = getUserLink(user.id);
  const roomlink = getRoomLink(room.id);

  return (
    <MainWrapper>
      <StyledDiv>
        <h2 className="h2">{mainPageData.successRegHeader}</h2>
        <div className="links">
          {mainPageData.yourRoomLink}
          <CodeBlock main text={roomlink}>
            <Link href={roomlink}>
              <a>{roomlink}</a>
            </Link>
          </CodeBlock>
          {mainPageData.yourCode}
          <CodeBlock text={user.id} />
          {mainPageData.yourLink}
          <CodeBlock text={userlink}>
            <Link href={userlink}>
              <a>{userlink}</a>
            </Link>
          </CodeBlock>
          {mainPageData.yourRoomCode}
          <CodeBlock text={room.id} />
        </div>
        <Button variant="text" onClick={handleClick}>
          {mainPageData.enterRoom}
        </Button>
      </StyledDiv>
    </MainWrapper>
  );
};

export default YourCode;
