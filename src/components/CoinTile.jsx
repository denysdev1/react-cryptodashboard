import { useContext } from 'react';
import { SelectableTile, DeletableTile, DisabledTile } from './Tile';
import { AppContext } from './AppProvider';
import CoinHeaderGrid from './CoinHeaderGrid';
import { CoinImage } from './CoinImage';

export const CoinTile = ({ coinKey, topSection }) => {
  const { coinList } = useContext(AppContext);
  const coin = coinList[coinKey];

  let TileClass = SelectableTile;

  if (topSection) {
    TileClass = DeletableTile;
  }

  return (
    <TileClass>
      <CoinHeaderGrid
        topSection={topSection}
        name={coin.CoinName}
        symbol={coin.Symbol}
      />
      <CoinImage coin={coin} />
    </TileClass>
  );
};
