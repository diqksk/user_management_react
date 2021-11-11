import React, {useEffect, useState} from 'react';
import {web} from "../../config/oauth.json";
import queryString from "query-string";
import {Link, useLocation, useNavigate} from "react-router-dom"
import axios from "../../utils/axiosUtil";
import {ToastContainer,toast} from "react-toastify";

const LoginIndex = () => {
    const [userInputs, setUserinputs] = useState({user_email: "", user_password: ""});
    const location = useLocation();
    const navigate = useNavigate();
    const query = queryString.parse(location.search);

    const storeToken = (data) => {
        localStorage.setItem("access", data.accessToken);
        localStorage.setItem("refresh", data.refreshToken);
        localStorage.setItem("user_id", data.user_id);
    }

    useEffect(async () => {
        if (query.code) {
            const data = await axios.get(`http://localhost:3030/api/v1/auth//google/login?code=${query.code}`);

            if (data?.err) {
                toast(data.err)
                if (data.code === 301) {
                    storeToken(data);

                    return navigate(`/update?user=${data.user_id}`);
                } else if (data.code === 302) {
                    storeToken(data);

                    return navigate("/release");
                }
            } else if (data?.msg) {
                storeToken(data);

                toast(data.msg);

                return navigate("/");
            }
        }
    }, [])

    const inputChange = (e) => {
        setUserinputs({...userInputs, [e.target.name]: e.target.value});
    }

    const logOut = async () => {
        const data = await axios.del("http://localhost:3030/api/v1/user/logout", {user_id: localStorage.getItem("user_id")}, Number(1));

        if (data?.err)
            toast(data.err);
        else if (data?.msg)
            toast(data.msg);

        localStorage.clear();
        return navigate("/");

    }


    const onSubmit = async (e) => {
        e.preventDefault();

        const data = await axios.post("http://localhost:3030/api/v1/auth/login", userInputs, 1);

        if (data?.err)
            toast(data.err);
        if (data.code === 302) {
            storeToken(data);
            return navigate("/release");
        } else if (data?.msg) {
            storeToken(data);
            toast(data.msg);

            return navigate("/");
        }
    }

    const signUp = () => {

    }

    return (
        <div>
            <h1>Login</h1>
            {localStorage.getItem("access") || localStorage.getItem("refresh") ?
                <div>
                    <h1>이미 로그인된 유저입니다.</h1>
                    <p>
                        <button onClick={logOut} className={"common-btn"}>Log out</button>
                    </p>
                    <p>
                        <Link to={"/"}>
                            <button className={"common-btn"}>Home</button>
                        </Link>
                    </p>

                </div>
                : <div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <input type="text" name={"user_email"} placeholder={"Email"} onChange={inputChange}
                                   value={userInputs.user_email}/>
                        </div>
                        <div>
                            <input type="password" name={"user_password"} placeholder={"Password"}
                                   onChange={inputChange}
                                   value={userInputs.user_password}/>
                        </div>
                        <p>
                            <button className={"common-btn"}>Login</button>
                        </p>
                    </form>
                    <p>
                        <a href={`https://accounts.google.com/o/oauth2/auth?client_id=${web.client_id}&redirect_uri=${web.redirect_uris}&scope=https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email&response_type=code`}>
                            <button className={"common-btn"}>Google Login</button>
                        </a>
                    </p>
                    <p>
                        <Link to={"/signUp"}>
                            <button className={"common-btn"}>Sign up</button>
                        </Link>
                    </p>
                    <p>
                        <Link to={"/"}>
                            <button className={"common-btn"}>Home</button>
                        </Link>
                    </p>
                </div>}

        </div>
    );
};

export default LoginIndex;
