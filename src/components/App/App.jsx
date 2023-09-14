import { AppBar } from '../AppBar';
import AppLayout from '../AppLayout';
import { AppProvider } from '../AppProvider';
import { WelcomeMessage } from '../WelcomeMessage';
import './App.css';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <WelcomeMessage />
      </AppProvider>
    </AppLayout>
  );
}

export default App;

