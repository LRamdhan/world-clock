import './css/font.css';
import './css/index.css';
import Container from './component/Container.js';
import { MainProvider } from './context/mainContext';
import { CountryResultProvider } from './context/countryResultContext';

const App = () => {

  return (
    <MainProvider>
      <CountryResultProvider>
        <Container />
      </CountryResultProvider>
    </MainProvider>
  )
}

export default App