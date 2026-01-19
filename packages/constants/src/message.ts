export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}`,
  PASSWORD_NOT_LONG: "Your password must be at least 8 characters long",
  PASSWORD_NOT_MATCH: "Password and Confirm password do not match",
  PASSWORD_NOT_HAVE_NUMBER: "Your password must contain at least one number",
  PASSWORD_NOT_HAVE_UPPERCASE:
    "Your password must contain at least one uppercase character",
  PASSWORD_NOT_HAVE_SYMBOL:
    "Your password must contain at least one special character",
  LOGIN_FAILED: "Email or password is incorrect!",
  USER_NOT_FOUND: "User not found",
  AVATAR_UPDATE_FAILED:
    "Avatar updated locally, but failed to sync with server.",
  // Image Picker Errors
  CAMERA_PERMISSION_REQUIRED:
    "Permission to access camera is required to take photos!",
  MEDIA_LIBRARY_PERMISSION_REQUIRED:
    "Permission to access media library is required!",
  PERMISSION_REQUIRED: "Permission required",
  IMAGE_PICK_ERROR: "An error occurred while picking the image.",
  CAMERA_ERROR: "An error occurred while taking the photo.",
  // Image Upload Errors
  IMGBB_API_KEY_REQUIRED:
    "ImgBB API key is required. Please configure it in your environment variables.",
  IMAGE_UPLOAD_FAILED: "Could not upload image. Please try again.",
  IMAGE_UPLOAD_ERROR: "An error occurred while uploading the image.",
  INVALID_IMAGE_URI: "Invalid image URI provided.",
  // General Errors
  SOMETHING_WENT_WRONG: "Something went wrong",
};

export const SUCCESS_MESSAGES = {
  ADDED: (name: string) => `${name} has been added successfully`,
  UPDATED: (name: string) => `${name} has been updated successfully`,
  DELETED: (name: string) => `${name} has been deleted successfully`,
  CHANGE: (name: string) => `${name} has been changed successfully`,
  AVATAR_UPDATED: "Avatar updated!",
};

export const WARNING_MESSAGES = {
  MODIFIED: "The information has been modified since the original submissionn",
  SENTRY_DSN_NOT_CONFIGURED:
    "⚠️ Sentry DSN is not configured! Set EXPO_PUBLIC_SENTRY_DSN environment variable",
};

export const CHANNEL_NOTIFICATION = {
  DEFAULT: {
    id: "default",
    name: "Default Notifications",
  },
};
