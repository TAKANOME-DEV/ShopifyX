/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Formik, Form } from 'formik';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import * as Yup from 'yup';

import Button from './common/Button';
import Input from './common/Input';

const initialValues = {
  image: null,
  name: '',
  price: '',
  description: '',
};

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required(),
  name: Yup.string().min(4).required(),
  price: Yup.number().integer().min(1).required(),
  description: Yup.string().min(10).required(),
});

export default function CreateProduct() {
  return (
    <div className="pb-20">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log({ values })}
      >
        <Form className="p-8 border border-gray-300 mt-28 rounded-xl">
          <fieldset className="p-0 m-0 border-none disabled:opacity-50 disabled:pointer-events-none">
            <Input type="file" name="image" />
            <Input name="name" label="Name" placeholder="Car" />
            <Input
              name="price"
              type="number"
              label="Price"
              placeholder="10_000"
            />
            <Input
              name="description"
              label="Description"
              placeholder="Nice car"
            />
          </fieldset>
          <Button title="Create product" type="submit" Icon={FaPen} />
        </Form>
      </Formik>
    </div>
  );
}
