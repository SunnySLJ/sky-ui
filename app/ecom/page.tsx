import { redirect } from 'next/navigation';

export default function EcomRedirectPage() {
  redirect('/banana?tab=ecom');
}
