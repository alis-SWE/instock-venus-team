import React from 'react'
import {Link} from "react-router-dom"
import "./WarehouseCard.scss"
import deleteIcon from "../../assets/icons/delete_outline-24px.svg"
import editIcon from "../../assets/icons/edit-24px.svg"
import arrow from "../../assets/icons/chevron_right-24px.svg"

export default function WarehouseCard( { warehouse, address, city, country,contactName, contactPhone, contactEmail, id, modalValue, wID, wName }) {

    const handleClick = () => {
        wID(id);
        wName(warehouse);
        modalValue(true);
    }

    return (
        <div className="warehouse">
            <div className="warehouse__col-1"> 
                <div className="warehouse__id-container">
                    <p className="warehouse__label">WAREHOUSE</p>
                    <Link to={`warehouse/${id}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <p>{warehouse}</p>
                        <img src={arrow} alt="delete icon"/>
                    </Link>
                </div>
                <div className="warehouse__address-container">
                    <p className="warehouse__label">ADDRESS</p>
                    <p>{`${address}, ${city}, ${country}`}</p>
                </div>
                    <img src={deleteIcon} alt="" className='warehouse__delete' onClick={handleClick}/>
            </div>
            <div className="warehouse__col-2"> 
                <div className="warehouse__name-container">
                    <p className="warehouse__label">CONTACT NAME</p>
                    <p>{contactName}</p>
                </div>
                <div className="warehouse__info-container">
                    <p className="warehouse__label">CONTACT INFORMATION</p>
                    <p>{contactPhone}</p>
                    <p>{contactEmail}</p>
                </div>
                <Link to={`warehouse/edit/${id}`} className="warehouse__edit">
                    <img src={editIcon} alt=""/>
                </Link>
            </div>
            <div className="warehouse__actions-container">
                <img src={deleteIcon} alt="" className='warehouse__delete--tablet' onClick={handleClick}/>
                <Link className="warehouse__edit--tablet">
                    <img src={editIcon} alt="edit icon"/>
                </Link>
            </div>
        </div>
    )
}
