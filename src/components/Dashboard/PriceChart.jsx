import highChartsConfig from '../../highchartsConfig';
import { Tile } from '../Tile';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTheme from '../../highchartsTheme';

export const PriceChart = () => {
  return (
    <Tile>
      <HighchartsReact
        options={highChartsConfig()}
        highcharts={Highcharts}
        constructorType='chart'
      />
    </Tile>
  );
};
