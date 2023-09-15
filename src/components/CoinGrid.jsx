import { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider';
import { CoinTile } from './CoinTile';

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

export const CoinGrid = ({ topSection }) => {
  const { coinList, favorites } = useContext(AppContext);
  const coins = topSection
    ? favorites
    : Object.keys(coinList).slice(0, topSection ? 10 : 100);

  return (
    <CoinGridStyled>
      {coins.map((coinKey) => (
        <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} />
      ))}
    </CoinGridStyled>
  );
};
