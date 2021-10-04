import { Unknown } from '../../@types/util.type';

export const DefaultPencomDetails = {
  /** Personal Details */
  titleId: '',
  firstName: '',
  lastName: '',
  middleName: '',
  maidenName: '',
  dateOfBirth: '',
  email: '',
  telephoneNumber: '',
  sex: '',
  maritalStatus: '',
  placeOfBirth: '',
  nationality: '',
  stateOfOrigin: '',
  lgaOfOrigin: '',
  passportNo: '',
  primaryLanguage: '',
  bvn: '',
  nin: '',
  primaryBank: '',
  accountNumber: '',

  /** Residential Details */
  countryRes: '',
  stateCode: '',
  lgaRes: '',
  houseNumberName: '',
  streetName: '',
  villageTownCity: '',
  zipCode: '',
  pmb: '',

  /** Employment Details */
  employmentType: '',
  industry: '',
  employerName: '',
  employerSector: '',
  ippisStatus: '',
  ippisJoinedDate: '',
  ippisJoinedNo: '',
  employerCountry: '',
  employerStateCode: '',
  employerLga: '',
  employerCityCode: '',
  employerBuildingNumberName: '',
  employerStreetName: '',
  employerVillageTownCity: '',
  employerMobileNumber: '',
  employerPmb: '',
  employerZip: '',
  natureOfBusiness: '',
  employerID: '',
  serviceID: '',
  rank: '',
  dateOfAppointment: '',
  dateOfCurrentEmployment: '',

  /** Next Of Kin Details */
  nokTitle: '1',
  nokFirstName: '',
  nokLastName: '',
  nokMiddleName: '',
  nokMaidenName: '',
  nokDateOfBirth: '',
  nokEmail: '',
  nokMobile: '',
  nokSex: '',
  nokRelationship: '',
  nokCountryCode: '',
  nokStateCode: '',
  nokCityCode: '',
  nokHouseNumberName: '',
  nokStreetName: '',
  nokVillageTownCity: '',
  nokZipcode: '',
  nokPmb: '',

  /** Conrtibutor’s Certificate Details */
  certificateDate: '',
  signature: '',

  cfiBiometrics: [
    {
      BiometricType: '',
      Value: '',
      StrBiometricType: null,
      StrBiometric: null,
    },
    {
      BiometricType: '',
      Value: '',
      StrBiometricType: null,
      StrBiometric: null,
    },
    {
      BiometricType: '',
      Value: '',
      StrBiometricType: null,
      StrBiometric: null,
    },
  ],

  /** Pension Provider */
  provider: '',
};

export const UPDATE_PERSONAL_DETAILS = 'UPDATE_PERSONAL_DETAILS';
export const UPDATE_RESIDENTIAL_DETAILS = 'UPDATE_RESIDENTIAL_DETAILS';
export const UPDATE_EMPLOYMENT_DETAILS = 'UPDATE_EMPLOYMENT_DETAILS';
export const UPDATE_NEXT_OF_KIN_DETAILS = 'UPDATE_NEXT_OF_KIN_DETAILS';
export const UPDATE_CERTIFICATE_DETAILS = 'UPDATE_CERTIFICATE_DETAILS';
export const UPDATE_PROVIDER_DETAILS = 'UPDATE_PROVIDER_DETAILS';

export const PencomDetailsReducer = (
  state: any,
  {
    type,
    payload,
  }: {
    type: string;
    payload: Unknown;
  },
) => {
  switch (type) {
    case UPDATE_PERSONAL_DETAILS:
    case UPDATE_RESIDENTIAL_DETAILS:
    case UPDATE_EMPLOYMENT_DETAILS:
    case UPDATE_NEXT_OF_KIN_DETAILS:
    case UPDATE_CERTIFICATE_DETAILS:
    case UPDATE_PROVIDER_DETAILS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
