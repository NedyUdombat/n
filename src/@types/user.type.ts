export interface User {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  verificationStatus?: boolean;
  wallets?: any[];
  bvnVerified?: boolean;
  id?: string;
  verificationToken?: string;
  verificationTokenExpires?: string;
  createdAt?: string;
  updatedAt?: string;
  pencoms?: any[];
}
