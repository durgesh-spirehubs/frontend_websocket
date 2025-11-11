import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 space-y-4">
          <li className="cursor-pointer hover:text-[rgb(0,212,219)]">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="cursor-pointer hover:text-[rgb(0,212,219)]">
            <Link to="/dashboard/inquiry">Inquiry</Link>
          </li>
          <li className="cursor-pointer hover:text-[rgb(0,212,219)]">
            <Link to="/dashboard/leads">Leads</Link>
          </li>
          <li className="cursor-pointer hover:text-[rgb(0,212,219)]">
            <Link to="/dashboard/clients">Clients</Link>
          </li>
        </ul>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
      )}
    </>
  );
}
