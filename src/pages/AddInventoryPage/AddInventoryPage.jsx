import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Button from '../../components/Button/Button'
import CancelButton from '../../components/CancelButton/CancelButton'
import backArrow from '../../assets/icons/arrow_back-24px.svg'
import './AddInventoryPage.scss'

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function AddInventoryPage() {

    const navigate = useNavigate();

    let [warehouseList, setWarehouseList] = useState([]);

    useEffect(() => {
        axios.get(API_URL + "/warehouse")
            .then((response) => {
                setWarehouseList(response.data);
                })
            .catch(error => 
                console.log(error))
    }, []);

    function handleOnSubmit(event) {
        event.preventDefault();

        const itemName = event.target.itemName.value;
        const itemDescription = event.target.itemDescription.value;
        const itemCategory = event.target.itemCategory.value;
        const itemStatus = event.target.itemStatus.value;
        const itemQuantity = event.target.itemQuantity.value;
        const itemWarehouse = event.target.itemWarehouse.value;
        const itemWarehouseObj = warehouseList.find(warehouse => warehouse.warehouse_name === itemWarehouse)
        const itemWarehouseId = itemWarehouseObj.id;

        axios.post(`${API_URL}/inventory`, {
            itemWarehouseId: itemWarehouseId,
            itemName: itemName,
            itemDescription: itemDescription,
            itemCategory: itemCategory,
            itemStatus: itemStatus,
            itemQuantity: itemQuantity,
        })
        .then(() => {
            navigate("/inventory");
            event.target.reset();
            })
            .catch(error => console.log(error));
    }

    return (
        <section className="add-inventory-page">
            <div className="add-inventory-page__container">
                <div className="add-inventory-page__header-container">
                    <img src={backArrow} alt="back arrow"/>
                    <h1>Add New Inventory Item</h1>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className="add-inventory-page__data-container">
                        <div className="add-inventory-page__details-container">
                            <h2>Item Details</h2>
                            <h3>Item Name</h3>
                            <input id="itemName" name="itemName" placeholder="Item Name"></input>
                            <h3>Description</h3>
                            <textarea id="itemDescription" name="itemDescription" placeholder="Please enter a brief item description..."></textarea>
                            <h3>Category</h3>
                            <select id="itemCategory" name="itemCategory">
                                <option value="">Please select</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Gear">Gear</option>
                                <option value="Health">Health</option>
                            </select>
                        </div>
                        <div className="add-inventory-page__availability-container">
                            <h2>Item Availability</h2>
                            <h3>Status</h3>
                            <div className="add-inventory-page__status-container">
                                <div className="add-inventory-page__radio-container">
                                    <input className="radio" type="radio" id="itemInStock" name="itemStatus" value="In stock"/>
                                    <label className="radio-label" htmlFor="itemInStock">In stock</label>
                                </div>
                                <div className="add-inventory-page__radio-container">
                                    <input className="radio" type="radio" id="itemOutOfStock" name="itemStatus" value="Out of stock"/>
                                    <label className="radio-label" htmlFor="itemOutOfStock">Out of stock</label>
                                </div>
                            </div>
                            <h3>Quantity</h3>
                            <input type="number" id="itemQuantity" name="itemQuantity" placeholder="0"></input>
                            <h3>Warehouse</h3>
                            <select id="itemWarehouse" name="itemWarehouse">
                                <option value="">Please select</option>
                                {warehouseList.map((warehouse) => {
                                    return (
                                        <option key={warehouse.id} value={warehouse.warehouse_name}>{warehouse.warehouse_name}</option>
                                )})}
                            </select>
                        </div>
                    </div>
                    <div className="add-inventory-page__button-container">
                        <Link className="add-inventory-page__button" to="/inventory">
                            <CancelButton />
                        </Link>
                        <Button className="add-inventory-page__button" buttonText="+ Add Item"/>
                    </div>
                </form>
            </div>
        </section>
    )
}