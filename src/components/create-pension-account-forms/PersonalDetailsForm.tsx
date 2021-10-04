/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect } from 'react';
import moment from 'moment';

/** Type(s) */
import { Unknown } from '../../@types/util.type';
import { InputField } from '../../@types/form.type';

/** Action(s) */
import { UPDATE_PERSONAL_DETAILS } from '../../store/modules/create-pencom';

/** Component(s) */
import Input from '../input/Input';
import SelectInput from '../input/SelectInput';
import TelInput from '../input/TelInput';

interface PersonalDetailsFormProps {
  pencomDetails: Unknown;
  setPencomDetails: any;
  setBtnDisabled: (isBoolean: boolean) => void;
  titles: any;
  maritalStatus: any;
  countries: any;
  states: any;
  cities: any;
  banks: any;
}

const PersonalDetailsForm = ({
  pencomDetails,
  setPencomDetails,
  setBtnDisabled,
  titles,
  maritalStatus,
  countries,
  states,
  cities,
  banks,
}: PersonalDetailsFormProps): JSX.Element => {
  useEffect(() => {
    setBtnDisabled(false);
  }, [pencomDetails, setBtnDisabled]);

  const handleSetPersonalDetails = (
    e: ChangeEvent<HTMLInputElement>,
  ): void | null => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case 'titleId':
        return setPencomDetails({
          type: UPDATE_PERSONAL_DETAILS,
          payload: { [name]: value },
        });
      case 'dateOfBirth':
        return setPencomDetails({
          type: UPDATE_PERSONAL_DETAILS,
          payload: { [name]: moment(value).format('DD-MMM-YYYY') },
        });

      default:
        return setPencomDetails({
          type: UPDATE_PERSONAL_DETAILS,
          payload: { [name]: value },
        });
    }
  };

  const _fields: InputField[] = [
    {
      type: 'select',
      id: 'titleId',
      name: 'titleId',
      label: 'Title',
      placeholder: 'Select a title',
      value: pencomDetails?.titleId,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: titles.map((title: any) => {
        title.value = title.Id.toString();
        title.label = title.Value;

        return title;
      }),
    },
    {
      type: 'text',
      id: 'firstName',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: pencomDetails?.firstName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: pencomDetails?.lastName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'middleName',
      name: 'middleName',
      label: 'Middle Name',
      placeholder: 'Middle Name',
      value: pencomDetails?.middleName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'maidenName',
      name: 'maidenName',
      label: 'Maiden Name',
      placeholder: 'Maiden Name',
      value: pencomDetails?.maidenName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
    {
      type: 'date',
      id: 'dateOfBirth',
      name: 'dateOfBirth',
      label: 'Date of birth',
      placeholder: 'Date of birth',
      value: pencomDetails?.dateOfBirth
        ? moment(pencomDetails?.dateOfBirth, 'DD-DMMM-YYYY').format(
            'YYYY-MM-DD',
          )
        : pencomDetails?.dateOfBirth,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email Address',
      placeholder: 'john@doe.com',
      value: pencomDetails?.email,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'tel',
      id: 'telephoneNumber',
      name: 'telephoneNumber',
      label: 'Phone Number',
      value: pencomDetails?.telephoneNumber,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'select',
      id: 'sex',
      name: 'sex',
      label: 'Gender',
      placeholder: 'Select gender',
      value: pencomDetails?.sex,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Prefer not to say' },
      ],
    },
    {
      type: 'select',
      id: 'maritalStatus',
      name: 'maritalStatus',
      label: 'Marital Status',
      placeholder: 'Select marital status',
      value: pencomDetails?.maritalStatus,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: maritalStatus.map((status: any) => {
        status.value = status.Code;
        status.label = status.Description;

        return status;
      }),
    },
    {
      type: 'select',
      id: 'placeOfBirth',
      name: 'placeOfBirth',
      label: 'Place of Birth',
      placeholder: 'Select place of birth',
      value: pencomDetails?.placeOfBirth,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: states.map((state: any) => {
        state.value = state.Id.toString();
        state.label = state.StateName;

        return state;
      }),
    },
    {
      type: 'select',
      id: 'nationality',
      name: 'nationality',
      label: 'Country of Origin',
      placeholder: 'Select nationality',
      value: pencomDetails?.nationality,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: countries.map((country: any) => {
        country.value = country.Id.toString();
        country.label = country.CountryName;

        return country;
      }),
    },
    {
      type: 'select',
      id: 'stateOfOrigin',
      name: 'stateOfOrigin',
      label: 'State of Origin',
      placeholder: 'Select state of origin',
      value: pencomDetails?.stateOfOrigin,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: states
        .filter(
          (state: any) =>
            state.CountryID === Number(pencomDetails?.nationality),
        )
        .map((state: any) => {
          state.value = state.Id.toString();
          state.label = state.StateName;

          return state;
        }),
    },
    {
      type: 'select',
      id: 'lgaOfOrigin',
      name: 'lgaOfOrigin',
      label: 'LGA of Origin',
      placeholder: 'Select LGA of origin',
      value: pencomDetails?.lgaOfOrigin,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: cities.map((city: any) => {
        city.value = city.Id.toString();
        city.label = city.LgaName;

        return city;
      }),
    },
    {
      type: 'text',
      id: 'passportNo',
      name: 'passportNo',
      label: 'International passport no.',
      placeholder: '*******',
      value: pencomDetails?.passportNo,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'primaryLanguage',
      name: 'primaryLanguage',
      label: 'Primary language',
      placeholder: 'English',
      value: pencomDetails?.primaryLanguage,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'bvn',
      name: 'bvn',
      label: 'Bank verification no. (BVN)',
      placeholder: '',
      value: pencomDetails?.bvn,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'nin',
      name: 'nin',
      label: 'National identification number (NIN)',
      placeholder: '',
      value: pencomDetails?.nin,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },

    {
      type: 'select',
      id: 'primaryBank',
      name: 'primaryBank',
      label: 'Primary Bank',
      placeholder: 'Access Bank',
      value: pencomDetails?.primaryBank,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: banks.map((bank: any) => {
        bank.value = bank.Id.toString();
        bank.label = bank.BankName;

        return bank;
      }),
    },
    {
      type: 'text',
      id: 'accountNumber',
      name: 'accountNumber',
      label: 'Account No.',
      placeholder: '',
      value: pencomDetails?.accountNumber,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
  ];

  return (
    <section className="personal-details">
      <h2 className="step-count">Step 1</h2>
      <h2 className="step-title">Personal Details</h2>
      <form className="personal-details-form">
        {_fields.map((field) => {
          switch (field.type) {
            case 'tel':
              return (
                <TelInput
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  disabled={field.disabled}
                  onChange={field.onInputChange}
                  required={true}
                  key={field.id}
                />
              );
            case 'select':
              return (
                <SelectInput
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  disabled={field.disabled}
                  onChange={field.onInputChange}
                  key={field.id}
                  options={field.options}
                />
              );

            default:
              return (
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
                  optional={field.optional}
                />
              );
          }
        })}
      </form>
    </section>
  );
};

export default PersonalDetailsForm;
