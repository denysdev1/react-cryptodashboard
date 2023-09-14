import { AppBar } from '../AppBar';
import AppLayout from '../AppLayout';
import { AppProvider } from '../AppProvider';
import { SettingsSelector } from '../SettingsSelector';
import './App.css';
import { Content } from '../Content';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Content>
          <SettingsSelector />
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;

