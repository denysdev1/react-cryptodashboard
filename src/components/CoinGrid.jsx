import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const CoinGrid = () => {
  const { coinList } = useContext(AppContext);

  return (
    <CoinGridStyled>
      {Object.keys(coinList).map((coinKey) => (
        <div key={coinKey}>{coinKey}</div>
      ))}
    </CoinGridStyled>
  );
};
