import { createContext, useState } from 'react';

export const AppContext = createContext({
  page: 'dashboard',
  handleChangePage: () => {},
});

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState('dashboard');

  return (
    <AppContext.Provider value={{ page, handleChangePage: setPage }}>
      {children}
    </AppContext.Provider>
  );
};
