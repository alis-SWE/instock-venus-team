import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './InventoryList.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import arrow from '../../assets/icons/chevron_right-24px.svg';
import Status from '../Status/Status';
import api from '../../utils/api'
import sortIcon from "../../assets/icons/sort-24px.svg"


export default function InventoryList({ warehouseID, invID, invName, modalValue }) {
    const [inventory, setInventory] = useState([]);
    const [sortBy, setSortBy] = useState("warehouse_id");
    const [orderBy, setOrderBy] = useState("asc");

    
    const fetchInventory = async () => {
        try {
            const { data } = await api.get(`/inventory?sort_by=${sortBy}&order_by=${orderBy}`);
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

    const handleSort = (sort_by) => {
        if (orderBy === "desc") {
            setOrderBy("asc");
        }  else {
            setOrderBy("desc");
        }
        setSortBy(sort_by);

        fetchInventory();
    }


    return(
        <div className="inventory-list">
            <div className="inventory-list__container">

                <div className='inventory-list__labels--tablet'>
                    <div className="inventories__container--tablet">
                        <h4 className="inventories__label--tablet">INVENTORY ITEM</h4>
                        <img onClick={() => {handleSort("item_name")}} src={sortIcon} alt="Sort Icon" className="inventories__sort-icon"/>
                    </div>
                    <div className="inventories__container--tablet">
                        <h4 className="inventories__label--tablet">CATEGORY</h4>
                        <img onClick={() => {handleSort("category")}} src={sortIcon} alt="Sort Icon" className="inventories__sort-icon"/>
                    </div>    
                    <div className="inventories__container--tablet">
                        <h4 className="inventories__label--tablet">STATUS</h4>
                        <img onClick={() => {handleSort("status")}} src={sortIcon} alt="Sort Icon" className="inventories__sort-icon"/>
                    </div>
                    <div className="inventories__container--tablet">
                        <h4 className="inventories__label--tablet">QTY</h4>
                        <img onClick={() => {handleSort("quantity")}} src={sortIcon} alt="Sort Icon" className="inventories__sort-icon"/>
                    </div>
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
                                        <img src={arrow} alt="arrow icon"/>
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
                                    <img src={deleteIcon} alt="" onClick={handleClick} className="inventory__delete--tablet" />
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