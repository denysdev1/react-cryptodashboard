import highChartsConfig from '../../highChartsConfig';
import { Tile } from '../Tile';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const PriceChart = () => {
  return (
    <Tile>
      <HighchartsReact
        options={{
          chart: {
            type: 'spline',
          },
          title: {
            text: 'My chart',
          },
          series: [
            {
              data: [1, 2, 1, 4, 3, 6],
            },
          ],
        }}
        highcharts={Highcharts}
        constructorType='chart'
      />
    </Tile>
  );
};
