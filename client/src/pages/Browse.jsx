import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Browse.css';

const FEATURED = {
  title: 'Stranger Things',
  desc: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
  bg: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80',
};

const ROWS = [
  {
    title: 'Popular on SupX',
    items: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
      'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    ],
  },
  {
    title: 'Trending Now',
    items: [
      'https://images.unsplash.com/photo-1440404653325-ac127cdfbdd3?w=400',
      'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    ],
  },
  {
    title: 'Top 10 in Your Country Today',
    items: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
      'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400',
      'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    ],
  },
  {
    title: 'Action & Adventure',
    items: [
      'https://images.unsplash.com/photo-1440404653325-ac127cdfbdd3?w=400',
      'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    ],
  },
  {
    title: 'Comedies',
    items: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
      'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400',
      'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    ],
  },
  {
    title: 'Horror Movies',
    items: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
      'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    ],
  },
];

export default function Browse() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem('supx_user') || '{}');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('supx_user');
    window.location.href = '/';
  };

  return (
    <div className="browse">
      <header className={`browse-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-left">
          <Link to="/browse" className="logo">
            <span className="logo-text">SupX</span>
          </Link>
          <nav className="main-nav">
            <Link to="/browse" className="nav-link active">Home</Link>
            <Link to="/browse" className="nav-link">TV Shows</Link>
            <Link to="/browse" className="nav-link">Movies</Link>
            <Link to="/browse" className="nav-link">New & Popular</Link>
            <Link to="/browse" className="nav-link">My List</Link>
          </nav>
        </div>
        <div className="header-right">
          <button className="search-btn" aria-label="Search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18ZM10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z" fill="currentColor"/>
              <path d="M15.7071 15.7071L22.7071 22.7071" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="profile-menu">
            <div className="profile-icon">
              <span>{user.email?.[0]?.toUpperCase() || 'U'}</span>
            </div>
            <div className="profile-dropdown">
              <div className="profile-dropdown-item">{user.email}</div>
              <div className="profile-dropdown-item" onClick={handleSignOut}>
                Sign out of {user.email || 'account'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${FEATURED.bg})` }} />
          <div className="hero-gradient" />
          <div className="hero-content">
            <h1 className="hero-title">{FEATURED.title}</h1>
            <div className="hero-buttons">
              <button className="btn-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play
              </button>
              <button className="btn-info">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                More Info
              </button>
            </div>
            <p className="hero-description">{FEATURED.desc}</p>
          </div>
        </section>

        <section className="content">
          {ROWS.map((row, i) => (
            <div key={i} className="row">
              <h2 className="row-title">{row.title}</h2>
              <div className="row-scroll">
                {row.items.map((src, j) => (
                  <div key={j} className="card">
                    <div className="card-image-wrapper">
                      <img src={src} alt="" />
                      <div className="card-hover">
                        <button className="card-play-btn">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
