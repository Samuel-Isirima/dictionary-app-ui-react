import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Search from "./components/Search"
import Definition from "./components/Definition";
import Favourites from "./components/Favourites";

function App() {
  return (
    <div className="App">
      <Header/>
      <Search/>
      <Login/>
      <Register/>
      <Definition/>
      <Favourites/>
    </div>
  );
}

export default App;
