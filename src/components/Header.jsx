import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, Layout, Drawer, Button, message, Modal } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MenuOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { auth } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase"; // Make sure to import your Firestore instance here
import "../styles/header.css";

const { Header } = Layout;
const { confirm } = Modal;

// Define the debounce function here
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const AppHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const debouncedResize = debounce(handleResize, 300);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [handleResize]);

  const showDrawer = () => setDrawerVisible(true);
  const onCloseDrawer = () => setDrawerVisible(false);

  const handleNavigation = (path, hash = '') => {
    if (location.pathname === path && hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path + hash);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setIsAdmin(!!idTokenResult.claims.admin);
        setIsEmployee(!!idTokenResult.claims.employee);
      } else {
        setIsAdmin(false);
        setIsEmployee(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const menuItems = useMemo(() => [
    { key: "1", label: "Home", link: "/" },
    { key: "2", label: "V-Class", link: "/Plans" },
    { key: "3", label: "BookSessions", link: "/Form" },
    ...(isEmployee ? [{ key: "3", label: "Attendance", link: "/Employee" }] : []),
    ...(isAdmin ? [
      { key: "4", label: "Admin", link: "/Admin" },
      { key: "5", label: "Requests", link: "/Request" }
    ] : []),
  ], [isAdmin, isEmployee]);

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        message.success("Successfully signed out.");
        navigate('/Register');
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        message.error("Failed to sign out.");
      });
  }, [navigate]);

  const deleteAccount = useCallback(() => {
    const user = auth.currentUser;

    if (user) {
      confirm({
        title: "Are you sure you want to delete your account?",
        icon: <ExclamationCircleOutlined />,
        content: "This action is permanent and cannot be undone.",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk: async () => {
          try {
            // Delete user data from Firestore
            await deleteDoc(doc(db, "users", user.uid)); // Assumes your user data is stored under a "users" collection
            // Delete the user from Firebase Auth
            await deleteUser(user);
            message.success("Account deleted successfully.");
            navigate("/Register");
          } catch (error) {
            console.error("Error deleting account:", error);
            message.error("Failed to delete account. Please try again.");
          }
        },
      });
    }
  }, [navigate]);

  const renderMenuItems = useCallback(() => (
    <Menu theme="dark" mode={isMobile ? "vertical" : "horizontal"} className="menu-items">
      {menuItems.map(item => (
        <Menu.Item key={item.key}>
          <Link to={item.link}>{item.label}</Link>
        </Menu.Item>
      ))}
      <Menu.Item key="signout">
        <Button type="default" onClick={logout} className="signout-button">
          Sign Out
        </Button>
      </Menu.Item>
      <Menu.Item key="delete-account">
        <Button type="danger" onClick={deleteAccount} className="delete-account-button">
          Delete Account
        </Button>
      </Menu.Item>
    </Menu>
  ), [menuItems, isMobile, logout, deleteAccount]);

  return (
    <Header className="app-header">
      <div className="logo">Verve</div>
      {isMobile ? (
        <>
          <MenuOutlined className="menu-icon" onClick={showDrawer} aria-label="Menu" />
          <Drawer
            title="Menu"
            placement="right"
            onClose={onCloseDrawer}
            visible={drawerVisible}
            className="mobile-drawer"
          >
            {renderMenuItems()}
          </Drawer>
        </>
      ) : (
        renderMenuItems()
      )}
    </Header>
  );
};

export default React.memo(AppHeader);
