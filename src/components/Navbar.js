import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/index.module.css';

export default function Navbar() {

  // THEME State: Default is Light Theme
  const [ theme, setTheme ] = useState({
    theme: 'light',
    icon: '<i class="bi bi-brightness-high-fill"></i>'
  });

  useEffect(() => {

    // Finding the theme in localstorage and setting it
    const localTheme = localStorage.getItem('theme');
    if (localTheme && ['light', 'dark'].includes(localTheme)) {
      const localIcon =
        localTheme === 'light'
          ? '<i class="bi bi-brightness-high-fill"></i>'
          : '<i class="bi bi-moon-stars-fill"></i>';
      setTheme({
        theme: localTheme,
        icon: localIcon,
      });
      document.body.dataset.bsTheme = localTheme;
    }
  }, []);
  
  // Setting the Toggle Theme Function

  const toggleTheme = () => {

    // Checking if last theme was light or dark and setting the theme accordingly
    if (theme.theme === 'light') {
      setTheme({
        theme: 'dark',
        icon: '<i class="bi bi-moon-stars-fill"></i>'
      });
      localStorage.setItem('theme', 'dark');
      document.body.dataset.bsTheme = 'dark';
    } else {
      setTheme({
        theme: 'light',
        icon: '<i class="bi bi-brightness-high-fill"></i>'
      })
      localStorage.setItem('theme', 'light');
      document.body.dataset.bsTheme = 'light';
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">

            <Link className={`${styles.navbarBrand} navbar-brand fs-4 fw-bolder mb-0 h1`} href="#">Short URL</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className={`navbar-nav ms-auto ${styles.navbarNav}`}>
                <li className={`nav-item ${styles.navItem} ${styles.themeNavItem}`}>
                    <button className={`btn ${styles.Btn}`} onClick={toggleTheme} dangerouslySetInnerHTML={{ __html: theme.icon }}></button>
                </li> 
                <li className={`nav-item ${styles.navItem}`}>
                    <Link className="nav-link fw-bold fs-5" href="#">Home</Link>
                </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}