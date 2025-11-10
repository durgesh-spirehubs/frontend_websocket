import axios from "axios";


const api="http://localhost:3000";
export const login=async (Credential)=>{
     const response=await axios.post(`${api}/user/login`,Credential);
     return response;
}

export const fetchRoom=async (id)=>{
     const response =await axios.get(`${api}/chat/fetchRoom/${id}`)
     return response;
}
export const history=async(id)=>{
     const response=await axios.get(`${api}/chat/history/${id}`);
     return response;
}