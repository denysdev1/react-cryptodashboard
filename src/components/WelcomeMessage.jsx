import { useContext } from 'react';
import { AppContext } from './AppProvider';

export const WelcomeMessage = () => {
  const { firstVisit } = useContext(AppContext);

  return firstVisit ? (
    <div>Welcome to CryptoDash, please select your favorite coins to begin.</div>
  ) : null;
};
