import { Error, Success } from "../Aleart/Alert"
import network from "../network/network"


export const CreateServiceApi=async(url,data)=>{
    try{
        const res = await network.post(url,data) 
        if(res.data.status){
            Success
        }else{
        Error
        }  
    }catch(error){
        Error
    }
}
export const GetAllServiceApi=async(url)=>{
    try{
        const res = await network.get(url);
        return res;
    }catch(error){
        Error
    }
}
export const GetByIdServiceApi=async(url,id)=>{
    try{
        const res = await network.get(url+id)
        return res
    }catch(error){ try{
        const res =await network.delete(url+id)
        if(res.ok){
            Success
    
        }else{
            Error
        }
    }catch(error){
        Error
    }
        Error
    }
}
export const UpdateServiceApi=async(url,id,data)=>{
    try{
        const res =await network.put(url+id , data)
        if(res.ok){
            Success
            
        }else{
            Error
        }
        
    }catch(error){
        Error
    }
}
export const DeleteByIdServiceApi = async(url,id)=>{
    try{
        const res =await network.delete(url+id)
        if(res.ok){
            Success
    
        }else{
            Error
        }
    }catch(error){
        Error
    }
}
export const DeleteAllServiceApi = async(url)=>{
    try{
        const res =await network.delete(url)
        if(res.ok){
            Success
    
        }else{
            Error
        }
    }catch(error){
        Error
    }
}