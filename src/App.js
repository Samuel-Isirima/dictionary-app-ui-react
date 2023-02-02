import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Search from "./components/Search"
import Favourites from "./components/Favourites";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

function App() {
  return (
    <div className="App">
<Router>
      <Header/>
  <Routes>

  <Route path="/login" element={<Login />}/>
  <Route path="/favourites" element={<Favourites />}/>
  <Route path="/register" element={<Register />}/>
  <Route path="/" element={<Search />}/>
 
  </Routes>
  <NotificationContainer/>
</Router>

     
    </div>
  );
}

export default App;
