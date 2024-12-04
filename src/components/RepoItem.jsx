import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Star, GitFork, Eye, ExternalLink } from "lucide-react";

function RepoItem({ repo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.02,
          transition: { duration: 0.3 },
        },
      }}
      className="bg-white dark:bg-[#333b47] px-2 sm:px-4 py-2 sm:py-4 h-[10rem] sm:h-[12rem] rounded-lg shadow-md overflow-hidden transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <motion.div
        variants={{
          hover: {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
          },
        }}
        className="flex flex-col justify-between gap-2 px-2 lg:px-4 lg:py-2 h-full rounded-md"
      >
        <div className="flex justify-between items-start">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800 dark:text-gray-300 truncate pr-2">
            {repo.name}
          </h2>
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400"
            whileHover={{ scale: 1.1 }}
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base line-clamp-2 ">
          {repo.description || "No Description for this Repository"}
        </p>

        <div className="flex justify-between items-end">
          <div className="flex items-center">
            <img
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}'s avatar`}
              className="w-12 h-12 rounded-full mr-2 border-2 border-purple-500"
            />
            <p className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
              {repo.owner.login}
            </p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.div
              className="flex items-center text-yellow-500"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm font-bold">
                {repo.stargazers_count.toLocaleString()}
              </span>
            </motion.div>
            <motion.div
              className="flex items-center text-blue-500"
              whileHover={{ scale: 1.1 }}
            >
              <GitFork className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm font-bold">
                {repo.forks_count.toLocaleString()}
              </span>
            </motion.div>
            <motion.div
              className="flex items-center text-green-500"
              whileHover={{ scale: 1.1 }}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm font-bold">
                {repo.watchers_count.toLocaleString()}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

RepoItem.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    stargazers_count: PropTypes.number.isRequired,
    forks_count: PropTypes.number.isRequired,
    watchers_count: PropTypes.number.isRequired,
    html_url: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RepoItem;

