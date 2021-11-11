import React from 'react';
import {Link} from "react-router-dom";

const MainIndex = () => {
    return (
        <div>
            <h1>회원관리시스템</h1>
            {localStorage.getItem("access") || localStorage.getItem("refresh") ?
                <div>
                    <h2>로그인 상태입니다</h2>

                    <p>
                        <Link to={"/list"}>
                            <button className={"common-btn"}>User List</button>
                        </Link>
                    </p>
                    <p>
                        <Link to={"/login"}>
                            <button className={"common-btn"}>Log out</button>
                        </Link>
                    </p>
                </div> : <Link to={"/login"}>
                    <button className={"common-btn"}>login</button>
                </Link>}

        </div>
    );
};

export default MainIndex;