import './App.css';
import { Route, Routes } from 'react-router';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import PrimaryNav from './components/PrimaryNav';
import Protected from './components/Protected';

function App() {
  return (
    <div className="App">
      <PrimaryNav />
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;