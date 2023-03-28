import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InventoryCard.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import arrow from '../../assets/icons/chevron_right-24px.svg';
import axios from "axios"
import Status from '../Status/Status';

export default function InventoryCard({ id, itemName, warehouse, category, status, quantity, modalValue, invID, invName }) {


    const handleClick = () => {
        invID(id);
        invName(itemName);
        modalValue(true);
    }


    return (
        <div className="inventory">
            <div className="inventory__col-1">
                <div className="inventory__id-container">
                    <h4 className="inventory__label">INVENTORY ITEM</h4>
                    <Link to={`/inventory/${id}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <p>{itemName}</p>
                        <img className="inventory__arrow-icon" src={arrow} alt="delete icon"/>
                    </Link>
                </div>
                <div className="inventory__address-container">
                    <h4 className="inventory__label">CATEGORY</h4>
                    <p>{category}</p>
                </div>
                <img src={deleteIcon} alt="" className="inventory__delete" onClick={handleClick}/>
            </div>
            <div className="inventory__col-2">
                <div className="inventory__status-container">
                    <h4 className="inventory__label">STATUS</h4>
                    <Status status={status}/>
                </div>
                <div className="inventory__info-container">
                        <h4 className="inventory__label">QTY</h4>
                        <p>{quantity}</p>
                </div>
                <div className="inventory__info-container">
                        <h4 className="inventory__label">WAREHOUSE</h4>
                        <p>{warehouse}</p>
                </div>
                <Link to={`/inventory/edit/${id}`} className="inventory__edit">
                    <img src={editIcon} alt=""/>
                </Link>
            </div>
            <div className="inventory__actions-container">
                    <img src={deleteIcon} alt="" onClick={handleClick} className="inventory__delete--tablet"/>
                <Link to={`edit/${id}`} className="inventory__edit--tablet">
                    <img src={editIcon} alt="edit icon"/>
                </Link>
            </div>
        </div>
    );
}
