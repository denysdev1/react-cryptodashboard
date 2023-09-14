import { ConfirmButton } from './ConfirmButton';
import { WelcomeMessage } from './WelcomeMessage';
import Page from './Page';

export const SettingsSelector = () => {
  return (
    <Page name='settings'>
      <WelcomeMessage />
      <ConfirmButton />
    </Page>
  );
};
