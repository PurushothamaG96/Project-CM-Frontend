import React, { useContext } from 'react'
import { GlobalContext } from './DashBoard'
import './All-section.css'
const TableSheet=()=>{
    const { contentArr, setContentArr,setDeleteArr,setInvokeDeleteCard} = useContext(GlobalContext)

    const handleCheckbox = (e)=>{
        const {id, checked} = e.target
        if(id==="selectAll"){
            const tempArr = contentArr.map(user=>{return {...user, isChecked:checked}})
            setContentArr(tempArr)
        }
        else{
            const tempArr = contentArr.map((data)=>data._id===id?{...data, isChecked:checked}:data)
            setContentArr(tempArr)
        }
        
    }
    return (
        <>
            <table className='table table-striped'>
                <thead className='table-header text-bg-secondary'>
                    <tr className='danger'>
                        <th>
                            <input id={"selectAll"} 
                        checked={contentArr.filter(data=>data?.isChecked!==true).length<1}
                         onChange={handleCheckbox} type='checkbox'/>
                         </th>
                        <th>Name</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Company</th>
                        <th scope="col">Industry</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Country</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contentArr.map((data, i)=>{
                            return(
                                <tr key={i}>
                                    <td>
                                        <input id={data._id} 
                                        onChange={handleCheckbox}
                                        checked={data?.isChecked||false} 
                                        type='checkbox'/>
                                        </td>
                                    <td>{data?.name}</td>
                                    <td>{data?.designation}</td>
                                    <td>{data?.company}</td>
                                    <td>{data?.industry}</td>
                                    <td>{data?.email}</td>
                                    <td>{data?.phonenumber}</td>
                                    <td>{data?.country}</td>
                                    <td><button className='btn' id={data._id}  onClick={(e)=>{
                                        setInvokeDeleteCard(true)
                                         setDeleteArr([data._id])
                                    }
                                       }><i className='fa fa-trash m-1 text-danger'></i></button></td>
                                </tr>
                            )
                           
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableSheet
