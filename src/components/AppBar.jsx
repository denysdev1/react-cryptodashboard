import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';
import { useContext } from 'react';

const Logo = styled.div`
  font-size: 1.5em;
  cursor: pointer;
`;

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 60px #03ff03;
    `}
  text-transform: capitalize;
`;

const ControlButton = ({ name }) => {
  const { page, handleChangePage } = useContext(AppContext);

  return (
    <ControlButtonElem
      active={page === name}
      onClick={() => handleChangePage(name)}
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
      <ControlButton name='dashboard' />
      <ControlButton name='settings' />
    </Bar>
  );
};
