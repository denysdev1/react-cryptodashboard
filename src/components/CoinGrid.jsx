import { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider';
import { CoinTile } from './CoinTile';

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

const getLowerSectionCoins = (coinList, filteredCoins) => {
  return (
    (filteredCoins.length && filteredCoins.slice(0, 100)) ||
    Object.keys(coinList).slice(0, 100)
  );
};

export const CoinGrid = ({ topSection }) => {
  const { coinList, favorites, filteredCoins } = useContext(AppContext);
  const coins = topSection
    ? favorites
    : getLowerSectionCoins(coinList, filteredCoins);

  return (
    <CoinGridStyled>
      {coins.map((coinKey) => (
        <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} />
      ))}
    </CoinGridStyled>
  );
};
