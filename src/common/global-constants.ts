export const LOGIN = {
  INVALID_CRED: 'Invalid login credentials.',
  USER_NOT_FOUND: 'User not found with given credentials.',
  REFRESH_TOKEN_MALFORMED: 'Refresh token malformed.',
  REFRESH_TOKEN_NOT_FOUND: 'Refresh token not found.',
  REFRESH_TOKEN_REVOKED: 'We noticed a new sign-in to your account in another device so your session has been expired.',
  REFRESH_TOKEN_EXPIRED: 'Your session has been expired.',
  SUCCESS: 'Welcome to E-commerce platform !',
  LOGOUT: "You've been logged out, fare thee well.",
  MULTIPLE_NOT_ALLOWED: 'Sorry dopplegangers, only one login per account at a time.',
  NOT_ACTIVE_USER: 'Account with given email-id is not active yet.',
};
export const NOTIFICATION_MESSAGE = {
  CREATE_USER :'New User registered in E-commerce Platform.',
 USER_LOGIN : 'User login in E-commerce',
 RESET_PASSWORD: 'User requested for reset password.',
 FORGOT_PASSWORD : 'User requested for forgot password.',
 UPDATE_PASSWORD : 'User updated password'
 
};









export const REGISTER = {
  PASSWORD_UPDATE: 'password update successfully',
  PASSWORD_CHANGE: 'password change successfully',
  SUCCESS: 'Registration success, welcome!',
  USER_EXIST: 'Account already exists with the given email, please provide another email.',
  USER_NOT_REGISTERED: 'No user registered with these credentials found.',
  EMAIL_FAIL: 'We fumbled; email send failed, please try again later.',
  EMAIL_SENDED_RECENTLY: 'Email just sent, please tray again later.',
  EMAIL_UNVERIFIED: 'Email not verified. Please verify email to continue.',
  EMAIL_SENT_SUCCESS: 'Please check your inbox to get activation link.',
  INVALID_VERIFICATION_LINK: 'Invalid activation link.',
  EMAIL_VERIFICATION_SUCCESS: "Success!  You've verified your account.",
  EMAIL_VERIFICATION_EXPIRED: 'Account activation link expired. Please resend activation email.',
  EMAIL_ALREADY_VERIFIED: 'Email has already been verified.',
  USER_BLOCK: 'Employee is blocked.',
};

export const RESET_PASSWORD = {
  INVALID_LINK: 'Invalid reset password link.',
  LINK_EXPIRED: 'Reset Password link expired.',
  SUCCESS: 'Your password has been reset.',
  EMAIL_SENT_SUCCESS: 'Password reset link sent, please check your inbox.',
};

export const ACTIONS = {
  FETCHED: 'Fetched successfully.',
  UPDATED: 'Updated successfully.',
  CREATED: 'Added successfully.',
  DELETED: 'Deleted successfully.',
  NOT_FOUND: 'Invalid ID.',
  ALREADY_EXIST: 'primaryColor already exits',
};

export const ERROR = {
  INTERNAL_SERVER_ERROR: 'Something went wrong, please try again later.',
  UNAUTHORIZED_ERROR: 'Please provide access token.',
  UNAUTHORIZED_ROLE_ERROR: 'Unauthorized access. You are not authorized to perform this action.',
  TOKEN_EXPIRED_ERROR: 'Unauthorized access. token expired.',
  PROVIDE_TOKEN_ERROR: 'Unauthorized access. Please provide valid token.',
  TOKEN_MATCH : 'received token and forgot password token match',
  TOKEN_Invalid : 'invalid token or token expire'
};

export const CHANGE_PASSWORD = {
  PASSWORD_VALIDATION: 'Password must be a combination of number, lowercase and uppercase and special character.',
  NEW_PASSWORD_VALIDATION:
    'New password must be a combination of number, lowercase and uppercase and special character.',
  PASSWORD_NOT_MATCH: 'Passwords do not match .',
  NEW_PASSWORD_MATCH_CURRENT: 'Please choose a password that is different from your current password.',
  SUCCESS: 'Your password has been changed successfully.',
};

export const REPORT = {
  FETCHED: `Report fetch successfully.`,
};

export const DATE = {
  INVALID: 'Date is invalid .',
};

export const CONFIG_CONNECTION_OPTIONS = 'CONFIG_CONNECTION_OPTIONS';
export const PASSWORD_SALT_ROUNDS = 10;

export const Users = {
  FETCHED: 'User has been fetched successfully.',
  UPDATED: 'User has been updated successfully.',
  CREATED: 'User has been added successfully.',
  DELETED: 'User has been removed successfully.',
  NOT_FOUND: 'Requested User not found.',
  NO_PERMISSION: 'user dont have permission to delete her self',
  NO_PERMISSION_CREATE: 'user dont have permission to create category',
  NO_PERMISSION_UPDATE: 'user dont have permission to update category',
  NO_PERMISSION_DELETE: 'user dont have permission to delete category',
  EMAIL_ALREADY_EXIST: 'Email already exist in the system',
  ALREADY_EXIST: 'Users email already exists, please rename this User emailId',
  ALREADY_EXIST_SYS: 'User already exists in the system, please rename this User',
  ALREADY_USE: 'User Name already use in somewhere.',
};

