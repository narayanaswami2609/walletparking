
import './App.css'; 
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from "react-redux";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';

import Rating from './components/Rating';
import Home from './components/pages/Home';
import { useEffect } from 'react';
import { dispatchLogin } from './actions/authAction';



function App() { 
  const dispatch = useDispatch()

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      dispatch(dispatchLogin())
    }
  })
  return ( 
    <div className='App'> 
    
    <style>{'body { background-color: white; }'}</style>
    <Router>
    <Navbar/>
   
    <Routes>
      <Route path='Login' element={<Login/>}/>
      <Route path='Registration' element={<Registration/>}/>
  
      
      <Route path='Rating' element={<Rating/>} style={{}}/>
      <Route path='home' element={<Home/>} />
      
    </Routes>
    </Router>
    
    
    </div> 
  ); 
} 
 
export default App