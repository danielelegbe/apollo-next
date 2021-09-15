import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';
import withApollo from '../lib/withApollo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setAccessToken } from '../features/user/userSlice';

const Login = () => {
  const user = useSelector((state: RootState) => state.user);
  // console.log(user);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, password }) => {
          const response = await login({
            variables: { loginData: { email, password } },
            update: (cache, { data }) => {
              if (!data) return null;
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user,
                },
              });
            },
          });
          if (response.data) {
            dispatch(setAccessToken(response.data?.login.accessToken));
          }
          // console.log(user);
        }}
      >
        <Form>
          <div>
            <Field name='email' placeholder='email' />
          </div>
          <Field name='password' placeholder='password' />
          <div>
            <button type='submit'>submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default withApollo(Login);
