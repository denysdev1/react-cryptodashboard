import { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider';
import { fontSize1, greenBoxShadow, color3 } from '../styles';

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1}
  padding: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    ${greenBoxShadow}
  }
`;

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

export const ConfirmButton = () => {
  const { confirmFavorites } = useContext(AppContext);

  return (
    <CenterDiv>
      <ConfirmButtonStyled onClick={confirmFavorites}>
        Confirm Favorites
      </ConfirmButtonStyled>
    </CenterDiv>
  );
};
