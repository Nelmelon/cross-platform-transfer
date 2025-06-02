import { isURL } from '../utils/helpers';
import { useState } from 'react';

export default function SavedItemsList({ texts, loading }) {
  const [copiedId, setCopiedId] = useState(null);

  // Sort texts by createdAt in descending order (newest first)
  const sortedTexts = [...texts].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return b.createdAt.seconds - a.createdAt.seconds;
  });

  const handleItemClick = async (content, id) => {
    if (isURL(content)) {
      window.open(content, '_blank');
    } else {
      try {
        await navigator.clipboard.writeText(content);
        setCopiedId(id);
        // Reset the copied indicator after 2 seconds
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  if (loading) {
    return <p className="text-secondary">Loading saved items...</p>;
  }

  if (texts.length === 0) {
    return <p className="text-secondary">No saved text or links yet.</p>;
  }

  return (
    <div className="h-[80vh] min-h-[400px] max-h-[90vh] w-full overflow-hidden">
      <div className="max-w-md mx-auto h-full p-4">
        {sortedTexts.map(({ id, content, createdAt }) => (
          <div
            key={id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-4"
          >
            <div 
              className="p-4 cursor-pointer relative group"
              onClick={() => handleItemClick(content, id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(content, id);
                }
              }}
            >
              {isURL(content) ? (
                <div className="text-primary flex items-center">
                  <span className="truncate">{content}</span>
                  <svg className="w-4 h-4 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              ) : (
                <div className="text-primary flex items-center">
                  <span className="truncate">{content}</span>
                  {copiedId === id ? (
                    <svg className="w-4 h-4 ml-2 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </div>
              )}
              {createdAt && (
                <small className="text-gray-400 dark:text-gray-500 text-xs block mt-2 theme-transition">
                  Saved on: {new Date(createdAt.seconds * 1000).toLocaleString()}
                </small>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 