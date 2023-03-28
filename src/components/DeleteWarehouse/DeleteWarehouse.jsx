import axios from 'axios';
import close from '../../assets/icons/close-24px.svg';
import './DeleteWarehouse.scss';
import api from '../../utils/api'


const DeleteWarehouse = ({ closeModal, id, name }) => {

    const handleClick = () => {
        closeModal(false);
        api.delete('/warehouse/' + id)
            .then((response) => {
                console.log('Warehouse deleted: ', response.data);
                
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return ( 
        <div className="modal">
            <div className="modal__container">
            <div className="modal__container__title"> 
                <h1 className='modal__container__heading'>Delete {name} warehouse?</h1>
                <img src={close} onClick={() => closeModal(false)} alt="" className='modal__container__close'/>
            </div>
    
            <div className="modal__container__body">
                <p className='modal__container__text'>Please confirm that you'd like to delete the {name} from the list of warehouses.
                    You won't be able to undo this action.
                </p>
            </div>
            <div className="modal__container__footer">

            
            <button className="modal__container__cancel-button" onClick={() => closeModal(false)}>
                <p className="modal__container__cancel-button__text" >Cancel</p>
            </button>
                
    
            <button className="modal__container__delete-button" onClick={handleClick}>
                <p className="modal__container__delete-button__text" >Delete</p>
            </button>
            </div>
            </div>
      </div>
     );
}
 
export default DeleteWarehouse;