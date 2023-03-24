import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Button from '../../components/Button/Button'
import CancelButton from '../../components/CancelButton/CancelButton'
import backArrow from '../../assets/icons/arrow_back-24px.svg'
import './AddWarehousePage.scss'

const API_URL = process.env.REACT_APP_SERVER_URL;

// const validEmailRegex = RegExp(
//     `/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
//   `);

// function validateForm(errors) {
//     let valid = true;
//     Object.values(errors).forEach(val => val.length > 0 && (valid = false));
//     return valid;
// };

export default function AddWarehousePage() {

    const navigate = useNavigate();

    // let [warehouseNameClass, setWarehouseNameClass] = useState(null);
    // let [warehouseAddressClass, setWarehouseAddressClass] = useState(null);
    // let [warehouseCityClass, setWarehouseCityClass] = useState(null);
    // let [warehouseCountryClass, setWarehouseCountryClass] = useState(null);
    // let [contactNameClass, setContactNameClass] = useState(null);
    // let [contactPositionClass, setContactPositionClass] = useState(null);
    // let [contactPhoneClass, setContactPhoneClass] = useState(null);
    //  let [contactEmailClass, setContactEmailClass] = useState(null); 

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

        axios.post(`${API_URL}/warehouse`, {
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
                    <Link to="/">
                        <img className="add-warehouse-page__back-arrow" src={backArrow} alt="back arrow"/>
                    </Link>
                    <h1>Add New Warehouse</h1>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className="add-warehouse-page__data-container">
                        <div className="add-warehouse-page__details-container">
                            <h2>Warehouse Details</h2>
                            <h3>Warehouse Name</h3>
                            <input required id="warehouseName" name="warehouseName" placeholder="Warehouse Name"></input>
                            <h3>Street Address</h3>
                            <input required id="warehouseStreetAddress" name="warehouseStreetAddress" placeholder="Street Address"></input>
                            <h3>City</h3>
                            <input required id="warehouseCity" name="warehouseCity" placeholder="City"></input>
                            <h3>Warehouse Country</h3>
                            <input required id="warehouseCountry" name="warehouseCountry" placeholder="Country"></input>
                        </div>
                        <div className="add-warehouse-page__contact-container">
                            <h2>Contact Details</h2>
                            <h3>Contact Name</h3>
                            <input required id="warehouseContactName" name="warehouseContactName" placeholder="Contact Name"></input>
                            <h3>Position</h3>
                            <input required id="warehouseContactPosition" name="warehouseContactPosition" placeholder="Position"></input>
                            <h3>Phone Number</h3>
                            <input required id="warehousePhoneNumber" name="warehousePhoneNumber" placeholder="Phone Number"></input>
                            <h3>Email</h3>
                            <input required id="warehouseEmail" name="warehouseEmail" placeholder="Email"></input>
                        </div>
                    </div>
                    <div className="add-warehouse-page__button-container">
                        <Link className="add-warehouse-page__button" to="/"><CancelButton /></Link>
                        <Button className="add-warehouse-page__button" buttonText="+ Add Warehouse"/>
                    </div>
                </form>
            </div>
        </section>
    )
}