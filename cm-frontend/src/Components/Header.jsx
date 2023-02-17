import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { GlobalContext } from './DashBoard'
import './All-section.css'
function Header() {
  const {handleDeleteMany, getData, invokeImportCard, setInvokeImportcard, setContentArr } = useContext(GlobalContext)
  const [search, setSearch] = useState("")
  //search by email
  useEffect(() => {
    if (search === "") {
      getData()
    }
    else {
      axios(`http://localhost:5500/app/v1/contacts/${search}`, {
        method: "get",
        headers: {
          "Authorization": JSON.parse(localStorage.getItem("token"))
        }
      }).then((result) => {
        console.log(result.data)
        setContentArr(result.data.data)
      }).catch((e) => {
        console.log(e)
      })
    }
  }, [search])
  return (
    <>
      <div className='header-sub-container p-2'>
        <div>
          <h1 className='p-0 m-0'>Total <span className='text-primary'>Contacts</span></h1>
        </div>
        <div className='col-4'>
          <input type='text' title='Search Email' className='p-0 m-0' class="form-control" placeholder="Search by email..." onChange={(e) => { setSearch(e.target.value) }} />
        </div>
        <div className='d-flex flex-row justify-content-center align-items-center'>
          <div className='m-0 p-2'>
            <i className='fa fa-3x fa-user-circle text-primary'></i>
          </div>
          <div>
            <p className='p-0 m-0'>Name</p>
            <p className='p-0 m-0'>Super admin</p>
          </div>
        </div>
      </div>
      <hr className='m-0'/>
      <div className='header-sub-container'>
        <div className='d-flex flex-row justify-content-center col-6'>
        <button className='btn btn-primary col-2 m-2 p-2 rounded'>Select Date</button>
          <button className='btn btn-primary col-2 m-2 p-2 rounded'>Filter</button>
        </div>
        <div className='d-flex flex-row justify-content-center col-6'>
          <button className='btn btn-danger col-2 m-2 p-2 rounded' onClick={handleDeleteMany}><i className='fa fa-trash mx-2'></i>Delete</button>
          <button className='btn btn-primary col-2 m-2 p-2 rounded' onClick={() => setInvokeImportcard(true)}><i className='fa fa-upload mx-2'></i>Import</button>
          <button className='btn btn-primary col-2 m-2 p-2 rounded'><i class="fa-solid fa-file-export mx-2"></i>Export</button>
        </div>
      </div>
    </>
  )
}

export default Header
