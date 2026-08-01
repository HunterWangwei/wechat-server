import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [footerHTML, setFooterHTML] = useState('');
  useEffect(() => setFooterHTML(localStorage.getItem('footer_html') || ''), []);
  return (
    <footer className="app-footer">
      {footerHTML ? <div dangerouslySetInnerHTML={{ __html: footerHTML }} /> : <>
        <span>© {new Date().getFullYear()} WeChat Server</span>
        <span>由 <a href="https://github.com/HunterWangwei" target="_blank" rel="noreferrer">HunterWangwei</a> 维护 · <a href="https://opensource.org/licenses/mit-license.php">MIT License</a></span>
      </>}
    </footer>
  );
};
export default Footer;
