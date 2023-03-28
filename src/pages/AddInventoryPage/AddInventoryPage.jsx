import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Button from '../../components/Button/Button'
import CancelButton from '../../components/CancelButton/CancelButton'
import FormError from '../../components/FormError/FormError'
import backArrow from '../../assets/icons/arrow_back-24px.svg'
import './AddInventoryPage.scss'
import api from '../../utils/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddInventoryPage() {

    const navigate = useNavigate();

    // Warehouse List state variable
    let [warehouseList, setWarehouseList] = useState([]);

    // Input error state variables
    let [itemNameError, setItemNameError] = useState(false);
    let [itemDescriptionError, setItemDescriptionError] = useState(false);
    let [itemCategoryError, setItemCategoryError] = useState(false);
    let [itemStatusError, setItemStatusError] = useState(false);
    let [itemQuantityError, setItemQuantityError] = useState(false);
    let [itemWarehouseError, setItemWarehouseError] = useState(false);

    // Get warehouse list
    useEffect(() => {
        api.get("/warehouse")
            .then((response) => {
                setWarehouseList(response.data);
                })
            .catch(error => 
                console.log(error))
    }, []);

    // On Submit handler to post new inventory item to DB
    function handleOnSubmit(event) {
        event.preventDefault();

        // Declare variables to pass to axios body
        const itemName = event.target.itemName.value;
        const itemDescription = event.target.itemDescription.value;
        const itemCategory = event.target.itemCategory.value;
        const itemStatus = event.target.itemStatus.value;
        const itemQuantity = event.target.itemQuantity.value;
        const itemWarehouse = event.target.itemWarehouse.value;
        let itemWarehouseId = "";

        if (!(itemWarehouse === "")) {
            const itemWarehouseObj = warehouseList.find(warehouse => warehouse.warehouse_name === itemWarehouse)
            itemWarehouseId = itemWarehouseObj.id;
        }

        // Form validation
        if (itemName.length < 2) {
            setItemNameError(true);
        } else {
            setItemNameError(false);
        }

        if (itemDescription.length < 1) {
            setItemDescriptionError(true);
        } else {
            setItemDescriptionError(false);
        }

        if (itemCategory === "") {
            setItemCategoryError(true);
        } else {
            setItemCategoryError(false);
        }

        if (itemStatus === "") {
            setItemStatusError(true);
        } else {
            setItemStatusError(false);
        }

        if (itemQuantity === "") {
            setItemQuantityError(true);
        } else {
            setItemQuantityError(false);
        }

        if (itemWarehouse === "") {
            setItemWarehouseError(true);
        } else {
            setItemWarehouseError(false);
        }

        // API call to post inventory object to DB
        api.post(`/inventory`, {
            itemWarehouseId: itemWarehouseId,
            itemName: itemName,
            itemDescription: itemDescription,
            itemCategory: itemCategory,
            itemStatus: itemStatus,
            itemQuantity: itemQuantity,
        })
        .then(() => {
            toast.success('Successfully created item');

            navigate("/inventory");
            event.target.reset();
            })
            .catch(error => console.log(error));
    }

    return (
        <section className="add-inventory-page">
            <div className="add-inventory-page__container">
                <div className="add-inventory-page__header-container">
                    <Link to="/inventory" className="add-inventory-page__back-arrow">
                        <img  src={backArrow} alt="back arrow"/>
                    </Link>
                    <h1>Add New Inventory Item</h1>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className="add-inventory-page__data-container">
                        <div className="add-inventory-page__details-container">
                            <h2>Item Details</h2>
                            <h3>Item Name</h3>
                            <input className={itemNameError ? "input--error" : ""} id="itemName" name="itemName" placeholder="Item Name"></input>
                            <FormError showError={itemNameError}/>
                            <h3>Description</h3>
                            <textarea className={itemDescriptionError ? "input--error" : ""} id="itemDescription" name="itemDescription" placeholder="Please enter a brief item description..."></textarea>
                            <FormError showError={itemDescriptionError}/>
                            <h3>Category</h3>
                            <select className={itemCategoryError ? "input--error" : ""} id="itemCategory" name="itemCategory">
                                <option value="">Please select</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Gear">Gear</option>
                                <option value="Health">Health</option>
                            </select>
                            <FormError showError={itemCategoryError}/>
                        </div>
                        <div className="add-inventory-page__availability-container">
                            <h2>Item Availability</h2>
                            <h3>Status</h3>
                            <div className="add-inventory-page__status-container">
                                <div className="add-inventory-page__radio-container">
                                    <input className="radio" type="radio" id="itemInStock" name="itemStatus" value="In Stock"/>
                                    <label className="radio-label" htmlFor="itemInStock">In stock</label>
                                </div>
                                <div className="add-inventory-page__radio-container">
                                    <input className="radio" type="radio" id="itemOutOfStock" name="itemStatus" value="Out of Stock"/>
                                    <label className="radio-label" htmlFor="itemOutOfStock">Out of stock</label>
                                </div>
                            </div>
                            <FormError showError={itemStatusError}/>
                            <h3>Quantity</h3>
                            <input className={itemQuantityError ? "input--error" : ""} type="number" id="itemQuantity" name="itemQuantity" placeholder="Item Quantity"></input>
                            <FormError showError={itemQuantityError}/>
                            <h3>Warehouse</h3>
                            <select className={itemWarehouseError ? "input--error" : ""} id="itemWarehouse" name="itemWarehouse">
                                <option value="">Please select</option>
                                {warehouseList.map((warehouse) => {
                                    return (
                                        <option key={warehouse.id} value={warehouse.warehouse_name}>{warehouse.warehouse_name}</option>
                                )})}
                            </select>
                            <FormError showError={itemWarehouseError}/>
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