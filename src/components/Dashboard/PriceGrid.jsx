import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import styled from 'styled-components';
import { PriceTile } from './PriceTile';

const StyledPriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

export const PriceGrid = () => {
  const { prices } = useContext(AppContext);

  return (
    <StyledPriceGrid>
      {prices.map((price, i) => {
        return <PriceTile key={i} price={price} index={i} />;
      })}
    </StyledPriceGrid>
  );
};
