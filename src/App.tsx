import './App.scss';
import Home from './components/Home'
import Alunos from './components/Alunos'
import Sobre from './components/Sobre'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1><strong>CRUD React</strong></h1>
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/alunos">Cadastro de Alunos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={ <Alunos />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
