import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./InventoryItemPage.scss";
import axios from "axios";
import { useEffect, useState } from 'react';
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import Button from "../../components/Button/Button";
import Status from '../../components/Status/Status';
import api from '../../utils/api'



const  InventoryItemPage = () => {

    const { id } = useParams();
    const [warehouse, setWarehouse] = useState("");
    const [inventory, setInventory] = useState("");


    const fetchInventory = async () => {
        try {
            const { data } = await api.get(`/inventory/${id}`);
            setInventory(data)
        } catch (error) {
            console.log("Failed to Fetch inventory Data" + error);
        }

    }


      //useEffect Function 
    useEffect(() => {
        if(inventory.length !== ""){
            fetchInventory();
        } else {

        }
    }, []);


    return (
        <div className="inventory-pg">
            <div className='inventory-pg__container'>
                <div className="inventory-pg__header">
                    <Link to={"/"} className="inventory-pg__link">
                        <img src={backArrow} alt="back arrow" className="inventory-pg__arrow" />
                        <h1 className="inventory-pg__title" >{inventory.item_name}</h1>
                    </Link>
                    <Link className="inventory-pg__edit-link"  to={`/inventory/edit/${id}`} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='inventory-pg__edit-icon'>
                            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#FFF"/>
                        </svg>
                        <p className="inventory-pg__edit-text">Edit</p>
                    </Link>
                </div>
                <div className="inventory-pg__item-container">
                <div className="inventory-pg__item-details">
                        <div className='inventory-pg__description'>
                            <h4 className="inventory-pg__label">DESCRIPTION:</h4>
                            <p className="inventory-pg__description-text">{inventory.description}</p>
                        </div>
                        <div className='inventory-pg__category'>
                            <h4 className="inventory-pg__label">CATEGORY:</h4> 
                            <p className="inventory-pg__quantity-text">{inventory.category}</p>
                        </div>
                    </div>
                    <div className="inventory-pg__warehouse-details">
                        <div className='inventory-pg__qty-container'>
                            <div className='inventory-pg__status'>
                                <h4 className="inventory-pg__label">STATUS:</h4>
                                <Status status={inventory.status}/>
                            </div>
                            <div className='inventory-pg__quantity'>
                                <h4 className="inventory-pg__label">QUANTITY:</h4>
                                <p className="inventory-pg__quantity-text">{inventory.quantity}</p>
                            </div>
                        </div>
                        <div className='inventory-pg__warehouse'>
                            <h4 className="inventory-pg__label">WAREHOUSE:</h4>
                            <p className="inventory-pg__warehouse-text">{inventory.warehouse_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryItemPage;