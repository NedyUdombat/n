import React, { ChangeEvent } from 'react';
import { Unknown } from '../../@types/util.type';
import Select from 'react-select';

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number | undefined;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: {
    value: string;
    label: string;
    [propertyName: string]: string | undefined;
  }[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | null;
}

const SelectInput = ({ options, label, id, onChange, value, name, placeholder, disabled }: SelectInputProps) => {
  const handleSelectChange = (option: any) => {
    const e = new Event('input', { bubbles: true });
    Object.defineProperty(e, 'target', {
      writable: false,
      value: {
        name: name,
        value: option?.value,
      },
    });

    onChange(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  const selectValue = value ? options?.filter((opt) => opt.value === value) : [{ value: '', label: '' }];

  return (
    <div className="form-control-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <Select
        backspaceRemovesValue={true}
        options={options}
        value={selectValue}
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={handleSelectChange}
        className="react-select-container"
        classNamePrefix="react-select"
        isDisabled={disabled}
      />
    </div>
  );
};

export default SelectInput;
