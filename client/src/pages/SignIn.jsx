import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

const API = '/api/auth';

export default function SignIn() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const endpoint = isSignUp ? `${API}/signup` : `${API}/signin`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        setError('Server returned invalid response. Is the backend running?');
        setLoading(false);
        return;
      }
      
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }
      
      if (isSignUp) {
        // Sign up: just store in DB (already done), show success, switch to sign in
        setSuccess('Account created! Sign in with your email and password.');
        setError('');
        setIsSignUp(false);
        setPassword('');
        setEmail('');
        setLoading(false);
      } else if (data.user && data.success !== false) {
        // Sign in: store in localStorage and redirect to landing page
        localStorage.setItem('supx_user', JSON.stringify(data.user));
        window.location.href = '/browse';
      } else {
        setError('Invalid response from server');
        setLoading(false);
      }
    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-bg" />
      <header className="signin-header">
        <Link to="/" className="logo">SupX Movies</Link>
      </header>

      <div className="signin-card">
        <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        {error && <div className="signin-error">{error}</div>}
        {success && <div className="signin-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="signin-toggle">
          {isSignUp ? 'Already have an account?' : 'New to SupX Movies?'}{' '}
          <button type="button" className="link-btn" onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }}>
            {isSignUp ? 'Sign in' : 'Sign up now'}
          </button>
        </p>
      </div>

      <footer className="signin-footer">
        <p>&copy; {new Date().getFullYear()} SupX Movies</p>
      </footer>
    </div>
  );
}
