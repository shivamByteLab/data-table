import { PrimeReactProvider } from 'primereact/api';
import './App.css'

import Main from './components/Main'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

        
function App() {

  return (
    <PrimeReactProvider>
      <Main/>
    </PrimeReactProvider>
  )
}

export default App
