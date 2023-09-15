import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../styles';
import { useContext } from 'react';
import { AppContext } from './AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 250px minmax(1fr);
  
  @media (min-width: 560px) {
    grid-template-columns: 250px 1fr;
  }
`;

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

export const Search = () => {
  const { setFilteredCoins, coinList } = useContext(AppContext);

  const handleChangeCoinsFilter = _.debounce((e) => {
    const inputValue = e.target.value;
    const coinSymbols = Object.keys(coinList);
    const coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);
    const allStringsToSearch = coinSymbols.concat(coinNames);
    const fuzzyResults = fuzzy
      .filter(inputValue, allStringsToSearch, {})
      .map((result) => result.string);

    const filteredCoins = _.pickBy(coinList, (result, symKey) => {
      const coinName = result.CoinName;

      return (
        _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
      );
    });

    setFilteredCoins(Object.keys(filteredCoins));
  }, 500);

  return (
    <SearchGrid>
      <h2>Search all coins</h2>
      <SearchInput onChange={handleChangeCoinsFilter} />
    </SearchGrid>
  );
};
