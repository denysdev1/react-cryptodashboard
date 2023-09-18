import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';
import { useContext } from 'react';

const Logo = styled.div`
  font-size: 1.5em;
  cursor: pointer;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 180px auto 200px;

  @media (min-width: 540px) {
    display: grid;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 16px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (min-width: 540px) {
    flex-direction: row;
  }
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #6161f1;
    `}
  text-transform: capitalize;
  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
`;

const ControlButton = ({ name }) => {
  const { page, handleChangePage, firstVisit } = useContext(AppContext);
  const favoritesFromStorage = JSON.parse(
    localStorage.getItem('cryptoDash')
  )?.favorites;

  return (
    <ControlButtonElem
      active={page === name}
      onClick={() => handleChangePage(name)}
      hidden={
        (firstVisit || !favoritesFromStorage?.length) && name === 'dashboard'
      }
    >
      {name}
    </ControlButtonElem>
  );
};

export const AppBar = () => {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div></div>
      <ButtonsContainer>
        <ControlButton name='dashboard' />
        <ControlButton name='settings' />
      </ButtonsContainer>
    </Bar>
  );
};
