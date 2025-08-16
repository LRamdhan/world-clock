import './css/font.css';
import './css/index.css';
import Container from './component/Container.js';
import { MainProvider } from './context/mainContext';

const App = () => {

  return (
    <MainProvider>
      <Container />
    </MainProvider>
  )
}

export default App