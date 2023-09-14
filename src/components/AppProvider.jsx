import { createContext, useState } from 'react';

export const AppContext = createContext({
  page: 'dashboard',
  firstVisit: false,
  handleChangePage: () => {},
  confirmFavorites: () => {},
});

export const AppProvider = ({ children }) => {
  const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
  const [page, setPage] = useState(cryptoDashData?.page || 'settings');
  const [firstVisit, setFirstVisit] = useState(true);

  const confirmFavorites = () => {
    setFirstVisit(false);
    setPage('dashboard');
    localStorage.setItem('cryptoDash', JSON.stringify({ test: 'hello' }));
  };

  return (
    <AppContext.Provider
      value={{
        page,
        firstVisit,
        handleChangePage: setPage,
        confirmFavorites,
        ...cryptoDashData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
