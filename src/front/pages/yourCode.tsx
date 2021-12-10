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
import CodeBlock from 'components/CodeBlock';
import { host, protocol } from './_app';

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
          <CodeBlock text={id} />
          {mainPageData.yourLink}
          <CodeBlock text={id}>
            <Link href={link}>
              <a>{link}</a>
            </Link>
            <CopyButton text={link} />
          </CodeBlock>
        </p>
        <Button variant="text" onClick={handleClick}>
          {mainPageData.enterRoom}
        </Button>
      </StyledDiv>
    </MainWrapper>
  );
};

export default YourCode;
