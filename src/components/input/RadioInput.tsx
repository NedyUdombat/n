import React, { ChangeEvent } from 'react';

interface RadioInputProps {
  options: {
    label?: string;
    id: string;
    value: string;
    checked: boolean;
  }[];
  formGroupClassName?: string;
  name: string;
  handleRadioSelect: (e: ChangeEvent<HTMLInputElement>) => void | null;
  customLabel?: (opt: unknown) => JSX.Element;
}

const RadioInput = ({
  options,
  name,
  handleRadioSelect,
  customLabel,
  formGroupClassName,
}: RadioInputProps): JSX.Element => (
  <div
    className={`form-control-group${
      formGroupClassName ? ` ${formGroupClassName}` : ''
    }`}
  >
    {options.length > 0 &&
      options.map((option) => (
        <div className="form-check" key={option.id}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.id}
            onChange={(e) => handleRadioSelect(e)}
            value={option.value}
          />
          <label
            className={`form-check-label${option.checked ? ` checked` : ``}`}
            htmlFor={option.id}
          >
            <div
              className={`form-check-custom-radio${
                option.checked ? ` checked` : ``
              }`}
            >
              <div className="active"></div>
            </div>
            {customLabel ? (
              customLabel(option)
            ) : (
              <p className="form-check-label-text">{option.label}</p>
            )}
          </label>
        </div>
      ))}
  </div>
);

export default RadioInput;
