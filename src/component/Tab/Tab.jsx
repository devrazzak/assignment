import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/UserSlice";
import AdminUser from "../AdminUser/AdminUser";
import Button from "../Button/Button";
import EmployeeUser from "../EmployeeUser/EmployeeUser";
import "./Tab.css";

const Tab = (props) => {
  const { openTab } = useSelector((state) => state.AllUser);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdmin = () => {
    dispatch(userAction.tabOpen("admin"));
  };
  const handleEmployee = () => {
    dispatch(userAction.tabOpen("employee"));
  };

  return (
    <div className="tab-area">
      <div className="tab-menus">
        <div className="row">
          <div className="col-8">
            <Button
              className={`tab-button ${openTab === "admin" && "active"}`}
              text="Admin"
              handleButton={handleAdmin}
            />
            <Button
              className={`tab-button ${openTab === "employee" && "active"}`}
              text="Employee"
              handleButton={handleEmployee}
            />
          </div>
          <div className="col-4">
            <div className="create-button">
              <Button
                className="tab-button"
                text="Create New User"
                handleButton={props.openModal}
              />
            </div>
          </div>
        </div>
      </div>
      {openTab === "admin" && (
        <div className="tab-content">
          <AdminUser />
        </div>
      )}
      {openTab === "employee" && (
        <div className="tab-content">
          <EmployeeUser />
        </div>
      )}
    </div>
  );
};

export default Tab;
