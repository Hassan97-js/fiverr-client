import "./button.css";

const Button = ({
  children,
  onClickHandler = () => {},
  className = "",
  ...otherProps
}) => {
  return (
    <button className={className} {...otherProps} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Button;
