import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function AdminAllVaccineCenters() {
  const [allcenters, setAllCenters] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  let Navigat = useNavigate();

  async function getAllCenters() {
    setIsLoad(true);
    try {
      const response = await axios.get("http://localhost:8083/Center/");
      console.log(response?.data[0]);
      setAllCenters(response?.data);
    } catch (error) {
      Navigat("/error")
    } finally {
      setIsLoad(false); 
    }
  }



async function deleteCenter(centerId) {


 

  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      setIsLoad(true);

      console.log(centerId);
      const response = await axios.delete(`http://localhost:8083/Center/${centerId}`, {
      });



      if (response.data=== "deleted successfully") {
        await getAllCenters(); // Assuming getAllCenters is an asynchronous function
        Swal.fire({
          title: "Deleted!",
          text: "Center has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error("Failed to delete vaccination center");
      }
    }
  } catch (error) {
    Navigat("/error")
    console.error('Error deleting vaccination center:', error.message);

  } finally {
    setIsLoad(false); 
  }
}



  useEffect(() => {
    getAllCenters();
  }, []);

  return (
    <>
      {isLoad ? (
        
        <div className='vh-100 d-flex align-items-center justify-content-center'>
          <Bars
            height="190"
            width="190"
            color="#09c"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          
        </div>
      ) : (
        <div className='my-5 px-5'>
          <div className='container-fluid'>
            <div className='d-flex align-items-center justify-content-center'>
              <h1 className='text center fw-bold text-success'>Hello Admin</h1>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <h3 className='text center fw-bold text-black my-4'>All Centers</h3>
            </div>
            <table className="table table-hover m-4 shadow-lg">
              <thead className='fs-3'>
                <tr>
                  <th className="p-2 fs-4">Id</th>
                  <th className="p-2 fs-4">Name</th>
                  <th className="p-2 fs-4">Email</th>
                  <th className="p-2 fs-4">Location</th>
                  <th className="p-2 fs-4">Number</th>
                  <th className="p-2 fs-4">Delete</th>
                </tr>
              </thead>
              <tbody className='fs-5'>
                {allcenters?.map((center, index) => (
                  <tr key={index}>
                    <td>{center.id}</td>
                    <td>{center.name}</td>
                    <td>{center.email}</td>
                    <td>{center.location}</td>
                    <td>{center.number}</td>
                    <td><button className='btn btn-danger' onClick={()=>deleteCenter(center.id)}>Delete</button></td>
                  


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
