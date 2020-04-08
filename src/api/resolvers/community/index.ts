import { MutationResolvers } from '@generated/server';
import { inviteToSlack } from '@services/slack';

interface Resolvers {
  Mutation: MutationResolvers;
}

// https://api.slack.com/methods/admin.users.invite
const SLACK_ERRORS: { [key: string]: string } = {
  team_not_found: 'Team was not found',
  feature_not_enabled:
    'The Admin APIs feature is not enabled for this team.',
  invalid_email: 'Email address was not valid.',
  already_in_team: 'The user is already on the team.',
  user_disabled: 'The user is disabled.',
  already_in_team_invited_user:
    'The user has already been invited to the team.',
  failed_looking_up_user: "We couldn't find the requested user.",
  failed_to_validate_caller:
    "The token calling this method doesn't have permission to invite a user.",
  failed_to_validate_team:
    'The team calling this method was invalid.',
  failed_to_validate_channels: 'channel_ids was invalid',
  failed_to_validate_expiration: 'expiration_ts was invalid',
  failed_to_validate_custom_message: 'extra_message was invalid',
  failed_to_send_invite: 'The invite failed to send.',
  not_authed: 'No authentication token provided.',
  invalid_auth:
    'Some aspect of authentication cannot be validated. Either the provided token is invalid or the request originates from an IP address disallowed from making the request.',
  account_inactive:
    'Authentication token is for a deleted user or workspace.',
  token_revoked:
    'Authentication token is for a deleted user or workspace or the app has been removed.',
  no_permission:
    "The workspace token used in this request does not have the permissions necessary to complete the request. Make sure your app is a member of the conversation it's attempting to post a message to.",
  org_login_required:
    'The workspace is undergoing an enterprise migration and will not be available until migration is complete.',
  ekm_access_denied:
    'Administrators have suspended the ability to post a message.',
  missing_scope:
    'The token used is not granted the specific scope permissions required to complete this request.',
  is_bot: 'This method cannot be called by a bot user.',
  invalid_arguments: 'The method was called with invalid arguments.',
  invalid_arg_name:
    'The method was passed an argument whose name falls outside the bounds of accepted or expected values. This includes very long names and names with non-alphanumeric characters other than _. If you get this error, it is typically an indication that you have made a very malformed API call',
  invalid_charset:
    'The method was called via a POST request, but the charset specified in the Content-Type header was invalid. Valid charset names are: utf-8 iso-8859-1.',
  invalid_form_data:
    'The method was called via a POST request with Content-Type application/x-www-form-urlencoded or multipart/form-data, but the form data was either missing or syntactically invalid.',
  invalid_post_type:
    'The method was called via a POST request, but the specified Content-Type was invalid. Valid types are: application/json application/x-www-form-urlencoded multipart/form-data text/plain.',
  missing_post_type:
    'The method was called via a POST request and included a data payload, but the request did not include a Content-Type header.',
  team_added_to_org:
    'The workspace associated with your request is currently undergoing migration to an Enterprise Organization. Web API and other platform operations will be intermittently unavailable until the transition is complete.',
  request_timeout:
    'The method was called via a POST request, but the POST data was either missing or truncated.',
  fatal_error:
    "The server could not complete your operation(s) without encountering a catastrophic error. It's possible some aspect of the operation succeeded before the error was raised.",
  internal_error:
    "The server could not complete your operation(s) without encountering an error, likely due to a transient issue on our end. It's possible some aspect of the operation succeeded before the error was raised.",
};

export const resolvers: Resolvers = {
  Mutation: {
    communityJoin: async (_, { email }) => {
      try {
        const result = await inviteToSlack(email);

        if (!result) {
          return new Error('Something went wrong.');
        }

        if (!result.data.ok) {
          return new Error(SLACK_ERRORS[result.data.error]);
        }
      } catch (error) {
        return new Error(error);
      }

      return true;
    },
  },
};
