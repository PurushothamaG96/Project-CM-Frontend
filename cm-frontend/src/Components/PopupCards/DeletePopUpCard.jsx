import React, {useContext} from 'react';
import './allcard.css';
import axios from 'axios';
import { GlobalContext } from '../DashBoard';
const DeletePopUpCard=(props)=>{
    const {deleteArr, setInvokeDeleteCard, getData} = useContext(GlobalContext)
    const token = JSON.parse(localStorage.getItem("token"))
    //handle axios http delete call
    const handleDelete=async()=>{
       console.log(deleteArr)
        setInvokeDeleteCard(false);
            axios('https://vast-puce-wasp.cyclic.app/app/v1/contacts', {
            method:"delete",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":token
            },
            data:deleteArr
        })
        .then((res)=> getData())
        .catch((e)=>console.log(e))
        }

   
    return(
        <div className='popup-card'>
            <div>
                <h4 className='text-danger'>Delete Files</h4>
            </div>
            <i className='fa fa-trash text-warning fa-5x'></i>
            <div>
                <button className='btn btn-danger px-5' onClick={handleDelete}>OK</button>
            </div>
                    
        </div>
    );
}

export default DeletePopUpCard;