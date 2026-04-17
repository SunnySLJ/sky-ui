'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { AgreementCheck } from '@/components/auth/agreement-check';
import { useAuth } from '@/components/shell/auth-provider';
import { useToast } from '@/components/shell/toast-host';

export function LoginForm() {
  const [tab, setTab] = useState<'password' | 'code'>('password');
  const [agree, setAgree] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [form, setForm] = useState({ username: '', password: '', phone: '', code: '' });
  const timerRef = useRef<number | null>(null);
  const router = useRouter();
  const { showToast } = useToast();
  const { login, user, isReady } = useAuth();

  useEffect(() => {
    if (isReady && user) {
      router.replace('/');
    }
  }, [isReady, router, user]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  function sendCode() {
    if (!form.phone.trim()) {
      showToast('请先输入手机号', 'warning');
      return;
    }
    if (countdown > 0) return;
    showToast('验证码已发送（演示模式）', 'success');
    let next = 60;
    setCountdown(next);
    timerRef.current = window.setInterval(() => {
      next -= 1;
      setCountdown(next);
      if (next <= 0 && timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 1000);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agree) {
      showToast('请先阅读并同意用户协议和隐私政策', 'warning');
      return;
    }
    if (tab === 'password') {
      if (!form.username.trim() || !form.password.trim()) {
        showToast('请输入用户名和密码', 'warning');
        return;
      }
      if (form.password.trim() !== '97541111') {
        showToast('演示环境仅开放指定密码', 'warning');
        return;
      }
      login({ username: form.username.trim(), credits: 50 });
    } else {
      if (!form.phone.trim() || !form.code.trim()) {
        showToast('请输入手机号和验证码', 'warning');
        return;
      }
      login({ username: form.phone.trim(), credits: 50 });
    }
    showToast('登录成功', 'success');
    router.push('/');
  }

  if (!isReady) {
    return null;
  }

  return (
    <form onSubmit={submit}>
      <div className="auth-tabs">
        <button type="button" className={`auth-tab ${tab === 'password' ? 'active' : ''}`} onClick={() => setTab('password')}>密码登录</button>
        <button type="button" className={`auth-tab ${tab === 'code' ? 'active' : ''}`} onClick={() => setTab('code')}>验证码登录</button>
      </div>
      <div className="auth-helper-card">
        <strong>演示环境</strong>
        <span>密码登录请使用任意用户名 + 指定密码 `97541111`。</span>
      </div>
      {tab === 'password' ? (
        <>
          <div className="auth-input-group"><input className="auth-input" autoComplete="username" placeholder="请输入用户名" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} /></div>
          <div className="auth-input-group"><input className="auth-input" type="password" autoComplete="current-password" placeholder="请输入密码" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></div>
        </>
      ) : (
        <>
          <div className="auth-input-group"><input className="auth-input" type="tel" autoComplete="tel" placeholder="请输入手机号" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></div>
          <div className="auth-input-group auth-inline-group">
            <input className="auth-input" placeholder="请输入验证码" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
            <button type="button" className="auth-code-btn" onClick={sendCode} disabled={countdown > 0}>{countdown > 0 ? `${countdown}s` : '获取验证码'}</button>
          </div>
        </>
      )}
      <div className="auth-inline-meta">
        <span>支持 mock 登录流程与点数初始化</span>
        <button type="button" className="auth-text-btn" onClick={() => showToast('忘记密码流程暂未接入，当前为演示环境', 'default')}>
          忘记密码
        </button>
      </div>
      <AgreementCheck checked={agree} onChange={setAgree} />
      <button type="submit" className="auth-submit">立即登录</button>
      <div className="auth-switch">还没有账户，<Link href="/register">去注册 &gt;</Link></div>
    </form>
  );
}
