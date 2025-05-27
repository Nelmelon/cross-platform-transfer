import { isURL } from '../utils/helpers';
import { useState } from 'react';

export default function SavedItemsList({ texts, loading }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleClick = async (content, id) => {
    if (isURL(content)) {
      window.open(content, '_blank', 'noopener,noreferrer');
    } else {
      try {
        await navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
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
    <ul
      id="saved-list"
      className="space-y-4 h-[calc(100vh-16rem)] overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-4 pb-24 theme-transition bg-white dark:bg-gray-800 shadow-sm"
    >
      {texts.map(({ id, content, createdAt }) => (
        <li
          key={id}
          onClick={() => handleClick(content, id)}
          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md break-words shadow-sm hover:shadow-md theme-transition cursor-pointer relative group"
        >
          {isURL(content) ? (
            <div className="text-primary whitespace-pre-wrap">
              {content}
            </div>
          ) : (
            <p className="text-primary whitespace-pre-wrap">{content}</p>
          )}
          {createdAt && (
            <small className="text-gray-400 dark:text-gray-500 text-xs block mt-2 theme-transition">
              Saved on:{" "}
              {new Date(createdAt.seconds * 1000).toLocaleString()}
            </small>
          )}
          {copiedId === id && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm shadow-lg transform transition-all duration-300 ease-in-out animate-fade-in-out">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </div>
            </div>
          )}
          <div className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${copiedId === id ? 'hidden' : ''}`}>
            {isURL(content) ? (
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
} 