# GitHub Trending Stars Repositories

A React application that displays the most starred GitHub repositories created in the last 10 days.

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1733248951/LP_nkxvta.png" alt="large-screen-view" /> <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1733248951/LPT_frlyqn.png" alt="Tablet-View" /> <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1733248951/LPM_eg5ekd.png" alt="Mobile-View" />

## Features

- Fetches and displays trending GitHub repositories
- Infinite scrolling for seamless browsing
- Responsive design for mobile and desktop
- Dark mode support
- Client-side caching to reduce API calls
- Smooth animations and transitions

## Technologies Used

- React.js
- Tailwind CSS
- Framer Motion
- Lucide React (for icons)
- GitHub API

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-trending-repos.git
   cd github-trending-repos
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

The application loads the most starred repositories automatically. Scroll down to load more repositories. Use the theme toggle in the header to switch between light and dark modes.

<img src="" alt="" />

## Project Structure

`src/App.jsx`: Main application component
`src/components/RepoListContainer.jsx`: Manages repository list and infinite scrolling
`src/components/RepoItem.jsx`: Individual repository item component
`src/components/LoadingSpinner.jsx`: Loading indicator
`src/components/ScrollToTopArrow.jsx`: Scroll-to-top functionality
`src/components/ThemeToggle.jsx`: Dark mode toggle
`src/context/GithubContext.jsx`: Manages GitHub API requests and data
`src/context/ThemeContext.jsx`: Manages theme state
`src/utils/cache.js`: Caching utility functions

## Contributing

This project is currently not opened to contributions. It will be updated when it's ready for further contributions.
