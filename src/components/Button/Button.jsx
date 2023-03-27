import "./Button.scss";

export default function Button(props) {
    return (
      <button className={`button ${props.isHalf ? 'button--width' : ''}`}>
        <p className="button__text">{props.buttonText}</p>
      </button>
    );
  };
  