/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import cc from 'cryptocompare';
import _ from 'lodash';
import moment from 'moment';

cc.setApiKey(import.meta.env.VITE_API_KEY);

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

const initialContext = {
  page: 'dashboard',
  firstVisit: false,
  coinList: [],
  favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
  timeInterval: 'months',
  filteredCoins: [],
  prices: [],
  currentFavorite: null,
  historical: [],
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
  const [firstVisit, setFirstVisit] = useState(cryptoDashData ? false : true);
  const [page, setPage] = useState(firstVisit ? 'settings' : 'dashboard');
  const [coinList, setCoinList] = useState(null);
  const [favorites, setFavorites] = useState(cryptoDashData?.favorites || []);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [prices, setPrices] = useState([]);
  const [currentFavorite, setCurrentFavorite] = useState(
    cryptoDashData?.currentFavorite
  );
  const [historical, setHistorical] = useState([]);
  const [timeInterval, setTimeInterval] = useState('months');

  const isFavorite = (key) => _.includes(favorites, key);

  const fetchCoins = async () => {
    const { Data } = await cc.coinList();

    setCoinList(Data);
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

  const fetchHistorical = async () => {
    if (firstVisit) return;

    const promises = [];

    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          currentFavorite,
          'USD',
          moment()
            .subtract({ [timeInterval]: units })
            .toDate()
        )
      );
    }

    const historicalFromServer = await Promise.all(promises);
    const historical = [
      {
        name: currentFavorite,
        data: historicalFromServer.map((ticker, index) => [
          moment()
            .subtract({ [timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD,
        ]),
      },
    ];

    setHistorical(historical);
  };

  useEffect(() => {
    fetchCoins();
    fetchPrices();
  }, []);

  useEffect(() => {
    fetchHistorical();
  }, [currentFavorite, timeInterval]);

  const confirmFavorites = () => {
    const currentFavorite = favorites[0];
    setFirstVisit(false);

    if (currentFavorite) {
      setPage('dashboard');
    }

    setCurrentFavorite(currentFavorite);
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({ favorites, currentFavorite })
    );

    fetchPrices();
    fetchHistorical();
  };

  const handleSetCurrentFavorite = (sym) => {
    setCurrentFavorite(sym);
    setHistorical(null);
    fetchHistorical();
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

  const changeChartSelect = (value) => {
    setTimeInterval(value);
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
        timeInterval,
        filteredCoins,
        prices,
        currentFavorite,
        historical,
        handleSetCurrentFavorite,
        setFilteredCoins,
        setCoinList,
        isFavorite,
        handleChangePage: setPage,
        confirmFavorites,
        addCoin,
        removeCoin,
        changeChartSelect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
