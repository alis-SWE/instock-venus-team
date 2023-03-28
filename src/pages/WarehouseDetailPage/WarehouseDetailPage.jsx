import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import axios from "axios"
import Button from '../../components/Button/Button';
import './WarehouseDetailPage.scss';
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import InventoryList from '../../components/InventoryList/InventoryList';
import DeleteInventoryList from '../../components/DeleteInventoryList/DeleteInventoryList';
import api from '../../utils/api'

export default function WarehouseDetailPage() {

    const { id } = useParams();
    const [warehouse, setWarehouse] = useState({});
    const [deleteInventory, setDeleteInventory] = useState(false);
    const [inventoryID, setInventoryID] = useState("");
    const [inventoryName, setInventoryName] = useState("");

    const fetchWarehouse = async () => {
        try {
            const { data } = await api.get(`/warehouse/${id}`);
            setWarehouse(data)
        } catch (error) {
            console.log("Failed to Fetch inventory Data" + error);
        }
    }

    const getInventoryID = (selectedInventory) => {
        setInventoryID(selectedInventory);
    };

    const getInventoryName = (iName) => {
        setInventoryName(iName);
    };

    useEffect(() => {
        fetchWarehouse();
    }, [id])

    useEffect(() => {
        fetchWarehouse();
    }, [deleteInventory])

    // Render the component only when the id is not null
    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div className="warehouse-pg">
            <div className='warehouse-pg__container'>
                <div className="warehouse-pg__header">
                    <Link to={"/"} className="warehouse-pg__link">
                        <img src={backArrow} alt="back arrow" className="warehouse-pg__arrow" />
                        <h1 className="warehouse-pg__title" >{warehouse.warehouse_name}</h1>
                    </Link>
                    <Link className="warehouse-pg__edit-link"  to={`/warehouse/edit/${id}/`} >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='warehouse-pg__edit-icon'>
                            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#FFF"/>
                        </svg>
                        <p className="warehouse-pg__edit-text">Edit</p>
                    </Link>
            
                </div>
                <div className="warehouse-pg__details">
                    <div className='warehouse-pg__address-container'>
                        <h4 className="warehouse-pg__label">WAREHOUSE ADDRESS</h4>
                        <p className="warehouse-pg__address">{warehouse.address + ", "}</p>
                        <p className="warehouse-pg__address">{warehouse.city + ", " + warehouse.country}</p>
                    </div>
                    <div className='warehouse-pg__contact-container'>
                        <div className='warehouse-pg__contact'>
                            <h4 className="warehouse-pg__label">CONTACT NAME</h4>
                            <p className="warehouse-pg__name">{warehouse.contact_name}</p>
                            <p className="warehouse-pg__position">{warehouse.contact_position}</p>
                        </div>
                        <div className='warehouse-pg__information-container'>
                            <h4 className="warehouse-pg__label">CONTACT INFORMATION</h4>
                            <p className="warehouse-pg__phone">{warehouse.contact_phone}</p>
                            <p className="warehouse-pg__email">{warehouse.contact_email}</p>
                        </div>
                    </div>
                </div>
                <InventoryList 
                    warehouseID={id} 
                    modalValue={(value) => setDeleteInventory(value)}
                    invID={(invId) => getInventoryID(invId)}
                    invName={(invname) => getInventoryName(invname)}
                    closeModal={deleteInventory}
                />
                {deleteInventory && <DeleteInventoryList closeModal={setDeleteInventory} id={inventoryID} name={inventoryName}  />}
            </div>
        </div>
    )
}
