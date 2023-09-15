import { AppContext } from '../AppProvider';
import { Tile } from '../Tile';
import { CoinImage } from '../CoinImage';
import { useContext } from 'react';
import styled from 'styled-components';

const SpotlightName = styled.h2`
  text-align: center;
`;

export const CoinSpotlight = () => {
  const { currentFavorite, coinList } = useContext(AppContext);

  return (
    <Tile>
      <SpotlightName>Hello {coinList[currentFavorite].CoinName}</SpotlightName>
      <CoinImage spotlight coin={coinList[currentFavorite]} />
    </Tile>
  );
};
