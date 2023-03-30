import logo from './logo.svg';
import './App.css';
import { Authorized } from './components/Authorized';
import { NavBar } from './components/nav/NavBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Authorized>
      <>
        <NavBar></NavBar>
        <Outlet />
      </>
    </Authorized>
  );
}

export default App;
