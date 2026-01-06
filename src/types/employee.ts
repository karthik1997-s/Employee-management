export interface Employee {
  id: number;
  fullName: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string; // ISO date string
  state: string;
  profileImage: string; // base64 or URL
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type GenderFilter = "All" | "Male" | "Female" | "Other";
export type StatusFilter = "All" | "Active" | "Inactive";
