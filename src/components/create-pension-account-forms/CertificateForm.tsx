/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react';
import moment from 'moment';

/** Type(s) */
import { Unknown } from '../../@types/util.type';
import { InputField } from '../../@types/form.type';

/** Action(s) */
import { UPDATE_CERTIFICATE_DETAILS } from '../../store/modules/create-pencom';

/** Component(s) */
import DropzoneInput from '../input/DropzoneInput';
import Input from '../input/Input';
import TelInput from '../input/TelInput';

interface CertificateFormProps {
  pencomDetails: Unknown;
  setPencomDetails: any;
  setBtnDisabled: (isBoolean: boolean) => void;
}

const CertificateForm = ({ pencomDetails, setPencomDetails }: CertificateFormProps) => {
  const handleSetPersonalDetails = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case 'certificateDate':
        return setPencomDetails({
          type: UPDATE_CERTIFICATE_DETAILS,
          payload: { [name]: moment(value).format('DD-MMM-YYYY') },
        });

      default:
        return setPencomDetails({
          type: UPDATE_CERTIFICATE_DETAILS,
          payload: { [name]: value },
        });
    }
  };

  const _fields: InputField[] = [
    {
      type: 'date',
      id: 'certificateDate',
      name: 'certificateDate',
      label: 'Date',
      value: pencomDetails?.certificateDate
        ? moment(pencomDetails?.certificateDate, 'DD-DMMM-YYYY').format('YYYY-MM-DD')
        : pencomDetails?.certificateDate,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
    },
    {
      type: 'dropzone',
      id: 'signatureImage',
      name: 'signatureImage',
      label: 'Signature',
      placeholder: '',
      value: pencomDetails?.signatureImage,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
    {
      type: 'dropzone',
      id: 'passportImage',
      name: 'passportImage',
      label: 'Passport Image',
      placeholder: '',
      value: pencomDetails?.passportImage,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
    {
      type: 'dropzone',
      id: 'consentImage',
      name: 'consentImage',
      label: 'NIN Slip',
      placeholder: '',
      value: pencomDetails?.consentImage,
      disabled: false,
      onInputChange: handleSetPersonalDetails,
      required: false,
      optional: true,
    },
  ];
  return (
    <section className="personal-details">
      <h2 className="step-count">Step 5</h2>
      <h2 className="step-title">Conrtibutor’s Certificate</h2>
      <form className="certificate-form">
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
            case 'dropzone':
              return (
                <DropzoneInput
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  // value={field.value}
                  // // disabled={false}
                  onChange={field.onInputChange}
                  // required={true}
                  key={field.id}
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

export default CertificateForm;
