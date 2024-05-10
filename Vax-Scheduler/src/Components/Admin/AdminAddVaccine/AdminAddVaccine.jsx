import { Field, FieldArray, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import style from "./AddVaccine.module.css";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../../../Context/AuthContext";

export default function AdminAddVaccine() {


  let vaccine = {
    name: "",
    durationBetweenDoses: "",
    precautions: ""
  };


  let [ErrorMsg, setErrorMsg] = useState(null);
  let [IsLoading, setIsLoading] = useState(false);
  let [laoaCenter, setlaoaCenter] = useState(false);

  let Navigat = useNavigate();




  function checkValidate(values) {
    const errors = {};

    setErrorMsg(null);

    if (values.name.length < 4 || values.name.length > 12) {
      errors.name = "Vaccine Name length must be between 4 and 12 characters.";
    }

    if (values.precautions?.length < 8 || values.nprecautionsame?.length > 25) {
      errors.precautions = "precautions length must be between 8 and 25 characters.";
    }
    return errors;
  }

  async function SendData(values) {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8081/vaccine/add", values);
      console.log(response.data); // Log the response data for debugging
  
      // Handle the response data accordingly
      if (response.data === "saved Successfully!") {
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Vaccine Added Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Navigat("/error")
      console.error("API Error:", error);
      setErrorMsg(error.message); // Set the error message to display to the user
    }
    setIsLoading(false);
  }



  let formikObject = useFormik({
    initialValues: vaccine,
    validate: checkValidate,
    onSubmit: SendData
  });







  return (
    <>

      <div className="container my-3">
        <h5 className='text-center fs-3'>Add New Vaccine</h5>

        {ErrorMsg ? (
          <div className="alert alert-danger fs-4 fw-bold">{ErrorMsg}</div>
        ) : (
          ""
        )}

        <form onSubmit={formikObject.handleSubmit}>
          <input
            type="text"
            className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
            placeholder="Vaccine Name"
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
            placeholder="Duration Between Doses"
            name="durationBetweenDoses"
            id="durationBetweenDoses"
            value={formikObject.values.durationBetweenDoses}
            onChange={formikObject.handleChange}
            onBlur={formikObject.handleBlur}
          />
          {formikObject.errors.durationBetweenDoses && formikObject.touched.durationBetweenDoses ? (
            <div className="alert alert-danger mb-5">
              {formikObject.errors.durationBetweenDoses}
            </div>
          ) : (
            " "
          )}

          <input
            type="text"
            className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
            placeholder="Precautions"
            name="precautions"
            id="precautions"
            value={formikObject.values.precautions}
            onChange={formikObject.handleChange}
            onBlur={formikObject.handleBlur}
          />


          {formikObject.errors.precautions && formikObject.touched.precautions ? (
            <div className="alert alert-danger mb-5">
              {formikObject.errors.precautions}
            </div>
          ) : (
            " "
          )}



          <h2 className="text-center fw-bold">Designate places where this vaccine can be obtained </h2>



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
              "Add Vaccine"
            )}
          </button>






          <div>

          </div>

        </form>
      </div>
    </>
  )
}
