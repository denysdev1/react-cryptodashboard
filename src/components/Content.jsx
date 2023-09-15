import { useContext } from 'react';
import { AppContext } from './AppProvider';

export const Content = ({ children }) => {
  const { coinList, firstVisit, prices } = useContext(AppContext);

  if (!coinList) {
    return <div>Loading coins...</div>;
  }

  if (!firstVisit && !prices) {
    return <div>Loading prices...</div>;
  }

  return <div>{children}</div>;
};
