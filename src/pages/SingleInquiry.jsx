import { useState,useEffect} from "react";
import { singleInquiry } from "../api/api";
import { useParams } from "react-router-dom";
export default function SingleInquiry(){
    const [data,setData]=useState("");
    const {id}=useParams();
    console.log(id)
    useEffect(()=>{

        const getdata=async()=>{
            const response=await singleInquiry(id);
             setData(response.data.data);
             console.log(response.data.data)
        }

        if(id)
        getdata()
    },[id])
    return(
        <div>
            <p>data</p>
          <p>Name:{data.name}</p>
          <p>Company:{data?.companyname || null}</p>
        </div>
    )
}