export default function () {
  return (
    <footer style={{
      background: 'var(--seperator)',
      padding: '2rem',
      marginTop: '2rem',
      textAlign: 'center'
    }}>
      <div className="flexbox" style={{gap:'20px',flexWrap:'wrap',margin:'10px 0'}}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{
          color: 'var(--font)',
          textDecoration: 'none'
        }}>Twitter</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
          color: 'var(--font)', 
          textDecoration: 'none'
        }}>LinkedIn</a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
          color: 'var(--font)',
          textDecoration: 'none'
        }}>GitHub</a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" style={{
          color: 'var(--font)',
          textDecoration: 'none'
        }}>Discord</a>
      </div>
      <p>© 2024 Crowdfunding Platform. All rights reserved.</p>
      <p style={{marginTop: '0.5rem'}}>Empowering dreams through decentralized fundraising</p>
    </footer>
  );
}

