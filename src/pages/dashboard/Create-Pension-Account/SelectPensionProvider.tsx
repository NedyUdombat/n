import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Component(s) */
import InnerPageNavBar from '../../../components/navbar/InnerPageNavBar';
import RadioInput from '../../../components/input/RadioInput';

/** Util(s) */
import { UPDATE_PROVIDER_DETAILS } from '../../../store/modules/create-pencom';

/** Action(s) */
import { getProviders } from '../../../store/modules/pencom';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';

interface PensionProviderProps {
  name: string;
  image: string;
  checked: boolean;
  value: string;
  id: string;
}

interface SelectPensionProviderProps {
  setShowPensionForm: () => void;
  setPencomDetails: (pencomData: any) => void;
  pencomDetails: any;
}

const SelectPensionProvider = ({
  setShowPensionForm,
  pencomDetails,
  setPencomDetails,
}: SelectPensionProviderProps): JSX.Element => {
  const [pensionProviders, setPensionProviders] = useState<
    PensionProviderProps[] | any
  >('');
  const providers = useSelector((state: RootState) => state.pencom.providers);
  const dispatch = useDispatch();

  const fetchProviders = useCallback(() => {
    dispatch(getProviders());
  }, [dispatch]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  useEffect(() => {
    if (pencomDetails.provider) {
      setPensionProviders(
        providers.map((provider: any) => {
          provider.id = provider._id;
          provider.checked = false;
          provider.value = provider._id;

          if (provider._id === pencomDetails.provider) {
            provider.checked = true;
          }

          return provider;
        }),
      );
    } else if (providers.length > 0) {
      setPensionProviders(
        providers.map((provider: any) => {
          provider.id = provider._id;
          provider.checked = false;
          provider.value = provider._id;

          return provider;
        }),
      );
    }
  }, [providers, pencomDetails]);

  const handleRadioSelect = (
    e: ChangeEvent<HTMLInputElement>,
    optsArray: any,
    callback: (opts: any) => void,
  ) => {
    const checkedOption = optsArray.find((opt: any) => opt.checked === true);
    const newOptsArray = optsArray.map((option: any) => {
      if (option.value === checkedOption?.value) {
        option.checked = false;
      }
      if (option.value === e.target.value) {
        option.checked = true;
      }

      return option;
    });

    callback(newOptsArray);
  };

  const handleProviderSelect = (e: ChangeEvent<HTMLInputElement>) => {
    handleRadioSelect(e, pensionProviders, (opsArray) => {
      setPensionProviders(opsArray);
      setPencomDetails({
        type: UPDATE_PROVIDER_DETAILS,
        payload: { provider: opsArray.find((item: any) => item.checked).id },
      });
    });
  };

  const renderCustomLabel = (customOption: any): JSX.Element => {
    return (
      <div className="custom-pension-radio-label">
        <img
          src={customOption.image}
          alt={`${customOption.name} Logo`}
          className="provider-logo"
        />
        <p className="provider-name">{customOption.name}</p>
      </div>
    );
  };

  return (
    <section className="create-pension-account select-provider">
      <InnerPageNavBar pageLogoComponent={true} goBackrouteName="/" />
      {pensionProviders && pensionProviders.length < 1 ? (
        <div className="content">
          <h1 className="title">Sorry!</h1>
          <p className="subtitle">
            There are currently no pension providers available, please check
            back later.
          </p>
        </div>
      ) : (
        <>
          <div className="content">
            <h1 className="title">Select a Pension Provider</h1>
            <p className="subtitle">
              We partner with various pension providers to get you easier access
              to the Micro Pension Scheme. Note that all providers offer the
              same rates.
            </p>
            <RadioInput
              customLabel={renderCustomLabel}
              options={pensionProviders}
              name="pensionProvider"
              handleRadioSelect={handleProviderSelect}
              formGroupClassName="pension-radio"
            />
          </div>
          <footer className="create-pension-account-footer">
            <button
              type="button"
              className="next-btn"
              onClick={setShowPensionForm}
            >
              Begin Registration
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default SelectPensionProvider;
