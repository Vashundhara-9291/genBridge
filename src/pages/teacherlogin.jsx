import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeacherLogin.css';

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
    school: '',
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
      if (formData.employeeId && formData.password && formData.school) {
        navigate('/teacher');
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
    <div className="teacher-login-container">
      <div className="teacher-login-card">
        <div className="teacher-header">
          <div className="teacher-avatar">👩‍🏫</div>
          <h1>Teacher Portal</h1>
          <p>Empowering educators to inspire and guide students</p>
        </div>

        <form onSubmit={handleSubmit} className="teacher-login-form">
          <div className="input-group">
            <label htmlFor="employeeId">
              <span className="input-icon">🆔</span>
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              placeholder="Enter your employee ID"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="school">
              <span className="input-icon">🏫</span>
              School/Institution
            </label>
            <select
              id="school"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your school</option>
              <option value="greenwood-elementary">Greenwood Elementary</option>
              <option value="riverside-middle">Riverside Middle School</option>
              <option value="oakhill-high">Oak Hill High School</option>
              <option value="sunshine-academy">Sunshine Academy</option>
              <option value="other">Other Institution</option>
            </select>
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
              Keep me signed in
            </label>
            <a href="#" className="forgot-password">Reset Password?</a>
          </div>

          <button 
            type="submit" 
            className="teacher-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-text">Authenticating...</span>
            ) : (
              'Access Teacher Dashboard'
            )}
          </button>
        </form>

        <div className="teacher-login-footer">
          <button onClick={goBack} className="back-btn">
            ← Back to Role Selection
          </button>
          <div className="support-links">
            <a href="#">Technical Support</a>
            <span>•</span>
            <a href="#">Training Resources</a>
          </div>
        </div>
      </div>

      <div className="teacher-tools">
        <h3>Teacher Dashboard Tools</h3>
        <div className="tools-grid">
          <div className="tool-item">
            <span className="tool-icon">📝</span>
            <span>Create Assignments</span>
          </div>
          <div className="tool-item">
            <span className="tool-icon">📊</span>
            <span>Grade Management</span>
          </div>
          <div className="tool-item">
            <span className="tool-icon">👥</span>
            <span>Class Management</span>
          </div>
          <div className="tool-item">
            <span className="tool-icon">📚</span>
            <span>Curriculum Planning</span>
          </div>
          <div className="tool-item">
            <span className="tool-icon">💬</span>
            <span>Parent Communication</span>
          </div>
          <div className="tool-item">
            <span className="tool-icon">📈</span>
            <span>Progress Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;