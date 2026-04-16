export function buildQueryString(params: Record<string, string>): string {
  const usp = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === '' || value === undefined || value === null) continue;
    usp.append(key, value);
  }

  return usp.toString();
}
