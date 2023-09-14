import styled, { css } from 'styled-components';

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

const ControlButton = ({ name, active }) => {
  return <ControlButtonElem active={active}>{name}</ControlButtonElem>;
};

export const AppBar = () => {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div></div>
      <ControlButton active name='dashboard' />
      <ControlButton name='settings' />
    </Bar>
  );
};
