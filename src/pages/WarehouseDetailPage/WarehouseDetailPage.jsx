import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import axios from "axios"
import Button from '../../components/Button/Button';
import './WarehouseDetailPage.scss';
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import InventoryList from '../../components/InventoryList/InventoryList';
import DeleteInventoryList from '../../components/DeleteInventoryList/DeleteInventoryList';

export default function WarehouseDetailPage() {

    const { id } = useParams();
    const [warehouse, setWarehouse] = useState({});
    const [deleteInventory, setDeleteInventory] = useState(false);
    const [inventoryID, setInventoryID] = useState("");
    const [inventoryName, setInventoryName] = useState("");

    const fetchWarehouse = async () => {
        try {
            console.log(id)
            const { data } = await axios.get(`http://localhost:8080/warehouse/${id}`);
            console.log(data);
            setWarehouse(data)
        } catch (error) {
            console.log("Failed to Fetch inventory Data" + error);
        }
    }

    const getInventoryID = (selectedInventory) => {
        setInventoryID(selectedInventory);
        console.log(selectedInventory);
    };

    const getInventoryName = (iName) => {
        setInventoryName(iName);
        console.log(inventoryName);
    };

    useEffect(() => {
        if (id) {
            fetchWarehouse();
        }
    }, [id])


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
                    <Link className="warehouse-pg__edit-link"  to={`/warehouse/edit/${id}`} >
                        <img className="warehouse-pg__edit-icon" src={editIcon}/>
                        <p className="warehouse-pg__edit-text">Edit</p>
                    </Link>
            
                </div>
                <div className="warehouse-pg__details">
                    <div className='warehouse-pg__address-container'>
                        <p className="warehouse-pg__label">WAREHOUSE ADDRESS</p>
                        <p className="warehouse-pg__address">{warehouse.address + ", "}</p>
                        <p className="warehouse-pg__address">{warehouse.city + ", " + warehouse.country}</p>
                    </div>
                    <div className='warehouse-pg__contact-container'>
                        <div className='warehouse-pg__contact'>
                            <p className="warehouse-pg__label">CONTACT NAME</p>
                            <p className="warehouse-pg__name">{warehouse.contact_name}</p>
                            <p className="warehouse-pg__position">{warehouse.contact_position}</p>
                        </div>
                        <div className='warehouse-pg__information-container'>
                            <p className="warehouse-pg__label">CONTACT INFORMATION</p>
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
                />
                {deleteInventory && <DeleteInventoryList closeModal={setDeleteInventory} id={inventoryID} name={inventoryName} />}
            </div>
        </div>
    )
}
