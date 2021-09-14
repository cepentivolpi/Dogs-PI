import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import { Route } from "react-router-dom";
import Home from './components/Home';
import Fomulario from './components/Formulario';
import Dog from './components/Dog';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Route path="/" exact component={LandingPage} />
    <Route path="/home" exact component={Home} />
    <Route path="/home/:id" exact component={Dog} />
    <Route path="/dog" exact component={Fomulario} />
    </div>
    </BrowserRouter>
  );
}

export default App;
