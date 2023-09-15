import { createContext, useEffect, useState } from 'react';
import cc from 'cryptocompare';
import _ from 'lodash';

cc.setApiKey(import.meta.env.VITE_API_KEY);

const MAX_FAVORITES = 10;

const initialContext = {
  page: 'dashboard',
  firstVisit: false,
  coinList: [],
  favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
  filteredCoins: [],
  prices: [],
  setFilteredCoins: () => {},
  setCoinList: () => {},
  handleChangePage: () => {},
  confirmFavorites: () => {},
  isFavorite: () => {},
  addCoin: () => {},
  removeCoin: () => {},
};

export const AppContext = createContext(initialContext);

export const AppProvider = ({ children }) => {
  const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
  const [page, setPage] = useState(cryptoDashData?.page || 'settings');
  const [firstVisit, setFirstVisit] = useState(cryptoDashData ? false : true);
  const [coinList, setCoinList] = useState(null);
  const [favorites, setFavorites] = useState(cryptoDashData?.favorites || []);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [prices, setPrices] = useState([]);

  const isFavorite = (key) => _.includes(favorites, key);

  useEffect(() => {
    const fetchCoins = async () => {
      const { Data } = await cc.coinList();

      setCoinList(Data);
    };

    fetchCoins();
    fetchPrices();
  }, []);

  const confirmFavorites = () => {
    setFirstVisit(false);
    setPage('dashboard');
    localStorage.setItem('cryptoDash', JSON.stringify({ favorites }));

    fetchPrices();
  };

  const fetchPrices = async () => {
    if (firstVisit) return;

    const prices = [];

    for (let i = 0; i < favorites.length; i++) {
      try {
        const priceData = await cc.priceFull(favorites, 'USD');
        prices.push(priceData);
      } catch {
        console.log('Error occured while fetching a price!');
      }
    }

    

    setPrices(prices);
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
        filteredCoins,
        prices,
        setFilteredCoins,
        setCoinList,
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
