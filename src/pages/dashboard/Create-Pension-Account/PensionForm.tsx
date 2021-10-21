import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/** Component(s) */
import InnerPageNavBar from '../../../components/navbar/InnerPageNavBar';
import ProgressBar from '../../../components/progress-bar/ProgressBar';
import PersonalDetailsForm from '../../../components/create-pension-account-forms/PersonalDetailsForm';
import ResidentialDetailsForm from '../../../components/create-pension-account-forms/ResidentialDetailsForm';
import EmploymentDetailsForm from '../../../components/create-pension-account-forms/EmploymentDetailsForm';
import NextOfKinDetailsForm from '../../../components/create-pension-account-forms/NextOfKinDetailsForm';
import CertificateForm from '../../../components/create-pension-account-forms/CertificateForm';
import SelectPensionProvider from './SelectPensionProvider';

/** Icon(s) */
import ArrowLeft from '../../../assets/icons/arrowLeft.svg';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Action(s) */
import {
  getTitles,
  getMaritalStatus,
  getCountries,
  getStates,
  getCities,
  getBanks,
  getSectors,
  getIndustries,
  getEmployers,
  getRelationships,
} from '../../../store/modules/pencom';
import { PencomDetailsReducer, DefaultPencomDetails } from '../../../store/modules/create-pencom';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';

interface Step {
  stepName: string | number;
  completed: boolean;
}

interface PensionFormProps {
  location: { pathname: string };
}

