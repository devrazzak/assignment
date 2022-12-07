import React, { useState } from "react";
import Modal from "../../component/Modal/Modal";
import Tab from "../../component/Tab/Tab";
import "./Home.css";

const Home = () => {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className="home-area">
      <div className="container">
        <Tab openModal={openModal} />
        <Modal modal={modal} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default Home;
