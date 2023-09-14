export const CoinImage = ({ coin, style }) => {
  return (
    <img
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
      style={style || { height: '50px ' }}
    />
  );
};
