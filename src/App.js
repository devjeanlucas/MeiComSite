import NavBar from "./components/NavBar";
import Home from "./Pages/Home"
import Container from "./components/Container"

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Container>
        <Home/>
      </Container>
    </div>
  );
}

export default App;
