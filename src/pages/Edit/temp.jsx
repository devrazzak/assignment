import axios from "axios";
import { City } from "country-state-city";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../component//UserForm/UserForm.css";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import Select from "../../component/Select/Select";
import { filteredDivisions } from "../../component/UserForm/state";
import "./Edit.css";

const Edit = () => {
  const { id } = useParams();
  const { adminUser, employeeUser } = useSelector((state) => state.AllUser);
  const alluser = [...adminUser, ...employeeUser];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(["Admin", "Employee"]);
  const userValue = alluser.find((user) => user.id === id);
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

  const submitForm = (values) => {
    setLoading(true);
    const ragistrationData = {
      first_name: values.first_name,
      last_name: values.last_name,
      user_type: values.user_type,
      division: values.division,
      district: values.district,
    };
    axios
      .put(
        `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`,
        ragistrationData
      )
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const addNewFormik = useFormik({
    initialValues: {
      first_name: userValue.first_name,
      last_name: userValue.last_name,
      user_type: userValue.user_type,
      division: userValue.division,
      district: userValue.district,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validate: formValidate,
    onSubmit: submitForm,
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

  return (
    <div className="edit-area">
      <div className="container">
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
                addNewFormik.touched.first_name &&
                addNewFormik.errors.first_name
                  ? "is-invalid"
                  : ""
              }
              errorClassName={
                addNewFormik.touched.first_name &&
                addNewFormik.errors.first_name
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
                    addNewFormik.touched.division &&
                    addNewFormik.errors.division
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
                    addNewFormik.touched.district &&
                    addNewFormik.errors.district
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
              <Button className="tab-button" type="submit" text="Update User" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
