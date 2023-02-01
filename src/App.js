import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Search from "./components/Search"
import Definition from "./components/Definition";
import Favourites from "./components/Favourites";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
<Router>
      <Header/>
  <Routes>

  <Route path="/login" element={<Login />}/>
  <Route path="/register" element={<Register />}/>
  <Route path="/" element={<Search />}/>
 
  </Routes>
</Router>

     
    </div>
  );
}

export default App;
