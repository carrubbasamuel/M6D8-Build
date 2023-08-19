import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";
import ProtectedRoute from "./Protected_Route_JWT";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/BlogNavbar";
import Blog from "./views/blog/Blog";
import Dashboard from "./views/dashboard/dashboard";
import Home from "./views/home/Home";
import Login from "./views/login/login";
import NewBlogPost from "./views/new/New";
import ProfileAccounts from "./views/profileAccounts/profileAccounts";
import Register from "./views/register/register";
import SuccessLog from "./views/successLog/successLog";






function App() {
  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<SuccessLog />} />
        {/* Rotte Protette */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/profile/:id" element={<ProtectedRoute element={<ProfileAccounts />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/blog/:id" element={<ProtectedRoute element={<Blog />} />} />
        <Route path="/new" element={<ProtectedRoute element={<NewBlogPost />} />} />
      </Routes>
      <Footer />
    </Router>
  );
}



export default App;
