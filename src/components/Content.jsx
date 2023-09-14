import { useContext } from 'react';
import { AppContext } from './AppProvider';

export const Content = ({ children }) => {
  const { coinList } = useContext(AppContext);

  return coinList ? <div>{children}</div> : <div>Loading Coins</div>;
};
