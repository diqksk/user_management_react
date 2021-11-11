import React, {useState} from 'react';
import axios from "../../utils/axiosUtil";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom"

const initState ={user_email:"", user_password:"", user_name:""}

const SignUp = () => {

    const [userInputs, setUserinputs] = useState(initState);
    const navigate = useNavigate();
    const inputChange = (e)=>{
        setUserinputs({...userInputs,[e.target.name]:e.target.value});
    }

    const signUp = async (e)=>{
        e.preventDefault();
        const result = await axios.post("http://localhost:3030/api/v1/user",userInputs);

        if(result?.err){
            toast(result.err);
        }else if(result?.msg){
            toast(result.msg);
            return navigate("/login");
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            <div>
                <form onSubmit={signUp}>
                    <div>
                        <input type="text" name={"user_email"} onChange={inputChange} value={userInputs.user_email} placeholder={"Email"}/>
                    </div>
                    <div>
                        <input type="password" name={"user_password"} onChange={inputChange} value={userInputs.user_password} placeholder={"Password (min.8 word )"}/>
                    </div>
                    <div>
                        <input type="text" name={"user_name"} onChange={inputChange} value={userInputs.user_name} placeholder={"name (min.2 word)"}/>
                    </div>
                    <p>
                        <button type={"submit"} className={"common-btn"}>Sign up</button>
                    </p>
                    <p>
                        <Link to={"/login"}><button type={"button"} className={"common-btn"}>Log in</button></Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;