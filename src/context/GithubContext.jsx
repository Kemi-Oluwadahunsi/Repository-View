// import { createContext, useState, useContext, useCallback } from "react";
// import PropTypes from "prop-types";

// const GithubContext = createContext();

// export const useGithubContext = () => {
//   const context = useContext(GithubContext);
//   if (!context) {
//     throw new Error("useGithubContext must be used within a GithubProvider");
//   }
//   return context;
// };

// export const GithubProvider = ({ children }) => {
//   const [repos, setRepos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchRepos = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     setError(null);
//     try {
//       const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0];
//       const response = await fetch(
//         `https://api.github.com/search/repositories?q=created:>${tenDaysAgo}&sort=stars&order=desc&page=${page}&per_page=10`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch repositories");
//       }
//       const data = await response.json();
//       setRepos((prevRepos) => [...prevRepos, ...data.items]);
//       setPage((prevPage) => prevPage + 1);
//       setHasMore(data.items.length === 10);
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching repositories");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, loading, hasMore]);

//   const value = {
//     repos,
//     loading,
//     error,
//     hasMore,
//     fetchRepos,
//   };

//   return (
//     <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
//   );
// };

// GithubProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default GithubProvider;


import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { saveToCache, getFromCache, clearCache } from "../utils/cache";

const GithubContext = createContext();

export const useGithubContext = () => {
  const context = useContext(GithubContext);
  if (!context) {
    throw new Error("useGithubContext must be used within a GithubProvider");
  }
  return context;
};

export const GithubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const cachedRepos = getFromCache();
    if (cachedRepos) {
      setRepos(cachedRepos);
      setPage(Math.ceil(cachedRepos.length / 10) + 1);
    }
  }, []);

  const fetchRepos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${tenDaysAgo}&sort=stars&order=desc&page=${page}&per_page=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = await response.json();
      console.log(data)
      const newRepos = [...repos, ...data.items];
      setRepos(newRepos);
      saveToCache(newRepos);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.items.length === 10);
    } catch (err) {
      setError(err.message || "An error occurred while fetching repositories");
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, repos]);

  const refreshRepos = useCallback(() => {
    clearCache();
    setRepos([]);
    setPage(1);
    setHasMore(true);
    fetchRepos();
  }, [fetchRepos]);

  const value = {
    repos,
    loading,
    error,
    hasMore,
    fetchRepos,
    refreshRepos,
  };

  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};

GithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GithubProvider;

