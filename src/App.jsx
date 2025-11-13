


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Inquiry from "./pages/Inquiry";
import Add from "./component/Add";
import SingleInquiry from "./pages/SingleInquiry";
import Edit from "./component/Edit";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <div>
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={
              <ProtectedRoute>
            <DashboardLayout />
              </ProtectedRoute>
            }>
          <Route index element={<Dashboard />} />
          <Route path="inquiry" element={<Inquiry/>} />
          <Route path="inquiry/:id" element={<SingleInquiry />} />
          <Route path="Edit/:id" element={<Edit/>}/>
          <Route path="add"   element={<Add/>}/>
          <Route path="leads" element={<div>Leads Page</div>} />
          <Route path="clients" element={<div>Clients Page</div>} />
        </Route>
      </Routes>
    </Router>
       <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;

