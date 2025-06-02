export default function ThemedContainer({ children }) {
  return (
    <div className="min-h-screen w-full fixed inset-0 bg-gray-50 dark:bg-gray-900 [transition:background-color_0.3s_ease] dark:[transition:background-color_0.3s_ease]">
      <div className="relative [transition:all_0.3s_ease] dark:[transition:all_0.3s_ease]">
        {children}
      </div>
    </div>
  );
} 