import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Error from './components/Error.jsx';
import Home from './components/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.js";
import Profile from './components/Profile.jsx';
import Dashboard from './components/Dashboard.jsx';
import { store } from '../reducers/store.js';
import Recent from './components/Recent.jsx';
import Storage from './components/Storage.jsx';
import Bin from './components/Bin.jsx';
import Notifications from './components/Notifications.jsx';
import AccountPreview from './components/AccountPreview.jsx';
import Files from './components/Files.jsx';
import Folders from './components/Folders.jsx';
import Shared from './components/Shared.jsx';
store.subscribe(()=>{
  console.log("data store connected");
})
let isLoggedIn = store.getState().isLoggedIn;
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="home" element={<Home/>}/>
      {
        isLoggedIn || JSON.parse(localStorage.getItem("isLoggedIn"))?(
          <>
            <Route path="profile" element={<Profile/>}/>
            <Route path="dashboard" element={<Dashboard/>}>
              <Route index element={<AccountPreview/>}/>
              <Route path="files" element={<Files/>}/>
              <Route path="folders" element={<Folders/>}/>
              <Route path="shared" element={<Shared/>}/>
              <Route path="storage" element={<Storage/>}/>
              <Route path="plans" element={<Bin/>}/>
              <Route path="bin" element={<Bin/>}/>
              <Route path="notifications" element={<Notifications/>}/>
            </Route>
            <Route path="recent" element={<Recent/>}/>
          </>
        ):(
          <>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
          </>
        )
      }
      <Route path="*" element={<Error/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)