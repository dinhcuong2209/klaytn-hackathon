import { config } from 'dotenv';
config();

export const Message = {
  Error: {
    ConcertNotExist: 'Concert not found',
  },
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const CONCERT_BASE_URL = `http:${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/v1/concert/`;
export const REMOVED_NUMBER = '000000000000000000000000';
