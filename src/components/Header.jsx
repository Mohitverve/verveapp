import React from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/vervein.png"; // Adjust the path according to your project structure

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <Menu mode="horizontal" theme="dark" className="menu-items">
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/services">Services</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
