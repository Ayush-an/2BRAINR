// src/components/admin/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { User, Bell, Settings, Menu, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ navItems }) => {
  const [openPopup, setOpenPopup] = useState(null);
  const navigate = useNavigate();

  const closePopup = () => setOpenPopup(null);

  const renderPopup = () => {
    if (!openPopup) return null;
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-[700px] max-w-[90%] h-[80vh] bg-white rounded-xl shadow-xl p-6 overflow-y-auto">
          <button
            className="absolute text-xl text-gray-600 top-3 right-3 hover:text-red-600"
            onClick={closePopup}
          >
            ✖
          </button>
          {React.isValidElement(openPopup)
            ? React.cloneElement(openPopup, { onClose: closePopup, open: true })
            : openPopup}
        </div>
      </div>
    );
  };

  const NavItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition rounded-md hover:text-blue-600 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {item.name}
          {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
        </button>

        {item.children && open && (
          <div className="absolute left-0 top-full mt-2 z-[150] w-48 bg-white border rounded-md shadow-lg animate-fadeIn">
            {item.children.map((sub, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.onClick) {
                    // Pass setOpenPopup and navigate for proper handling
                    item.onClick(sub, setOpenPopup, navigate);
                  }
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-extrabold text-blue-600">2BRAINR</div>
          <nav className="hidden space-x-1 sm:flex">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
          <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />

          <div className="flex items-center p-2 space-x-2 border rounded-full cursor-pointer hover:bg-gray-50">
            <User className="w-5 h-5 text-blue-600" />
            <span className="hidden text-sm text-gray-700 md:block">Smith Alex</span>
          </div>

          <Menu className="w-6 h-6 text-gray-700 cursor-pointer sm:hidden" />
        </div>
      </header>

      {renderPopup()}
    </>
  );
};

export default Navbar;
