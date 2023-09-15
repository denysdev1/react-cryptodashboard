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
  currentFavorite: null,
  handleSetCurrentFavorite: () => {},
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
  const [currentFavorite, setCurrentFavorite] = useState(
    cryptoDashData?.currentFavorite
  );

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
    const currentFavorite = favorites[0];
    setFirstVisit(false);
    setPage('dashboard');
    setCurrentFavorite(currentFavorite);
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({ favorites, currentFavorite })
    );

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

  const handleSetCurrentFavorite = (sym) => {
    setCurrentFavorite(sym);
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('cryptoDash')),
        currentFavorite: sym,
      })
    );
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
        currentFavorite,
        handleSetCurrentFavorite,
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
