import "./CancelButton.scss";

export default function CancelButton({ handleCancel }) {
    return (
        <button className="cancel-button" onClick={handleCancel}>
            <p className="cancel-button__text" >Cancel</p>
        </button>
    );
};