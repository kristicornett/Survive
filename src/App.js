import logo from './logo.svg';
import './App.css';
import { Authorized } from './components/Authorized';
import { NavBar } from './components/nav/NavBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Authorized>
      <>
        <div className="app-base outer">
          <div className="app-base inner">
        <NavBar></NavBar>
        <div className='app-base body'>
        <Outlet />
        </div>
        </div>
        </div>
      </>
    </Authorized>
  );
}

export default App;
