import "./Button.scss";

export default function Button(props) {

    const half = props.isHalf ? true : false;
    
    return (
      <button className={`button ${half ? 'button--width' : ''}`}>
        <p className="button__text">{props.buttonText}</p>
      </button>
    );
  };
  