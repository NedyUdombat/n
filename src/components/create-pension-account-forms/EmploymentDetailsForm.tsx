/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react';
import moment from 'moment';

/** Type(s) */
import { Unknown } from '../../@types/util.type';
import { InputField } from '../../@types/form.type';

/** Action(s) */
import { UPDATE_EMPLOYMENT_DETAILS } from '../../store/modules/create-pencom';

/** Component(s) */
import Input from '../input/Input';
import SelectInput from '../input/SelectInput';
import TelInput from '../input/TelInput';

interface EmploymentDetailsFormProps {
  pencomDetails: Unknown;
  setPencomDetails: any;
  setBtnDisabled: (isBoolean: boolean) => void;
  sectors: any;
  employers: any;
  industries: any;
  countries: any;
  states: any;
  cities: any;
}

const EmploymentDetailsForm = ({
  pencomDetails,
  setPencomDetails,
  setBtnDisabled,
  sectors,
  employers,
  industries,
  countries,
  states,
  cities,
}: EmploymentDetailsFormProps) => {
  const handleSetPersonalDetails = (
    e: ChangeEvent<HTMLInputElement>,
  ): void | null => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case 'dateOfCurrentEmployment':
      case 'dateOfAppointment':
      case 'ippisJoinedDate':
        return setPencomDetails({
          type: UPDATE_EMPLOYMENT_DETAILS,
          payload: { [name]: moment(value).format('DD-MMM-YYYY') },
        });

      default:
        return setPencomDetails({
          type: UPDATE_EMPLOYMENT_DETAILS,
          payload: { [name]: value },
        });
    }
  };

  const _fields: InputField[] = [
    {
      type: 'select',
      id: 'employmentType',
      name: 'employmentType',
      label: 'Employment Type',
      placeholder: 'Select Employment Type',
      value: pencomDetails?.employmentType,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: [
        { value: 'FULL_TIME', label: 'Full Time' },
        { value: 'PART_TIME', label: 'Part Time' },
        { value: 'CONTRACT', label: 'Contract' },
        { value: 'INTERNSHIP', label: 'Internship' },
        { value: 'OTHER', label: 'Other' },
      ],
    },
    {
      type: 'select',
      id: 'employerSector',
      name: 'employerSector',
      label: 'Employment Sector',
      placeholder: 'Select Employment Sector',
      value: pencomDetails?.employerSector,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: sectors.map((status: any) => {
        status.value = status.SectorID;
        status.label = status.SectorName;
        return status;
      }),
    },
    {
      type: 'select',
      id: 'employerName',
      name: 'employerName',
      label: 'Employer Name',
      placeholder: 'Select Employer',
      value: pencomDetails?.employerName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: employers
        .filter(
          (state: any) =>
            state.SectorID === Number(pencomDetails?.employerSector),
        )
        .map((state: any) => {
          state.value = state.Id;
          state.label = state.EmployerName;

          return state;
        }),
    },
    {
      type: 'select',
      id: 'industry',
      name: 'industry',
      label: 'Industry',
      placeholder: 'Select Industry',
      value: pencomDetails?.industry,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: industries.map((state: any) => {
        state.value = state.Id;
        state.label = state.Title;

        return state;
      }),
    },
    {
      type: 'select',
      id: 'ippisStatus',
      name: 'ippisStatus',
      label: 'Employer under IPPIS?',
      placeholder: 'Select Option',
      value: pencomDetails?.ippisStatus,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: [
        { value: 'YES', label: 'Yes' },
        { value: 'No', label: 'No' },
      ],
    },
    {
      type: 'date',
      id: 'ippisJoinedDate',
      name: 'ippisJoinedDate',
      label: 'Date Employer Joined IPPIS?',
      placeholder: '',
      value: pencomDetails?.ippisJoinedDate
        ? moment(pencomDetails?.ippisJoinedDate, 'DD-DMMM-YYYY').format(
            'YYYY-MM-DD',
          )
        : pencomDetails?.ippisJoinedDate,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'ippisJoinedNo',
      name: 'ippisJoinedNo',
      label: 'Employer IPPIS No.',
      placeholder: '',
      value: pencomDetails?.ippisJoinedNo,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'select',
      id: 'employerCountry',
      name: 'employerCountry',
      label: 'Employer Business Country',
      placeholder: 'Select country',
      value: pencomDetails?.employerCountry,
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
      id: 'employerStateCode',
      name: 'employerStateCode',
      label: 'Employer Business State',
      placeholder: 'Select state',
      value: pencomDetails?.employerStateCode,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      options: states
        .filter(
          (state: any) =>
            state.CountryID === Number(pencomDetails?.employerCountry),
        )
        .map((state: any) => {
          state.value = state.Id.toString();
          state.label = state.StateName;

          return state;
        }),
    },
    {
      type: 'text',
      id: 'employerCityCode',
      name: 'employerCityCode',
      label: 'Employer Business LGA',
      placeholder: 'Select LGA',
      value: pencomDetails?.employerCityCode,
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
      id: 'employerBuildingNumberName',
      name: 'employerBuildingNumberName',
      label: 'Employer Buiilding House Number',
      placeholder: 'Employer House Number',
      value: pencomDetails?.employerBuildingNumberName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'employerStreetName',
      name: 'employerStreetName',
      label: 'Employer Street Name',
      placeholder: 'Employer Street Name',
      value: pencomDetails?.employerStreetName,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'employerVillageTownCity',
      name: 'employerVillageTownCity',
      label: 'Employer Address Town',
      placeholder: 'Employer Address Town',
      value: pencomDetails?.employerVillageTownCity,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },

    {
      type: 'tel',
      id: 'employerMobileNumber',
      name: 'employerMobileNumber',
      label: 'Employer Buisness Number',
      value: pencomDetails?.employerMobileNumber,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'employerZip',
      name: 'employerZip',
      label: 'Employer Post/zip code',
      placeholder: '******',
      value: pencomDetails?.employerZip,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'employerPmb',
      name: 'employerPmb',
      label: 'Employer P.O. box/P.M.B',
      placeholder: '',
      value: pencomDetails?.employerPmb,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'natureOfBusiness',
      name: 'natureOfBusiness',
      label: 'Nature of Business',
      placeholder: '',
      value: pencomDetails?.natureOfBusiness,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'text',
      id: 'employerID',
      name: 'employerID',
      label: 'Employer ID No.',
      placeholder: '',
      value: pencomDetails?.employerID,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },

    {
      type: 'text',
      id: 'serviceID',
      name: 'serviceID',
      label: 'Service ID No. (paramilitary only)',
      placeholder: '',
      value: pencomDetails?.serviceID,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
    {
      type: 'text',
      id: 'rank',
      name: 'rank',
      label: 'Designation/rank',
      placeholder: '',
      value: pencomDetails?.rank,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },

    {
      type: 'date',
      id: 'dateOfAppointment',
      name: 'dateOfAppointment',
      label: 'Date of First appointment',
      placeholder: '',
      value: pencomDetails?.dateOfAppointment
        ? moment(pencomDetails?.dateOfAppointment, 'DD-DMMM-YYYY').format(
            'YYYY-MM-DD',
          )
        : pencomDetails?.dateOfAppointment,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },

    {
      type: 'date',
      id: 'dateOfCurrentEmployment',
      name: 'dateOfCurrentEmployment',
      label: 'Date of Currrent appointment',
      placeholder: '',
      value: pencomDetails?.dateOfCurrentEmployment
        ? moment(pencomDetails?.dateOfCurrentEmployment, 'DD-DMMM-YYYY').format(
            'YYYY-MM-DD',
          )
        : pencomDetails?.dateOfCurrentEmployment,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
  ];

  return (
    <section className="personal-details">
      <h2 className="step-count">Step 3</h2>
      <h2 className="step-title">Employment Details</h2>
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

export default EmploymentDetailsForm;
