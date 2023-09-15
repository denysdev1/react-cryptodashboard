import styled, { css } from 'styled-components';

const StyledCoinImage = styled.img`
  height: 60px;
  flex: 0 auto;
  ${(props) =>
    props.spotlight &&
    css`
      height: 200px;
    `}
  display: block;
  margin: auto;
`;

export const CoinImage = ({ coin, spotlight }) => {
  return (
    <StyledCoinImage
      spotlight={spotlight}
      src={`http://cryptocompare.com/${coin?.ImageUrl}`}
      alt={coin?.CoinSymbol}
    />
  );
};
