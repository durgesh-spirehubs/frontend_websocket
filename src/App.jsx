// import "./App.css";
// import Chat from "./component/Chat";
// import Login from "./component/Login";
// import Dashboard from "./pages/Dashboard";
// import Navbar from "./component/Navbar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./pages/Sidebar";

// function App() {
//   return (
//     <div>
//       <Router>
//         <Navbar/>
//         <Sidebar isOpen={true}/>
//         <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard/>}/>
//         <Route path="/inquiry" element={<div>Inquiry</div>}></Route>
//         <Route path="/leads" element={<div>Leads</div>}></Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }
// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Inquiry from "./pages/Inquiry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inquiry" element={<Inquiry/>} />
          <Route path="leads" element={<div>Leads Page</div>} />
          <Route path="clients" element={<div>Clients Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

