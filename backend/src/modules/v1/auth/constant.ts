import { config } from 'dotenv';
config();

export const AuthConfig = {
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expired: process.env.JWT_ACCESS_TOKEN_EXPIRED,
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expired: process.env.JWT_REFRESH_TOKEN_EXPIRED,
    },
  },
};

export const Message = {
  Error: {
    UsernameExist: 'Username has been used',
    UsernameNotExist: 'Username has not been registered',
    WrongUsernameOrPassword: 'Username or password are incorrect',
  },
};

export enum CacheKey {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}
