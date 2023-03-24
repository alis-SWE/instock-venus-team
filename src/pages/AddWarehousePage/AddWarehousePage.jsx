import Button from '../../components/Button/Button'
import CancelButton from '../../components/CancelButton/CancelButton'
import backArrow from '../../assets/icons/arrow_back-24px.svg'
import './AddWarehousePage.scss'

export default function AddWarehousePage() {
    return (
        <section className="add-warehouse-page">
            <div className="add-warehouse-page__container">
                <div className="add-warehouse-page__header-container">
                    <img src={backArrow} alt="back arrow"/>
                    <h1>Add New Warehouse</h1>
                </div>
                <form>
                    <div className="add-warehouse-page__data-container">
                        <div className="add-warehouse-page__details-container">
                            <h2>Warehouse Details</h2>
                            <h3>Warehouse Name</h3>
                            <input id="warehouse-name" name="warehouse-name" placeholder="Warehouse Name"></input>
                            <h3>Street Address</h3>
                            <input id="warehouse-street-address" name="warehouse-street-address" placeholder="Street Address"></input>
                            <h3>City</h3>
                            <input id="warehouse-city" name="warehouse-city" placeholder="City"></input>
                            <h3>Warehouse Country</h3>
                            <input id="warehouse-country" name="warehouse-country" placeholder="Country"></input>
                        </div>
                        <div className="add-warehouse-page__contact-container">
                            <h2>Contact Details</h2>
                            <h3>Contact Name</h3>
                            <input id="warehouse-contact-name" name="warehouse-contact-name" placeholder="Contact Name"></input>
                            <h3>Position</h3>
                            <input id="warehouse-contact-position" name="warehouse-contact-position" placeholder="Position"></input>
                            <h3>Phone Number</h3>
                            <input id="warehouse-phone-number" name="warehouse-phone-number" placeholder="Phone Number"></input>
                            <h3>Email</h3>
                            <input id="warehouse-email" name="warehouse-email" placeholder="Email"></input>
                        </div>
                    </div>
                    <div className="add-warehouse-page__button-container">
                        <CancelButton />
                        <Button buttonText="+ Add Warehouse"/>
                    </div>
                </form>
            </div>
        </section>
    )
}