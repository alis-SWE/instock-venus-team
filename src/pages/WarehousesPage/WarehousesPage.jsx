import React, { useEffect, useState } from "react";
import axios from "axios"
import Button from "../../components/Button/Button";
import "./WarehousesPage.scss"
import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";
import searchIcon from "../../assets/icons/search-24px.svg"
import { Link } from "react-router-dom";

const WarehousesPage = () => {

    const [warehouses, setWarehouses] = useState([]);

    const fetchWarehouse = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/warehouse");
            console.log(data);
            setWarehouses(data)
        } catch (error) {
            console.log("Failed to Fetch Warehouses Data" + error);
        }

    }

    //useEffect Function 
    useEffect(() => {
        if(warehouses.length === 0){
            fetchWarehouse();
        } else {

        }
    }, [warehouses]);

    return (
        <div className="warehouses">
            <div className="warehouses__container">
                <div className="warehouses__header">
                    <h1 className="warehouses__title">Warehouses</h1>
                    <div class="warehouses__search-container">
                        <input id="warehouse-search" name="warehouses__search" placeholder="Search..."></input>
                        <img src={searchIcon} alt="Search Icon" class="warehouses__search-icon"/>
                    </div>
                    <Link to={`/warehouse/add`}>
                        <Button className="warehouse__btn" buttonText="+ Add  New Warehouse"/>
                    </Link>
                
                </div>
                <div className='warehouses__labels--tablet'>
                    <div className="warehouses__label--tablet">WAREHOUSE</div>
                    <div className="warehouses__label--tablet">ADDRESS</div>
                    <div className="warehouses__label--tablet">CONTACT NAME</div>
                    <div className="warehouses__label--tablet">CONTACT INFORMATION</div>
                    <div className="warehouses__label--tablet warehouses__label--tablet--action">ACTIONS</div>
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
                        />
                    );
                })}
           </div>
        </div>  
    );
}

export default WarehousesPage;
