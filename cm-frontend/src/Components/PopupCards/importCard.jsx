import React, {useContext} from 'react';
import './allcard.css'
import {parse} from "papaparse"
import axios from 'axios';
import { GlobalContext } from '../DashBoard';
const ImportCard=(props)=>{
    const {setInvokeImportcard, getData} = useContext(GlobalContext)
    const token = JSON.parse(localStorage.getItem("token"))
    //handle csv file
    const handleCSVFile=(e)=>{
        e.preventDefault()
        setInvokeImportcard(false)
        Array.from(e.dataTransfer.files).map(async (data)=>{
            let text = await data.text()
            //npm install papaparse
            let result = parse(text, {header:true})
            
            axios('https://vast-puce-wasp.cyclic.app/app/v1/contacts',{
            method:"post",
            headers:{
                "Authorization":token
            },
            data:result.data
        })
        .then((res)=>{
            console.log(res)
            getData()
        }).catch(e=>{
            console.log(e)
        })
        })   
    }
    return (
        <div className='popup-card' 
        onDragOver={(e)=>{e.preventDefault()}} 
        onDrop={handleCSVFile}>
                <div>
                    <h4 className='text-primary'>Drag & Drop file here</h4>
                </div>
                <div>
                <input type="file" onChange={(e)=>{console.log(e.target)}} style={{ display: 'none' }} />
                </div>
                <i className="fa fa-upload fa-5x text-primary "></i>
                <div>
                    <button onClick={()=>setInvokeImportcard(false)} className='btn btn-danger px-5'>Cancel</button>
                </div>
        </div>
    );
}

export default ImportCard;