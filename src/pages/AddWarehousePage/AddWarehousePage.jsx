import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import Button from '../../components/Button/Button'
import CancelButton from '../../components/CancelButton/CancelButton'
import FormError from '../../components/FormError/FormError'
import backArrow from '../../assets/icons/arrow_back-24px.svg'
import './AddWarehousePage.scss'
import api from '../../utils/api'

// Function to validate email inputs
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/; //eslint-disable-line
    return re.test(email);
  }

export default function AddWarehousePage() {

    const navigate = useNavigate();

    // Input error state
    let [warehouseNameError, setWarehouseNameError] = useState(false);
    let [warehouseAddressError, setWarehouseAddressError] = useState(false);
    let [warehouseCityError, setWarehouseCityError] = useState(false);
    let [warehouseCountryError, setWarehouseCountryError] = useState(false);
    let [contactNameError, setContactNameError] = useState(false);
    let [contactPositionError, setContactPositionError] = useState(false);
    let [contactPhoneError, setContactPhoneError] = useState(false);
    let [contactEmailError, setContactEmailError] = useState(false);

    // On Submit handler to post new warehouse to DB
    function handleOnSubmit(event) {
        event.preventDefault();

        const name = event.target.warehouseName.value;
        const streetAddress = event.target.warehouseStreetAddress.value;
        const city = event.target.warehouseCity.value;
        const country = event.target.warehouseCountry.value;
        const contactName = event.target.warehouseContactName.value;
        const contactPosition = event.target.warehouseContactPosition.value;
        const contactPhoneNumber = event.target.warehousePhoneNumber.value;
        const contactEmail = event.target.warehouseEmail.value;

        // Form validation
        if (name.length < 2) {
            setWarehouseNameError(true);
        } else {
            setWarehouseNameError(false);
        }

        if (streetAddress.length < 1) {
            setWarehouseAddressError(true);
        } else {
            setWarehouseAddressError(false);
        }

        if (city.length < 2) {
            setWarehouseCityError(true);
        } else {
            setWarehouseCityError(false);
        }

        if (country.length < 2) {
            setWarehouseCountryError(true);
        } else {
            setWarehouseCountryError(false);
        }

        if (contactName.length < 2) {
            setContactNameError(true);
        } else {
            setContactNameError(false);
        }

        if (contactPosition.length < 2) {
            setContactPositionError(true);
        } else {
            setContactPositionError(false);
        }

        if (contactPhoneNumber.length < 7) {
            setContactPhoneError(true);
        } else {
            setContactPhoneError(false);
        }

        if (!validateEmail(contactEmail)) {
            setContactEmailError(true);
        } else {
            setContactEmailError(false);
        }

        // API call to post warehouse object to DB
        api.post(`/warehouse`, {
            name: name,
            streetAddress: streetAddress,
            city: city,
            country: country,
            contactName: contactName,
            contactPosition: contactPosition,
            contactPhoneNumber: contactPhoneNumber,
            contactEmail: contactEmail,
        })
        .then(() => {
            navigate("/");
            event.target.reset();
        })
        .catch(error => console.log(error));
            

    }

    return (
        <section className="add-warehouse-page">
            <div className="add-warehouse-page__container">
                <div className="add-warehouse-page__header-container">
                    <Link to="/" className="add-warehouse-page__back-arrow" s>
                        <img src={backArrow} alt="back arrow"/>
                    </Link>
                    <h1>Add New Warehouse</h1>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className="add-warehouse-page__data-container">
                        <div className="add-warehouse-page__details-container">
                            <h2>Warehouse Details</h2>
                            <h3>Warehouse Name</h3>
                            <input className={warehouseNameError ? "input--error" : ""} id="warehouseName" name="warehouseName" placeholder="Warehouse Name"></input>
                            <FormError showError={warehouseNameError}/>
                            <h3>Street Address</h3>
                            <input className={warehouseAddressError ? "input--error" : ""} id="warehouseStreetAddress" name="warehouseStreetAddress" placeholder="Street Address"></input>
                            <FormError showError={warehouseAddressError}/>
                            <h3>City</h3>
                            <input className={warehouseCityError ? "input--error" : ""} id="warehouseCity" name="warehouseCity" placeholder="City"></input>
                            <FormError showError={warehouseCityError}/>
                            <h3>Warehouse Country</h3>
                            <input className={warehouseCountryError ? "input--error" : ""} id="warehouseCountry" name="warehouseCountry" placeholder="Country"></input>
                            <FormError showError={warehouseCountryError}/>
                        </div>
                        <div className="add-warehouse-page__contact-container">
                            <h2>Contact Details</h2>
                            <h3>Contact Name</h3>
                            <input className={contactNameError ? "input--error" : ""} id="warehouseContactName" name="warehouseContactName" placeholder="Contact Name"></input>
                            <FormError showError={contactNameError}/>
                            <h3>Position</h3>
                            <input className={contactPositionError ? "input--error" : ""} id="warehouseContactPosition" name="warehouseContactPosition" placeholder="Position"></input>
                            <FormError showError={contactPositionError}/>
                            <h3>Phone Number</h3>
                            <input className={contactPhoneError ? "input--error" : ""} id="warehousePhoneNumber" name="warehousePhoneNumber" placeholder="Phone Number"></input>
                            <FormError showError={contactPhoneError}/>
                            <h3>Email</h3>
                            <input className={contactEmailError ? "input--error" : ""} id="warehouseEmail" name="warehouseEmail" placeholder="Email"></input>
                            <FormError showError={contactEmailError}/>
                        </div>
                    </div>
                    <div className="add-warehouse-page__button-container">
                        <Link className="add-warehouse-page__button" to="/"><CancelButton /></Link>
                        <Button className="add-warehouse-page__button" buttonText="+ Add Warehouse" isHalf={false}/>
                    </div>
                </form>
            </div>
        </section>
    )
}