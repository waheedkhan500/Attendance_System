import React from "react";

const Input = ({ lable, type, id, value, name, placeholder, onChange }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-md  font-medium  text-black"
      >
        {lable}
      </label>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={onChange}
        className="bg-Solitude border border-gray sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700  placeholder-lighGray "
      />
    </div>
  );
};

export default Input;
