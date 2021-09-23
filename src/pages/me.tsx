import { getDataFromTree } from '@apollo/client/react/ssr';
import { useMeAndMyPostsQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Me = () => {
  const { data, loading, error } = useMeAndMyPostsQuery();

  if (loading) return <h1>Loading...</h1>;

  if (!data?.me) return <h1>No data</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      {data.me.posts.map((post) => (
        <div key={post.id}>
          <p>Title: {post.title}</p>
          <p>Title: {post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default withApollo(Me, { getDataFromTree });
