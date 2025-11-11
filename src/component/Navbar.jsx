// import { useState } from "react";
// import notification from "../assets/notification-bell-svgrepo-com.svg";
// import setting from "../assets/settings-svgrepo-com.svg";
// import menu from "../assets/burger-menu-svgrepo-com.svg";
// import Sidebar from "../pages/Sidebar";
// export default function Navbar() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   return (
//     <div className="flex h-screen">
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//       <div
//         className={`flex-1 flex flex-col transition-all duration-300 ${
//           isSidebarOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full h-16 px-4 bg-white shadow z-30">
//           <div className="flex items-center gap-4">
//             <img
//               src="https://dev-crm.spirehubs.com/static/media/spirehub-logo.99562e5f.webp"
//               alt="logo"
//               className="h-8"
//             />
//             <img
//               src={menu}
//               alt="menu"
//               className="w-8 h-8 p-2 cursor-pointer bg-[rgb(0,212,219)] rounded-md"
//               onClick={() => setIsSidebarOpen(true)}
//             />
//           </div>
//           <div className="flex items-center gap-5">
//             <img
//               src={notification}
//               className="w-7 h-7 cursor-pointer"
//               alt="notification"
//             />
//             <div className="bg-[rgb(0,212,219)] flex justify-center items-center rounded-xl p-2 cursor-pointer">
//               <img src={setting} alt="setting" className="w-7 h-7" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import notification from "../assets/notification-bell-svgrepo-com.svg";
import setting from "../assets/settings-svgrepo-com.svg";
import menu from "../assets/burger-menu-svgrepo-com.svg";
export default function Navbar({ onToggleSidebar }) {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full h-16 px-4 bg-white shadow z-30">
      <div className="flex items-center gap-4">
        <img
          src="https://dev-crm.spirehubs.com/static/media/spirehub-logo.99562e5f.webp"
          alt="logo"
          className="h-8"
        />
        <img
          src={menu}
          alt="menu"
          className="w-8 h-8 p-2 cursor-pointer bg-[rgb(0,212,219)] rounded-md"
          onClick={onToggleSidebar} 
        />
      </div>
      <div className="flex items-center gap-5">
        <img src={notification} className="w-7 h-7 cursor-pointer" alt="notification" />
        <div className="bg-[rgb(0,212,219)] flex justify-center items-center rounded-xl p-2 cursor-pointer">
          <img src={setting} alt="setting" className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
