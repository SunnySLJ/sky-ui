'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { AgreementCheck } from '@/components/auth/agreement-check';
import { useAuth } from '@/components/shell/auth-provider';
import { useToast } from '@/components/shell/toast-host';

export function RegisterForm() {
  const [tab, setTab] = useState<'code' | 'invite'>('code');
  const [agree, setAgree] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', code: '', invite: '' });
  const router = useRouter();
  const { showToast } = useToast();
  const { register, user, isReady } = useAuth();

  useEffect(() => {
    if (isReady && user) {
      router.replace('/');
    }
  }, [isReady, router, user]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agree) {
      showToast('请先阅读并同意用户协议和隐私政策', 'warning');
      return;
    }
    const inviteValue = tab === 'code' ? form.code : form.invite;
    if (!form.username.trim() || !form.password.trim() || !inviteValue.trim()) {
      showToast('请填写完整信息', 'warning');
      return;
    }
    register({ username: form.username.trim() });
    showToast('注册成功，已为你初始化 50 点数', 'success');
    router.push('/');
  }

  if (!isReady) {
    return null;
  }

  return (
    <form onSubmit={submit}>
      <div className="auth-tabs">
        <button type="button" className={`auth-tab ${tab === 'code' ? 'active' : ''}`} onClick={() => setTab('code')}>兑换码注册</button>
        <button type="button" className={`auth-tab ${tab === 'invite' ? 'active' : ''}`} onClick={() => setTab('invite')}>邀请码注册</button>
      </div>
      <div className="auth-helper-card">
        <strong>注册说明</strong>
        <span>当前为演示模式，注册成功后会自动初始化 50 点数。</span>
      </div>
      <div className="auth-input-group"><input className="auth-input" autoComplete="username" placeholder="请输入手机号/用户名" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} /></div>
      <div className="auth-input-group"><input className="auth-input" type="password" autoComplete="new-password" placeholder="请设置登录密码" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></div>
      <div className="auth-input-group"><input className="auth-input" placeholder={tab === 'code' ? '请输入兑换码' : '请输入邀请码'} value={tab === 'code' ? form.code : form.invite} onChange={(event) => setForm({ ...form, [tab === 'code' ? 'code' : 'invite']: event.target.value })} /></div>
      <div className="auth-inline-meta">
        <span>{tab === 'code' ? '兑换码适合活动投放与批量发放' : '邀请码适合私域邀请与团队内测'}</span>
      </div>
      <AgreementCheck checked={agree} onChange={setAgree} />
      <button type="submit" className="auth-submit">马上注册</button>
      <div className="auth-switch">已有账户，<Link href="/login">去登录 &gt;</Link></div>
    </form>
  );
}
