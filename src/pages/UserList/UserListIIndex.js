import React, {useEffect, useState} from 'react';
import axios from "../../utils/axiosUtil";
import {toast} from "react-toastify";
import {Link, useNavigate, useLocation} from "react-router-dom";
import queryString from "query-string";

const initState = {
    userList: [{
        user_id: "",
        user_email: '',
        user_name: '',
        user_social: '',
        user_logindate: "",
        user_stopdate: "",
        user_role: 0,
        user_isnotactive: 0,
        createdAt: ""
    }],
    pagenation:{
        totalPage:1,
        endPage:1,
        startPage:1,
        nextPage: false,
        prevPage: false,
        pageList: [1,2] ,
        page: 1,
        searchValue: "검색어",
    }
}
const UserListIIndex = () => {
    const [listInfo,setListInfo] = useState(initState);
    const [searchInput,setSearchinput] = useState({user_email:""})
    const location = useLocation();
    const [query, setQuery] = useState(queryString.parse(location.search));
    const navigate = useNavigate();


    useEffect(async ()=>{
        let queryStr;

        if(!query.page)
            queryStr = "page=1"
        else if(query.page)
            queryStr = `page=${query.page}`

        if(query.user_id)
            queryStr += `&user_email=${query.user_id}`;

        const result = await axios.get(`http://localhost:3030/api/v1/user?${queryStr}`);

        if(result?.err){
            toast(result.err);
            navigate("/");
        }
        else if(result?.msg){
            const {data} = result;
            setListInfo(data)
        }

    },[query]);

    const userList = listInfo.userList.map((user,idx)=>
        <tr idx={idx} style={{borderTop:"1px solid #cccccc"}} onClick={()=> {
            navigate(`/update?user=${user.user_id}`)
        }}>
            <td>{user.user_id}</td>
            <td>{user.user_email}</td>
            <td>{user.user_name}</td>
            <td>{user.user_logindate?user.user_logindate.substr(0,10):"/"}</td>
            <td>{user.createdAt.substr(0,10)}</td>
            <td>{user.user_isnotactive?"휴면유저":"활동중"}</td>
            <td>{user.user_stopdate?user.user_stopdate.substr(0,10):"/"}</td>
            <td>{!user.user_role?"일반유저":user.user_role===1?"정지유저":"운영자"}</td>
            <td>{user.user_social}</td>
        </tr>
    )

    const search = async ()=>{
        setQuery({...query, user_email: searchInput.user_email});
    }

    const inputChange = (e)=>{
        setSearchinput({...searchInput,[e.target.name]:e.target.value});
    }

    const pager = listInfo.pagenation.pageList.map((page,idx)=>
        <li onClick={()=>{setQuery({...query,page})}} style={{background:listInfo.pagenation.page == page?"#e882ca":"#cccccc",margin:"3px",padding:"3px 5px"}}>{page}</li>
    )

    return (
        <div>
            <h1>User List</h1>
            <form onSubmit={search}>
                <p>
                    <input type="search" name={"user_id"} value={searchInput.user_id} onChange={inputChange} placeholder={"이메일 검색"}/>
                </p>
            </form>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div>
                    <table style={{border: "1px solid", borderCollapse: "collapse", minWidth: "800px"}}>
                        <tr style={{background: "#c3c3c3"}}>
                            <th>번호</th>
                            <th>Email</th>
                            <th>이름</th>
                            <th>로그인 날짜</th>
                            <th>가입일</th>
                            <th>휴면 여부</th>
                            <th>정지여부</th>
                            <th>등급</th>
                            <th>소셜여부</th>
                        </tr>
                        {userList}
                    </table>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <ul style={{display: "flex", justifyContent: "center", listStyle: "none"}}>
                            {pager}
                        </ul>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-evenly"}}>
                        <button disabled={!listInfo.pagenation.prevPage} onClick={()=>{setQuery({...query,page:listInfo.pagenation.startPage-1})}} className={"common-btn"}>prev</button>
                        <Link to={"/"}>
                            <button className={"common-btn"}>home</button>
                        </Link>
                        <button disabled={!listInfo.pagenation.nextPage} className={"common-btn"} onClick={()=>{
                            setQuery({...query, page: Number(listInfo.pagenation.endPage + 1)});}}>next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListIIndex;