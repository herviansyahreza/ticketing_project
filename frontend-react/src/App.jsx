import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/layout';
import Dashboard from './components/Dashboard';
import Ticket from './components/Ticket';
import TicketUser from './components/TicketUser';
import FormTicket from './components/FormTicket';
import FormTicketUser from './components/FormTicketUser';
import Login from './components/login';
import RegisterForm from './components/register';
import Aset from './components/Aset';
import FormAset from './components/FormAset';
import Notfound from './components/Notfound';
import Profile from './components/Profile';
import Users from './components/Users';
import FormUser from './components/FormUser';
import EditTicket from './components/EditTicket';
import EditAset from './components/EditAset';
import Edituser from './components/EditUser';
import Teknisi from './components/Teknisi';
import SolusiPopuler from './components/SolusiPopuler';
import EditTicketUser from './components/EditTicketUser';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {<Route index element={<Dashboard />} />}
          {<Route path="tiket" element={<Ticket />} />}
          {<Route path="tiket_byUser" element={<TicketUser />} />}
          {<Route path="form-tiket" element={<FormTicket/>} />}
          {<Route path="form-tiket-user" element={<FormTicketUser/>} />}
          {<Route path="edit-tiket/:id" element={<EditTicket/>} />}
          {<Route path="aset" element={<Aset/>} />}
          {<Route path="form-aset" element={<FormAset/>} />}
          {<Route path="edit-aset/:id" element={<EditAset/>} />}
          {<Route path="profile" element={<Profile/>} />}
          {<Route path="users" element={<Users/>} />}
          {<Route path="form-user" element={<FormUser/>}/>}
          {<Route path="edit-user/:id" element={<Edituser/>} />}
          {<Route path="teknisi" element={<Teknisi />} />}
          {<Route path="solusi-populer" element={<SolusiPopuler/>} />}
          {<Route path="edit-tiket-user/:id" element={<EditTicketUser/>} />}
        </Route>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<RegisterForm/>} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </Router>
  );
}

export default App;