import { AuthShell } from '@/components/shell/auth-shell';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return <AuthShell title="欢迎注册"><RegisterForm /></AuthShell>;
}