export const ADMIN = {
  ALREADY_EXIST: 'Admin already exist',
  CREATED: 'Admin created successfully.',
  UPDATED: 'Admin updated successfully.',
  NOT_FOUND: 'Admin not found.',
  EMAIl_ALREADY_EXIST: 'Email already exist in the system',
  FOUND: 'Admin found successfully.',
  NOT_DELETED: 'Not deleted.',
  DELETED_SUCCESSFULLY: 'Admin deleted successfully',
};

export const ROLE = {
  ALREADY_EXIST: 'This role is already exist in the system',
  CREATED: 'Role created successfully.',
  UPDATED: 'Role updated successfully.',
  CANT_DELETE: 'Role cant delete,user is mapped with this role',
  DELETED: 'Role deleted successfully.',
  FOUND: 'Role found successfully',
  NOT_FOUND: 'Role not found',
  CANT_UPDATE_PREDEFINE_ROLE: "You can't update the pre-define roles",
  CANT_DELETE_PREDEFINE_ROLE: "You can't update the pre-define roles",
};

export const CATEGORY = {
  ALREADY_EXIST: 'category already exist',
  CREATED: 'category created successfully.',
  UPDATED: 'category updated successfully.',
  NOT_FOUND: 'category not found.',
  EMAIl_ALREADY_EXIST: 'Email already exist in the system',
  FOUND: 'category found successfully.',
  DELETED_SUCCESSFULLY: 'category deleted successfully',
};

export const NOTIFICATION = {
  ALREADY_EXIST: 'Notification already exist',
  CREATED: 'Notification  created successfully.',
  NOT_FOUND: 'Notification  not found.',
 FOUND: 'Notification found successfully.',

}; 
export const userType = {
  admin: 'ADMIN',
  operator: 'OPERATOR',
  user: 'USER',
};

export const GAME = {
  NAME_ALREADY_EXIST: 'Game with given name already exist',
  CREATED: 'Game created successfully',
  UPDATE: 'Game data updated successfully',
  NOT_FOUND: 'Game not found',
  FOUND: 'Game Found successfully.',
  DELETED: 'Game deleted successfully.',
  TIMER:"Roulette timer.",
  NO_MORE_BETS:"No more best please."
};

export const MARKET = {
  CREATED: 'Market created successfully',
  NAME_ALREADY_EXIST: 'Market with given name already exist',
  UPDATE: 'Market data updated successfully',
  DELETED: 'Market deleted successfully',
  NOT_FOUND: 'Market not found',
  FOUND: 'Market Found successfully.',
  RUNNERSTATUS: 'Market runner status updated successfully',
};

export const RUNNER = {
  NAME_ALREADY_EXIST: 'Runner with this name already exist.',
  CREATED: 'Runner created successfully',
  UPDATE: 'Runner data updated successfully',
  NOT_DELETED: 'Runner not deleted successfully',
  DELETED: 'Runner deleted successfully',
  FOUND: 'Runner foudn.',
};

export const CURRENCY = {
  NAME_ALREADY_EXIST: 'Currency already exist',
  CREATED: 'Currency created successfully',
  FOUND: 'Currency data found.',
};

export const PACKAGE = {
  CREATED: 'Package created successfully',
  NAME_ALREADY_EXIST: 'Package with given name already exist',
  UPDATE: 'Package data updated successfully',
  DELETED: 'Package deleted successfully',
  NOT_FOUND: 'Package not found',
  FOUND: 'Package Found successfully.',
};

export interface ITokenData {
  email: string;
  mobile: string | undefined;
  first_name: string;
  last_name: string;
  role?: string;
  roleId?: string;
  operatorId?: string;
  userId: string;
  operator_by?: string;
}
export interface TokenData {
  email: string;
  userId: string;
}

export const BET = {
  CREATED: 'Bet created successfully',
  NOT_CREATED: 'Bet not created',
  NOT_UPDATED: 'Bet not updated',
  UPDATED: 'Bet updated successfully',
  FOUND: 'Bet found successfully',
  NOT_FOUND: 'Bet not found',
  NOT_DELETED: 'Bet deleted successfully',
  DELETED: 'Bet not deleted successfully',
};

export const STATUS = {
  ACTIVE: 'Active',
  DEACTIVATE: 'Deactivate',
};

export const TRANSACTION_TYPE = {
  CREDIT: 'credit',
  DEBIT: 'debit',
};

export const ROULETTE_ROOM_STATUS = {
  LIVE: 'Live',
  COMPLETED: 'Completed',
  NOT_COMPLETED: 'Not-Completed',
};

export const JOIN_EVENT = {
  JOIN_TABLE_SUCCESS: 'Great! Join table successfully.',
  USER_BET_PLAY: 'The bet has been placed successfully',
  USER_WINNER_LIST: "These are the winners' lists",
  NEW_USER_JOIN: 'New user join',
  WIN_NUMBER: 'Win number found.',
  BALANCE_FOUND: 'Balance found.',
  USER_ALREADY_EXIST_ROOM: 'You already exist in the room',
  UNDO_ALL_BET:'The all bet have been successfully undo'
};

export const BET_STATUS = {
  SETTLE: 'settle',
  UNSETTLE: 'unsettle',
  PENDING: 'pending',
};

export const ROULETTE_ERROR = {
  BET_ERROR: 'Please place the bet',
  BALANCE_GREATER_ERROR: 'This bet requires a balance greater than your current balance',
};
