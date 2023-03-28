import axios from 'axios';
import close from '../../assets/icons/close-24px.svg';
import './DeleteInventoryList.scss';
import api from '../../utils/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteInventoryList = ({ closeModal, id, name }) => {

    const handleClick = () => {
        
        api.delete('/inventory/' + id)
            .then((response) => {
                toast.success('Successfully deleted item');

                closeModal(false);
            })
            .catch((error) => {
                console.log(error);
            })
        
    }

    return ( 
        <div className="modal">
            <div className="modal__container">
                <div className="modal__container__title"> 
                    <h1 className='modal__container__heading'>Delete {name} inventory item?</h1>
                    <img src={close} onClick= {() => closeModal(false)} alt="" className='modal__container__close'/>
                </div>
                <div className="modal__container__body">
                    <p className='modal__container__text'>Please confirm that you'd like to delete  {name} from the inventory list.
                        You won't be able to undo this action.
                    </p>
                </div>
                <div className="modal__container__footer">
                    <button className="modal__container__cancel-button" onClick= {() => closeModal(false)}>
                        <p className="modal__container__cancel-button__text" >Cancel</p>
                    </button>
                    <button className="modal__container__delete-button" onClick= {handleClick}>
                        <p className="modal__container__delete-button__text" >Delete</p>
                    </button>
                </div>
            </div>
      </div>
     );
}
 
export default DeleteInventoryList;