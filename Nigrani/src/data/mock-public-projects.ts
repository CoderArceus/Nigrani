export interface PublicProject {
  id: string;
  name: string;
  location: string;
  costFormatted: string;
  status: string;
}

export const publicProjects: PublicProject[] = [
  {
    id: "PRJ-2024-8901",
    name: "Construction of Community Health Center",
    location: "Ward 14, North District",
    costFormatted: "₹ 45,00,000",
    status: "In Progress",
  },
  {
    id: "PRJ-2024-8902",
    name: "Solar Street Lighting Installation",
    location: "Multiple Locations, East Zone",
    costFormatted: "₹ 12,50,000",
    status: "Tender Phase",
  },
  {
    id: "PRJ-2023-7455",
    name: "Upgradation of Primary School Building",
    location: "Village Block B, South District",
    costFormatted: "₹ 28,00,000",
    status: "Completed",
  },
  {
    id: "PRJ-2024-9105",
    name: "Rainwater Harvesting Reservoir",
    location: "Central Park, Municipal Area",
    costFormatted: "₹ 35,00,000",
    status: "In Progress",
  },
  {
    id: "PRJ-2024-9211",
    name: "Public Library Digital Infrastructure",
    location: "Main City Library, Sector 4",
    costFormatted: "₹ 8,50,000",
    status: "Planning",
  },
  {
    id: "PRJ-2023-6890",
    name: "Connecting Road Repair Phase II",
    location: "Highway Link, West Corridor",
    costFormatted: "₹ 55,00,000",
    status: "Delayed",
  },
];
