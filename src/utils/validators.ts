export const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

// will match phone number formats
//1234567890
//123-456-7890
export const PHONE_MATCHER = /^(\d{3})([- ]+)?(\d{3})([- ]+)?(\d{4})$/;

// exporting these for testing
export const isCorrectEmailFormat = (email: string) => {
  return !!(email !== "" && email.match(EMAIL_MATCHER));
};

export const isMessageValid = (message: string) => {
  return !!(message !== "" && message.length >= 2);
};

export const isCorrectPhoneNumberFormat = (phone: string) => {
  return !!(phone !== "" && phone.match(PHONE_MATCHER));
};
