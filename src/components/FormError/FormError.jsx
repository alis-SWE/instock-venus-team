import errorIcon from '../../assets/icons/error-24px.svg'
import './FormError.scss'

export default function FormError(props) {

    const showError = props.showError;
    let errorClassName = "";

    if (showError) {
        errorClassName = "form-error form-error--display"
    } else {
        errorClassName = "form-error"
    }

    return (
        <div className={errorClassName}>
            <img className="form-error__icon" src={errorIcon} alt="error icon"/>
            <p className="form-error__text" >This field is required</p>
        </div>
    )
}