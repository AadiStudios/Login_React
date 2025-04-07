import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Home from './Components/Home';
function App() {
  return (
   <div className ="App">
    <Router>
      <nav style={{marginBottom:'20px'}}>
      <Link to="/" style = {{marginRight: '10px'}}>signup</Link>
      <Link to="/login">Login</Link>
      </nav>


      <Routes>
      <Route path="/" element ={<SignUp/>}/>      
      <Route path="/login" element ={<Login/>} />     
      <Route path="/home" element = {<Home/>}/>
       </Routes>
    </Router>
   </div>
  );
}

export default App;
