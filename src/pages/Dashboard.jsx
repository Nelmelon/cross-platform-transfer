import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { saveText, getTexts } from "../firebase/firestore";
import TextInputModal from "../components/TextInputModal";
import SavedItemsList from "../components/SavedItemsList";
import DashboardHeader from "../components/DashboardHeader";
import ThemeToggle from "../components/ThemeToggle";
import AddItemMenu from "../components/AddItemMenu";

export default function Dashboard() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    // Set up real-time listener
    const unsubscribe = getTexts((updatedTexts) => {
      setTexts(updatedTexts);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Auto-scroll to bottom of saved items list on new texts
  useEffect(() => {
    const el = document.getElementById("saved-list");
    if (el) el.scrollTop = el.scrollHeight;
  }, [texts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    try {
      setIsSaving(true);
      await saveText(text);
      setText("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save text:", error);
      alert(error.message || "Failed to save text. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Your Saved Items
          </h3>
          <SavedItemsList texts={texts} loading={loading} />
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 bg-gray-50 dark:bg-gray-900 px-4 py-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AddItemMenu onTextClick={() => setIsModalOpen(true)} />
            <button
              onClick={handleLogout}
              className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Logout"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H2.25" />
              </svg>
            </button>
          </div>
        </div>

        <TextInputModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          text={text}
          setText={setText}
          onSubmit={handleSubmit}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
