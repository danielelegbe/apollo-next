import { getDataFromTree } from '@apollo/client/react/ssr';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../features/user/userSlice';
import { useMyPostsQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Home: NextPage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();

  const { data, loading } = useMyPostsQuery({
    variables: { findOneUserId: 10 },
  });

  useEffect(() => {
    fetch('http://localhost:4000/refresh-token', {
      credentials: 'include',
      method: 'POST',
    }).then(async (response) => {
      const { accessToken } = await response.json();
      dispatch(setAccessToken(accessToken));
      setPageLoading(false);
    });
  }, [dispatch]);
  if (!data || loading) return <h1>Loading...</h1>;

  return (
    <div>
      posts
      <div>{JSON.stringify(data.findOneUser?.posts)}</div>
    </div>
  );
};

export default withApollo(Home, { getDataFromTree });
