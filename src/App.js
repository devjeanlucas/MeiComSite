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
import Produto from "./AreaCliente/components/Produto";
import Negocio from "./Formularios/Cliente/Negocio";
import Membros from "./Formularios/Cliente/Membros";
import HomeCliente from "./AreaCliente/HomeCliente"
import Produtos from "./Formularios/Cliente/Produtos"
import MarketHome from "./AreaCliente/components/MarketHome";
import Catalogo from "./Pages/Catálogo";
import Categorias from "./AreaCliente/components/Categorias";
import Carrinho from "./AreaCliente/components/Carrinho";
import Teste from "./AreaCliente/components/TesteUpload";

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

              <Route path="/catalogo/:modalidade" element={<Catalogo/>}/>



              <Route path="/:site" element={<HomeCliente/>}>
                <Route index element={<MarketHome/>}/>
                <Route path="/:site/:categoria" element={<Categorias/>}/>
                <Route path="/:site/compras" element={<Carrinho/>}/>
                <Route path="/:site/produto/:nome" element={<Produto/>}/>

              </Route>
              <Route path="/teste" element={<Teste/>}/>

            </Routes>
        </Container>
      </Router>
    
  );
}

export default App;
