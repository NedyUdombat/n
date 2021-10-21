import { http } from './client';

export const getProvidersEndpoint = async () => await http.get('/micro-pension/provider');
export const getTitlesEndpoint = async () => await http.get('/micro-pension/title');
export const getMaritalStatusEndpoint = async () => await http.get('/micro-pension/marital-status');
export const getCountriesEndpoint = async () => await http.get('/micro-pension/country');
export const getBanksEndpoint = async () => await http.get('/micro-pension/bank');
export const getSectorsEndpoint = async () => await http.get('/micro-pension/sector');
export const getRelationshipEndpoint = async () => await http.get('/micro-pension/relationship');
export const getStatesEndpoint = async () => await http.get('/micro-pension/state');
export const getCitiesEndpoint = async (param: string) => await http.get(`/micro-pension/city/${param}`);
export const getIndustriesEndpoint = async () => await http.get('/micro-pension/industry');
export const getEmployersEndpoint = async () => await http.get('/micro-pension/employer');
