export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  avatar?: string;
  favorites?: string[];
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}
