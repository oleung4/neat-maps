import React from "react";

export default function SelectOption({
  name,
  onChange,
  options,
  title,
  value
}) {
  const selectOptions = options.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <React.Fragment>
      <select onChange={onChange} name={name} value={value}>
        <option value="" disabled defaultValue>
          {title}
        </option>
        {selectOptions}
      </select>
    </React.Fragment>
  );
}
