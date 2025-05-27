import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";

export default function AuthForm({
  title,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  submitText,
  loading,
  altLink,
  altText
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 theme-transition">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <AuthInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
          />
          <AuthInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full ${loading ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {loading ? "Processing..." : submitText}
          </button>
          <p className="text-center text-sm text-secondary">
            {altText}{" "}
            <Link to={altLink} className="link">
              {title === "Login" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 