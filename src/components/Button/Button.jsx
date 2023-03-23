import "./Button.scss";

export default function Button(props) {
    return (
        <button className="button">
            <p className="button__text" >{props.buttonText}</p>
        </button>
    );
};