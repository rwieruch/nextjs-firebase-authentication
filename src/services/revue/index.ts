import axios from 'axios';

const REVUE_BASE_URL = 'https://www.getrevue.co/api/v2';
const REVUE_SUBSCRIBERS_PATH = '/subscribers';

export const inviteToRevue = async (
  email: string,
  username: string
) => {
  if (!process.env.REVUE_TOKEN) return;

  return await axios.post(
    `${REVUE_BASE_URL}${REVUE_SUBSCRIBERS_PATH}`,
    {
      email,
      first_name: username,
      double_opt_in: false,
    },
    {
      headers: {
        Authorization: `Token token="${process.env.REVUE_TOKEN}"`,
      },
    }
  );
};

export const removeFromRevue = async (email: string) => {
  if (!process.env.REVUE_TOKEN) return;

  await axios.delete(`${REVUE_BASE_URL}${REVUE_SUBSCRIBERS_PATH}`, {
    data: {
      email,
    },
    headers: {
      Authorization: `Token token="${process.env.REVUE_TOKEN}"`,
    },
  });
};
