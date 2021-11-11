import axios from "axios";

const axiosUtil =  ()=>{

    const makeConfig = (token)=> {
        const config  = {withCredentials: true} //1: 없음 //2: access //3: refresh

        if(1 || false)
            if(localStorage.getItem("access"))
                config.headers={Authorization:`Bearer ${localStorage.getItem("access")}`}
            else if(localStorage.getItem("refresh"))
                config.headers={Authorization:`Bearer ${localStorage.getItem("refresh")}`}
            else
                return config
        else if(token)
            if(token===2)
                config.headers={Authorization:`Bearer ${localStorage.getItem("access")}`}
            else
                config.headers={Authorization:`Bearer ${localStorage.getItem("refresh")}`}

           return config
    }

    const get = async (url,token)=>{
        let result
        const config = makeConfig(token);

        try {
            if (config.headers) result = await axios.get(url, config);
            else result = await axios.get(url);
            result = result.data;
        }catch (e) {
            const {data} = e.response;
            result = data;
        }
        return result;
    }

    const post = async (url, value, token)=>{
        let result
        const config = makeConfig(token);


        try {
            if (config.headers) result = await axios.post(url, value, config);
            else result = await axios.post(url,value);
            result = result.data;
        }catch (e){
            const {data} = e.response;
            result = data;
        }

        return result;
    }

    const del = async (url, value, token)=>{
        let result
        const config = makeConfig(token);
        config.data = value;

        try {
            if (config.headers) result = await axios.delete(url, config);
            else result = await axios.delete(url, config);
            result = result.data;
        }catch (e){
            const {data} = e.response;
            result = data;
        }
        return result;
    }

    const put = async (url, value, token)=>{
        let result
        const config = makeConfig(token);

        try {
            if (config.headers) result = await axios.put(url, value, config);
            else result = await axios.put(url);
            result = result.data;
        }catch (e){
            const {data} = e.response;
            result = data;
        }
        return result;
    }

    return {get,post,put,del}
}

export default axiosUtil();