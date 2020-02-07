import axios from 'axios';

const CONVERTKIT_BASE_URL = 'https://api.convertkit.com/v3';
const FORMS_PATH = '/forms/#';

export const inviteToConvertkit = async (email: string) => {
  if (
    !process.env.CONVERTKIT_API_KEY ||
    !process.env.CONVERTKIT_FORM_ID
  )
    return;

  return await axios.post(
    `${CONVERTKIT_BASE_URL}${FORMS_PATH}${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    {
      api_key: process.env.CONVERTKIT_API_KEY,
      email,
    }
  );
};
