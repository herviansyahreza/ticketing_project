import logo from './logo.svg'
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import { Home, Login, Profile, Register, NotFound } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
