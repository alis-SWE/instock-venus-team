import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./InventoryItemPage.scss";
import axios from "axios";
import { useEffect, useState } from 'react';
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import Button from "../../components/Button/Button";
import Status from '../../components/Status/Status';



const  InventoryItemPage = () => {

    const { id } = useParams();
    const [warehouse, setWarehouse] = useState("");
    const [inventory, setInventory] = useState("");


    const fetchInventory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/inventory/${id}`);
            console.log(data);
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
    }, [inventory]);


    return (
        <div className="inventory-pg">
            <div className='inventory-pg__container'>
                <div className="inventory-pg__header">
                    <Link to={"/"} className="inventory-pg__link">
                        <img src={backArrow} alt="back arrow" className="inventory-pg__arrow" />
                        <h1 className="inventory-pg__title" >{inventory.item_name}</h1>
                    </Link>
                    <Link className="inventory-pg__edit-link"  to={`/inventory/edit/${id}`} >
                        <img className="inventory-pg__edit-icon" src={editIcon}/>
                        <p className="inventory-pg__edit-text">Edit</p>
                    </Link>
                </div>
                <div className="inventory-pg__item-container">
                <div className="inventory-pg__item-details">
                        <div className='inventory-pg__description'>
                            <p className="inventory-pg__label">DESCRIPTION:</p>
                            <p className="inventory-pg__description-text">{inventory.description}</p>
                        </div>
                        <div className='inventory-pg__category'>
                            <p className="inventory-pg__label">CATEGORY:</p> 
                            <p className="inventory-pg__quantity-text">{inventory.category}</p>
                        </div>
                    </div>
                    <div className="inventory-pg__warehouse-details">
                        <div className='inventory-pg__qty-container'>
                            <div className='inventory-pg__status'>
                                <p className="inventory-pg__label">STATUS:</p>
                                <Status status={inventory.status}/>
                            </div>
                            <div className='inventory-pg__quantity'>
                                <p className="inventory-pg__label">QUANTITY:</p>
                                <p className="inventory-pg__quantity-text">{inventory.quantity}</p>
                            </div>
                        </div>
                        <div className='inventory-pg__warehouse'>
                            <p className="inventory-pg__label">WAREHOUSE:</p>
                            <p className="inventory-pg__warehouse-text">{inventory.warehouse_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryItemPage;