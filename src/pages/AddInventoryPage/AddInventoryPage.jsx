import Button from '../../components/Button/Button'
import CancelButton from '../../components/CancelButton/CancelButton'
import backArrow from '../../assets/icons/arrow_back-24px.svg'
import './AddInventoryPage.scss'

export default function AddInventoryPage() {
    return (
<section className="add-inventory-page">
            <div className="add-inventory-page__container">
                <div className="add-inventory-page__header-container">
                    <img src={backArrow} alt="back arrow"/>
                    <h1>Add New Inventory Item</h1>
                </div>
                <form>
                    <div className="add-inventory-page__data-container">
                        <div className="add-inventory-page__details-container">
                            <h2>Item Details</h2>
                            <h3>Item Name</h3>
                            <input id="itemName" name="itemName" placeholder="Item Name"></input>
                            <h3>Description</h3>
                            <textarea id="itemDescription" name="itemDescription" placeholder="Please enter a brief item description..."></textarea>
                            <h3>Category</h3>
                            <select id="itemCategory" name="itemCategory" placeholder="Please select">
                                <option value="" disabled selected>Please select</option>
                                <option value="accessories">Accessories</option>
                                <option value="apparel">Apparel</option>
                                <option value="electronics">Electronics</option>
                                <option value="gear">Gear</option>
                                <option value="health">Health</option>
                            </select>
                        </div>
                        <div className="add-inventory-page__availability-container">
                            <h2>Item Availability</h2>
                            <h3>Status</h3>
                            <div className="add-inventory-page__status-container">
                                <div className="add-inventory-page__radio-container">
                                    <input className="radio" type="radio" id="itemInStock" name="itemInStock" value="In stock"/>
                                    <label className="radio-label" for="itemInStock">In stock</label>
                                </div>
                                <div className="add-inventory-page__radio-container">
                                    <input className="radio" type="radio" id="itemOutOfStock" name="itemOutOfStock" value="Out of stock"/>
                                    <label className="radio-label" for="itemOutOfStock">Out of stock</label>
                                </div>
                            </div>
                            <h3>Quantity</h3>
                            <input type="number" id="itemQuantity" name="itemQuantity" placeholder="0"></input>
                            <h3>Warehouse</h3>
                            <select id="itemWarehouse" name="itemWarehouse" placeholder="Please select">
                                <option value="" disabled selected>Please select</option>
                                <option value="boston">Boston</option>
                                <option value="jersey">Jersey</option>
                                <option value="manhattan">Manhattan</option>
                                <option value="miami">Miami</option>
                                <option value="santaMonica">Santa Monica</option>
                                <option value="seattle">Seattle</option>
                                <option value="sf">SF</option>
                                <option value="washington">Washington</option>
                            </select>
                        </div>
                    </div>
                    <div className="add-inventory-page__button-container">
                        <CancelButton />
                        <Button buttonText="+ Add Item"/>
                    </div>
                </form>
            </div>
        </section>
    )
}