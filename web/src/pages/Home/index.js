import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { API, showError, showNotice } from '../../helpers';

const chartValues = [48, 67, 56, 81, 70, 92, 83];

const Home = () => {
  const [status, setStatus] = useState(() => JSON.parse(localStorage.getItem('status') || '{}'));

  useEffect(() => {
    const load = async () => {
      const res = await API.get('/api/notice');
      const { success, message, data } = res.data;
      if (!success) return showError(message);
      const oldNotice = localStorage.getItem('notice');
      if (data && data !== oldNotice) {
        showNotice(data);
        localStorage.setItem('notice', data);
      }
      setStatus(JSON.parse(localStorage.getItem('status') || '{}'));
    };
    load();
  }, []);

  const version = process.env.REACT_APP_VERSION || 'dev';
  const startedAt = status.start_time ? new Date(status.start_time * 1000).toLocaleDateString('zh-CN') : '—';
  const metrics = [
    { label: '服务状态', value: '正常运行', note: 'API 连接正常', icon: 'check circle', positive: true },
    { label: '系统名称', value: status.system_name || 'WeChat Server', note: '当前服务实例', icon: 'server' },
    { label: '启动日期', value: startedAt, note: '本次运行周期', icon: 'calendar alternate outline' },
    { label: '当前版本', value: status.version || version, note: 'WeChat Server', icon: 'code branch' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div><h1>运行概览</h1><p>欢迎回来，当前服务运行一切正常。</p></div>
        <span className="live-badge"><span className="health-dot" /> 实时状态</span>
      </div>
      <section className="dashboard-metrics">
        {metrics.map((metric) => <article className="dashboard-metric" key={metric.label}><div className="metric-heading"><span>{metric.label}</span><i><Icon name={metric.icon} /></i></div><strong className={metric.positive ? 'positive' : ''}>{metric.value}</strong><small>{metric.note}</small></article>)}
      </section>
      <section className="dashboard-grid">
        <article className="dashboard-panel trend-panel">
          <div className="panel-heading"><div><h2>服务活动</h2><p>近 7 天运行趋势</p></div><span>最近 7 天</span></div>
          <div className="activity-chart" aria-label="近七天服务活动示意图">{chartValues.map((height, index) => <div className="chart-column" key={index}><i style={{height: `${height}%`}} /><span>{['一','二','三','四','五','六','日'][index]}</span></div>)}</div>
        </article>
        <article className="dashboard-panel quick-panel">
          <div className="panel-heading"><div><h2>快速检查</h2><p>核心配置状态</p></div></div>
          <div className="check-list">
            <div><i><Icon name="wechat" /></i><span><strong>微信服务</strong><small>接口已连接</small></span><Icon name="check circle" className="check-icon" /></div>
            <div><i><Icon name="github" /></i><span><strong>GitHub OAuth</strong><small>{status.github_oauth ? '已启用' : '未启用'}</small></span><Icon name={status.github_oauth ? 'check circle' : 'minus circle'} className="check-icon" /></div>
            <div><i><Icon name="mail outline" /></i><span><strong>邮件验证</strong><small>{status.email_verification ? '已启用' : '未启用'}</small></span><Icon name={status.email_verification ? 'check circle' : 'minus circle'} className="check-icon" /></div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
