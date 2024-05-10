import React, { useState } from "react";
import photo from "../../Images/photo.jpg";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";


export default function Register() {
  let patient = {
    name: "",
    ssn: "",
    password: "",
    email: "",
    gender: "",
  };




  let [ErrorMsg, setErrorMsg] = useState(null);
  let [SuccessMse, setSuccessMsg] = useState(null);
  let [IsLoading, setIsLoading] = useState(false);

  let Navigat = useNavigate();

  

  function checkValidate(values) {
    const errors = {};
    setErrorMsg(null);

    if (values.name.length < 4 || values.name.length > 12) {
      errors.name = "Name length must be between 4 and 12 characters.";
    }

    if (!values.email.includes("@") || !values.email.includes(".")) {
      errors.email = "Invalid email. It should contain '@' and '.'.";
    } else if (
      /@vaccinecenter\b/.test(values.email) ||
      /@admin\b/.test(values.email)
    ) {
      errors.email = "Invalid email.";
    }

    if (!values.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)) {
      errors.password = "Invalid Password. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
    

    if (values.ssn.length < 6 || values.ssn.length > 10) {
      errors.ssn = "Invalid SSN number. It must be between  and 10 digits.";
    }

    return errors;
  }

  async function SendData(values) {
    setIsLoading(true);
    console.log(values);

    try {
      let { data } = await axios.post(
        "http://localhost:8080/patients/register",
        values
      );
      console.log(data.ssn);
      if(data.ssn){
        setTimeout(function () {
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          Navigat("/login");
        }, 2000);
      }

    } catch (error) {
      console.log(error)
      Navigat("/error");
     // console.error("API Error:", error.response.data.value);
    }
    setIsLoading(false);
}







  let formikObject = useFormik({
    initialValues: patient,
    validate: checkValidate,
    onSubmit: SendData,
  });

  return (
    <>
      <div className="container-fluid  overflow-x-hidden">
        <div className="row gx-5 d-flex align-items-center">
          <div className="col-md-6 d-none d-md-block">
            <img src={photo} className="w-100 vh-100" alt="" />
          </div>

          <div className="col-md-6 px-5">
            <h1 className="text-center text-main fw-bold fs-1">Sign Up </h1>

            <form onSubmit={formikObject.handleSubmit}>
              <input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Name"
                name="name"
                id="name"
                value={formikObject.values.name}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.name && formikObject.touched.name ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.name}
                </div>
              ) : (
                " "
              )}

              

              <input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Email"
                name="email"
                id="email"
                value={formikObject.values.email}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.email && formikObject.touched.email ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.email}
                </div>
              ) : (
                " "
              )}


<input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="National Id Number" 
                name="ssn"
                id="ssn"
                value={formikObject.values.ssn}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
                {formikObject.errors.ssn && formikObject.touched.ssn ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.ssn}
                </div>
              ) : (
                " "
              )}

<input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Gender"
                name="gender"
                id="gender"
                value={formikObject.values.phone}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.phone && formikObject.touched.phone ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.phone}
                </div>
              ) : (
                " "
              )}

<input
                type="password"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Password"
                name="password"
                id="password"
             
              value={formikObject.values.password}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              />


              {formikObject.errors.password && formikObject.touched.password ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.password}
                </div>
              ) : (
                " "
              )}
              
              <button
  className="btn btn-success w-100 p-2"
  type="submit"
  disabled={!(formikObject.dirty && formikObject.isValid)}
>
  {IsLoading ? (
    <Bars
      height="90"
      width="90"
      color="#fff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  ) : (
    "Register Now"
  )}
</button>

<h5 className="text-center mt-5"> Already Have an Account ?  <Link className="text-success" to="/login"> Login Now </Link> </h5>



            </form>
          </div>
        </div>
      </div>
    </>
  );
}
