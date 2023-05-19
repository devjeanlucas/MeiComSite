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
import CategoriasProdutos from "./Formularios/Cliente/Categorias"
import MarketHome from "./AreaCliente/components/MarketHome";
import Catalogo from "./Pages/Catálogo";
import Categorias from "./AreaCliente/components/Categorias";
import Carrinho from "./AreaCliente/components/Carrinho";
import ItensSacola from "./AreaCliente/components/ItensSacola";
import FormularioDetalhesComprador from "./AreaCliente/Formularios/FormularioDetalhesComprador"
import Vendas from "./Formularios/Cliente/Vendas";
import Produtos from "./Formularios/Cliente/Produtos";
import Fotos from "./Duvidas/Fotos";

function App() {
  return (
      <Router>
        <Container>
            <Routes>
              
              <Route path="/" element={<Home/>}/>

              <Route path="suporte" element={<Suporte/>}>
                <Route index element={<ControlSuporte/>}/>
                <Route path="/suporte/:query" element={<Response/>}/>
                <Route path="/suporte/fotos" element={<Fotos/>}/>
              </Route>
              
              
              <Route path="/planos" element={<PlanosPreços/>}/>

              <Route path="perfil" element={<Perfil/>}>
                <Route path="/perfil/user/negocio" element={<Negocio/>}/>
                <Route path="/perfil/user/categorias" element={<CategoriasProdutos/>}/>
                <Route path="/perfil/user/categorias/:categoria" element={<Produtos/>}/>
                <Route path="/perfil/user/membros" element={<Membros/>}/>
                <Route path="/perfil/user/config" element={<FormularioEdit/>}/>
                <Route path="/perfil/cadastro" element={<FormularioCadastro/>}/>
                <Route path="/perfil/user/vendas" element={<Vendas/>}/>
              </Route>

              <Route path="/catalogo/:modalidade" element={<Catalogo/>}/>



              <Route path="/:site" element={<HomeCliente/>}>
                <Route index element={<MarketHome/>}/>
                <Route path="/:site/:categoria" element={<Categorias/>}/>
                <Route path="/:site/compras" element={<Carrinho/>}>
                  <Route index element={<ItensSacola/>}/>
                  <Route path="/:site/compras/detalhes" element={<FormularioDetalhesComprador/>}/>
                </Route>

                <Route path="/:site/:categoria/:nome" element={<Produto/>}/>

              </Route>
            </Routes>
        </Container>
      </Router>
    
  );
}

export default App;
