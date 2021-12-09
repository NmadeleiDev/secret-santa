import type { NextPage } from 'next';
import Head from 'next/head';
import { MainWrapper } from 'layouts/MainWrapper';
import Button from 'components/Button';
import { mainPageData } from 'data/strings';
import styled from 'styled-components';
import Link from 'next/link';
import { useEffect } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useRouter } from 'next/router';

const StyledMain = styled.main`
  max-width: var(--desctop-width);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  .h1 {
    font-size: 3rem;
  }

  .description {
    font-size: 1.5rem;
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{mainPageData.title}</title>
      </Head>
      <MainWrapper>
        <StyledMain>
          <h1 className="h1">{mainPageData.title}</h1>
          <section>
            <p className="description">{mainPageData.description}</p>
          </section>
          <section>
            <Link href="/room">
              <a>
                <Button variant="primary">{mainPageData.mainButton}</Button>
              </a>
            </Link>
            <Link href="/register">
              <a>
                <Button variant="outline">{mainPageData.registerButton}</Button>
              </a>
            </Link>
          </section>
        </StyledMain>
      </MainWrapper>
    </>
  );
};

export default Home;
