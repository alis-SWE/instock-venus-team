import { useState, useEffect } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CancelButton from "../../components/CancelButton/CancelButton";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import "./EditInventoryItem.scss";
import axios from "axios";
import FormError from '../../components/FormError/FormError'

export default function EditInventoryItem() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
    warehouse_id: "",
  });
  const [warehouseList, setWarehouseList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [errors, setErrors] = useState({
    item_name: false,
    description: false,
    category: false,
    status: false,
    quantity: false,
    warehouse_id: false,
  })

  const validateForm = () => {
    setErrors({
      item_name: formData.item_name.length < 2 || formData.item_name.length > 20,
      description: formData.description.length < 2 || formData.description.length > 400,
      category: formData.category.length < 2 || formData.category.length > 100,
      status: formData.status.length < 2 || formData.status.length > 20,
      quantity: formData.quantity.length < 1 || formData.quantity.length > 20,
      warehouse_id: formData.warehouse_id.length < 2 || formData.warehouse_id.length > 100,
    })
    return (Object.values(errors).every((value) => value === false))
  }

  useEffect(() => {
    validateForm();
  }, [formData]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:8080/inventory/${id}`, formData)
        .catch((error) => {
          console.error(error);
        });
    }

  };

  const getWarehouseList = () => {
    axios
      .get(`http://localhost:8080/warehouse/`)
      .then((response) => {
        setWarehouseList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCategoryList = () => {
    axios
      .get(`http://localhost:8080/inventory/`)
      .then((response) => {
        const uniqueCategories = [];
        response.data.forEach((item) => {
          if (!uniqueCategories.includes(item.category)) {
            uniqueCategories.push(item.category);
          }
        });
        setCategoryList(uniqueCategories);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getWarehouseNameFromId = (wid) => {
    let f = "Not found"
    warehouseList.forEach((item) => {
        if (item.id == wid) {
          f = item.warehouse_name;
          return;
        }
      });
      return f;
  }

  useEffect(() => {
    getWarehouseList();
    getCategoryList();
    axios
      .get(`http://localhost:8080/inventory/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="edit-invitm-page">
      <div className="edit-invitm-page__container">
        <div className="edit-invitm-page__header-container">
          <Link to={"/"}>
            <img src={backArrow} alt="back arrow" />
          </Link>
          <h1>Edit Inventory Item</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="edit-invitm-page__data-container">
            <div className="edit-invitm-page__details-container">
              <h2>Item Details</h2>
              <h3>Item Name</h3>
              <input
                id="item-name"
                name="item_name"
                placeholder="Item Name"
                value={formData.item_name}
                onChange={handleInputChange}
              />
              <FormError showError={errors.item_name}/>
              <h3>Description</h3>
              <textarea
                id="item-street-address"
                className="item-desc"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <FormError showError={errors.description}/>
              <h3>Category</h3>
              <select
                id="item-city"
                className="droplist"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">{
                    formData.category !== "" || "Select Category" }</option>
                {categoryList.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FormError showError={errors.category}/>
            </div>
            <div className="edit-invitm-page__contact-container">
              <h2>Item Availability</h2>
              <h3>Status</h3>
              <div className="item-stock">
                <label
                className={`instock-label${formData.status === "In Stock" ? "__selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="In Stock"
                    className="stock-input"
                    checked={formData.status == "In Stock"}
                    onChange={handleInputChange}
                  />
                  In stock
                </label>
                <label
                className={`nostock-label${formData.status === "Out of Stock" ? "__selected" : ""}`}
                >
                                  <input
                    type="radio"
                    name="status"
                    value="Out of Stock"
                    className="nostock-input"
                    checked={formData.status == "Out of Stock"}
                    onChange={handleInputChange}
                  />
                  Out of stock
                </label>
              </div>
              <FormError showError={errors.status}/>
              {formData.status === "In Stock" && (
                <div>
                  <h3>Quantity</h3>
                  <input
                    id="item-contact-position"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                  <FormError showError={errors.quantity}/>
                </div>
                
              )}
              
              <h3>Warehouse</h3>
              <select
                id="item-phone-number"
                name="warehouse_id"
                value={formData.warehouse_id}
                className="droplist"
                onChange={handleInputChange}
              >
                <option value={formData.warehouse_id}>{getWarehouseNameFromId(formData.warehouse_id)}</option>
                {warehouseList.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.warehouse_name}
                  </option>
                ))}
              </select>
              <FormError showError={errors.warehouse_id}/>
            </div>
          </div>
          <div className="edit-invitm-page__button-container">
            <Link to={"/"}>
              <CancelButton />
            </Link>
            <Button buttonText="Save" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
