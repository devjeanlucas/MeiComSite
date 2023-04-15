import NavBar from "./components/NavBar";
import Home from "./Pages/Home"
import Suporte from "./Pages/Suporte";
import Container from "./components/Container"
import Footer from "./layouts/layoutsHome/Footer"
import Response from "./layouts/layoutsSuporte/Response";
import ControlSuporte from "./layouts/layoutsSuporte/ControlSuporte";
import PlanosPreços from "./Pages/PlanosPreços"
import Perfil from "./Pages/Perfil"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FormularioEdit from "./Formularios/Cliente/FormularioEdit";
import FormularioCadastro from "./Formularios/Cadastro/FormularioCadastro";
import Informations from "./Formularios/Cliente/Informações";
import Negocio from "./Formularios/Cliente/Negocio";
import HomeCliente from "./AreaCliente/Pages/Home";
import Membros from "./Formularios/Cliente/Membros";
import Cardapio from "./AreaCliente/layouts/Restaurante/Cardapio"

function App() {
  return (
      <Router>
        <Container>
            <Routes>
              
              <Route path="/" element={<Home/>}/>

              <Route path="suporte" element={<Suporte/>}>
                <Route path="/suporte/query" element={<ControlSuporte/>}/>
                <Route path="/suporte/:query" element={<Response/>}/>
              </Route>
              
              
              <Route path="/planos" element={<PlanosPreços/>}/>

              <Route path="perfil" element={<Perfil/>}>
                <Route path="/perfil/user/negocio" element={<Negocio/>}/>
                <Route path="/perfil/user/dados" element={<Informations/>}/>
                <Route path="/perfil/user/membros" element={<Membros/>}/>
                <Route path="/perfil/user/config" element={<FormularioEdit/>}/>
                <Route path="/perfil/cadastro" element={<FormularioCadastro/>}/>
              </Route>

              <Route path="/:site" element={<HomeCliente/>}/>
              <Route path="/:site/cardapio" element={<Cardapio/>}/>

            </Routes>
        </Container>
      </Router>
    
  );
}

export default App;
