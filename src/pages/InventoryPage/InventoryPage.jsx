import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import InventoryCard from "../../components/InventoryCard/InventoryCard";
import searchIcon from "../../assets/icons/search-24px.svg"
import sortIcon from "../../assets/icons/sort-24px.svg"
import Button from "../../components/Button/Button";
import "./InventoryPage.scss"
import {Link} from "react-router-dom";
import DeleteInventoryList from "../../components/DeleteInventoryList/DeleteInventoryList";
import api from '../../utils/api'

const InventoryPage = () => {

    const [inventory, setInventory] = useState([]);
    const [deleteInventory, setDeleteInventory] = useState(false);
    const [inventoryID, setInventoryID] = useState("");
    const [inventoryName, setInventoryName] = useState("");
    const [sortBy, setSortBy] = useState("warehouse_id");
    const [orderBy, setOrderBy] = useState("asc");
    const [sortBusy, setSortBusy] = useState(false);

    const fetchInventory = async () => {
        try {
            setSortBusy(true)
            const { data } = await api.get(`/inventory?sort_by=${sortBy}&order_by=${orderBy}`);
            setInventory(data)
            setSortBusy(false)
        } catch (error) {
            setSortBusy(false)
        }

    }

    const getInventoryID = (selectedInventory) => {
        setInventoryID(selectedInventory);
    };

    const getInventoryName = (iName) => {
        setInventoryName(iName);
    };

    const handleSort = (sort_by) => {
        if (!sortBusy) {
            if (orderBy === "desc") {
                setOrderBy("asc");
            }  else {
                setOrderBy("desc");
            }
            setSortBy(sort_by);
        }
    }
    useEffect(() => {
        fetchInventory();
    }, [sortBy, orderBy]);
    
    useEffect(() => {

        fetchInventory();

}, [deleteInventory]);

    return (       
        <div className="inventories">
            <div className="inventories__container">
                <div className="inventories__header">
                    <h1 className="inventories__title">Inventory</h1>
                    <div className="inventories__search-container">
                        <input id="warehouse-search" name="inventory__search" placeholder="Search..."></input>
                        <img src={searchIcon} alt="Search Icon" className="inventories__search-icon"/>
                    </div>
                    <Link to={`/inventory/add`}>
                        <Button className="warehouse__btn" buttonText="+ Add  New Item"/>
                    </Link>
                
                </div>
                <div className='inventories__labels--tablet'>
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
                    <div className="inventories__container--tablet">
                        <h4 className="inventories__label--tablet">WAREHOUSE</h4>
                        <img onClick={() => {handleSort("warehouse_id")}} src={sortIcon} alt="Sort Icon" className="inventories__sort-icon"/>
                    </div>
                    <div className="inventories__container--tablet">
                        <h4 className="inventories__label--tablet inventories__label--tablet--action">ACTIONS</h4>
                    </div>
                </div>
                {inventory.length > 0 && inventory.map((inventory, i) => {
                    return (
                        <InventoryCard
                        key={i}
                        id={inventory.id}
                        itemName={inventory.item_name}
                        category={inventory.category}
                        warehouse={inventory.warehouse_name} 
                        description={inventory.description}
                        status={inventory.status} 
                        quantity={inventory.quantity} 

                        modalValue={(value) => setDeleteInventory(value)}
                        invID={(invId) => getInventoryID(invId)}
                        invName={(invname) => getInventoryName(invname)}

                        handleSort={handleSort}
                    />
                    
                    );
                })}
            </div>
            {deleteInventory && <DeleteInventoryList closeModal={setDeleteInventory} id={inventoryID} name={inventoryName} handleDelete={fetchInventory} />}
        </div>  
    );
}

export default InventoryPage;


