import { useState, useEffect } from "react";
import searchIcon from "../assets/search.png";
import { useNavigate } from "react-router-dom";
import {
  User,
  Filter,
  Plus,
  HandPlatterIcon,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { inquiry } from "../api/api";
import threedot from "../assets/three-dots-vertical-svgrepo-com.svg";
export default function Inquiry() {
  const [search, setSearchTerm] = useState("");
  const [inquiryData, setInquiryData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(5);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Token is missing!!");
  }
  useEffect(() => {
    const getData = async () => {
      const data = {
        page: page,
        limit: limit,
        token: token,
        search: search,
      };
      const response = await inquiry(data);
      console.log("response", response);
      setInquiryData(response.data);
      const total = Math.ceil(response.total / limit);
      setTotalPage(Number(total));
      setTotal(response.total);
    };
    getData();
  }, [page, limit, search]);
  const handleAdd = () => {
    navigate("/dashboard/add");
  };
  const handlePrev = () => {
    if (page > 1) setPage((page) => page - 1);
  };
  const handleNext = () => {
    if (page > totalPage) {
      return;
    }
    setPage((page) => page + 1);
  };
  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId == id ? null : id);
  };
  const handleView=(id)=>{
    navigate(`/dashboard/inquiry/${id}`)
  }
  const handleEdit=(id)=>{
    navigate(`/dashboard/Edit/${id}`)
  }
  return (
    <div className="m-5 rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex justify-between items-center border-b border-gray-100 p-4">
        <h2 className="text-lg font-semibold text-gray-800">Inquiry List</h2>
        <div className="flex items-center space-x-4 text-gray-500">
          <User className="w-5 h-5 cursor-pointer hover:text-gray-700" />
          <Filter className="w-5 h-5 cursor-pointer hover:text-gray-700" />
          <Plus
            className="w-5 h-5 cursor-pointer hover:text-gray-700"
            onClick={handleAdd}
          />
        </div>
      </div>
      <div className="flex items-center w-1/3 m-4 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
        <img
          src={searchIcon}
          alt="search"
          className="w-4 h-4 mr-2 opacity-50"
        />
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-400 text-gray-700"
        />
      </div>
      <table className="w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50 border-t border-b">
          <tr>
            <th className="px-4 py-3 font-bold">Name</th>
            <th className="px-4 py-3 font-bold">CompanyName</th>
            <th className="px-4 py-3 font-bold">Description</th>
            <th className="px-4 py-3 font-bold">Type</th>
            <th className="px-4 py-3 font-bold">Status</th>
            <th className="px-4 py-3 font-bold">Action</th>
          </tr>
        </thead>
        {inquiryData && inquiryData.length > 0 ? (
          <tbody>
            {inquiryData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-[rgb(238,238,238)] bg-[rgb(255,255,255)] hover:bg-gray-100"
              >
                <td
                  className="px-4 py-3 font-semibold cursor-pointer text-blue-500"
                  onClick={() => navigate(`/dashboard/inquiry/${data.id}`)}
                >
                  {data.name}
                </td>
                <td className="px-4 py-3 font-semibold">{data.companyName}</td>
                <td className="px-4 py-3 font-semibold">
                  {data?.description || null}
                </td>
                <td className="px-4 py-3 font-semibold">{data?.type}</td>
                <td className="px-4 py-3 font-semibold">{data?.status}</td>
                <td className="relative px-4 py-3 font-semibold">
                  <button
                    className="border border-gray-50 rounded-full cursor-pointer hover:bg-gray-300 p-1.5"
                    onClick={() => handleMenuToggle(data.id)}
                  >
                    <img src={threedot} className="w-7"></img>
                  </button>
                  {openMenuId == data.id && (
                    <div>
                      <div className="absolute  right-20 top-2 z-40  flex flex-col   justify-center   bg-white border  border-gray-200 shadow-lg rounded-lg  w-28">
                        <div>
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full" onClick={() =>handleEdit(data.id)}>
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                        <div>
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full" onClick={() => handleView(data.id)}
>
                            <Eye className="w-4 h-4" /> View
                          </button>
                        </div>
                        <div>
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p className="text-xl font-semibold px-3 py-4">No Result Found</p>
        )}
      </table>
      <div className="flex justify-end items-center border-t border-gray-100 px-4 py-2 text-sm text-gray-600 ">
        <div>
          Rows per page:
          <select
            value={limit}
            onChange={(e) => {
              setlimit(Number(e.target.value));
              setPage(1);
            }}
            className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm mr-3"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
          {page * limit - limit}-{page * limit} of {total}
        </div>
        <div className="w-4 border border-gray-400 rounded-xl flex justify-center ml-3 hover:bg-gray-300 cursor-pointer">
          <button onClick={handleNext} disabled={page == totalPage}>
            {">"}
          </button>
        </div>
        <div className="ml-3 w-4 border border-gray-400 rounded-xl flex justify-center hover:bg-gray-300 cursor-pointer">
          <button onClick={handlePrev} disabled={page == 1}>
            {"<"}
          </button>
        </div>
      </div>
    </div>
  );
}
