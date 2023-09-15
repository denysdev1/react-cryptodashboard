import { createContext, useEffect, useState } from 'react';
import cc from 'cryptocompare';
import _ from 'lodash';

cc.setApiKey(import.meta.env.VITE_API_KEY);

const MAX_FAVORITES = 10;

const initialContext = {
  page: 'dashboard',
  favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
  firstVisit: false,
  handleChangePage: () => {},
  confirmFavorites: () => {},
  isFavorite: () => {},
  addCoin: () => {},
  removeCoin: () => {},
  coinList: [],
};

export const AppContext = createContext(initialContext);

export const AppProvider = ({ children }) => {
  const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
  const [page, setPage] = useState(cryptoDashData?.page || 'settings');
  const [firstVisit, setFirstVisit] = useState(true);
  const [coinList, setCoinList] = useState(null);
  const [favorites, setFavorites] = useState(cryptoDashData?.favorites || []);

  const isFavorite = (key) => _.includes(favorites, key);

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
    localStorage.setItem('cryptoDash', JSON.stringify({ favorites }));
  };

  const addCoin = (key) => {
    if (favorites.length < MAX_FAVORITES) {
      setFavorites((prevFavorites) => [...prevFavorites, key]);
    }
  };

  const removeCoin = (key) => {
    setFavorites((prevFavorites) => _.without(prevFavorites, key));
  };


  return (
    <AppContext.Provider
      value={{
        ...initialContext,
        ...cryptoDashData,
        page,
        firstVisit,
        coinList,
        favorites,
        isFavorite,
        handleChangePage: setPage,
        confirmFavorites,
        addCoin,
        removeCoin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
