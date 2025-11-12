import axios from "axios";

const api = "http://localhost:3000";
export const login = async (Credential) => {
  const response = await axios.post(`${api}/user/login`, Credential);
  return response;
};

export const fetchRoom = async (id) => {
  const response = await axios.get(`${api}/chat/fetchRoom/${id}`);
  return response;
};
export const history = async (id) => {
  const response = await axios.get(`${api}/chat/history/${id}`);
  return response;
};

export const inquiry = async (data) => {
     const {page,limit,token}=data;
     console.log(page,limit,token);
  const response = await axios.get(
    `${api}/inquiry?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createInquiry=async(payload)=>{
     const token=localStorage.getItem("token");
     const response=await axios.post(`${api}/inquiry`,payload,{
         headers:{
          Authorization:`Bearer ${token}`
         } 
     })
     return response;
}
