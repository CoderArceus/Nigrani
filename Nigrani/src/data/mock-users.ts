export interface UserAccess {
  initials: string;
  name: string;
  email: string;
  role: "ADMIN" | "OFFICER" | "READ-ONLY";
}

export const mockUsers: UserAccess[] = [
  {
    initials: "AS",
    name: "Alok Sharma",
    email: "alok.s@nigrani.gov",
    role: "ADMIN",
  },
  {
    initials: "PK",
    name: "Priya Kapoor",
    email: "p.kapoor@nigrani.gov",
    role: "OFFICER",
  },
  {
    initials: "RN",
    name: "Rahul Nair",
    email: "rnair@audits.gov",
    role: "READ-ONLY",
  },
];
