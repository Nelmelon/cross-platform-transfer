export default function TextInputModal({ isOpen, onClose, text, setText, onSubmit, isSaving }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 theme-transition">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary">Add New Text</h3>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="textInput"
              className="block mb-2 font-medium text-primary"
            >
              Paste text or a link here:
            </label>
            <textarea
              id="textInput"
              placeholder="Enter text or URL..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              disabled={isSaving}
              className="input-field resize-none disabled:opacity-50"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={text.trim() === "" || isSaving}
              className={`${text.trim() === "" || isSaving ? "btn bg-blue-300 dark:bg-blue-400 cursor-not-allowed" : "btn-primary"} theme-transition relative`}
            >
              {isSaving ? (
                <>
                  <span className="opacity-0">Save</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 