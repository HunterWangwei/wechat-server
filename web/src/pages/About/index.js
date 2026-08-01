import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: 'comments outline', title: '消息服务', text: '连接微信公众号，集中处理消息与自动回复。', tone: 'green' },
  { icon: 'users', title: '用户管理', text: '清晰管理成员、角色、状态与访问权限。', tone: 'blue' },
  { icon: 'shield alternate', title: '安全配置', text: '统一维护令牌、OAuth、邮件与服务地址。', tone: 'violet' },
];

const About = () => (
  <div className="landing-page">
    <section className="hero-panel">
      <div className="hero-copy">
        <span className="eyebrow"><span className="status-dot" /> 服务运行中</span>
        <h1>让微信服务管理<br /><span>简单、清晰、可靠。</span></h1>
        <p>一个轻量而完整的微信公众号服务端。把用户、消息和系统配置放进同一个现代化工作台。</p>
        <div className="hero-actions">
          <Link to="/login" className="primary-link large">进入控制台 <Icon name="arrow right" /></Link>
          <a className="secondary-link" href="https://github.com/HunterWangwei/wechat-server" target="_blank" rel="noreferrer"><Icon name="github" /> 查看源代码</a>
        </div>
        <div className="hero-meta"><span><Icon name="check circle" /> 开源免费</span><span><Icon name="check circle" /> 私有部署</span><span><Icon name="check circle" /> MIT License</span></div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="glow" />
        <div className="preview-window">
          <div className="preview-top"><i /><i /><i /><span>服务概览</span></div>
          <div className="preview-body">
            <div className="preview-sidebar"><b>W</b><i /><i /><i /></div>
            <div className="preview-content">
              <div className="welcome-line"><div><small>早上好</small><strong>运行概览</strong></div><span className="mini-avatar">A</span></div>
              <div className="metric-grid"><div><small>服务状态</small><strong className="online">正常</strong></div><div><small>配置项</small><strong>12</strong></div></div>
              <div className="chart-card"><span>近 7 天消息</span><div className="bars">{[42,68,51,82,61,92,74].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="feature-section">
      <div className="section-heading"><span className="eyebrow">核心能力</span><h2>日常管理，一处完成</h2><p>保留成熟功能，用更直观的方式呈现。</p></div>
      <div className="feature-grid">{features.map(item => <article className="feature-card" key={item.title}><span className={`feature-icon ${item.tone}`}><Icon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p><span className="learn-more">了解更多 <Icon name="arrow right" /></span></article>)}</div>
    </section>
  </div>
);

export default About;
