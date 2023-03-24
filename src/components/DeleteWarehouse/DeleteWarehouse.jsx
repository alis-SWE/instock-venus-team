import axios from 'axios';
import close from '../../assets/icons/close-24px.svg';
import './DeleteWarehouse.scss';

const DeleteWarehouse = ({ closeModal, id }) => {

    const handleClick = () => {
        closeModal(false);
        axios.delete('http://localhost:8080/warehouse/' + id)
            .then((response) => {
                console.log('Warehouse deleted: ', response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        
    }

    return ( 
        <div className="modalBackground">
            <div className="modalContainer">
            <img src={close} onClick= {() => closeModal(false)} alt="" />
    
            <div className="title"> 
                <h1>Delete Washington warehouse?</h1>
            </div>
    
            <div className="body">
                <p>Please confirm that you;d like to delete the Washington from the list of warehouses.
                    You won't be able to undo this action.
                </p>
            </div>
            <div className="footer">
            <button className="cancel-button" onClick= {() => closeModal(false)}>
                <p className="cancel-button__text" >Cancel</p>
            </button>
                
    
            <button className="delete-button" onClick= {handleClick}>
                <p className="delete-button__text" >Delete</p>
            </button>
            </div>
            </div>
      </div>
     );
}
 
export default DeleteWarehouse;