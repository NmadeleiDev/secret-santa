import { MainWrapper } from 'layouts/MainWrapper';
import { NextPage } from 'next';
import { useAppSelector } from 'store/store';
import Button, { CopyButton } from 'components/Button';

const host =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONTEND_HOST
    : 'localhost';
const port =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONTEND_PORT
    : '3000';
const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROTOCOL
    : 'http';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { mainPageData } from 'data/strings';

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
  const { id, name } = useAppSelector((state) => state.user);
  const link = `${protocol}://${host}:${port}/login?id=${id}&name=${name}`;

  useEffect(() => {
    if (!id) router.replace('/register');
  }, [id, router]);

  const handleClick = () => {
    router.push('/room');
  };
  return (
    <MainWrapper>
      <StyledDiv>
        <h2 className="h2">Поздравляем, ты в игре!</h2>
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
          Войти в комнату
        </Button>
      </StyledDiv>
    </MainWrapper>
  );
};

export default YourCode;
