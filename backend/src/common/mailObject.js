import { APP_LINK, APP_NAME, MAIL_ID } from "../config/serverConfig.js";

export const workspaceJoinMail = function (workspace) {
  return {
    from: MAIL_ID,
    subject: "You have been added to a workspace",
    text: `You have been added to the workspace ${workspace.name}`,
  };
};

export const verifyEmail = function (verificationToken) {
  return {
    from: MAIL_ID,
    subject: `Welcome to ${APP_NAME} Please Verify Your Email`,
    text: `Welcome to ${APP_NAME}!
To get started, please verify your email by clicking the link below:

 ${APP_LINK}/verify/${verificationToken}

If you didn't sign up, feel free to ignore this email.

Thanks,
The ${APP_NAME} Team`,
  };
};
