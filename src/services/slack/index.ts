import axios from 'axios';

const SLACK_BASE_URL = 'https://slack.com/api';
const SLACK_ADMIN_INVITE_PATH = '/users.admin.invite';

export const inviteToSlack = async (email: string) => {
  if (!process.env.SLACK_TOKEN) return;

  return await axios.get(
    `${SLACK_BASE_URL}${SLACK_ADMIN_INVITE_PATH}?email=${email}&token=${process.env.SLACK_TOKEN}&set_active=true`
  );
};
