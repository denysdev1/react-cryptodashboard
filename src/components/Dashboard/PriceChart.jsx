import highChartsConfig from '../../highchartsConfig';
import { Tile } from '../Tile';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTheme from '../../highchartsTheme';
import { useContext } from 'react';
import { AppContext } from '../AppProvider';

Highcharts.theme = HighchartsTheme;

export const PriceChart = () => {
  const { historical } = useContext(AppContext);

  return (
    <Tile>
      {historical?.length ? (
        <HighchartsReact
          options={highChartsConfig(historical)}
          highcharts={Highcharts}
        />
      ) : (
        <div>Loading Historical Data</div>
      )}
    </Tile>
  );
};
