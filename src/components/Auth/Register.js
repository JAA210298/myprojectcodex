import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Simulación de registro
    if (formData.name && formData.email && formData.password) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
      alert('¡Cuenta creada exitosamente! Bienvenido.');
    }
  };

  return (
    <div className="auth-page" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Crear Cuenta</h2>
              <p>Regístrate para acceder a nuestros servicios</p>
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary auth-submit">
                Crear Cuenta
              </button>
            </form>
            <div className="auth-footer">
              <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;