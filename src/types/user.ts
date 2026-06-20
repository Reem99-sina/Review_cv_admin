export type Stats = {
  totalUsers: number;
  proUsers: number;
  resumes: number;
  reviews: number;
};
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role:'ADMIN'|'USER'
  isVerified?:boolean
  plan: "FREE" | "PRO";
}

export interface dataRegisterUser {
  name: string;
  email: string;
  password: string;
  role?:'ADMIN'|'USER';
}
export type AuthToken = {
  accessToken: string;
  expiresAt?: number;
};
export interface userSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface userSigninData {

  email: string;
  password: string;

}

export interface verifyEmailData{
  email: string;
  code: string;
}