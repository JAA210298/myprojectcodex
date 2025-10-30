// components/Auth/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    usernameOrEmail: '',
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

    if (!isLogin) {
      // Validaciones para registro
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (formData.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      if (!formData.fullName.trim()) {
        alert('El nombre completo es obligatorio');
        return;
      }

      if (!formData.username.trim()) {
        alert('El nombre de usuario es obligatorio');
        return;
      }

      // Verificar si el usuario ya existe
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.find(user => user.username === formData.username || user.email === formData.email);

      if (userExists) {
        alert('El nombre de usuario o email ya está registrado');
        return;
      }

      // Registrar nuevo usuario
      const newUser = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
      setIsLogin(true);
      setFormData({
        fullName: '',
        username: '',
        email: '',
        usernameOrEmail: '',
        password: '',
        confirmPassword: ''
      });
      return;
    }

    // Login
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = existingUsers.find(u => 
      (u.username === formData.usernameOrEmail || u.email === formData.usernameOrEmail) && 
      u.password === formData.password
    );

    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
      alert(`¡Bienvenido de vuelta, ${user.fullName}!`);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-page" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
              <p>{isLogin ? 'Accede a tu cuenta de cliente' : 'Regístrate para acceder a nuestros servicios'}</p>
            </div>

            <div className="auth-toggle">
              <button 
                type="button"
                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Iniciar Sesión
              </button>
              <button 
                type="button"
                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Crear Cuenta
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <>
                  <div className="form-group">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nombre completo con apellidos"
                      value={formData.fullName}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      placeholder="Nombre de usuario"
                      value={formData.username}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              {isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Usuario o correo electrónico"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                    required={isLogin}
                  />
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              )}

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

              {isLogin && (
                <div className="forgot-password-link">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Funcionalidad de recuperación de contraseña próximamente'); }}>¿Has olvidado la contraseña?</a>
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              )}

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="auth-switch">
              <p>
                {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                <button 
                  type="button" 
                  className="switch-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;