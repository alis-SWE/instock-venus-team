import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './InventoryList.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import arrow from '../../assets/icons/chevron_right-24px.svg';
import Status from '../Status/Status';
import api from '../../utils/api'

export default function InventoryList({ warehouseID, invID, invName, modalValue }) {
    const [inventory, setInventory] = useState([]);
    
    const fetchInventory = async () => {
        try {
            const { data } = await api.get("/inventory");
            console.log(data);
            setInventory(data)
        } catch (error) {
            console.log("Failed to Fetch inventory Data" + error);
        }
    
    }

    //useEffect Function 
    useEffect(() => {
        if(inventory.length === 0){
            fetchInventory();
        } else {
    
        }
    }, []);
    useEffect(() => {

            fetchInventory();
    
    }, [modalValue]);


    return(
        <div className="inventory-list">
            <div className="inventory-list__container">

                <div className='inventory-list__labels--tablet'>
                    <h4 className="inventory-list__label--tablet">INVENTORY ITEM</h4>
                    <h4 className="inventory-list__label--tablet">CATEGORY</h4>
                    <h4 className="inventory-list__label--tablet">STATUS</h4>
                    <h4 className="inventory-list__label--tablet">QUANTITY</h4>
                    <h4 className="inventory-list__label--tablet inventory-list__label--tablet--action">ACTIONS</h4>
                </div>
                {inventory.length > 0 && inventory.filter(inventory => warehouseID === inventory.warehouse_id).map((inventory, i) => {
                        const handleClick = () => {
                            invID(inventory.id);
                            invName(inventory.item_name);
                            modalValue(true);
                        }
                    return (
                        <div className="inventory" key={i}>

                            <div className="inventory__col-1 inventory-wh__col-1">
                                <div className="inventory__id-container inventory-wh__info">
                                    <p className="inventory__label">INVENTORY ITEM</p>
                                    <Link to={`/inventory/${inventory.id}`} style={{ display: 'flex', alignItems: 'left' }}>
                                        <p >{inventory.item_name}</p>
                                        <img src={arrow} alt="delete icon"/>
                                    </Link>
                                </div>
                                <div className="inventory__address-container inventory-wh__info">
                                    <p className="inventory__label">CATEGORY</p>
                                    <p>{inventory.category}</p>
                                </div>
                                    <img src={deleteIcon} alt="" className="inventory__delete" onClick={handleClick}/>
                            </div>
                            <div className="inventory__col-2 inventory-wh__col-2">
                                <div className="inventory__status-container inventory-wh__status-container">
                                    <p className="inventory__label">STATUS</p>
                                    <Status status={inventory.status}/>
                                </div>
                                <div className="inventory__info-container inventory-wh__info">
                                        <p className="inventory__label">QTY</p>
                                        <p>{inventory.quantity}</p>
                                </div>
                                <Link to={`/inventory/edit/${inventory.id}`} className="inventory__edit">
                                    <img src={editIcon} alt=""/>
                                </Link>
                            </div>
                            <div className="inventory__actions-container inventory-wh__actions-container">
                                    <img src={deleteIcon} alt="" onClick={handleClick}/>
                                <Link to={`/inventory/edit/${inventory.id}`} className="inventory__edit--tablet">
                                    <img src={editIcon} alt="edit icon" className=""/>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>  
    );
}