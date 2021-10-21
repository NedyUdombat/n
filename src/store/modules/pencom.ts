/** API Request(s) */
import {
  getProvidersEndpoint,
  getTitlesEndpoint,
  getMaritalStatusEndpoint,
  getCountriesEndpoint,
  getBanksEndpoint,
  getRelationshipEndpoint,
  getStatesEndpoint,
  getCitiesEndpoint,
  getIndustriesEndpoint,
  getEmployersEndpoint,
  getSectorsEndpoint,
} from '../../api/pencom';

/** Type(s) */
import { Dispatch } from '../../@types/store.type';

const GET_PROVIDERS_PROCESS = 'GET_PROVIDERS_PROCESS';
const GET_PROVIDERS_SUCCESS = 'GET_PROVIDERS_SUCCESS';
const GET_PROVIDERS_ERROR = 'GET_PROVIDERS_ERROR';

const GET_TITLES_PROCESS = 'GET_TITLES_PROCESS';
const GET_TITLES_SUCCESS = 'GET_TITLES_SUCCESS';
const GET_TITLES_ERROR = 'GET_TITLES_ERROR';

const GET_MARITAL_STATUS_PROCESS = 'GET_MARITAL_STATUS_PROCESS';
const GET_MARITAL_STATUS_SUCCESS = 'GET_MARITAL_STATUS_SUCCESS';
const GET_MARITAL_STATUS_ERROR = 'GET_MARITAL_STATUS_ERROR';

const GET_COUNTRIES_PROCESS = 'GET_COUNTRIES_PROCESS';
const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
const GET_COUNTRIES_ERROR = 'GET_COUNTRIES_ERROR';

const GET_BANKS_PROCESS = 'GET_BANKS_PROCESS';
const GET_BANKS_SUCCESS = 'GET_BANKS_SUCCESS';
const GET_BANKS_ERROR = 'GET_BANKS_ERROR';

const GET_RELATIONSHIPS_PROCESS = 'GET_RELATIONSHIPS_PROCESS';
const GET_RELATIONSHIPS_SUCCESS = 'GET_RELATIONSHIPS_SUCCESS';
const GET_RELATIONSHIPS_ERROR = 'GET_RELATIONSHIPS_ERROR';

const GET_STATES_PROCESS = 'GET_STATES_PROCESS';
const GET_STATES_SUCCESS = 'GET_STATES_SUCCESS';
const GET_STATES_ERROR = 'GET_STATES_ERROR';

const GET_CITIES_PROCESS = 'GET_CITIES_PROCESS';
const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS';
const GET_CITIES_ERROR = 'GET_CITIES_ERROR';

const GET_INDUSTRIES_PROCESS = 'GET_INDUSTRIES_PROCESS';
const GET_INDUSTRIES_SUCCESS = 'GET_INDUSTRIES_SUCCESS';
const GET_INDUSTRIES_ERROR = 'GET_INDUSTRIES_ERROR';

const GET_EMPLOYERS_PROCESS = 'GET_EMPLOYERS_PROCESS';
const GET_EMPLOYERS_SUCCESS = 'GET_EMPLOYERS_SUCCESS';
const GET_EMPLOYERS_ERROR = 'GET_EMPLOYERS_ERROR';

const GET_EMPLOYMENT_SECTOR_PROCESS = 'GET_EMPLOYMENT_SECTOR_PROCESS';
const GET_EMPLOYMENT_SECTOR_SUCCESS = 'GET_EMPLOYMENT_SECTOR_SUCCESS';
const GET_EMPLOYMENT_SECTOR_ERROR = 'GET_EMPLOYMENT_SECTOR_ERROR';

export const getProviders = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_PROVIDERS_PROCESS });
    const {
      data: {
        data: { providers },
      },
    } = await getProvidersEndpoint();
    dispatch({
      type: GET_PROVIDERS_SUCCESS,
      payload: providers,
      stateName: 'providers',
    });
  } catch (error: any) {
    dispatch({ type: GET_PROVIDERS_ERROR, payload: error.response.data });
  }
};

export const getTitles = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_TITLES_PROCESS });
    const {
      data: {
        data: { titles },
      },
    } = await getTitlesEndpoint();
    dispatch({
      type: GET_TITLES_SUCCESS,
      payload: titles,
      stateName: 'titles',
    });
  } catch (error: any) {
    dispatch({ type: GET_TITLES_ERROR, payload: error.response.data });
  }
};

export const getMaritalStatus = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_MARITAL_STATUS_PROCESS });
    const {
      data: {
        data: { maritalStatus },
      },
    } = await getMaritalStatusEndpoint();
    dispatch({
      type: GET_MARITAL_STATUS_SUCCESS,
      payload: maritalStatus,
      stateName: 'maritalStatus',
    });
  } catch (error: any) {
    dispatch({ type: GET_MARITAL_STATUS_ERROR, payload: error.response.data });
  }
};

export const getCountries = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_COUNTRIES_PROCESS });
    const {
      data: {
        data: { countries },
      },
    } = await getCountriesEndpoint();
    dispatch({
      type: GET_COUNTRIES_SUCCESS,
      payload: countries,
      stateName: 'countries',
    });
  } catch (error: any) {
    dispatch({ type: GET_COUNTRIES_ERROR, payload: error.response.data });
  }
};

