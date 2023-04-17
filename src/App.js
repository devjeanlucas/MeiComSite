import Home from "./Pages/Home"
import Suporte from "./Pages/Suporte";
import Container from "./components/Container"
import Response from "./layouts/layoutsSuporte/Response";
import ControlSuporte from "./layouts/layoutsSuporte/ControlSuporte";
import PlanosPreços from "./Pages/PlanosPreços"
import Perfil from "./Pages/Perfil"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FormularioEdit from "./Formularios/Cliente/FormularioEdit";
import FormularioCadastro from "./Formularios/Cadastro/FormularioCadastro";
import Produto from "./AreaCliente/layouts/Restaurante/Produto";
import Negocio from "./Formularios/Cliente/Negocio";
import Membros from "./Formularios/Cliente/Membros";
import HomeCliente from "./AreaCliente/HomeCliente"
import Categories from "./AreaCliente/layouts/Restaurante/Cardapio";
import Produtos from "./Formularios/Cliente/Produtos"

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
                <Route path="/perfil/user/dados" element={<Produtos/>}/>
                <Route path="/perfil/user/membros" element={<Membros/>}/>
                <Route path="/perfil/user/config" element={<FormularioEdit/>}/>
                <Route path="/perfil/cadastro" element={<FormularioCadastro/>}/>
              </Route>



              <Route path="/:site" element={<HomeCliente/>}>
                <Route path="/:site/cardapio" element={<Categories/>}/>
                <Route path="/:site/cardapio/:nome" element={<Produto/>}/>
              </Route>

            </Routes>
        </Container>
      </Router>
    
  );
}

export default App;
