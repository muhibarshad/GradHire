
import React from "react";
import {
  Avatar,
  Menu,
  Dropdown,
  Divider,
  Badge,
  notification,
  
  Tooltip,
  Modal
} from "antd";
import {
  MessageOutlined,
  BellOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
  TableOutlined,  
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../redux/user";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getFavourites } from "../util/api-call";
import { switchRole } from "../redux/user";

const Header = ({ drawer }) => {
  const navigate = useNavigate();
  // redux state
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // States for Data
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [companies, setCompanies] = useState(user.user.companies);
  const [loading, setLoading] = useState(true);
  // Api call Functions
  const fetchFavoriteJobs = async () => {
    try {
      const res = await getFavourites(user.id);

      if (res.data.jobs === null) {
        setFavoriteJobs([]);
      } else setFavoriteJobs(res.data.jobs);
      setLoading(false);
    } catch (err) {}
  };

  // fetch favorite jobs
  useEffect(() => {
    fetchFavoriteJobs();
  }, []);

  /* 
    Drop Down Items
    Starts Here
  */
  // inside your Header component:
  const handleLogout = () => {
    let modal = null;

    modal = Modal.confirm({
      title: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      onOk() {
        dispatch(logoutSuccess()); // clear Redux + localStorage
        modal.destroy(); // immediately close this confirm
        drawer.current?.close(); // close sidebar
        navigate("/login", { replace: true }); // go to login
      },
    });
  };

  const items = favoriteJobs.map((job, index) => ({
    key: job.id, // Use a unique identifier for the key
    label: (
      <Link
        to={`job/${job._id}`}
        spy="true"
        smooth="true"
        offset={-90}
        duration={500}
      >
        <p
          className="text-gray-600 dark:text-gray-400 text-sm font-medium"
          onClick={() => {
            drawer.current.close();
            navigate(`/job/${job._id}`);
          }}
        >
          {`${index + 1}. ${job.title}`} {/* Add the index number */}
        </p>
      </Link>
    ),
  }));

  const companyItems = companies.map((company, index) => ({
    key: company.id, // Use a unique identifier for the key
    label: (
      <Link
        spy="true"
        smooth="true"
        to={`/company`}
        offset={-90}
        duration={500}
        onClick={() => {
          dispatch(
            switchRole({
              companyID: company._id,
              role: "company",
            })
          );
          navigate(`/company/${company._id}`);
        }}
      >
        <div
          className="text-gray-600 dark:text-gray-400 text-sm font-medium"
          onClick={() => {
            drawer.current.close();
            navigate(`/company/${company._id}`);
          }}
        >
          {/* photo of company */}
          <Avatar
            src={`data:image/jpeg;base64,${company.photo}`}
            size={25}
            style={{
              marginRight: "10px",
            }}
          />
          {`${company.name}`}
        </div>
      </Link>
    ),
  }));

  // upda
  const profileItems = [
    {
      key: "profile",
      label: (
        <Link
          to={`/user/profile/${user.id}`}
          spy="true"
          smooth="true"
          offset={-90}
          duration={500}
        >
          <div
            className="text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center"
            onClick={() => {
              drawer.current.close();
              navigate(`/user/profile/${user.id}`);
            }}
          >
            <UserOutlined
              style={{
                marginRight: "10px",
                color: "#1890ff",
              }}
            />

            <span
              style={{
                color: "#1890ff",
                fontSize: "14px",
              }}
            >
              Profile
            </span>
          </div>
        </Link>
      ),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
      label: "Logout",
      onClick: handleLogout, // ← this shows the modal and logs out
    },
  ];

  // Add the items of
  companyItems.push({
    key: "register",
    label: (
      <>
        <Divider
          style={{
            margin: "0.5rem 0",
          }}
        />
        <Link
          to="registerCompany"
          spy="true"
          smooth="true"
          offset={-90}
          duration={500}
        >
          <div
            className="text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center"
            onClick={() => {
              drawer.current.close();
              navigate("/registerCompany");
            }}
          >
            <UserOutlined
              style={{
                marginRight: "10px",
                color: "#1890ff",
              }}
            />

            <span
              style={{
                color: "#1890ff",
                fontSize: "14px",
              }}
            >
              Register Company
            </span>
          </div>
        </Link>
      </>
    ),
  });

  // Notification menu
  const notifications = [
    {
      id: 1,
      title: "New Message",
      message: "You have received a new message from Ali Abdullah.",
      avatar: "https://example.com/avatar1.png",
      timestamp: "2025-03-08T09:00:00Z",
    },
    {
      id: 2,
      title: "New Comment",
      message: "Your post has a new comment from Faiz.",
      avatar: "https://example.com/avatar2.png",
      timestamp: "2025-03-08T14:30:00Z",
    },
    {
      id: 3,
      title: "New Comment",
      message: "Your post has a new comment from Bilal.",
      avatar: "https://example.com/avatar2.png",
      timestamp: "2025-03-08T14:30:00Z",
    },
    {
      id: 3,
      title: "New Comment",
      message: "Your post has a new comment from Hamza.",
      avatar: "https://example.com/avatar2.png",
      timestamp: "2025-03-08T14:30:00Z",
    },
  ];

  // </div>
  const notificationItems = notifications.map((noti, index) => ({
    key: noti.id, // Use a unique identifier for the key
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{ margin: "0.5rem 0rem", backgroundColor: "blue" }}
          size={40}
          src={noti.avatar}
          icon={<UserOutlined />}
        />
        <div style={{ marginLeft: 10, flex: 1 }}>
          <h6>{noti.title}</h6>
          <div>{noti.message}</div>
          <div style={{ fontSize: 12, color: "gray" }}>
            {new Date(noti.timestamp).toLocaleString()}
          </div>
          <Divider style={{ margin: "0.5rem 0rem", color: "blue" }} />
        </div>
      </div>
    ),
  }));
  // Nav Bar Starts from here
  return (
    <nav
      className="bg-white custom_nav border-gray-200 px-3 sm:px-5 py-2 sm:py-2.5 top-0 left-0 right-0 border-1 border-gray-100 dark:bg-gray-800 z-30"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <div className="flex flex-wrap justify-between items-center mx-auto">
        {/* Logo */}
        <Link
          className="bg-white"
          style={{ backgroundColor: "#ffffff" }}
          to="home"
          spy="true"
          smooth="true"
          offset={-90}
          duration={500}
        >
          <img
            src={require("./../assests/gradhireLogo.png")}
            className="w-[100px] h-[40px] sm:w-[150px] sm:h-[60px]"
            alt="lOGO"
          />
        </Link>

        {/* Nav Bar */}
        <div className="flex md:order-2 w-auto md:w-2/5 justify-end align-center items-center">
          <div className="flex md:flex flex-row items-center justify-center gap-1 sm:gap-2 mr-2 sm:mr-4">
            {user.role === "user" && (
              <Dropdown
                onMouseEnter={fetchFavoriteJobs}
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <button
                  onClick={fetchFavoriteJobs}
                  className="p-1.5 sm:p-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <HeartOutlined
                    className="text-xl sm:text-2xl"
                    style={{
                      color: "red",
                    }}
                  />
                </button>
              </Dropdown>
            )}

            <Tooltip title="Chat" placement="top">
              <Badge count={5}>
                <MessageOutlined
                  className="text-xl sm:text-2xl p-1.5 sm:p-2"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#0000ff",
                  }}
                  onClick={() => {
                    navigate("/user/chat");
                  }}
                />
              </Badge>
            </Tooltip>

            {/* Notification Drop Down */}
            <Dropdown
              menu={{
                items: notificationItems,
              }}
            >
              <button
                className="p-1.5 sm:p-2"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                <Badge count={notifications.length}>
                  <BellOutlined
                    className="text-xl sm:text-2xl"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#0000ff",
                    }}
                  />
                </Badge>
              </button>
            </Dropdown>

            {/*  Profile */}
            {user.role != "company" && (
              <Dropdown
                menu={{
                  items: profileItems,
                }}
                placement="bottom"
              >
                <button
                  className="p-1.5 sm:p-2"
                  style={{
                    border: "none",
                    backgroundColor: "#ffffff",
                  }}
                  onClick={() => {
                    navigate("/user/profile/" + user.id);
                  }}
                >
                  <Avatar
                    size={28}
                    className="sm:w-[35px] sm:h-[35px]"
                    src={`data:image/jpeg;base64, ${user.user.photo}`}
                  />
                </button>
              </Dropdown>
            )}
          </div>

          {user.role === "user" ? (
            <Dropdown
              menu={{
                items: companyItems,
              }}
              placement="bottom"
            >
              <button
                style={{ border: "none" }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 text-center whitespace-nowrap"
              >
                Switch to Companies
              </button>
            </Dropdown>
          ) : (
            <button
              style={{ border: "none" }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 text-center whitespace-nowrap"
              onClick={() => {
                dispatch(
                  switchRole({
                    companyID: null,
                    role: "user",
                  })
                );
                navigate("/user");
              }}
            >
              Switch to User
            </button>
          )}
        </div>

        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-4"
        >
          {/* First Stake Holder */}
          {user.role === "user" && (
            <ul
              style={{ listStyleType: "none" }}
              className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lge md:font-medium"
            >
              <li>
                <Link
                  className="block py-2 px-3 text-gray-600 rounded md:bg-white md:text-blue-700 md:p-0"
                  to="/user"
                  spy="true"
                  smooth="true"
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0 "
                  to="companies"
                  spy="true"
                  smooth="true"
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    navigate("companies");
                  }}
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0 "
                  to="compare"
                  spy="true"
                  smooth="true"
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    navigate("compare");
                  }}
                >
                  Compare
                </Link>
              </li>

              <li>
                <Link
                  className="block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0"
                  to="jobs"
                  spy="true"
                  smooth="true"
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    navigate("jobs");
                  }}
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  to="users"
                  spy="true"
                  smooth="true"
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    navigate("chat");
                  }}
                >
                  Users
                </Link>
              </li>
            </ul>
          )}

          {/* Second Stake Holder */}
          {user.role === "company" && (
            <ul
              style={{ listStyleType: "none" }}
              className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lge md:font-medium"
            >
              <li>
                <Link
                  className="block py-2 px-3 text-gray-600 rounded md:bg-white md:text-blue-700 md:p-0"
                  to="/company"
                  spy="true"
                  smooth="true"
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="block py-2  px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  to="users"
                  spy="true"
                  smooth="true"
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    navigate("users");
                  }}
                >
                  Users
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
