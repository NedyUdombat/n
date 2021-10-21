import React, { useEffect, useState } from 'react';

/** Validato(s) */
import { passwordPartsRegex } from '../../utils/validators';

interface PasswordStrengthIndicatorPropsType {
  password?: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorPropsType): JSX.Element => {
  const [lowerCaseCheck, setLowerCaseCheck] = useState<boolean>(false);
  const [upperCaseCheck, setUpperCaseCheck] = useState<boolean>(false);
  const [numberCheck, setNumberCheck] = useState<boolean>(false);
  const [lengthCheck, setLengthCheck] = useState<boolean>(false);

  useEffect(() => {
    if (password) {
      if (password.match(passwordPartsRegex.lowerCaseRegex)) {
        setLowerCaseCheck(true);
      } else {
        setLowerCaseCheck(false);
      }
      if (password.match(passwordPartsRegex.upperCaseRegex)) {
        setUpperCaseCheck(true);
      } else {
        setUpperCaseCheck(false);
      }
      if (password.match(passwordPartsRegex.numberRegex)) {
        setNumberCheck(true);
      } else {
        setNumberCheck(false);
      }
      if (password.length >= 8) {
        setLengthCheck(true);
      } else {
        setLengthCheck(false);
      }
    } else {
      setLowerCaseCheck(false);
      setUpperCaseCheck(false);
      setNumberCheck(false);
      setLengthCheck(false);
    }
  }, [password]);

  return (
    <ul className="list-items password-indicator">
      <li className={`list-item${lowerCaseCheck ? ' check' : ''}`}>
        <i className="fa-li fa fa-check" />
        <p className="list-title">at least one lowercase letter</p>
      </li>
      <li className={`list-item${upperCaseCheck ? ' check' : ''}`}>
        <i className="fa-li fa fa-check" />
        <p className="list-title">at least one uppercase letter</p>
      </li>
      <li className={`list-item${numberCheck ? ' check' : ''}`}>
        <i className="fa-li fa fa-check" />
        <p className="list-title">at least one number</p>
      </li>
      <li className={`list-item${lengthCheck ? ' check' : ''}`}>
        <i className="fa-li fa fa-check" />
        <p className="list-title">at least eight(8) character</p>
      </li>
    </ul>
  );
};

export default PasswordStrengthIndicator;
