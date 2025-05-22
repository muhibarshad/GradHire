import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  HomeOutlined,
  SearchOutlined,
  TableOutlined,
  LaptopOutlined,
  MessageOutlined,
  SmileOutlined,
  RightOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Drawer, Button, Layout, Modal } from "antd";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/user";

const { Content } = Layout;

const SideBar = ({ visible, onClose }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedKeys = location.pathname.split("/").slice(1);
  const [isDrawerVisible, setIsDrawerVisible] = useState(true);

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      onOk() {
        dispatch(logoutSuccess());
        navigate("/", { replace: true });
        handleCloseDrawer();
      },
    });
  };

  const commonMenuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: (
        <Link to={user.role === "company" ? "/company" : "/user"}>Home</Link>
      ),
    },
    {
      key: "users",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/user/users">Users</Link>,
    },
    {
      key: "chat",
      icon: <MessageOutlined />,
      label: <Link to="/user/chat">Chat</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: "jobs",
      icon: <SearchOutlined />,
      label: <Link to="/user/jobs">Jobs</Link>,
    },
    {
      key: "companies",
      icon: <SmileOutlined />,
      label: <Link to="/user/companies">Companies</Link>,
    },
    {
      key: "compare",
      icon: <TableOutlined />,
      label: <Link to="/user/compare">Compare</Link>,
    },
    {
      key: "logout",
      icon: <LaptopOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const companyMenuItems = [
    {
      key: "postJob",
      icon: <SearchOutlined />,
      label: <Link to="/company/postJob">Post Jobs</Link>,
    },
    {
      key: "logout",
      icon: <LaptopOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {!isDrawerVisible && (
        <RightOutlined
          style={{
            position: "fixed",
            zIndex: 99998,
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            fontSize: "1.2rem",
            color: "#fff",
            background: "#1890ff",
            padding: "0.5rem",
            borderRadius: "0 0.5rem 0.5rem 0",
          }}
          onClick={showDrawer}
        />
      )}

      <Drawer
        placement="left"
        width={300}
        closable={true}
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
        style={{ zIndex: 99999 }}
      >
        <Content>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={["home"]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              ...commonMenuItems,
              ...(user.role === "user" ? userMenuItems : []),
              ...(user.role === "company" ? companyMenuItems : []),
            ].map((item) => ({
              ...item,
              onClick: item.onClick || handleCloseDrawer,
            }))}
          />
        </Content>
      </Drawer>
    </>
  );
};

export default SideBar;
