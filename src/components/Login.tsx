import { Formik, Form } from 'formik';
import React from 'react';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import * as Yup from 'yup';

import Button from './common/Button';
import Input from './common/Input';
import Link from './common/Link';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

const Login = () => (
  <div className="min-h-[550px] flex items-center justify-center">
    <div className="rounded-xl shadow-xl w-[500px] p-8">
      <div className="mb-12">
        <h2 className="pb-4 text-4xl font-semibold text-center">Sign In</h2>
        <p className="text-xl text-center">
          Please sign-in to your account and start shopping 🛒
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log({ values })}
      >
        <Form className="">
          <Input name="email" label="Email" placeholder="test@gmail.com" />
          <Input name="password" label="Password" placeholder="secret123" />
          <Link
            path="/reset-password"
            title="Forgot password?"
            className="block my-4 text-end"
          />
          <Button
            title="Sign in"
            className="w-full mt-8 border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
            type="submit"
            size="lg"
          />
        </Form>
      </Formik>
      <p className="mt-8 text-2xl text-center">
        New here? <Link path="/register" title="Create an account" />
      </p>
      <div className="relative flex flex-col items-center mt-8">
        <p className="mb-4 bg-white px-4 text-2xl before:content-[''] before:w-full before:h-1 before:bg-gray-200 before:absolute before:left-0 before:top-3 before:-z-10">
          or
        </p>
        <div className="flex gap-2">
          <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
            <FaGoogle size={20} className="text-gray-700" />
          </span>
          <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
            <FaGithub size={20} className="text-gray-700" />
          </span>
          <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
            <FaTwitter size={20} className="text-gray-700" />
          </span>
          <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
            <FaFacebook size={20} className="text-gray-700" />
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
