import { getDataFromTree } from '@apollo/client/react/ssr';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useMeQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Me = () => {
  const { data } = useMeQuery({ fetchPolicy: 'network-only' });
  if (data?.me) {
    console.log(data);
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default withApollo(Me);
