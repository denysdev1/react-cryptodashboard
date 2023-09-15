import styled from 'styled-components';
import Page from '../Page';
import { CoinSpotlight } from './CoinSpotlight';
import { PriceGrid } from './PriceGrid';

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`;

export const Dashboard = () => {
  return (
    <Page name='dashboard'>
      <PriceGrid />
      <ChartGrid>
        <CoinSpotlight />
        <div>Chart goes here</div>
      </ChartGrid>
    </Page>
  );
};
