import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { UserContext } from '../context/User';
import { API, isAdmin, showSuccess } from '../helpers';

const navItems = [
  { name: '运行概览', to: '/', icon: 'grid layout' },
  { name: '用户管理', to: '/user', icon: 'users', admin: true },
  { name: '系统设置', to: '/setting', icon: 'setting' },
];

const Header = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const savedUser = localStorage.getItem('user');
  const currentUser = userState.user || (savedUser ? JSON.parse(savedUser) : null);
  const authPage = ['/login', '/register', '/reset', '/oauth/github'].some((path) => location.pathname.startsWith(path));

  if (authPage) return null;

  const logout = async () => {
    await API.get('/api/user/logout');
    userDispatch({ type: 'logout' });
    localStorage.removeItem('user');
    showSuccess('已安全退出');
    navigate('/login');
  };

  return (
    <>
      <header className="console-topbar">
        <Link to="/" className="console-brand">
          <span className="console-logo"><Icon name="wechat" /></span>
          <span><strong>WeChat Server</strong><small>管理控制台</small></span>
        </Link>
        <button className="console-menu-toggle" onClick={() => setOpen(!open)} aria-label="切换菜单"><Icon name={open ? 'close' : 'bars'} /></button>
        <div className="console-account">
          <button className="console-bell" aria-label="通知"><Icon name="bell outline" /></button>
          {currentUser ? (
            <>
              <span className="console-avatar">{(currentUser.display_name || currentUser.username || 'A').slice(0, 1).toUpperCase()}</span>
              <span className="console-user-name">{currentUser.display_name || currentUser.username}</span>
              <button className="console-logout" onClick={logout}>退出</button>
            </>
          ) : <Link className="console-login" to="/login">登录</Link>}
        </div>
      </header>

      <aside className={open ? 'console-sidebar open' : 'console-sidebar'}>
        <span className="console-nav-label">工作台</span>
        <nav>
          {navItems.map((item) => {
            if (item.admin && !isAdmin()) return null;
            return <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}><Icon name={item.icon} /><span>{item.name}</span></NavLink>;
          })}
        </nav>
        <div className="console-health"><div><span className="health-dot" /><strong>服务正常</strong></div><small>连接状态实时检测</small></div>
      </aside>
      {open && <button className="sidebar-backdrop" onClick={() => setOpen(false)} aria-label="关闭菜单" />}
    </>
  );
};

export default Header;
