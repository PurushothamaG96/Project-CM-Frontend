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
            
            axios('http://localhost:5500/app/v1/contacts',{
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
                    <h4>drag & drop file here</h4>
                </div>
                <div>
                <input type="file" onChange={(e)=>{console.log(e.target)}} style={{ display: 'none' }} />
                </div>
                <div>
                    <button>Cancel</button>
                </div>
        </div>
    );
}

export default ImportCard;