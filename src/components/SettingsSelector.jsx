import { ConfirmButton } from './ConfirmButton';
import { WelcomeMessage } from './WelcomeMessage';
import Page from './Page';
import { CoinGrid } from './CoinGrid';

export const SettingsSelector = () => {
  return (
    <Page name='settings'>
      <WelcomeMessage />
      <CoinGrid topSection={true} />
      <ConfirmButton />
      <CoinGrid />
    </Page>
  );
};
