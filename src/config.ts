import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export the environment variables for use in other files
// https://medium.com/@RajiDevMind/importing-dotenv-env-in-your-react-vite-latest-e4e9f9bc80c7
// It is very important that Vite requires environment variables to start with VITE_ for them to be exposed to your client-side code.
export const config = {
  apiKey: process.env.VITE_RAWG_API_KEY || '',
};