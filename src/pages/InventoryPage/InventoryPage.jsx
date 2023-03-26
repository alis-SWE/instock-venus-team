import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import InventoryCard from "../../components/InventoryCard/InventoryCard";
import searchIcon from "../../assets/icons/search-24px.svg"
import Button from "../../components/Button/Button";
import "./InventoryPage.scss"
import {Link} from "react-router-dom";
import DeleteInventoryList from "../../components/DeleteInventoryList/DeleteInventoryList";

const InventoryPage = () => {

    const [inventory, setInventory] = useState([]);
    const [deleteInventory, setDeleteInventory] = useState(false);
    const [inventoryID, setInventoryID] = useState("");
    const [inventoryName, setInventoryName] = useState("");

    const fetchInventory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/inventory");
            console.log(data);
            setInventory(data)
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

    //useEffect Function 
    useEffect(() => {
        if(inventory.length === 0){
            fetchInventory();
        } else {

        }
    }, [inventory]);

    useEffect(() => {
        fetchInventory();
    }, [deleteInventory]);


    return (       
        <div className="inventory">
            <div className="inventory__container">
                <div className="inventory__header">
                    <h1 className="inventory__title">Inventory</h1>
                    <div class="inventory__search-container">
                        <input id="warehouse-search" name="inventory__search" placeholder="Search..."></input>
                        <img src={searchIcon} alt="Search Icon" class="inventory__search-icon"/>
                    </div>
                    <Link to={`/inventory/add`}>
                        <Button className="warehouse__btn" buttonText="+ Add  New Item"/>
                    </Link>
                
                </div>
                <div className='inventory__labels--tablet'>
                    <div className="inventory__label--tablet">INVENTORY ITEM</div>
                    <div className="inventory__label--tablet">CATEGORY</div>
                    <div className="inventory__label--tablet">STATUS</div>
                    <div className="inventory__label--tablet">QTY</div>
                    <div className="inventory__label--tablet">WAREHOUSE</div>
                    <div className="inventory__label--tablet inventory__label--tablet--action">ACTIONS</div>
                </div>
                {inventory.length > 0 && inventory.map((inventory, i) => {
                    return (
                        <InventoryCard
                        key={i}
                        id={inventory.id}
                        itemName={inventory.item_name}
                        category={inventory.category}
                        warehouseId={inventory.warehouse_id} 
                        description={inventory.description}
                
                        status={inventory.status} 
                        quantity={inventory.quantity} 

                        modalValue={(value) => setDeleteInventory(value)}
                        invID={(invId) => getInventoryID(invId)}
                        invName={(invname) => getInventoryName(invname)}
                    />
                    
                    );
                })}
            </div>
            {deleteInventory && <DeleteInventoryList closeModal={setDeleteInventory} id={inventoryID} name={inventoryName} />}
        </div>  
    );
}

export default InventoryPage;


