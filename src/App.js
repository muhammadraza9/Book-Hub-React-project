import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Books from './components/Books';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
// import { Auth } from "./components/Auth";


function App() {
   
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

     setTimeout(() => {
            setAlert(null)
        }, 2000);
    }

  return (
    <>
    
        <Router>
          <Navbar/>

          <Alert alert={alert} setAlert={setAlert} />
          

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/books" element={<Books />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              {/* <Route path="/auth" element={<Auth showAlert={showAlert}/>} /> */}
            </Routes>
          </div>
        </Router>
    
    </>
  );
}

export default App;
