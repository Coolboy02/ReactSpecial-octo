import logo from './logo.svg';
import './App.css';
import NavBarElem from './elements/navbar';
import { Outlet } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBarElem/>
      <Outlet/>
    </div>
  );
}

export default App;
