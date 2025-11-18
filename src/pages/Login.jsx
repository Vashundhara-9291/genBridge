import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // setSelectedRole(role);
      navigate(`/${role}`);
  };

  const handleLogin = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}`);
    } else {
      alert('Please select a role to continue');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to GenBridge</h1>
        <h2>Select your role to continue</h2>
        
        <div className="role-selection">
          <div 
            className={`role-option ${selectedRole === 'ChildLogin' ? 'selected' : ''}`}
            onClick={() => handleRoleSelect('childLogin')}
          >
            <div className="role-icon">👶</div>
            <div className="role-name">Child</div>
          </div>
          
          <div 
            className={`role-option ${selectedRole === 'parent' ? 'selected' : ''}`}
            onClick={() => handleRoleSelect('parentLogin')}
          >
            <div className="role-icon">👨‍👩‍👧‍👦</div>
            <div className="role-name">Parent</div>
          </div>
          
          <div 
            className={`role-option ${selectedRole === 'teacher' ? 'selected' : ''}`}
            onClick={() => handleRoleSelect('teacherLogin')}
          >
            <div className="role-icon">👩‍🏫</div>
            <div className="role-name">Teacher</div>
          </div>
        </div>
        
        {/* <button 
          className="login-button"
          onClick={handleLogin}
          disabled={!selectedRole}
        >
          Login
        </button> */}
      </div>
    </div>
  );
};

export default Login;