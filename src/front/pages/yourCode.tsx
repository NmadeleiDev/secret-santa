import { useEffect } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mainPageData } from 'data/strings';
import { userSelector } from 'store/feaures/user';
import { MainWrapper } from 'layouts/MainWrapper';
import { useAppSelector } from 'store/store';
import Button, { CopyButton } from 'components/Button';

const host =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_NGINX_HOST}:${process.env.NEXT_PUBLIC_NGINX_PORT}`
    : 'localhost:2222';
const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONTEND_PROTOCOL
    : 'http';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .h2 {
    color: ${({ theme }) => theme.colors.primary.main};
    text-align: center;
  }

  .p {
    max-width: var(--desktop-width);
    width: 100%;
  }

  .code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin: 0.5rem 0;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.dark};
    background-color: ${({ theme }) => theme.colors.secondary.light};
    border: 1px solid ${({ theme }) => theme.colors.secondary.dark};
    border-radius: 5px;

    a {
      color: ${({ theme }) => theme.colors.text.dark};
    }
  }
`;

const YourCode: NextPage = () => {
  const router = useRouter();
  const { id, name } = useAppSelector(userSelector);
  const link = `${protocol}://${host}/login?id=${id}&name=${name}`;

  useEffect(() => {
    if (!id) router.replace('/register');
  }, [id, router]);

  const handleClick = () => {
    router.push('/room');
  };
  return (
    <MainWrapper>
      <StyledDiv>
        <h2 className="h2">{mainPageData.successRegHeader}</h2>
        <p className="p">
          {mainPageData.yourCode}
          <span className="code">
            {id}
            <CopyButton text={id || ''} />
          </span>
          {mainPageData.yourLink}
          <span className="code">
            <Link href={link}>
              <a>{link}</a>
            </Link>
            <CopyButton text={link} />
          </span>
        </p>
        <Button variant="text" onClick={handleClick}>
          {mainPageData.enterRoom}
        </Button>
      </StyledDiv>
    </MainWrapper>
  );
};

export default YourCode;
