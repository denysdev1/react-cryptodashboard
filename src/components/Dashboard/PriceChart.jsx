import highChartsConfig from '../../highchartsConfig';
import { Tile } from '../Tile';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTheme from '../../highchartsTheme';
import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import { ChartSelect } from './ChartSelect';

Highcharts.theme = HighchartsTheme;

export const PriceChart = () => {
  const { historical, changeChartSelect } = useContext(AppContext);

  return (
    <Tile>
      <ChartSelect defaultValue='months' onChange={e => changeChartSelect(e.target.value)}>
        <option value='days'>Days</option>
        <option value='weeks'>Weeks</option>
        <option value='months'>Months</option>
      </ChartSelect>
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
