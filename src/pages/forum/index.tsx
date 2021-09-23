import { GetServerSideProps, GetStaticProps } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/hello');
  const data = await response.json();

  return {
    props: data,
  };
};

const Index = (data: any) => {
  const router = useRouter();
  if (data) {
    router.push('/hello');
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Index;
