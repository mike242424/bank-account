const Button = ({
  children,
  dispatch,
  type,
  status,
  openOrClosed,
  payload,
}) => {
  return (
    <button
      onClick={() => dispatch({ type, payload })}
      disabled={status === openOrClosed}
    >
      {children}
    </button>
  );
};

export default Button;
