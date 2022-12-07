import axios from "axios";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userAction } from "../../redux/UserSlice";
import Button from "../Button/Button";

const SingleList = ({ user }) => {
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEdit = (user) => {
    dispatch(userAction.editValue(user));
  };
  const deleteUser = (id) => {
    setDeleteLoading(true);
    axios
      .delete(`https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`)
      .then((res) => {
        dispatch(userAction.deleteAUser(res.data));
      })
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.user_type}</td>
      <td>
        <Link to={`/edit/${user.id}`}>
          <Button
            className="btn edit"
            text="Edit"
            handleButton={() => handleEdit(user)}
          />
        </Link>
        <Link to={`/details/${user.id}`}>
          <Button className="btn details" text="Details" />
        </Link>
        <Button
          handleButton={() => deleteUser(user.id)}
          className="btn delete"
          text="Delete"
          loading={deleteLoading}
        />
      </td>
    </tr>
  );
};

export default SingleList;
