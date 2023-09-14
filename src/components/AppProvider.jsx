import { createContext, useEffect, useState } from 'react';
import cc from 'cryptocompare';

cc.setApiKey(import.meta.env.VITE_API_KEY);

export const AppContext = createContext({
  page: 'dashboard',
  firstVisit: false,
  handleChangePage: () => {},
  confirmFavorites: () => {},
  coinList: [],
});

export const AppProvider = ({ children }) => {
  const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
  const [page, setPage] = useState(cryptoDashData?.page || 'settings');
  const [firstVisit, setFirstVisit] = useState(true);
  const [coinList, setCoinList] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      const { Data } = await cc.coinList();

      setCoinList(Data);
    };

    fetchCoins();
  }, []);

  const confirmFavorites = () => {
    setFirstVisit(false);
    setPage('dashboard');
    localStorage.setItem('cryptoDash', JSON.stringify({ test: 'hello' }));
  };

  return (
    <AppContext.Provider
      value={{
        page,
        firstVisit,
        coinList,
        handleChangePage: setPage,
        confirmFavorites,
        ...cryptoDashData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
