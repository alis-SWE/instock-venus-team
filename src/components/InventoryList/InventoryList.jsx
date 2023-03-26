import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './InventoryList.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import arrow from '../../assets/icons/chevron_right-24px.svg';

export default function InventoryList({ warehouseID, invID, invName, modalValue }) {
    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/inventory");
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
    }, [inventory]);


    

    return(
        <div className="inventory-list">
            <div className="inventory-list__container">

                <div className='inventory-list__labels--tablet'>
                    <div className="inventory-list__label--tablet">INVENTORY ITEM</div>
                    <div className="inventory-list__label--tablet">CATEGORY</div>
                    <div className="inventory-list__label--tablet">STATUS</div>
                    <div className="inventory-list__label--tablet">QUANTITY</div>
                    <div className="inventory-list__label--tablet inventory__label--tablet--action">ACTIONS</div>
                </div>
                {inventory.length > 0 && inventory.filter(inventory => warehouseID === inventory.warehouse_id).map((inventory, i) => {
                        const handleClick = () => {
                            invID(inventory.id);
                            invName(inventory.item_name);
                            modalValue(true);
                        }
                    return (
                        <div className="inventory" key={i}>

                            <div className="inventory__col-1">
                                <div className="inventory__id-container">
                                    <p className="inventory__label">INVENTORY ITEM</p>
                                    <Link to={`/inventory/${inventory.id}`} style={{ display: 'flex', alignItems: 'center' }}>
                                        <p>{inventory.item_name}</p>
                                        <img src={arrow} alt="delete icon"/>
                                    </Link>
                                </div>
                                <div className="inventory__address-container">
                                    <p className="inventory__label">CATEGORY</p>
                                    <p>{inventory.category}</p>
                                </div>
                                    <img src={deleteIcon} alt="" className="inventory__delete" onClick={handleClick}/>
                            </div>
                            <div className="inventory__col-2">
                                <div className="inventory__name-container">
                                    <p className="inventory__label">STATUS</p>
                                    <p>{inventory.status}</p>
                                </div>
                                <div className="inventory__info-container">
                                        <p className="inventory__label">QTY</p>
                                        <p>{inventory.quantity}</p>
                                </div>
                                <Link to={`inventory/edit/${inventory.id}`} className="inventory__edit">
                                    <img src={editIcon} alt=""/>
                                </Link>
                            </div>
                            <div className="inventory__actions-container">
                                    <img src={deleteIcon} alt="" onClick={handleClick}/>
                                <Link to={`edit/${inventory.id}`} className="inventory__edit--tablet">
                                    <img src={editIcon} alt="edit icon"/>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>  
    );
}