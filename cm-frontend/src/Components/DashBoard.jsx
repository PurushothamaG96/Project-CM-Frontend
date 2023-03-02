import React, { useEffect, useState } from 'react';
import AsideBar from './AsideBar';
import Header from './Header';
import TableSheet from './TableSheet';
import './DashBord.css'
import axios from 'axios'
import ImportCard from './PopupCards/importCard';
import DeletePopUpCard from './PopupCards/DeletePopUpCard';
export const GlobalContext = React.createContext()

const DashBoard = () => {
    const [contentArr, setContentArr] = useState([])
    const [invokeImportCard, setInvokeImportcard] = useState(false)
    const [deleteArr, setDeleteArr] = useState([])
    const [invokeDeleteCard, setInvokeDeleteCard] = useState(false)
    const token = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        getData()
    }, [])
    function getData() {
        axios('https://vast-puce-wasp.cyclic.app/app/v1/contacts', {
            method: 'get',
            headers: {
                "Authorization": token
            }
        }).then((result) => {
            setContentArr(result.data.data)
        }).catch((e) => {
            console.log(e)
        })
    }

    
    
    //handle delete multiple by checkbox
    const handleDeleteMany=()=>{
        setInvokeDeleteCard(true)
        const tempArr = contentArr.filter((data)=>{return data.isChecked})
        .map(data=>data._id)
        
        setDeleteArr(tempArr)
    }
    return (
        <GlobalContext.Provider value={{deleteArr, setDeleteArr,handleDeleteMany,invokeDeleteCard, setInvokeDeleteCard, setContentArr, contentArr, getData, invokeImportCard, setInvokeImportcard }}>
            <div className='dashboard-container'>
                <div className='header text-bg-secondary'>
                    <Header />
                </div >
                <div className='asidebar'>
                    <AsideBar />
                </div>
                <div className='tablesheet'>
                    <TableSheet />
                </div>
                <div>
                    {invokeImportCard ? <div className='popup-card-container'>
                        <ImportCard />
                    </div> : ""}
                </div>
                <div>
                    {invokeDeleteCard ? <div className='popup-card-container'>
                        <DeletePopUpCard/>
                    </div> : ""}
                </div>
            </div>
        </GlobalContext.Provider>
    );
}

export default DashBoard;