import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { authContext } from '../../../Context/AuthContext';

export default function AdminLayout() {
  let Navigat = useNavigate();

let {setAdminToken} =  useContext(authContext);



    function LogOut(){
      localStorage.removeItem("admintkn");
      setAdminToken(null)
        Navigat('/login');
      }

      

return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary my-3 px-5">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/admin"> <h5 className='fs-4 fw-bolder'>vax-schedular</h5> </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

       

<button className='btn btn-danger px-4 fs-4' onClick={LogOut}>Log out </button>
        







      </ul>

    </div>
  </div>
</nav>


<div className="container-fluid">
    <div className="row">
    <div className="col-md-2">
      <div className='border border-5 p-4'>
        <table className="table table-hover">
          <tbody>
            <tr className='text-center'>
              <td>
              <Link to="allvaccinecenters" style={{ textDecoration: 'none' }}>
      <h3 className='my-3'>All  Centers</h3>
    </Link>
              </td>
            </tr>

            <tr className='text-center'>
              <td>
              <Link to="addVaccinecenters" style={{ textDecoration: 'none' }}>
      <h3 className='my-3'>Add  Centers </h3>
    </Link>
              </td>
            </tr>

            <tr className='text-center'>
              <td>
              <Link to="allvaccines" style={{ textDecoration: 'none' }}>
      <h3 className='my-3'>All Vaccines  </h3>
    </Link>
              </td>
            </tr>


            
            <tr className='text-center'>
              <td>
              <Link to="addvaccine" style={{ textDecoration: 'none' }}>
      <h3 className='my-3'>Add Vaccines  </h3>
    </Link>
              </td>
            </tr>

          
          </tbody>
        </table>
      </div>
    </div>

        <div className="col-md-10">
            <Outlet/>
        </div>
    </div>
</div>





{/* 
<footer>
    <h5 className='bg-info'> Admin Footer</h5>
</footer> */}



    </>
  )
}
