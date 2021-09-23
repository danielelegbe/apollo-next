import withApollo from '../lib/withApollo';
import { usePostsQuery } from '../generated/graphql';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Hello = () => {
  const user = useSelector((state: RootState) => state.user);
  const { data, loading } = usePostsQuery();

  if (!data || loading) return <h1>Loading...</h1>;

  return (
    <div>
      {data.posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default withApollo(Hello, { getDataFromTree });