const PensionForm = ({ location: { pathname } }: PensionFormProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [showPensionForm, setShowPensionForm] = useState<boolean>(false);

  const [pencomDetails, setPencomDetails] = useReducer(PencomDetailsReducer, DefaultPencomDetails);

  const titles = useSelector((state: RootState) => state.pencom.titles);
  const maritalStatus = useSelector((state: RootState) => state.pencom.maritalStatus);
  const countries = useSelector((state: RootState) => state.pencom.countries);
  const states = useSelector((state: RootState) => state.pencom.states);
  const originCities = useSelector((state: RootState) => state.pencom.originCities);
  const resCities = useSelector((state: RootState) => state.pencom.resCities);
  const employerCities = useSelector((state: RootState) => state.pencom.employerCities);
  const nokCities = useSelector((state: RootState) => state.pencom.nokCities);
  const banks = useSelector((state: RootState) => state.pencom.banks);
  const sectors = useSelector((state: RootState) => state.pencom.sectors);
  const industries = useSelector((state: RootState) => state.pencom.industries);
  const employers = useSelector((state: RootState) => state.pencom.employers);
  const relationships = useSelector((state: RootState) => state.pencom.relationships);

  const dispatch = useDispatch();

  const fetchTitles = useCallback(() => {
    dispatch(getTitles());
  }, [dispatch]);

  const fetchMaritalStatus = useCallback(() => {
    dispatch(getMaritalStatus());
  }, [dispatch]);

  const fetchCountries = useCallback(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const fetchStates = useCallback(() => {
    dispatch(getStates());
  }, [dispatch]);

  const fetchCities = useCallback(() => {
    if (pencomDetails.stateOfOrigin) {
      dispatch(getCities(pencomDetails.stateOfOrigin, 'originCities'));
    }
    if (pencomDetails.stateCode) {
      dispatch(getCities(pencomDetails.stateCode, 'resCities'));
    }
    if (pencomDetails.employerStateCode) {
      dispatch(getCities(pencomDetails.employerStateCode, 'employerCities'));
    }
    if (pencomDetails.nokStateCode) {
      dispatch(getCities(pencomDetails.nokStateCode, 'nokCities'));
    }
  }, [dispatch, pencomDetails]);

  const fetchBanks = useCallback(() => {
    dispatch(getBanks());
  }, [dispatch]);

  const fetchSectors = useCallback(() => {
    dispatch(getSectors());
  }, [dispatch]);

  const fetchIndustries = useCallback(() => {
    dispatch(getIndustries());
  }, [dispatch]);

  const fetchEmployers = useCallback(() => {
    dispatch(getEmployers());
  }, [dispatch]);

  const fetchRelationships = useCallback(() => {
    dispatch(getRelationships());
  }, [dispatch]);

  useEffect(() => {
    fetchTitles();
    fetchMaritalStatus();
    fetchCountries();
    fetchStates();
    fetchCities();
    fetchBanks();
    fetchSectors();
    fetchIndustries();
    fetchEmployers();
    fetchRelationships();
  }, [
    fetchTitles,
    fetchMaritalStatus,
    fetchCountries,
    fetchStates,
    fetchCities,
    fetchBanks,
    fetchSectors,
    fetchIndustries,
    fetchEmployers,
    fetchRelationships,
  ]);

  const steps: Step[] = [
    {
      stepName: 1,
      completed: false,
    },
    {
      stepName: 2,
      completed: false,
    },
    {
      stepName: 3,
      completed: false,
    },
    {
      stepName: 4,
      completed: false,
    },
    {
      stepName: 5,
      completed: false,
    },
  ];

  const handleTabSwitch = (activeTabIndex: number) => {
    setActiveTab(activeTabIndex);
  };

  const setBtnDisabledStatus = (isBoolean: boolean): void => {
    setBtnDisabled(isBoolean);
  };

  const handleNext = () => {
    setActiveTab(activeTab + 1);
  };

  const handleBack = () => {
    setActiveTab(activeTab - 1);
  };

  const renderForms = () => {
    switch (activeTab) {
      case 1:
        return (
          <PersonalDetailsForm
            titles={titles}
            maritalStatus={maritalStatus}
            countries={countries}
            states={states}
            cities={originCities}
            banks={banks}
            setBtnDisabled={setBtnDisabledStatus}
            pencomDetails={pencomDetails}
            setPencomDetails={setPencomDetails}
          />
        );
      case 2:
        return (
          <ResidentialDetailsForm
            setBtnDisabled={setBtnDisabledStatus}
            pencomDetails={pencomDetails}
            setPencomDetails={setPencomDetails}
            countries={countries}
            states={states}
            cities={resCities}
          />
        );
      case 3:
        return (
          <EmploymentDetailsForm
            setBtnDisabled={setBtnDisabledStatus}
            pencomDetails={pencomDetails}
            setPencomDetails={setPencomDetails}
            sectors={sectors}
            employers={employers}
            industries={industries}
            countries={countries}
            states={states}
            cities={employerCities}
          />
        );
      case 4:
        return (
          <NextOfKinDetailsForm
            titles={titles}
            maritalStatus={maritalStatus}
            countries={countries}
            states={states}
            cities={nokCities}
            setBtnDisabled={setBtnDisabledStatus}
            pencomDetails={pencomDetails}
            setPencomDetails={setPencomDetails}
            relationships={relationships}
          />
        );
      case 5:
        return (
          <CertificateForm
            setBtnDisabled={setBtnDisabledStatus}
            pencomDetails={pencomDetails}
            setPencomDetails={setPencomDetails}
          />
        );
      default:
    }
  };

  if (showPensionForm) {
    return (
      <section className="create-pension-account pension-form">
        <InnerPageNavBar pageLogoComponent={true} goBackrouteName="/" />
        <div className="content">
          <ProgressBar steps={steps} activeTab={activeTab} tabSwitchCallback={handleTabSwitch} />
          <section className="forms-section">{renderForms()}</section>
        </div>
        <footer className="create-pension-account-footer">
          {activeTab === 1 && (
            <div className="multiple-btns">
              <button className="btn back-btn" onClick={() => setShowPensionForm(false)}>
                <img src={ArrowLeft} alt="Arrow Left Icon" className="btn-icon" />
                Back
              </button>
              <button
                type="button"
                className={`next-btn${btnDisabled === true ? ` disabled` : ``}`}
                disabled={btnDisabled}
                onClick={() => handleNext()}
              >
                Next
              </button>
            </div>
          )}
          {activeTab !== steps.length && activeTab > 1 && (
            <div className="multiple-btns">
              <button type="button" className="btn back-btn" onClick={() => handleBack()}>
                <img src={ArrowLeft} alt="Arrow Left Icon" className="btn-icon" />
                Back
              </button>
              <button type="button" className="next-btn" onClick={() => handleNext()}>
                Next
              </button>
            </div>
          )}
          {activeTab === steps.length && (
            <div className="multiple-btns">
              <button type="button" className="btn back-btn" onClick={() => handleBack()}>
                <img src={ArrowLeft} alt="Arrow Left Icon" className="btn-icon" />
                Back
              </button>
              <Link
                to={{
                  pathname: ROUTE_URLS.CREATE_PENSION_FORM,
                  state: { from: pathname },
                }}
                className="next-btn"
              >
                Submit Registration
              </Link>
            </div>
          )}
        </footer>
      </section>
    );
  }

  return (
    <SelectPensionProvider
      pencomDetails={pencomDetails}
      setPencomDetails={setPencomDetails}
      setShowPensionForm={() => setShowPensionForm(true)}
    />
  );
};

export default PensionForm;
