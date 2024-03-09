export interface User {
  gender: string;
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  id: { name: string; value: string };
  nat: string;
  location: Location;
  login: Login;
  registered: Dob;
  dob: Dob;
}

interface Dob {
  date: string;
  age: number;
}

interface Location {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: { latitude: string; longitude: string };
  timezone: { offset: string; description: string };
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}
