import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InventoryCard.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import arrow from '../../assets/icons/chevron_right-24px.svg';
import axios from "axios"
import Status from '../Status/Status';

export default function InventoryCard({ id, itemName, description, warehouseId,category, status, quantity, }) {

    const [warehouse, setWarehouse] = useState("")

    const fetchWarehouse = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/warehouse/${warehouseId}`);
            console.log(data);
            setWarehouse(data.warehouse_name);
        } catch (error) {
            console.log("Failed to Fetch Warehouses Data" + error);
        }

    }


    useEffect(() => {
        if(warehouse === ""){
            fetchWarehouse();
        } else {

        }
    }, [warehouse]);

    return (
        <div className="inventory">
            <div className="inventory__col-1">
                <div className="inventory__id-container">
                    <p className="inventory__label">INVENTORY ITEM</p>
                    <Link to={`/inventory/${id}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <p>{itemName}</p>
                        <img className="inventory__arrow-icon" src={arrow} alt="delete icon"/>
                    </Link>
                </div>
                <div className="inventory__address-container">
                    <p className="inventory__label">CATEGORY</p>
                    <p>{category}</p>
                </div>
                <Link className="inventory__delete">
                    <img src={deleteIcon} alt=""/>
                </Link>
            </div>
            <div className="inventory__col-2">
                <div className="inventory__name-container">
                    <p className="inventory__label">STATUS</p>
                    <Status status={status}/>
                </div>
                <div className="inventory__info-container">
                        <p className="inventory__label">QTY</p>
                        <p>{quantity}</p>
                </div>
                <div className="inventory__info-container">
                        <p className="inventory__label">WAREHOUSE</p>
                        <p>{warehouse}</p>
                </div>
                <Link to={`inventory/edit/${id}`} className="inventory__edit">
                    <img src={editIcon} alt=""/>
                </Link>
            </div>
            <div className="inventory__actions-container">
                <Link to={`inventory/edit/${id}`} className="inventory__delete--tablet">
                    <img src={deleteIcon} alt=""/>
                </Link>
                <Link to={`edit/${id}`} className="inventory__edit--tablet">
                    <img src={editIcon} alt="edit icon"/>
                </Link>
            </div>
        </div>
    );
}
