import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Register = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const response = await register({
            variables: {
              registerData: data,
            },
          });
          if (response.data) {
            router.push('/');
          }
        }}
      >
        <Form>
          <Field name="email" placeholder="Email" type="text" />
          <Field name="password" placeholder="Password" type="text" />
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default withApollo(Register);
