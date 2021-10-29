import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
/** Component(s) */
import Input from '../input/Input';

/** Type(s) */
import { User } from '../../@types/user.type';
import { updateUser } from '../../store/modules/user';

interface InputField {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  onInputChange: (e: any) => void;
  required: boolean;
}

interface ProfileProps {
  user: User | any;
}

const Profile = ({ user }: ProfileProps): JSX.Element => {
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [userPencom, setUserPencom] = useState('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setFirstName(user.firstName ? user.firstName : '');
      setLastName(user.lastName ? user.lastName : '');
      setEmail(user.email ? user.email : '');
      setPhoneNumber(user.phoneNumber ? user.phoneNumber : '');
      setDateOfBirth(user.dateOfBirth ? user.dateOfBirth : '');
      setAddress(user.address ? user.address : '');
      setUserPencom(user.pencoms[0] ? user.pencoms[0].accountNumber : '');
    }
  }, [user]);

  const _fields: InputField[] = [
    {
      type: 'text',
      id: 'firstName',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: firstName,
      disabled: false,
      onInputChange: (e) => setFirstName(e.target.value),
      required: false,
    },
    {
      type: 'text',
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: lastName,
      disabled: false,
      onInputChange: (e) => setLastName(e.target.value),
      required: false,
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'john@doe.com',
      value: email,
      disabled: false,
      onInputChange: (e) => setEmail(e.target.value),
      required: false,
    },
    {
      type: 'tel',
      id: 'phoneNumber',
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: '',
      value: phoneNumber,
      disabled: false,
      onInputChange: (e) => setPhoneNumber(e.target.value),
      required: false,
    },
    {
      type: 'date',
      id: 'dateOfBirth',
      name: 'dateOfBirth',
      label: 'Date of birth',
      placeholder: 'Date of birth',
      value: dateOfBirth,
      disabled: false,
      onInputChange: (e) => setDateOfBirth(e.target.value),
      required: false,
    },
    {
      type: 'text',
      id: 'address',
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
      value: address,
      disabled: false,
      onInputChange: (e) => setAddress(e.target.value),
      required: false,
    },
    {
      type: 'tel',
      id: 'pencom',
      name: 'pencom',
      label: 'PENCOM number',
      placeholder: '',
      value: userPencom,
      disabled: true,
      onInputChange: (e) => setUserPencom(e.target.value),
      required: false,
    },
  ];

  console.log('profile', user?.pencoms[0].accountNumber);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          dateOfBirth,
          address,
        },
        history,
      ),
    );
  };

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
          <button
            className={`btn submit-btn${disabled === true ? ` disabled` : ``}`}
            disabled={disabled}
            onClick={handleSubmit}
          >
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
