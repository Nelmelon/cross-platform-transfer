import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { currentTheme, setTheme, THEMES } = useTheme();
  const isDark = currentTheme === THEMES.DARK;

  const toggleTheme = () => {
    setTheme(isDark ? THEMES.LIGHT : THEMES.DARK);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        // Sun icon for light mode
        <svg
          className="w-6 h-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.364-5.364l-1.414 1.414M6.343 6.343L4.929 4.929m12.728 12.728l-1.414-1.414M6.343 17.657L4.929 19.071M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
} 