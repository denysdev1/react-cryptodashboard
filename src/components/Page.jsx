import { useContext } from 'react';
import { AppContext } from './AppProvider';

const Page = ({ name, children }) => {
  const { page } = useContext(AppContext);

  return page === name ? <div>{children}</div> : null;
};

export default Page;
