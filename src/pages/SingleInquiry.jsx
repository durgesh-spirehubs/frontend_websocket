import { useState, useEffect } from "react";
import { assignInquiry, convertToLead, getStaff, singleInquiry } from "../api/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toast } from "../component/Toast";
export default function SingleInquiry() {
  const [data, setData] = useState("");
  const [staff, setStaff] = useState([]);
  const [assignstaff, setAssignStaff] = useState("");
  const [message,setMessage]=useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    const getdata = async () => {
      const response = await singleInquiry(id);
      const staffdata = await getStaff();
      console.log(staffdata.data.data);
      console.log(assignstaff)
      setData(response.data.data);
      setStaff(staffdata.data.data);
    };
    if (id) getdata();
  }, [id]);
  const handleback = () => {
    navigate("/dashboard/inquiry");
  };
  const handleAssign = async (assignStaffId, id) => {
    console.log(assignStaffId, id);
    const payload = {
      assignStaff: assignStaffId,
    };
    const response = await assignInquiry(id, payload);
    setAssignStaff(response.data.data);
    setMessage(response.data.message);
    alert(`message:-${message}`)
  };
  const handleView=(id)=>{
    navigate(`/dashboard/Edit/${id}`)
  }
  const handleconvertTolead = async (id) => {
    try {
      const response = await convertToLead(id);
      console.log(response.data.message);
      Toast("success",response.data.message);
    } catch (error) {
      if (error.response) {
        console.log(error)
        Toast("error",error.response.data.message)
      } else {
        Toast("error",error.response.data.message);
      }
    }
  };
  return (
    <div className="bg-white border border-teal-400">
      <div className="flex justify-between items-cente border-b border-gray-300 p-4">
        <div className="text-xl font-semibold">Inquiry Details</div>
        <div className="w-16">
          <button
            className="w-full py-2 bg-[rgb(0,212,219)] text-sm  font-medium cursor-pointer  hover:bg-[rgb(0,180,190)]  transition-colors duraton-200 shadow-sm rounded-md "
            onClick={handleback}
          >
            Back
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="grid grid-cols-3 gap-4 m-5 w-full sm:w-2/3">
          <div className="font-medium">
            Name:
            <p className="text-[rgb(97,97,97)]">{data.name}</p>
          </div>
          <div className="font-medium">
            Country:
            <p className="text-[rgb(97,97,97)]">{data.name}</p>
          </div>
          <div className="font-medium">
            Entry Date:
            <p className="text-[rgb(97,97,97)]">{data?.entrydate}</p>
          </div>
          <div className="font-medium">
            Status:
            <p className="text-[rgb(97,97,97)]">{data.status}</p>
          </div>
          <div className="font-medium">
            Category:
            <p className="text-[rgb(97,97,97)]">{data.type}</p>
          </div>
          <div className="font-medium">
            Source:
            <p className="text-[rgb(97,97,97)]">{data.name}</p>
          </div>
          <div className="font-medium">
            Sales:
            <p className="text-[rgb(97,97,97)]">{data.name}</p>
          </div>
          <div className="font-medium">
            Pre Sales:
            <p className="text-[rgb(97,97,97)]">{data.name}</p>
          </div>
          <div className="font-medium flex flex-col mb-1">
            Assign Staff:
            <select
              className="w-1/2 mt-1 border border-gray-300 focus:outline-none hover:border-teal-400 text-[rgb(97,97,97)] rounded-sm"
              onChange={(e) => handleAssign(e.target.value, data.id)}
            >
                <option value="" className="hvoer:none">
                Select Staff
              </option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="m-5  sm:w-1/3 gap-5">
          <div className="w-full flex justify-center">
            <button className="border border-[rgb(0,212,219)] text-[rgb(0,212,219)] rounded-sm w-full py-2 hover:bg-[rgba(0,212,219,0.04)]"
            onClick={()=>handleconvertTolead(id)}
            >
              Convert To Lead
            </button>
          </div>
          <div className="w-full flex justify-center mt-2">
            <button className="border border-[rgb(2,136,209)]  text-[rgb(2,136,209)]  w-full py-2  rounded-sm hover:bg-[rgba(2,136,209,0.04)] "
            onClick={()=>handleView(data.id)}
            >
              Edit
            </button>
          </div>
          <div className="w-full flex justify-center mt-2">
            <button className=" w-full py-2 rounded-sm text-[rgb(244,67,54)] hover:bg-[rgba(244,67,54,0.04)]">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
