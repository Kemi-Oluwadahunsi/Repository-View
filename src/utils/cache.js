const CACHE_KEY = "github_repos_cache";
const CACHE_EXPIRATION = 60 * 60 * 1000; // Expiration time

export const saveToCache = (data) => {
  const cacheData = {
    timestamp: Date.now(),
    data: data,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

export const getFromCache = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) return null;

  const { timestamp, data } = JSON.parse(cachedData);
  if (Date.now() - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return data;
};

export const clearCache = () => {
  localStorage.removeItem(CACHE_KEY);
};
