import { AppBar } from '../AppBar';
import AppLayout from '../AppLayout';
import { AppProvider } from '../AppProvider';
import { SettingsSelector } from '../SettingsSelector';
import './App.css';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <SettingsSelector />
      </AppProvider>
    </AppLayout>
  );
}

export default App;

