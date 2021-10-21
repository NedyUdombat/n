/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react';

/** Type(s) */
import { InputField } from '../../@types/form.type';
import { Unknown } from '../../@types/util.type';

/** Action(s) */
import { UPDATE_RESIDENTIAL_DETAILS } from '../../store/modules/create-pencom';

/** Component(s) */
import Input from '../input/Input';
import SelectInput from '../input/SelectInput';

interface ResidentialDetailsFormProps {
  pencomDetails: Unknown;
  setPencomDetails: any;
  setBtnDisabled: (isBoolean: boolean) => void;
  countries: any;
  states: any;
  cities: any;
}

const ResidentialDetailsForm = ({
  pencomDetails,
  setPencomDetails,
  setBtnDisabled,
  countries,
  states,
  cities,
}: ResidentialDetailsFormProps) => {
  const handleSetPersonalDetails = (
    e: ChangeEvent<HTMLInputElement>,
  ): void | null => {
    const {
      target: { name, value },
    } = e;

    return setPencomDetails({
      type: UPDATE_RESIDENTIAL_DETAILS,
      payload: { [name]: value },
    });
  };

  const _fields: InputField[] = [
    {
      type: 'select',
      id: 'countryRes',
      name: 'countryRes',
      label: 'Country of residence',
      placeholder: 'Select Country',
      value: pencomDetails?.countryRes,
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
      id: 'stateCode',
      name: 'stateCode',
      label: 'State of residence',
      placeholder: 'State of residence',
      value: pencomDetails?.stateCode,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: states
        .filter(
          (state: any) => state.CountryID === Number(pencomDetails?.countryRes),
        )
        .map((state: any) => {
          state.value = state.Id.toString();
          state.label = state.StateName;

          return state;
        }),
    },
    {
      type: 'select',
      id: 'lgaRes',
      name: 'lgaRes',
      label: 'LGA of residence',
      placeholder: 'LGA of residence',
      value: pencomDetails?.lgaRes,
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
      id: 'houseNumberName',
      name: 'houseNumberName',
      label: 'House Number',
      placeholder: 'House Number',
      value: pencomDetails?.houseNumberName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'streetName',
      name: 'streetName',
      label: 'Street  Name',
      placeholder: 'Street  Name',
      value: pencomDetails?.streetName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },

    {
      type: 'text',
      id: 'villageTownCity',
      name: 'villageTownCity',
      label: 'Town',
      placeholder: 'Town',
      value: pencomDetails?.villageTownCity,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'zipCode',
      name: 'zipCode',
      label: 'Post/zip code',
      placeholder: '*****',
      value: pencomDetails?.zipCode,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'pmb',
      name: 'pmb',
      label: 'P.O. box/P.M.B',
      placeholder: 'P.O. box/P.M.B',
      value: pencomDetails?.pmb,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
  ];

  return (
    <section className="personal-details">
      <h2 className="step-count">Step 2</h2>
      <h2 className="step-title">Residential Details</h2>
      <form className="personal-details-form">
        {_fields.map((field) => {
          switch (field.type) {
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

export default ResidentialDetailsForm;
