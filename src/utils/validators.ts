// eslint-disable-next-line @typescript-eslint/no-var-requires
const PasswordValidator = require('password-validator');

const passwordSchema = new PasswordValidator();
const nameSchema = new PasswordValidator();
const singleNameSchema = new PasswordValidator();
const phonenumberSchema = new PasswordValidator();
const bvnSchema = new PasswordValidator();

passwordSchema
  .is()
  .min(8)
  .has()
  .lowercase()
  .has()
  .not()
  .spaces()
  .has()
  .digits()
  .has()
  .symbols(1)
  .is()
  .not()
  .oneOf([
    'password',
    'Password',
    'Passw0rd',
    'Password123',
    'Password1',
    'Password12',
    'Password2',
    'Password3',
    'abcedfgh',
  ]);

phonenumberSchema
  .is()
  .min(10)
  .has()
  .not()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

nameSchema.is().min(3).has().lowercase().has().not().digits().has().spaces();

singleNameSchema
  .is()
  .min(3)
  .has()
  .lowercase()
  .has()
  .not()
  .digits()
  .has()
  .not()
  .spaces();

bvnSchema
  .is()
  .min(10)
  .is()
  .digits()
  .has()
  .not()
  .letters()
  .has()
  .not()
  .spaces()
  .has()
  .not()
  .symbols();

const emailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordPartsRegex = {
  lowerCaseRegex: /[a-z]/g,
  upperCaseRegex: /[A-Z]/g,
  numberRegex: /[0-9]/g,
  minLength: 8,
  specialCharRegex: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
};

export {
  passwordSchema,
  nameSchema,
  phonenumberSchema,
  emailRegex,
  passwordPartsRegex,
  bvnSchema,
  singleNameSchema,
};
