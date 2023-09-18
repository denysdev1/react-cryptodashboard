import { ConfirmButton } from './ConfirmButton';
import { WelcomeMessage } from './WelcomeMessage';
import Page from './Page';
import { CoinGrid } from './CoinGrid';
import { Search } from './Search';
import { useContext } from 'react';
import { AppContext } from './AppProvider';

export const SettingsSelector = () => {
  const { favorites } = useContext(AppContext);
  const favoritesFromStorage = JSON.parse(
    localStorage.getItem('cryptoDash')
  )?.favorites;

  return (
    <Page name='settings'>
      <WelcomeMessage />
      <CoinGrid topSection={true} />
      {favorites.length || favoritesFromStorage?.length ? <ConfirmButton /> : null}
      <Search />
      <CoinGrid />
    </Page>
  );
};
