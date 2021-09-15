import Link from 'next/link';
export const Navbar = () => {
  return (
    <div>
      <div>
        <Link href={'/'}>Home</Link>
      </div>
      <div>
        <Link href={'/login'}>Login</Link>
      </div>
      <div>
        <Link href={'/me'}>Me</Link>
      </div>
      <div>
        <Link href={'/hello'}>Hello</Link>
      </div>
    </div>
  );
};
