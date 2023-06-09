import React, { useEffect, useState } from "react";
import axios from "axios"
import Button from "../../components/Button/Button";
import "./WarehousesPage.scss"
import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";
import searchIcon from "../../assets/icons/search-24px.svg"
import { Link } from "react-router-dom";
import DeleteWarehouse from "../../components/DeleteWarehouse/DeleteWarehouse";
import sortIcon from "../../assets/icons/sort-24px.svg"
import api from '../../utils/api'

const WarehousesPage = () => {

    const [warehouses, setWarehouses] = useState([]);
    const [deleteWarehouse, setDeleteWarehouse] = useState(false);
    const [warehouseID, setWarehouseID] = useState("");
    const [warehouseName, setWarehouseName] = useState("");
    const [sortBy, setSortBy] = useState("warehouse_name");
    const [orderBy, setOrderBy] = useState("asc");
    const [sortBusy, setSortBusy] = useState(false);

    const fetchWarehouse = async () => {
        try {
            const { data } = await api.get(`/warehouse?sort_by=${sortBy}&order_by=${orderBy}`);
            setWarehouses(data);
        } catch (error) {
            console.log("Failed to Fetch Warehouses Data" + error);
        }

    }
        
    const getWarehouseID = (selectedWarehouse) => {
        setWarehouseID(selectedWarehouse);
    };

    const getWarehouseName = (whName) => {
        setWarehouseName(whName);
    };

    const handleSort = (sort_by) => {
        if (!sortBusy) {
            if (orderBy === "desc") {
                setOrderBy("asc");
            }  else {
                setOrderBy("desc");
            }
            setSortBy(sort_by);
        }
    }


    //useEffect Function 
    useEffect(() => {
        fetchWarehouse();
    }, [deleteWarehouse]);
    useEffect(() => {
        fetchWarehouse();
    }, [sortBy, orderBy]);
    useEffect(() => {
        fetchWarehouse();
    }, []); // on page load

    return (
        <div className="warehouses">
            <div className="warehouses__container">
                <div className="warehouses__header">
                    <h1 className="warehouses__title">Warehouses</h1>
                    <div className="warehouses__search-container">
                        <input id="warehouse-search" name="warehouses__search" placeholder="Search..."></input>
                        <img src={searchIcon} alt="Search Icon" className="warehouses__search-icon"/>
                    </div>
                    <Link to={`/warehouse/add`}>
                        <Button className="warehouse__btn" buttonText="+ Add  New Warehouse"/>
                    </Link>
                
                </div>
                <div className='warehouses__labels--tablet'>
                    <div className="warehouses__container--tablet">
                        <h4 className="warehouse__label--tablet">WAREHOUSE</h4>
                        <img onClick={() => {handleSort("warehouse_name")}} src={sortIcon} alt="Sort Icon" className="warehouses__sort-icon"/>
                    </div>
                    <div className="warehouses__container--tablet">
                        <h4 className="warehouse__label--tablet">ADDRESS</h4>
                        <img onClick={() => {handleSort("address")}} src={sortIcon} alt="Sort Icon" className="warehouses__sort-icon"/>

                    </div>
                    <div className="warehouses__container--tablet">
                        <h4 className="warehouse__label--tablet">CONTACT NAME</h4>
                        <img onClick={() => {handleSort("contact_name")}} src={sortIcon} alt="Sort Icon" className="warehouses__sort-icon"/>

                    </div>
                    <div className="warehouses__container--tablet">
                        <h4 className="warehouse__label--tablet">CONTACT INFORMATION</h4>
                        <img onClick={() => {handleSort("contact_email")}} src={sortIcon} alt="Sort Icon" className="warehouses__sort-icon"/>

                    </div>
                    <div className="warehouses__container--tablet warehouses__container--tablet--action ">
                        <h4 className="warehouse__label--tablet warehouses__label--tablet--action">ACTIONS</h4>

                    </div>
                </div>
                {warehouses.length > 0 && warehouses.map((warehouse, i) => {
                    return (
                        <WarehouseCard
                            key={i}
                            id={warehouse.id}
                            warehouse={warehouse.warehouse_name}
                            address={warehouse.address}
                            city={warehouse.city}
                            country={warehouse.country}
                            contactName={warehouse.contact_name}
                            contactPhone={warehouse.contact_phone}
                            contactEmail={warehouse.contact_email}
                            modalValue={(value) => setDeleteWarehouse(value)}
                            wID={(wid) => getWarehouseID(wid)}
                            wName={(wname) => getWarehouseName(wname)}
                        />
                    );
                })}
           </div>
           {deleteWarehouse && <DeleteWarehouse closeModal={setDeleteWarehouse} id={warehouseID} name={warehouseName}  />}
        </div>  
    );
}

export default WarehousesPage;
