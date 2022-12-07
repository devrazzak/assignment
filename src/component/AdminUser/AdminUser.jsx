import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/UserSlice";
import List from "../List/List";
import Pagination from "../Pagination/Pagination";

const AdminUser = () => {
  const { adminUser, currentAdminPage } = useSelector((state) => state.AllUser);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const setCurrentPage = (page) => {
    dispatch(userAction.setCurrentAdminPage(page));
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin?&page=${currentAdminPage}&limit=5`
      )
      .then((res) => {
        dispatch(userAction.getAdminUser(res.data));
      })
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentAdminPage]);

  return (
    <div>
      {loading ? (
        <div className="user-loading">
          <div className="loader user"></div>
        </div>
      ) : (
        <List users={adminUser} title="Admin" />
      )}
      <Pagination
        totalPost={50}
        postPerPage={5}
        currentPage={currentAdminPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AdminUser;
