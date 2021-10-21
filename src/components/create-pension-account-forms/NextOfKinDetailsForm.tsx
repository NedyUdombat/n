/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react';
import moment from 'moment';

/** Type(s) */
import { Unknown } from '../../@types/util.type';
import { InputField } from '../../@types/form.type';

/** Action(s) */
import { UPDATE_NEXT_OF_KIN_DETAILS } from '../../store/modules/create-pencom';

/** Component(s) */
import Input from '../input/Input';
import SelectInput from '../input/SelectInput';
import TelInput from '../input/TelInput';

interface NextOfKinDetailsFormProps {
  pencomDetails: Unknown;
  setPencomDetails: any;
  setBtnDisabled: (isBoolean: boolean) => void;
  titles: any;
  maritalStatus: any;
  countries: any;
  states: any;
  cities: any;
  relationships: any;
}

const NextOfKinDetailsForm = ({
  pencomDetails,
  setPencomDetails,
  titles,
  countries,
  states,
  cities,
  relationships,
}: NextOfKinDetailsFormProps): JSX.Element => {
  const handleSetPersonalDetails = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case 'nokDateOfBirth':
        return setPencomDetails({
          type: UPDATE_NEXT_OF_KIN_DETAILS,
          payload: { [name]: moment(value).format('DD-MMM-YYYY') },
        });

      default:
        return setPencomDetails({
          type: UPDATE_NEXT_OF_KIN_DETAILS,
          payload: { [name]: value },
        });
    }
  };
  const _fields: InputField[] = [
    {
      type: 'text',
      id: 'nokTitle',
      name: 'nokTitle',
      label: 'Title',
      placeholder: 'Select a title',
      value: pencomDetails?.nokTitle,
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
      id: 'nokFirstName',
      name: 'nokFirstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: pencomDetails?.nokFirstName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'nokLastName',
      name: 'nokLastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: pencomDetails?.nokLastName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'nokMiddleName',
      name: 'nokMiddleName',
      label: 'Middle Name',
      placeholder: 'Middle Name',
      value: pencomDetails?.nokMiddleName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'nokMaidenName',
      name: 'nokMaidenName',
      label: 'Maiden Name',
      placeholder: 'Maiden Name',
      value: pencomDetails?.nokMaidenName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
    {
      type: 'date',
      id: 'nokDateOfBirth',
      name: 'nokDateOfBirth',
      label: 'Date of birth',
      placeholder: 'Date of birth',
      value: pencomDetails?.nokDateOfBirth
        ? moment(pencomDetails?.nokDateOfBirth, 'DD-DMMM-YYYY').format('YYYY-MM-DD')
        : pencomDetails?.nokDateOfBirth,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'email',
      id: 'nokEmail',
      name: 'nokEmail',
      label: 'Email Address',
      placeholder: 'john@doe.com',
      value: pencomDetails?.nokEmail,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'tel',
      id: 'nokMobile',
      name: 'nokMobile',
      label: 'Phone Number',
      value: pencomDetails?.nokMobile,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'nokSex',
      name: 'nokSex',
      label: 'Gender',
      placeholder: 'Select gender',
      value: pencomDetails?.nokSex,
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
      type: 'text',
      id: 'nokRelationship',
      name: 'nokRelationship',
      label: 'Relationship',
      placeholder: 'Select relationship',
      value: pencomDetails?.nokRelationship,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: relationships.map((relationship: any) => {
        relationship.value = relationship.Id.toString();
        relationship.label = relationship.Value;

        return relationship;
      }),
    },
    {
      type: 'text',
      id: 'nokCountryCode',
      name: 'nokCountryCode',
      label: 'Country of Origin',
      placeholder: 'Select nationality',
      value: pencomDetails?.nokCountryCode,
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
      type: 'text',
      id: 'nokStateCode',
      name: 'nokStateCode',
      label: 'State of Origin',
      placeholder: 'Select state of origin',
      value: pencomDetails?.nokStateCode,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: states
        .filter((state: any) => state.CountryID === Number(pencomDetails?.nokCountryCode))
        .map((state: any) => {
          state.value = state.Id.toString();
          state.label = state.StateName;

          return state;
        }),
    },
    {
      type: 'text',
      id: 'nokCityCode',
      name: 'nokCityCode',
      label: 'LGA of Origin',
      placeholder: 'Select LGA of origin',
      value: pencomDetails?.nokCityCode,
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
      id: 'nokHouseNumberName',
      name: 'nokHouseNumberName',
      label: 'House Number',
      placeholder: 'House Number',
      value: pencomDetails?.nokHouseNumberName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'nokStreetName',
      name: 'nokStreetName',
      label: 'Street  Name',
      placeholder: 'Street  Name',
      value: pencomDetails?.nokStreetName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },

    {
      type: 'text',
      id: 'nokVillageTownCity',
      name: 'nokVillageTownCity',
      label: 'Town',
      placeholder: 'Town',
      value: pencomDetails?.nokVillageTownCity,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },

    {
      type: 'text',
      id: 'nokZipcode',
      name: 'nokZipcode',
      label: 'Post/zip code',
      placeholder: '*****',
      value: pencomDetails?.nokZipcode,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'nokPmb',
      name: 'nokPmb',
      label: 'P.O. box/P.M.B',
      placeholder: '*****',
      value: pencomDetails?.nokPmb,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
  ];
  return (
    <section className="personal-details">
      <h2 className="step-count">Step 4</h2>
      <h2 className="step-title">Next of Kin</h2>
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

export default NextOfKinDetailsForm;
