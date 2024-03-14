import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/layout';
import Dashboard from './components/Dashboard';
import Ticket from './components/Ticket';
import FormTicket from './components/FormTicket';
import Login from './components/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="form-ticket" element={<FormTicket/>} />
        </Route>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<div>this is register page</div>} />
      </Routes>
    </Router>
  );
}

export default App;