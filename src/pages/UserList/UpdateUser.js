import React, {useEffect, useState} from 'react';
import queryString from "query-string";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../utils/axiosUtil";
import {toast} from "react-toastify";

const initState={
    user_id:"",
    user_email:"",
    user_name:"",
    user_password:"",
    user_role:"",
    user_stopdate:"",
    user_isnotactive:""
}

const UpdateUser = () => {
    const [userInfo, setUserInfo] = useState(initState);

    const navigate = useNavigate();
    const location = useLocation();
    const query = queryString.parse(location.search);



    useEffect(async ()=>{
        if(!query.user) navigate(-1);
        let result = await axios.get(`http://localhost:3030/api/v1/user/detail?user_id=${query.user}`);

        if(result?.err ==="no permisson"){
            toast(result?.err);
            return navigate("/list");
        }

        if(result?.err==="expired token, please login again"){
            const newResult = await axios.get(`http://localhost:3030/api/v1/user/detail?user_id=${query.user}`,3);

            if(newResult.code === 201){
                localStorage.setItem("accessToken",newResult.accessToken);
                result = await axios.get(`http://localhost:3030/api/v1/user/detail?user_id=${query.user}`);
            }else{
                toast(newResult.err);
                localStorage.clear();
                return navigate("/login");
            }
        }

        if(result?.err) {
            toast(result.err);
            return navigate(-1);

        }else if(result?.msg){
            const {data} = result
            setUserInfo({...data,user_password:""});
        }


    },[])


    const inputChange = (e)=>{
        setUserInfo({...userInfo,[e.target.name]:e.target.value});
    }

    const onUpdate = async (e,stop)=>{
        e.preventDefault();
        const result = await axios.put(`http://localhost:3030/api/v1/user${stop?"/stop":""}`,userInfo);

        if(result?.err){
            toast(result.err);
        }else if(result?.msg){
            toast(result.msg);
            return navigate(-1);
        }
    }


    return (
        <div>
            <h1> 유저 상세 정보 </h1>
            <div>
                <form onSubmit={onUpdate}>
                    <div>
                        <input type="hidden" name={"user_id"}
                               value={userInfo.user_id}/>
                    </div>
                    <div>
                        <input type="text" name={"user_email"} placeholder={"Email"}
                               value={userInfo.user_email} disabled/>
                    </div>
                    <div>
                        <input type="text" name={"user_name"} placeholder={"Name"} onChange={inputChange}
                               value={userInfo.user_name}/>
                    </div>
                    <div>
                        <input type="password" name={"user_password"} placeholder={"Password"} onChange={inputChange}
                               value={userInfo.user_password}/>
                    </div>
                    <div>
                        <input type="text" name={"user_role"} placeholder={"user_role"}
                               value={!userInfo.user_role ? "일반회원" : userInfo.user_role === 1 ? "정지회원" : "운영자"}
                               disabled/>
                    </div>
                    <div>
                        <input type="text" name={"user_isnotactive"} placeholder={"user_isnotactive"}
                               value={userInfo.user_isnotactive ? "휴면" : "정상활동"} disabled/>
                    </div>
                    <p>
                        <button type={"button"} onClick={() => {
                            navigate(-1)
                        }} className={"common-btn"}>뒤로가기
                        </button>
                    </p>
                    <p>
                        <button type={"submit"} className={"common-btn"}>수정하기</button>
                    </p>
                    <p>
                        <button type={"button"} className={"common-btn"} onClick={async (e) => {
                            await onUpdate(e, true);
                        }}>회원정지
                        </button>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default UpdateUser;