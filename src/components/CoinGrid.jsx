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

export const CoinGrid = () => {
  const { coinList } = useContext(AppContext);
  const slicedCoins = Object.keys(coinList).slice(0, 100);

  return (
    <CoinGridStyled>
      {slicedCoins.map((coinKey) => (
        <CoinTile key={coinKey} coinKey={coinKey} />
      ))} 
    </CoinGridStyled>
  );
};
