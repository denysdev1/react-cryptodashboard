import { useContext } from 'react';
import { SelectableTile, DeletableTile, DisabledTile } from './Tile';
import { AppContext } from './AppProvider';
import CoinHeaderGrid from './CoinHeaderGrid';
import { CoinImage } from './CoinImage';

export const CoinTile = ({ coinKey, topSection }) => {
  const { coinList, addCoin, removeCoin, isFavorite } = useContext(AppContext);
  const coin = coinList[coinKey];

  let TileClass = SelectableTile;

  if (topSection) {
    TileClass = DeletableTile;
  } else if (isFavorite(coinKey)) {
    TileClass = DisabledTile;
  }

  const handleClick = () => {
    return topSection ? removeCoin(coinKey) : addCoin(coinKey);
  };

  return (
    <TileClass onClick={handleClick}>
      <CoinHeaderGrid
        topSection={topSection}
        name={coin.CoinName}
        symbol={coin.Symbol}
      />
      <CoinImage coin={coin} />
    </TileClass>
  );
};
