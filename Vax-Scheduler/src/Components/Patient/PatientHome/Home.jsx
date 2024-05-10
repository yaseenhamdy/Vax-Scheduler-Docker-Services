import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../../Context/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header/Header';

export default function Home() {

  let { patiToken, setpatiToken } = useContext(authContext)

  const [allcenters, setAllCenters] = useState(null);

  const [isLoad, setIsLoad] = useState(false);


  let patientId = localStorage.getItem("patiid");



  let Navigat = useNavigate();







  let [vaccineArr, setVaccineArr] = useState([]);


 



  console.log(vaccineArr);




  async function getAllCenters() {
    setIsLoad(true);
    try {
      const response = await axios.get("http://localhost:8081/vaccine");
      setAllCenters(response?.data);
      console.log(response?.data[0]);
    } catch (error) {
      if (error.response.data.message === false) {
        setAllCenters([]);
      }
      console.error("Error fetching data get all centers:", error);
    } finally {
      setIsLoad(false);
    }
  }

  useEffect(() => {
    getAllCenters()
  }, [])








  return (
    <>
      <Header>

      </Header>
      
      <div className='my-5'>
        <div className="container my-5 py-5">
          <div className="row">

            {allcenters?.map((center, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title">{center.name}</h5>
                    {/* <h5 className="card-title">{center.name}</h5> */}
                    <p className="card-text">{center.precautions}</p>
                  </div>
                  <div className="card-body">






<button className='btn btn-info text-white'
  onClick={async () => {
    try {
      let data = {
        pid: 1,
        vame: center.name // Assuming center is a variable accessible in this scope
      };
      
      setIsLoad(true);

      let response = await axios.post(`http://localhost:8082/Reservation/`, data);
      setIsLoad(false);
      console.log(response.data);
      if(response?.data=="First dose taken successfully."){
              Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Doss Taked Succenfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
     Navigat('/error')
      // Handle the error here
    }
  }}
>
  Reserve Doss
</button>







                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
