import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/auth/Login';
import { ZombieSightingList } from './components/zombies/ZombieSightingList';
import { ZombieSightingForm } from './components/zombies/ZombieSightingForm';
import { UpdateZombieSightingForm } from './components/zombies/UpdateZombieSightingStatus';
import { TownList } from './components/towns/TownList';
import { AddTown } from './components/towns/AddTownForm';
import { TradeList } from './components/trades/TradeList';
import { AddTrade } from './components/trades/AddTrade';
import { TradeDetails } from './components/trades/TradeDetails';
import { Register } from './components/auth/Register';
import { ZombieSightingDetails } from './components/zombies/ZombieSightingDetails';
import { UserView } from './components/views/UserView'
import { ParkList } from './components/parks/ParkList';
import { TownDetails } from './components/towns/TownDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/', element: <UserView />},
      {
        path: "zombies",
        element: <ZombieSightingList />
      },
      {
        path: "zombies/add",
        element: <ZombieSightingForm />
      },
      {
        path: "zombies/:sightingId/status",
        element: <UpdateZombieSightingForm />
      },
      {
        path: "towns",
        element: <TownList />
      },
      {
        path: "towns/add",
        element: <AddTown />
      },
      {
        path: "trades",
        element: <TradeList />
      },
      {
        path: "trades/add",
        element: <AddTrade />
      },
      {
        path: "trades/:tradeId",
        element: <TradeDetails />
      },
      {
        path:'zombies/:zombieId',
        element: <ZombieSightingDetails />
      },
      {
        path: "parks",
        element: <ParkList />

      },
      {
        path: 'towns/:townId',
        element: <TownDetails />
      }
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
