import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ParentLogin.css';

const ParentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (formData.email && formData.password) {
        navigate('/parent');
      } else {
        alert('Please fill in all required fields!');
      }
      setIsLoading(false);
    }, 1500);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="parent-login-container">
      <div className="parent-login-card">
        <div className="parent-header">
          <div className="parent-avatar">👨‍👩‍👧‍👦</div>
          <h1>Parent Portal</h1>
          <p>Monitor and support your child's educational journey</p>
        </div>

        <form onSubmit={handleSubmit} className="parent-login-form">
          <div className="input-group">
            <label htmlFor="email">
              <span className="input-icon">📧</span>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <span className="input-icon">🔐</span>
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="parent-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-text">Signing In...</span>
            ) : (
              'Sign In to Parent Dashboard'
            )}
          </button>
        </form>

        <div className="parent-login-footer">
          <button onClick={goBack} className="back-btn">
            ← Back to Role Selection
          </button>
          <div className="signup-prompt">
            <p>Don't have an account? <a href="#">Create Parent Account</a></p>
          </div>
        </div>
      </div>

      <div className="parent-features">
        <h3>Parent Dashboard Features</h3>
        <ul>
          <li>📊 Track your child's progress</li>
          <li>📅 View learning schedules</li>
          <li>💬 Communicate with teachers</li>
          <li>📈 Access detailed reports</li>
          <li>🎯 Set learning goals</li>
        </ul>
      </div>
    </div>
  );
};

export default ParentLogin;