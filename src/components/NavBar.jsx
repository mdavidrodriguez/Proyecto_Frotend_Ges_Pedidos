import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from 'react-icons/io';
import { useState, useEffect } from "react";

import "./NavBar.css";

const Data = [
  {
    title: "Clientes",
    path: "/clientes",
    cName: "nav-text",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Gestión Pedido",
    path: "/gestionpedidos",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Productos",
    path: "/productos",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Listado",
    path: "/listado",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
];

export function NavBar() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

  const renderNavBar = () => {
    if (!isLoggedIn || location.pathname === "/") {
      return null;
    }

    return (
      <div className="">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {Data.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

              <button onClick={handleLogout} className="menu-bars">
                <span className="text-2xl">Salir</span>
                <FaIcons.FaSignOutAlt className="text-2xl"/>
              </button>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
    );
  };

  return renderNavBar();
}
