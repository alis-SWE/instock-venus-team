import { useState, useEffect } from "react";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CancelButton from "../../components/CancelButton/CancelButton";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import "./EditWarehousePage.scss";
import axios from "axios";
import FormError from '../../components/FormError/FormError'
import api from '../../utils/api'

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
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    warehouse_name: false,
    address: false,
    city: false,
    country: false,
    contact_name: false,
    contact_position: false,
    contact_phone: false,
    contact_email: false,
  });

  const validateForm = () => {
    setErrors({
      warehouse_name: formData.warehouse_name.length < 2 || formData.warehouse_name.length > 20,
      address: formData.address.length < 2 || formData.address.length > 20,
      city: formData.city.length < 2 || formData.city.length > 20,
      country: formData.country.length < 2 || formData.country.length > 20,
      contact_name: formData.contact_name.length < 2 || formData.contact_name.length > 20,
      contact_position: formData.contact_position.length < 2 || formData.contact_position.length > 20,
      contact_phone: formData.contact_phone.length < 2 || formData.contact_phone.length > 20,
      contact_email: formData.contact_email.length < 2 || formData.contact_email.length > 20,
    })
    return (Object.values(errors).every((value) => value === false))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) { // validate the form
      api
      .put(`/warehouse/${id}`, formData)
      .catch((error) => {
        console.error(error);
      });
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();

    navigate("/");
  }

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    api
      .get(`/warehouse/${id}`)
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
              <FormError showError={errors.warehouse_name}/>
              <h3>Street Address</h3>
              <input
                id="warehouse-street-address"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <FormError showError={errors.address}/>
              <h3>City</h3>
              <input
                id="warehouse-city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
              <FormError showError={errors.city}/>
              <h3>Warehouse Country</h3>
              <input
                id="warehouse-country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
              />
              <FormError showError={errors.country}/>
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
              <FormError showError={errors.contact_name}/>
              <h3>Position</h3>
              <input
                id="warehouse-contact-position"
                name="contact_position"
                placeholder="Position"
                value={formData.contact_position}
                onChange={handleInputChange}
              />
              <FormError showError={errors.contact_position}/>
              <h3>Phone Number</h3>
              <input
                id="warehouse-phone-number"
                name="contact_phone"
                placeholder="Phone Number"
                value={formData.contact_phone}
                onChange={handleInputChange}
              />
              <FormError showError={errors.contact_phone}/>
              <h3>Email</h3>
              <input
                id="warehouse-email"
                name="contact_email"
                placeholder="Email"
                value={formData.contact_email}
                onChange={handleInputChange}
              />
              <FormError showError={errors.contact_email}/>
            </div>
          </div>
          <div className="edit-warehouse-page__button-container">
            <CancelButton handleCancel={handleCancel} />
            <Button buttonText="Save" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
