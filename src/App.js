import NavBar from "./components/NavBar";
import Home from "./Pages/Home"
import Suporte from "./Pages/Suporte";
import Container from "./components/Container"
import Footer from "./layouts/layoutsHome/Footer"
import Response from "./layouts/layoutsSuporte/Response";
import ControlSuporte from "./layouts/layoutsSuporte/ControlSuporte";
import PlanosPreços from "./Pages/PlanosPreços"
import Perfil from "./Pages/Perfil"
import InfoPerfil from "./layouts/layoutsPerfil/InfoPerfil"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Fomulario from "./Formularios/Formulario";

function App() {
  return (
      <Router>
        <NavBar/>
        <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>

              <Route path="suporte" element={<Suporte/>}>
                <Route path="/suporte/query" element={<ControlSuporte/>}/>
                <Route path="/suporte/:query" element={<Response/>}/>
              </Route>
              <Route path="/planos" element={<PlanosPreços/>}/>



              <Route path="perfil" element={<Perfil/>}>
                <Route path="/perfil/:id" element={<InfoPerfil/>}/>
                <Route path="/perfil/:id/dados" element={<Fomulario/>}/>
              </Route>

            </Routes>
        </Container>
        <Footer/>
      </Router>
    
  );
}

export default App;
