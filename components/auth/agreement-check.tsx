export function AgreementCheck({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="auth-checkbox">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>
        已阅读并同意{' '}
        <a href="#">《用户协议》</a>
        {' '}和{' '}
        <a href="#">《隐私政策》</a>
      </span>
    </label>
  );
}
