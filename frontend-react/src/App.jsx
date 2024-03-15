import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/layout';
import Dashboard from './components/Dashboard';
import Ticket from './components/Ticket';
import FormTicket from './components/FormTicket';
import Login from './components/login';
import RegisterForm from './components/Register';
import Aset from './components/Aset';
import FormAset from './components/FormAset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="form-ticket" element={<FormTicket/>} />
          <Route path="aset" element={<Aset/>} />
          <Route path="form-aset" element={<FormAset/>} />
        </Route>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<RegisterForm/>} />
      </Routes>
    </Router>
  );
}

export default App;