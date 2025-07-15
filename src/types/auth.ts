export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface SignInResult {
  user: AuthUser;
  additionalUserInfo: {
    isNewUser: boolean;
  };
}
