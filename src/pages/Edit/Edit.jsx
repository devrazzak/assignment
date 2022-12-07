import React from "react";
import { useSelector } from "react-redux";
import UserForm from "../../component/UserForm/UserForm";

const Edit = () => {
  const { editUser } = useSelector((state) => state.AllUser);
  return (
    <div className="edit-area">
      <div className="container">
        <UserForm />
      </div>
    </div>
  );
};

export default Edit;
