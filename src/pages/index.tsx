import { getDataFromTree } from '@apollo/client/react/ssr';
import { NextPage } from 'next';
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Home: NextPage = () => {
  const { data, loading } = usePostsQuery();

  if (!data || loading) return <h1>Loading...</h1>;

  return (
    <div>
      <br />
      posts
      <div>
        {data.posts.map((post) => (
          <div key={post.id}>
            <br />
            <p>Author:{post.user.email}</p>
            <p>Content: {post.content}</p>
            <p>Title: {post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withApollo(Home, { getDataFromTree });
