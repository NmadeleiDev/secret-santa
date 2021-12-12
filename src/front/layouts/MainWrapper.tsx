import { Fab } from 'components/Fab';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { mainPageData } from 'data/strings';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useAppSelector } from 'store/store';
import { userSelector } from 'store/feaures/user';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 24px;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.base.darkerBG};
  position: relative;

  .fab {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    font-size: 2rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.text.dark};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.base.shadow};

    &:hover {
      box-shadow: 0 5px 15px ${({ theme }) => theme.colors.base.shadow};
    }
  }

  .tooltipWrapper {
    padding: 1rem;

    .tooltipBlock {
      font-size: 1rem;
    }
  }
`;

export const MainWrapper: React.FC = ({ children }) => {
  // const { id } = useAppSelector(userSelector);
  // const { getItem, login } = useLocalStorage();
  // useEffect(() => {
  //   if (id) return;
  //   const userId = getItem('id');
  //   console.log({ userId });
  //   userId && login(userId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <StyledDiv className=".mainWrapper">
      {children}
      <Fab className="fab" data-tip="React-tooltip" data-for="fab">
        ?
      </Fab>

      <ReactTooltip
        id="fab"
        place="left"
        type="light"
        effect="solid"
        className="tooltipWrapper"
      >
        <div className="tooltipBlock">{mainPageData.fabToolpip}</div>
      </ReactTooltip>
    </StyledDiv>
  );
};
