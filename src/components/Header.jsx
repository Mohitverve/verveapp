import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, Layout, Drawer, Button } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "../styles/header.css";

const { Header } = Layout;

const AppHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize the resize handler
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

  // Debounce utility function
  const debounce = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleNavigation = (path, hash = '') => {
    if (location.pathname === path && hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path + hash);
    }
  };

  // Move role-based logic into a custom hook
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


  
  // Memoize the menu items
  const menuItems = useMemo(() => [
    { key: "1", label: "Home", link: "/" },
    { key: "2", label: "V-Class", link: "/Plans" },
    ...(isEmployee ? [{ key: "3", label: "Attendance", link: "/Employee" }] : []),
    ...(isAdmin ? [
      { key: "4", label: "Admin", link: "/Admin" },
      { key: "5", label: "BookSessions", link: "/Form" },
      { key: "6", label: "Requests", link: "/Request" }
    ] : []),
  ], [isAdmin, isEmployee]);

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
    </Menu>
  ), [menuItems, isMobile]);

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        navigate('/Register');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }, [navigate]);

  return (
    <Header className="app-header">
      <div className="logo">Verve</div>
      {isMobile ? (
        <>
          <MenuOutlined className="menu-icon" onClick={showDrawer} />
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
