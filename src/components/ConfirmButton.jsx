import { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider';

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: green;
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
