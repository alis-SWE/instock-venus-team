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
                    <h4 className="warehouse__label">WAREHOUSE</h4>
                    <Link to={`warehouse/${id}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <p>{warehouse}</p>
                        <img className="warehouse__arrow-icon" src={arrow} alt="arrow icon"/>
                    </Link>
                </div>
                <div className="warehouse__address-container">
                    <h4 className="warehouse__label">ADDRESS</h4>
                    <p>{`${address},`}<br/>{`${city}, ${country}`}</p>
                </div>
                    <img src={deleteIcon} alt="" className='warehouse__delete-img' onClick={handleClick}/>
            </div>
            <div className="warehouse__col-2"> 
                <div className="warehouse__name-container">
                    <h4 className="warehouse__label">CONTACT NAME</h4>
                    <p>{contactName}</p>
                </div>
                <div className="warehouse__info-container">
                    <h4 className="warehouse__label">CONTACT INFORMATION</h4>
                    <p>{contactPhone}</p>
                    <p>{contactEmail}</p>
                </div>
                <Link to={`warehouse/edit/${id}`} className="warehouse__edit">
                    <img src={editIcon} alt="" className="warehouse__edit-img"/>
                </Link>
            </div>
            <div className="warehouse__actions-container">
                <img src={deleteIcon} alt="" className='warehouse__delete--tablet' onClick={handleClick}/>
                <Link className="warehouse__edit--tablet" to={`warehouse/edit/${id}`} >
                    <img src={editIcon} alt="edit icon" className="warehouse__edit-img warehouse__edit--tablet"/>
                </Link>
            </div>
        </div>
    )
}
