export interface TUser {
  _id: string;
  id: number;
  name: string;
  email: string;
  password: string; // Consider using a more secure way to handle passwords
  phone: string;
  address: string;
  courses: any[]; // Replace with a more specific type if known
  role: "admin" | "user"; // Assuming roles are limited to 'admin' and 'user'
  status: "Active" | "Inactive"; // Assuming status can be 'Active' or 'Inactive'
  isDeleted: boolean;
  imageLink: string;
  coverLink: string;
  program: string;
  createdAt: string; // Consider using Date type if applicable
  updatedAt: string; // Consider using Date type if applicable
  __v: number;
}
