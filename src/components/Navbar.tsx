import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setUser } from '../features/user/userSlice';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';
const Navbar = () => {
  const { data } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    const response = await logout();
    if (response.data) console.log(response.data);

    dispatch(setUser({ accessToken: '', id: null }));
    await client.resetStore();
  };

  return (
    <div>
      <h1>Me:{data?.me?.email}</h1>
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
      <div>
        <Link href={'/register'}>Register</Link>
      </div>
      <div>{user.id && <button onClick={handleLogout}>Logout</button>}</div>
    </div>
  );
};

export default withApollo(Navbar);
