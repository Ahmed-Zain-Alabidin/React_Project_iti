import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError("");

    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { level: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: score, label: "Weak", color: "var(--color-error)" };
    if (score <= 3) return { level: score, label: "Fair", color: "var(--color-warning)" };
    return { level: score, label: "Strong", color: "var(--color-success)" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="auth-page">
      {/* Decorative background elements */}
      <div className="auth-bg-orb auth-bg-orb-1" />
      <div className="auth-bg-orb auth-bg-orb-2" />
      <div className="auth-bg-orb auth-bg-orb-3" />

      <div className="auth-container" style={{ animationDelay: "0.1s" }}>
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">◆</span>
          </div>
          <h1 className="auth-title" id="register-title">Create Account</h1>
          <p className="auth-subtitle">Join Amazain and start shopping today</p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="auth-error-banner" id="register-error">
            <span className="error-icon">⚠</span>
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form" id="register-form" noValidate>
          {/* Name */}
          <div className={`form-group ${errors.name ? "has-error" : ""}`}>
            <label htmlFor="register-name" className="form-label">
              Full Name
            </label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="register-name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                autoFocus
              />
            </div>
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className={`form-group ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="register-email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                type="email"
                id="register-email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`form-group ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="register-password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                id="register-toggle-password"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}

            {/* Password Strength Meter */}
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`strength-bar ${i <= passwordStrength.level ? "active" : ""}`}
                      style={{
                        backgroundColor:
                          i <= passwordStrength.level ? passwordStrength.color : undefined,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="strength-label"
                  style={{ color: passwordStrength.color }}
                >
                  {passwordStrength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={`form-group ${errors.confirmPassword ? "has-error" : ""}`}>
            <label htmlFor="register-confirm-password" className="form-label">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="register-confirm-password"
                name="confirmPassword"
                className="form-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                id="register-toggle-confirm-password"
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
            id="register-submit-btn"
          >
            {isLoading ? (
              <span className="btn-loader">
                <span className="spinner" />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link" id="register-login-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
