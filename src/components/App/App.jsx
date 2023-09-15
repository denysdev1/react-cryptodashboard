import { AppBar } from '../AppBar';
import AppLayout from '../AppLayout';
import { AppProvider } from '../AppProvider';
import { SettingsSelector } from '../SettingsSelector';
import { Content } from '../Content';
import { Dashboard } from '../Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Content>
          <SettingsSelector />
          <Dashboard />
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;

