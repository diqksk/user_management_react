import React from 'react';
import axios from "../../utils/axiosUtil";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ReleaseCondition = () => {
    const navigate = useNavigate();

    const release = async () => {
        const result = await axios.put("http://localhost:3030/api/v1/release", {user_id: localStorage.getItem("user_id")});
        if(result?.err) {
            toast(result.err);
            localStorage.clear();
            navigate("/login");
        }
        else if(result?.msg) {
            toast(result.msg);
            navigate("/");
        }
    };
    return (
        <div>
            <h1>휴면계정 활성화</h1>
            <div>
                <h3>휴면계정을 해제하시겠습니까?</h3>
                <button onClick={release}>확인</button>
            </div>
        </div>
    );
};

export default ReleaseCondition;