import { ChangeEvent } from 'react';

export interface InputField {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string | undefined;
  disabled: boolean;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void | null;
  required: boolean;
  optional?: boolean;
  options?: {
    value: string;
    label: string;
    [propertyName: string]: string | undefined;
  }[];
}
