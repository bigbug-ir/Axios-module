import axios from "axios";
import { Cookies } from "react-cookie";
import 'dotenv/config'

const accessServer = process.env.ACCESS_SERVER;
interface INetworkHandler{
    apiSection:string
    data:{[key:string]:string | number| boolean |null |undefined} 
}

const cookie = new Cookies();
export const getAuthToken = ():string|undefined=>{
    const localStorageToken =localStorage.getItem("token");
    const cookieToken=cookie.get("token");
    if(cookieToken===''&& !localStorageToken){
        return undefined
    }
    if(cookieToken !==''&& !localStorageToken){
        return `Bearer ${cookieToken}`
    }
    return `Bearer ${localStorageToken}`
}

export const config = {
    headers:{
        'withCredentials':true,
        'Access-Control-Allow-Origin':process.env.ACCESS_CONTROL,
        'Authorization': getAuthToken()
    }
}

type networkHandlerReturn = {
    ok: boolean
    status: number
    data: { [key: string]: any } | null
}

async function postNetworkHandler(apiSection: INetworkHandler['apiSection'], data?: INetworkHandler['data']): Promise<networkHandlerReturn> {
    try {
        const response = await axios.post(`${accessServer}${apiSection}`, data, config)
        return {
            ok: response.status === 200 || response.data?.status,
            status: response.status,
            data: response.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message ?? 'لطفا اتصال خود را به شبکه بررسی کنید')
        }
        console.error("Network handler error code NH-001: ", error)
        return {
            ok: false,
            status: 0,
            data: null
        }
    }
}

async function putNetworkHandler(apiSection: INetworkHandler['apiSection'], data?: INetworkHandler['data']): Promise<networkHandlerReturn> {
    try {
        const response = await axios.put(`${accessServer}${apiSection}`, data, config)
        return {
            ok: response.status === 200 || response.data?.status,
            status: response.status,
            data: response.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message ?? 'لطفا اتصال خود را به شبکه بررسی کنید');
        }
        console.error("Network handler error code NH-001: ", error)
        return {
            ok: false,
            status: 0,
            data: null
        }
    }
}

async function getNetworkHandler(apiSection: INetworkHandler['apiSection'], queries?: INetworkHandler['data']): Promise<networkHandlerReturn> {
    try {
        let queryString = "?"
        for (const query in queries) {
            let queryValue = queries[query as keyof typeof queries]
            if (queryValue !== null && typeof (queryValue) !== 'undefined') {
                queryString += query + "=" + queryValue + "&"
            }
        }

        queryString = queryString.slice(0, queryString.length - 1)

        const response = await axios.get(`${accessServer}${apiSection}${queryString}`, config)

        return {
            ok: response.status === 200 || response.data?.status,
            status: response.status,
            data: response.data
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message ?? 'لطفا اتصال خود را به شبکه بررسی کنید')
        }
        console.error("Network handler error code NH-001: ", error)
        return {
            ok: false,
            status: 0,
            data: null
        }
    }
}

async function deleteNetworkHandler(apiSection: INetworkHandler['apiSection'], queries?: INetworkHandler['data']): Promise<networkHandlerReturn> {
    try {
        let queryString = "?"
        for (const query in queries) {
            let queryValue = queries[query as keyof typeof queries]
            if (queryValue !== null && typeof (queryValue) !== 'undefined') {
                queryString += query + "=" + queryValue + "&"
            }
        }

        queryString = queryString.slice(0, queryString.length - 1)

        const response = await axios.delete(`${accessServer}${apiSection}${queryString}`, config)

        return {
            ok: response.status === 200 || response.data?.status,
            status: response.status,
            data: response.data
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message ?? 'لطفا اتصال خود را به شبکه بررسی کنید');
        }
        console.error("Network handler error code NH-001: ", error)
        return {
            ok: false,
            status: 0,
            data: null
        }
    }
}

const network = {
    post: postNetworkHandler,
    put: putNetworkHandler,
    get: getNetworkHandler,
    delete: deleteNetworkHandler
};

export default network