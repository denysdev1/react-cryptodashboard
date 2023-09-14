import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';
import { SelectableTile } from './Tile';

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

export const CoinGrid = () => {
  const { coinList } = useContext(AppContext);

  return (
    <CoinGridStyled>
      {Object.keys(coinList).map((coinKey) => (
        <SelectableTile key={coinKey}>{coinKey}</SelectableTile>
      ))}
    </CoinGridStyled>
  );
};
