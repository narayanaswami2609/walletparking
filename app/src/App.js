
import './App.css'; 
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';


import Rating from './components/Rating';



function App() { 

  return ( 
    <div className='App'> 
    
    <style>{'body { background-color: lightOrange; }'}</style>
    <Router>
    <Navbar/>
   
    <Routes>
      <Route path='Login' element={<Login/>}/>
      <Route path='Registration' element={<Registration/>}/>
  
      
      <Route path='Rating' element={<Rating/>}/>
      
    </Routes>
    </Router>
    
    
    </div> 
  ); 
} 
 
export default App