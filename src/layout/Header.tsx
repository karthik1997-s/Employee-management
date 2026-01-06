import { App, Button } from "antd";
import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { removeToken } from "../utills/auth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  // : string;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const { message } = App.useApp(); 
  const navigate = useNavigate();
  
  const handleLogout = () => {
    removeToken();
    message.success("Logout successfully");
    navigate("/login");
  };
  
  return (
    <>
      <header className="px-8 py-3 shadow-sm bg-black sticky top-0 z-40">
        <div className=" flex items-center justify-end">
     
          <div className="flex items-center justify-center space-x-6">
            <span className="text-lg font-bold text-white">Employee Management System</span>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              className="!bg-red-500 !hover:bg-red-500  !text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
