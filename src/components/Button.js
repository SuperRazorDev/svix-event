const btnClasses = {
  primary: "bg-primary text-white",
  warning: "bg-warning text-white",
};

export const Button = ({ type = "primary", children, className, ...rest }) => {
  return (
    <button
      className={`rounded px-4 py-2 ${btnClasses[type]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
