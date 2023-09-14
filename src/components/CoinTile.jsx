import { useContext } from 'react';
import { SelectableTile } from './Tile';
import { AppContext } from './AppProvider';
import CoinHeaderGrid from './CoinHeaderGrid';
import { CoinImage } from './CoinImage'

export const CoinTile = ({ coinKey }) => {
  const { coinList } = useContext(AppContext);
  const coin = coinList[coinKey];

  return (
    <SelectableTile>
      <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} />
      <CoinImage coin={coin} />
    </SelectableTile>
  );
};
