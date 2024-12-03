import { useEffect, useRef, useCallback } from "react";
import { useGithubContext } from "../context/GithubContext";
import LoadingSpinner from "./LoadingSpinner";
import RepoItem from "./RepoItem";

function RepoListContainer() {
  const { repos, loading, error, hasMore, fetchRepos, refreshRepos } =
    useGithubContext();
  const observer = useRef();

  const lastRepoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchRepos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchRepos]
  );

  useEffect(() => {
    if (repos.length === 0) {
      fetchRepos();
    }
  }, [repos.length, fetchRepos]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="space-y-4 lg:space-y-6 px-2 sm:px-8 lg:px-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#46e0e5] dark:text-[#167c88]">
          GitHub Repositories
        </h2>
        <button
          onClick={refreshRepos}
          className="bg-indigo-500 hover:bg-indigo-700 dark:bg-[#2c276e] text-white dark:text-white/70 font-bold py-2 px-4 rounded"
        >
          Refresh
        </button>
      </div>
      {repos.map((repo, index) => (
        <div
          key={repo.id}
          ref={index === repos.length - 1 ? lastRepoElementRef : null}
        >
          <RepoItem repo={repo} />
        </div>
      ))}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <LoadingSpinner />
        </div>
      )}
      {!loading && !hasMore && (
        <p className="text-center text-gray-500">
          No more repositories to load
        </p>
      )}
    </div>
  );
}

export default RepoListContainer;
