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
  CREATE_USER: 'New user registered in e-commerce platform.',
  USER_LOGIN: 'User login in E-commerce',
  RESET_PASSWORD: 'User requested for reset password.',
  FORGOT_PASSWORD: 'User requested for forgot password.',
  UPDATE_PASSWORD: 'User updated password',
  ADMIN: 'New admin registered in e-commerce platform',
  GUIDE : 'New guide registered in e-commerce platform'

};
export const REGISTER = {
  PASSWORD_UPDATE: 'Password update successfully',
  PASSWORD_CHANGE: 'Password change successfully',
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


export const FORGOT_PASSWORD = {
  INVALID_EMAIL: 'Requested email not found.',
  EMAIL_SENT_SUCCESS: 'Forgot password link sent, please check your inbox.',
  VERIFY_TOKEN_FAIL: 'Token Expired',
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
  TOKEN_MATCH: 'Received token and forgot password token match',
  TOKEN_INVALID: 'Invalid token or token expire'
};

export const CHANGE_PASSWORD = {
  PASSWORD_VALIDATION: 'Password must be a combination of number, lowercase and uppercase and special character.',
  NEW_PASSWORD_VALIDATION:
    'New password must be a combination of number, lowercase and uppercase and special character.',
  PASSWORD_NOT_MATCH: 'Passwords do not match .',
  NEW_PASSWORD_MATCH_CURRENT: 'Please choose a password that is different from your current password.',
  SUCCESS: 'Your password has been changed successfully.',
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
  NO_PERMISSION: 'User dont have permission to delete her self',
  NO_PERMISSION_CREATE: 'User dont have permission to create category',
  NO_PERMISSION_UPDATE: 'User dont have permission to update category',
  NO_PERMISSION_DELETE: 'User dont have permission to delete category',
  EMAIL_ALREADY_EXIST: 'Email already exist in the system',
  ALREADY_EXIST: 'Users email already exists, please rename this User emailId',
  ALREADY_EXIST_SYS: 'User already exists in the system, please rename this User',
  ALREADY_USE: 'User Name already use in somewhere.',
};

export const GUIDE = {
  ALREADY_EXIST: 'Guide already exist',
  CREATED: 'Guide created successfully.',
  UPDATED: 'Guide updated successfully.',
  NOT_FOUND: 'Guide not found.',
  EMAIL_ALREADY_EXIST: 'Email already exist in the system',
  FOUND: 'Guide found successfully.',
  NOT_DELETED: 'Not deleted.',
  DELETED_SUCCESSFULLY: 'Guide deleted successfully',
  NO_PERMISSION: 'User dont have permission to delete her self',
  NO_PERMISSION_CREATE: 'User dont have permission to create category',

  NO_PERMISSION_DELETE: 'Guide dont have permission to delete her self',
};

export const ADMIN = {
  ALREADY_EXIST: 'Admin already exist',
  CREATED: 'Admin created successfully.',
  UPDATED: 'Admin updated successfully.',
  NOT_FOUND: 'Admin not found.',
  EMAIL_ALREADY_EXIST: 'Email already exist in the system',
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
  ALREADY_EXIST: 'Category already exist',
  CREATED: 'Category created successfully.',
  UPDATED: 'Category updated successfully.',
  NOT_FOUND: 'Category not found.',
  EMAIL_ALREADY_EXIST: 'Email already exist in the system',
  FOUND: 'Category found successfully.',
  DELETED_SUCCESSFULLY: 'Category deleted successfully',
};

export const UPLOAD = {
  UPLOAD: 'file upload successfully',
}

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

export interface ITokenData {
  email: string;
  mobile?: string | undefined;
  first_name?: string;
  last_name?: string;
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

export const STATUS = {
  ACTIVE: 'Active',
  DEACTIVATE: 'Deactivate',
};

export const TRANSACTION_TYPE = {
  CREDIT: 'credit',
  DEBIT: 'debit',
};