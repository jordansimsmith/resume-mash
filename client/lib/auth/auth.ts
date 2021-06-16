export async function getAccessToken(): Promise<string> {
  try {
    const url = 'http://localhost:3000/api/auth/token';
    const res = await fetch(url);
    const { accessToken } = await res.json();

    return accessToken;
  } catch {
    return null;
  }
}
