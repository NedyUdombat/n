import React from 'react';

/** Component(s) */
import Input from '../input/Input';

interface InputField {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  onInputChange: () => null;
  required: boolean;
}

const Profile = (): JSX.Element => {
  const _fields: InputField[] = [
    {
      type: 'text',
      id: 'firstname',
      name: 'firstname',
      label: 'First Name',
      placeholder: 'First Name',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'text',
      id: 'lastname',
      name: 'lastname',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'john@doe.com',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'tel',
      id: 'phone',
      name: 'phone',
      label: 'Phone Number',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'date',
      id: 'dob',
      name: 'dob',
      label: 'Date of birth',
      placeholder: 'Date of birth',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'text',
      id: 'address',
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'text',
      id: 'country',
      name: 'country',
      label: 'Country',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'text',
      id: 'state',
      name: 'state',
      label: 'State',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
    {
      type: 'tel',
      id: 'pencom',
      name: 'pencom',
      label: 'PENCOM number',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: false,
    },
  ];

  return (
    <section className="profile-section">
      <form className="profile-form">
        <div className="profile-form-control-group">
          {_fields.map((field) => (
            <Input
              key={field.id}
              type={field.type}
              id={field.id}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              disabled={field.disabled}
              onInputChange={field.onInputChange}
              required={field.required}
            />
          ))}
        </div>

        <div className="submit-btn-section">
          <button className="btn submit-btn disabled">Save changes</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
