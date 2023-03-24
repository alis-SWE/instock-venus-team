import { useState, useEffect } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CancelButton from "../../components/CancelButton/CancelButton";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import "./EditWarehousePage.scss";
import axios from "axios";

export default function EditWarehousePage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8080/warehouse/${id}`, formData)
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouse/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="edit-warehouse-page">
      <div className="edit-warehouse-page__container">
        <div className="edit-warehouse-page__header-container">
          <Link to={"/"}>
            <img src={backArrow} alt="back arrow" />
          </Link>
          <h1>Edit Warehouse</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="edit-warehouse-page__data-container">
            <div className="edit-warehouse-page__details-container">
              <h2>Warehouse Details</h2>
              <h3>Warehouse Name</h3>
              <input
                id="warehouse-name"
                name="warehouse_name"
                placeholder="Warehouse Name"
                value={formData.warehouse_name}
                onChange={handleInputChange}
              />
              <h3>Street Address</h3>
              <input
                id="warehouse-street-address"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <h3>City</h3>
              <input
                id="warehouse-city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
              <h3>Warehouse Country</h3>
              <input
                id="warehouse-country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-warehouse-page__contact-container">
              <h2>Contact Details</h2>
              <h3>Contact Name</h3>
              <input
                id="warehouse-contact-name"
                name="contact_name"
                placeholder="Contact Name"
                value={formData.contact_name}
                onChange={handleInputChange}
              />
              <h3>Position</h3>
              <input
                id="warehouse-contact-position"
                name="contact_position"
                placeholder="Position"
                value={formData.contact_position}
                onChange={handleInputChange}
              />
              <h3>Phone Number</h3>
              <input
                id="warehouse-phone-number"
                name="contact_phone"
                placeholder="Phone Number"
                value={formData.contact_phone}
                onChange={handleInputChange}
              />
              <h3>Email</h3>
              <input
                id="warehouse-email"
                name="contact_email"
                placeholder="Email"
                value={formData.contact_email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="edit-warehouse-page__button-container">
            <CancelButton />
            <Button buttonText="Save" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
