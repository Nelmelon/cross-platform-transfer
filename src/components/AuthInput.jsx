export default function AuthInput({ id, type, value, onChange, label, placeholder }) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-primary mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="input-field"
        placeholder={placeholder}
        required
      />
    </div>
  );
} 