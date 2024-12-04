import RepoListContainer from "./components/RepoListContainer";
import { GithubProvider } from "./context/GithubContext";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTopArrow from "./components/ScrollToTopArrow";


function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={` ${darkMode ? "bg-[#22272f]" : "bg-[#1f1b4b]"}`}>
      <div
        className={`min-h-screen max-w-[900px] mx-auto ${
          darkMode ? "dark" : ""
        }`}
      >
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-800 dark:to-gray-950 min-h-screen">
          <header className=" bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-30 py-6 shadow-xl">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <h1 className="sm:text-lg lg:text-3xl font-bold text-center text-white/85 dark:text-gray-500">
                Most Starred GitHub Repos
              </h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <ErrorBoundary>
              <RepoListContainer />
            </ErrorBoundary>
          </main>
          <ScrollToTopArrow />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      
        <GithubProvider>
          <AppContent />
        </GithubProvider>
    
    </ErrorBoundary>
  );
}

export default App;
