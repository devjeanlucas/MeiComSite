import NavBar from "./components/NavBar";
import Home from "./Pages/Home"
import Suporte from "./Pages/Suporte";
import Container from "./components/Container"
import Footer from "./layouts/layoutsHome/Footer"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
      <Router>
        <NavBar/>
        <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/suporte" element={<Suporte/>}/>
            </Routes>
        </Container>
        <Footer/>
      </Router>
    
  );
}

export default App;
