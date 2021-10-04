/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
type CommonEnvsType = {
  ENVIRONMENT: string | undefined;
};

const commonEnvs: CommonEnvsType = {
  ENVIRONMENT: process.env.ENVIRONMENT,
};

const config: Record<string, any> = Object.freeze({
  local: {
    ...commonEnvs,
    BASE_URL: process.env.BASE_URL,
    BVN_FIRSTNAME: process.env.BVN_FIRSTNAME,
    BVN_LASTTNAME: process.env.BVN_LASTTNAME,
    BVN_VALUE: process.env.BVN_VALUEBVN_LASTTNAME,
    WALLET_PIN: process.env.CREATE_WALLET_BVN,
    DOB: process.env.REACT_APP_TEST_DOB,
    WALLET_BVN: process.env.WALLET_PIN,
  },
  development: {
    ...commonEnvs,
    BASE_URL: process.env.BASE_URL,
    BVN_FIRSTNAME: process.env.BVN_FIRSTNAME,
    BVN_LASTTNAME: process.env.BVN_LASTTNAME,
    BVN_VALUE: process.env.BVN_VALUEBVN_LASTTNAME,
    WALLET_PIN: process.env.CREATE_WALLET_BVN,
    DOB: process.env.REACT_APP_TEST_DOB,
    WALLET_BVN: process.env.WALLET_PIN,
  },
  staging: {
    ...commonEnvs,
    BASE_URL: process.env.BASE_URL,
  },
  production: {
    ...commonEnvs,
    BASE_URL: process.env.BASE_URL,
  },
});

export default config[commonEnvs.ENVIRONMENT!];
