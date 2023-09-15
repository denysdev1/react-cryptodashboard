import styled, { css } from 'styled-components';
import { SelectableTile } from '../Tile';
import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import { fontSize3, fontSizeBig } from '../../styles';
import { CoinHeaderGridStyled } from '../CoinHeaderGrid';

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const ChangePercent = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const StyledPriceTile = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      ${fontSize3}
      display: grid;
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}
`;

const PriceTileCompact = ({ coinName, PRICE, CHANGEPCT24HOUR }) => {
  return (
    <StyledPriceTile compact>
      <JustifyLeft>{coinName}</JustifyLeft>
      <ChangePercent red={CHANGEPCT24HOUR < 0}>
        {CHANGEPCT24HOUR.toFixed(5)}
      </ChangePercent>
      <div>${PRICE.toFixed(5)}</div>
    </StyledPriceTile>
  );
};

export const PriceTile = ({ price, index }) => {
  const { coinList } = useContext(AppContext);
  const sym = Object.keys(price)[index];
  const coinName = coinList[sym]?.CoinName;
  const CHANGEPCT24HOUR = price[sym]?.USD.CHANGEPCT24HOUR;
  const PRICE = price[sym]?.USD.PRICE;

  if (!sym) return null;

  if (index >= 5) {
    return (
      <PriceTileCompact
        coinName={coinName}
        PRICE={PRICE}
        CHANGEPCT24HOUR={CHANGEPCT24HOUR}
      />
    );
  }

  return (
    <StyledPriceTile>
      <CoinHeaderGridStyled>
        <div>{coinName}</div>
        <JustifyRight>
          <ChangePercent red={CHANGEPCT24HOUR < 0}>
            {CHANGEPCT24HOUR.toFixed(5)}
          </ChangePercent>
        </JustifyRight>
      </CoinHeaderGridStyled>
      <TickerPrice>${PRICE}</TickerPrice>
    </StyledPriceTile>
  );
};
