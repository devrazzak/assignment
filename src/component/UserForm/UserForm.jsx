import axios from "axios";
import { City } from "country-state-city";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userAction } from "../../redux/UserSlice";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { filteredDivisions } from "./state";
import "./UserForm.css";

const UserForm = ({ closeModal }) => {
  const { editUser } = useSelector((state) => state.AllUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(["Admin", "Employee"]);
  const location = useLocation();
  const User = location.pathname.slice(1, 5);

  const formValidate = (values) => {
    const errors = {};
    if (!values.first_name.trim())
      errors.first_name = "Please Enter First Name";
    if (!values.last_name.trim()) errors.last_name = "Please Enter First Name";
    if (!values.user_type.trim()) errors.user_type = "Please Select User type";
    if (values.user_type === "Employee") {
      if (!values.division.trim()) errors.division = "Please Select Division";
      if (!values.district.trim()) errors.district = "Please Select Distric";
    }

    return errors;
  };
  const updateForm = (values) => {
    setLoading(true);
    const updateData = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      user_type: values.user_type,
      division: values.division,
      district: values.district,
    };
    axios
      .put(
        `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`,
        updateData
      )
      .then((res) => {
        navigate("/");
        dispatch(userAction.isEdit(false));
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitForm = (values, { resetForm }) => {
    setLoading(true);
    const ragistrationData = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      user_type: values.user_type,
      division: values.division,
      district: values.district,
    };
    axios
      .post(
        "https://60f2479f6d44f300177885e6.mockapi.io/users",
        ragistrationData
      )
      .then((res) => {
        {
          values.user_type === "Admin" &&
            dispatch(userAction.addNewAdminUser(res.data));
        }
        {
          values.user_type === "Employee" &&
            dispatch(userAction.addNewEmployeeUser(res.data));
        }
        resetForm();
        closeModal();
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editInitialValues = {
    first_name: editUser.first_name,
    last_name: editUser.last_name,
    user_type: editUser.user_type,
    division: editUser.division,
    district: editUser.district,
  };
  const creatInitialValues = {
    first_name: "",
    last_name: "",
    user_type: "",
    division: "",
    district: "",
  };

  const addNewFormik = useFormik({
    initialValues: User === "edit" ? editInitialValues : creatInitialValues,
    validateOnChange: true,
    validateOnBlur: true,
    validate: formValidate,
    onSubmit: User === "edit" ? updateForm : submitForm,
  });
  let division = [];
  let state = [];
  const getDivision = filteredDivisions.map((item) => {
    division.push(item.name);
  });
  const divisionValue = addNewFormik.values.division;
  let statecode;
  const countrycode = filteredDivisions.filter((item) =>
    item.name === divisionValue ? (statecode = item.stateCode) : ""
  );
  let citiesOfState = City.getCitiesOfState("BD", statecode);
  const getState = citiesOfState.map((item) => {
    state.push(item.name);
  });

  const handleCancelButton = () => {
    navigate("/");
  };

  return (
    <div className="user-form-area">
      <form className="user-form" onSubmit={addNewFormik.handleSubmit}>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          palceholder="Enter First Name"
          value={addNewFormik.values.first_name}
          onBlur={addNewFormik.handleBlur}
          handleChange={addNewFormik.handleChange}
          label="First Name:"
          inputClassName={
            addNewFormik.touched.first_name && addNewFormik.errors.first_name
              ? "is-invalid"
              : ""
          }
          errorClassName={
            addNewFormik.touched.first_name && addNewFormik.errors.first_name
              ? "is-invalid"
              : ""
          }
          errorMessage={
            addNewFormik.touched.first_name || addNewFormik.isSubmitting
              ? addNewFormik.errors.first_name
              : ""
          }
        />

        <Input
          type="text"
          id="last_name"
          name="last_name"
          palceholder="Enter Last Name"
          value={addNewFormik.values.last_name}
          onBlur={addNewFormik.handleBlur}
          handleChange={addNewFormik.handleChange}
          label="Last Name:"
          inputClassName={
            addNewFormik.touched.last_name && addNewFormik.errors.last_name
              ? "is-invalid"
              : ""
          }
          errorMessage={
            addNewFormik.touched.last_name || addNewFormik.isSubmitting
              ? addNewFormik.errors.last_name
              : ""
          }
        />

        <Select
          id="user_type"
          name="user_type"
          value={addNewFormik.values.user_type}
          onBlur={addNewFormik.handleBlur}
          handleChange={addNewFormik.handleChange}
          label="Select User Type:"
          selectClassName={
            addNewFormik.touched.user_type && addNewFormik.errors.user_type
              ? "is-invalid"
              : ""
          }
          errorMessage={
            addNewFormik.touched.user_type || addNewFormik.isSubmitting
              ? addNewFormik.errors.user_type
              : ""
          }
          options={userType}
        />

        {addNewFormik.values.user_type === "Employee" && (
          <>
            <Select
              id="division"
              name="division"
              value={addNewFormik.values.division}
              onBlur={addNewFormik.handleBlur}
              handleChange={addNewFormik.handleChange}
              label="Select Division:"
              selectClassName={
                addNewFormik.touched.division && addNewFormik.errors.division
                  ? "is-invalid"
                  : ""
              }
              errorMessage={
                addNewFormik.touched.division || addNewFormik.isSubmitting
                  ? addNewFormik.errors.division
                  : ""
              }
              options={division}
            />
            <Select
              id="district"
              name="district"
              value={addNewFormik.values.district}
              onBlur={addNewFormik.handleBlur}
              handleChange={addNewFormik.handleChange}
              label="Select district:"
              selectClassName={
                addNewFormik.touched.district && addNewFormik.errors.district
                  ? "is-invalid"
                  : ""
              }
              errorMessage={
                addNewFormik.touched.district || addNewFormik.isSubmitting
                  ? addNewFormik.errors.district
                  : ""
              }
              options={state}
            />
          </>
        )}

        <div className="create-button left">
          <Button
            className="tab-button"
            type="submit"
            text={User === "edit" ? "Update User" : "Create User"}
            loading={loading}
          />
        </div>
      </form>

      {User === "edit" && (
        <div className="create-button left">
          <Button
            className="tab-button"
            handleButton={handleCancelButton}
            text="Cancel"
          />
        </div>
      )}
    </div>
  );
};

export default UserForm;
