import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createInquiry } from "../api/api";

export default function Add() {
  const [name, setName] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status,setStatus]=useState("Active");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      companyname: companyname,
      description: description,
      type: type,
      status:status
    };
    console.log(payload);
    const response = await createInquiry(payload);
    if (response.status == 201) {
      navigate("/dashboard/inquiry");
    } else {
      alert("fail to create lead!!");
    }
  };
  const handleback = () => {
    navigate("/dashboard/inquiry");
  };
  return (
    <div className="bg-white border border-teal-400">
      <div className="flex justify-items-center justify-between border-b border-gray-100 p-3">
        <div className="font-semibold text-2xl">Add Inquiry</div>
        <button
          className="w-20 h-10 sm:w-25 bg-[rgb(0,212,219)]  rounded-md hover:bg-teal-300"
          onClick={handleback}
        >
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-50 md:w-70 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-400"
            />
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Entry Date"
              className="w-full sm:w-50 md:w-70 p-3 border rounded-md border-gray-300  focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-400"
            ></input>
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Description"
              className="w-full sm:w-50 md:w-70 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full sm:w-50 md:w-70 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-400"
              value={companyname}
              onChange={(e) => setcompanyname(e.target.value)}
            ></input>
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="category"
              className="w-full sm:w-50 md:w-70 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-400"
              value={type}
              onChange={(e) => setType(e.target.value)}
            ></input>
          </div>
          <div className="p-4">
            <select
              className="w-full sm:w-50 md:w-70 p-3 border border-gray-300 rounded-md 
               focus:outline-none focus:ring-1 focus:ring-teal-400 text-gray-700 bg-white"
               value={status}
               onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="p-4">
            <input
              type="text"
              placeholder="address"
              className="w-full sm:w-50 md:w-70 p-3 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-400"
            ></input>
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="sales_person"
              className="w-full sm:w-50 md:w-70 p-3 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-500"
            ></input>
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="sales"
              className="w-full sm:w-50 md:w-70 p-3 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400 placeholder-gray-400"
            ></input>
          </div>
          <div className="p-4">
            <button
              className="w-30 h-10 sm:w-50 bg-[rgb(0,212,219)]  rounded-md hover:bg-teal-300"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
