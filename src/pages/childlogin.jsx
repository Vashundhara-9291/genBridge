import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChildLogin.css';

const ChildLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (formData.username && formData.password) {
        navigate('/child');
      } else {
        alert('Please fill in all fields!');
      }
      setIsLoading(false);
    }, 1000);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="child-login-container">
      <div className="child-login-card">
        <div className="child-header">
          <div className="child-avatar">🧒</div>
          <h1>Welcome Back, Little Explorer!</h1>
          <p>Enter your details to continue your learning adventure</p>
        </div>

        <form onSubmit={handleSubmit} className="child-login-form">
          <div className="input-group">
            <label htmlFor="username">
              <span className="input-icon">👤</span>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <span className="input-icon">🔒</span>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="child-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">🌟</span>
            ) : (
              'Start Learning! 🚀'
            )}
          </button>
        </form>

        <div className="child-login-footer">
          <button onClick={goBack} className="back-btn">
            ← Back to Role Selection
          </button>
          <p className="help-text">
            Need help? Ask your parent or teacher! 👨‍👩‍👧‍👦
          </p>
        </div>
      </div>
      
      <div className="floating-elements">
        <div className="floating-star">⭐</div>
        <div className="floating-heart">💖</div>
        <div className="floating-rocket">🚀</div>
        <div className="floating-book">📚</div>
      </div>
    </div>
  );
};

export default ChildLogin;