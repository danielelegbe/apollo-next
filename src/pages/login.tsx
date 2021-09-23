import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Login = () => {
  const router = useRouter();
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
          if (response.data?.login) {
            dispatch(
              setUser({
                accessToken: response.data.login.accessToken,
                id: response.data.login.user.id,
              })
            );
            router.push('/');
          }
        }}
      >
        <Form>
          <div>
            <Field name="email" placeholder="email" />
          </div>
          <Field name="password" placeholder="password" />
          <div>
            <button type="submit">submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default withApollo(Login);