export const getBanks = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_BANKS_PROCESS });
    const {
      data: {
        data: { banks },
      },
    } = await getBanksEndpoint();
    dispatch({ type: GET_BANKS_SUCCESS, payload: banks, stateName: 'banks' });
  } catch (error: any) {
    dispatch({ type: GET_BANKS_ERROR, payload: error.response.data });
  }
};

export const getRelationships = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_RELATIONSHIPS_PROCESS });
    const {
      data: {
        data: { relationships },
      },
    } = await getRelationshipEndpoint();
    dispatch({
      type: GET_RELATIONSHIPS_SUCCESS,
      payload: relationships,
      stateName: 'relationships',
    });
  } catch (error: any) {
    dispatch({ type: GET_RELATIONSHIPS_ERROR, payload: error.response.data });
  }
};

export const getStates = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_STATES_PROCESS });
    const {
      data: {
        data: { states },
      },
    } = await getStatesEndpoint();
    dispatch({
      type: GET_STATES_SUCCESS,
      payload: states,
      stateName: 'states',
    });
  } catch (error: any) {
    dispatch({ type: GET_STATES_ERROR, payload: error.response.data });
  }
};

export const getCities = (stateId: string, cityType: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_CITIES_PROCESS });
    const {
      data: {
        data: { cities },
      },
    } = await getCitiesEndpoint(stateId);
    dispatch({
      type: GET_CITIES_SUCCESS,
      payload: cities,
      stateName: cityType,
    });
  } catch (error: any) {
    dispatch({ type: GET_CITIES_ERROR, payload: error.response.data });
  }
};

export const getIndustries = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_INDUSTRIES_PROCESS });
    const {
      data: {
        data: { industries },
      },
    } = await getIndustriesEndpoint();
    dispatch({
      type: GET_INDUSTRIES_SUCCESS,
      payload: industries,
      stateName: 'industries',
    });
  } catch (error: any) {
    dispatch({ type: GET_INDUSTRIES_ERROR, payload: error.response.data });
  }
};

export const getEmployers = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_EMPLOYERS_PROCESS });
    const {
      data: {
        data: { employers },
      },
    } = await getEmployersEndpoint();
    dispatch({
      type: GET_EMPLOYERS_SUCCESS,
      payload: employers,
      stateName: 'employers',
    });
  } catch (error: any) {
    dispatch({ type: GET_EMPLOYERS_ERROR, payload: error.response.data });
  }
};

export const getSectors = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_EMPLOYMENT_SECTOR_PROCESS });
    const {
      data: {
        data: { sectors },
      },
    } = await getSectorsEndpoint();
    dispatch({
      type: GET_EMPLOYMENT_SECTOR_SUCCESS,
      payload: sectors,
      stateName: 'sectors',
    });
  } catch (error: any) {
    dispatch({
      type: GET_EMPLOYMENT_SECTOR_ERROR,
      payload: error.response.data,
    });
  }
};

const DEFAULT_STATE = {
  isLoading: false,
  error: {},
  providers: [],
  titles: [],
  maritalStatus: [],
  countries: [],
  banks: [],
  relationships: [],
  states: [],
  industries: [],
  employers: [],
  sectors: [],
  originCities: [],
  resCities: [],
  employerCities: [],
  nokCities: [],
};

export const pencomReducer = (
  state = DEFAULT_STATE,
  action?: { payload: unknown; type: string; stateName: string },
) => {
  switch (action?.type) {
    case GET_PROVIDERS_PROCESS:
    case GET_TITLES_PROCESS:
    case GET_MARITAL_STATUS_PROCESS:
    case GET_COUNTRIES_PROCESS:
    case GET_BANKS_PROCESS:
    case GET_RELATIONSHIPS_PROCESS:
    case GET_STATES_PROCESS:
    case GET_CITIES_PROCESS:
    case GET_INDUSTRIES_PROCESS:
    case GET_EMPLOYERS_PROCESS:
    case GET_EMPLOYMENT_SECTOR_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROVIDERS_SUCCESS:
    case GET_TITLES_SUCCESS:
    case GET_MARITAL_STATUS_SUCCESS:
    case GET_COUNTRIES_SUCCESS:
    case GET_BANKS_SUCCESS:
    case GET_RELATIONSHIPS_SUCCESS:
    case GET_STATES_SUCCESS:
    case GET_CITIES_SUCCESS:
    case GET_INDUSTRIES_SUCCESS:
    case GET_EMPLOYERS_SUCCESS:
    case GET_EMPLOYMENT_SECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.stateName]: action.payload,
      };
    case GET_PROVIDERS_ERROR:
    case GET_TITLES_ERROR:
    case GET_MARITAL_STATUS_ERROR:
    case GET_COUNTRIES_ERROR:
    case GET_BANKS_ERROR:
    case GET_RELATIONSHIPS_ERROR:
    case GET_STATES_ERROR:
    case GET_CITIES_ERROR:
    case GET_INDUSTRIES_ERROR:
    case GET_EMPLOYERS_ERROR:
    case GET_EMPLOYMENT_SECTOR_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
