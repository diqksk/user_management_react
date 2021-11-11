import './App.css';
import {Route,Routes} from "react-router-dom";
import LoginIndex from "./pages/LogIn/LoginIndex";
import MainIndex from "./pages/Main/MainIndex";
import UserListIIndex from "./pages/UserList/UserListIIndex";
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify";
import UpdateUser from "./pages/UserList/UpdateUser";
import ReleaseCondition from "./pages/UserList/ReleaseCondition";
import SignUp from "./pages/signUp/SignUp";

function App({match,location}) {

  return (
      <div className={"App"}>
        <Routes>

                <Route path={"/"} element={<MainIndex/>}/>
                <Route path={"/login"} element={<LoginIndex match={match} location={location}/>}/>
                <Route path={"/release"} element={<ReleaseCondition/>}/>
                <Route path={"/update"} element={<UpdateUser/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/list"} element={<UserListIIndex/>}/>
        </Routes>
          <ToastContainer/>
      </div>
  );
}

export default App;
