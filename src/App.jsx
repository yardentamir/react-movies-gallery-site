import './App.css';

import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import MyRoutes from './routes/MyRoutes';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
        <MyRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
