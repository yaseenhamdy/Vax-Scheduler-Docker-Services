import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";

import { authContext } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminAllVaccine() {
  let { AdminToken } = useContext(authContext);

  let Navigat = useNavigate();

  const [allvaccines, setallvaccines] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  async function getAllvaccines() {
    setIsLoad(true);

    try {
      const response = await axios.get("http://localhost:8081/vaccine");
      console.log(response?.data);
      setallvaccines(response?.data);
    } catch (error) {
      Navigat("/error")

      console.log(error);

    } finally {
      setIsLoad(false);
    }
  }

  async function deleteVaccine(VaccineId) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setIsLoad(true);

        const response = await axios.delete(
          `http://localhost:8081/vaccine/${VaccineId}`
        );

        if (response.data === "deleted successfully") {
          await getAllvaccines(); // Assuming getAllCenters is an asynchronous function
          Swal.fire({
            title: "Deleted!",
            text: "Center has been deleted.",
            icon: "success",
          });
        } else {
          throw new Error("Failed to delete vaccination center");
        }
      }
    } catch (error) {
      console.error("Error deleting vaccination center:", error.message);
      Swal.fire({
        title: "Error",
        text: "Failed to delete vaccination center.",
        icon: "error",
      });
    } finally {
      setIsLoad(false);
    }
  }

  useEffect(() => {
    getAllvaccines();
  }, []);

  return (
    <>
      {isLoad ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Bars
            height="190"
            width="190"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="my-5 px-5">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-center">
              <h1 className="text center fw-bold text-success">Hello Admin</h1>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="text center fw-bold text-black my-4">
                All Vaccines
              </h3>
            </div>
            <table className="table table-hover m-4 shadow-lg">
              <thead className="fs-3">
                <tr>
                  <th className="p-2 fs-4">Id</th>
                  <th className="p-2 fs-4">Name</th>
                  <th className="p-2 fs-4">Duration Between Doses</th>
                  <th className="p-2 fs-4">Precautions</th>
                  <th className="p-2 fs-4">Delete</th>
                </tr>
              </thead>

              <tbody className="fs-5">
                {allvaccines?.map((vac, index) => (
                  <tr key={index}>
                    <td>{vac.id}</td>
                    <td>{vac.name}</td>
                    <td>{vac.durationBetweenDoses}</td>
                    <td>{vac.precautions}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteVaccine(vac.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
