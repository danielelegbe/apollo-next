import React from 'react';
import { useByeQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Bye = () => {
  const { data, loading, error } = useByeQuery();
  if (error) return <h1>{error.message}</h1>;

  if (loading || !data) return <h1>Loading...</h1>;

  return <div>{JSON.stringify(data.bye)}</div>;
};
export default withApollo(Bye);
