import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register"
import { BrowserRouter, Route,Routes , Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={user ? <Home />: <Register />}></Route>
      <Route path='/login' element={user? <Navigate to="/" />:<Login />}></Route>
      <Route path='/register' element={user? <Navigate to="/" />:<Register />}></Route>
      <Route path='/profile/:username' element={<Profile />}></Route>
    </Routes>
    </BrowserRouter>
  ) 
}

export default App;
