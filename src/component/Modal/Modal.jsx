import React from "react";
import UserForm from "../UserForm/UserForm";
import "./Modal.css";

const Modal = (props) => {
  return (
    <>
      <div className={`modal-area ${props.modal && "active"}`}>
        <div className="modal-close-button" onClick={props.closeModal}>
          x
        </div>
        <UserForm closeModal={props.closeModal} />
      </div>
      <div
        className={`overlay ${props.modal && "active"}`}
        onClick={props.closeModal}
      ></div>
    </>
  );
};

export default Modal;
