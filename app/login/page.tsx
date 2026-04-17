import { AuthShell } from '@/components/shell/auth-shell';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return <AuthShell title="欢迎登录"><LoginForm /></AuthShell>;
}
