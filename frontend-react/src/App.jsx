import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/layout';
import Dashboard from './components/Dashboard';
import Ticket from './components/Ticket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ticket" element={<Ticket />} />
        </Route>
        <Route path="login" element={<div>this is login page</div>} />
      </Routes>
    </Router>
  );
}

export default App;