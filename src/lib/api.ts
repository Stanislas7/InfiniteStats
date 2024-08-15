const API_KEY = process.env.INFINITE_FLIGHT_API_KEY;
const API_URL = 'https://api.infiniteflight.com/public/v2/users';

export interface UserStats {
  onlineFlights: number;
  violations: number;
  xp: number;
  landingCount: number;
  flightTime: number;
  atcOperations: number;
  atcRank: number | null;
  grade: number;
  violationCountByLevel: {
    level1: number;
    level2: number;
    level3: number;
  };
  virtualOrganization: string | null;
  discourseUsername: string;
}

export async function fetchUserStats(username: string): Promise<UserStats> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      discourseNames: [username],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user stats');
  }

  const data = await response.json();
  return data.result[0];
}