export const InputItem = ({
  label = "",
  type = "text",
  name,
  placeholder,
  ...rest
}) => {
  const inputProps = {
    id: name,
    className: "text-black rounded-sm p-1 px-3 w-full",
    placeholder,
    name,
    ...rest,
  };

  return (
    <div className="mb-4 text-lg">
      <label className="mb-2 block" htmlFor={name}>
        {label}:{" "}
      </label>
      {type === "text" ? (
        <input {...inputProps} />
      ) : (
        <textarea {...inputProps} />
      )}
    </div>
  );
};
