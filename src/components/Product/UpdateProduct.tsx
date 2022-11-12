import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaPencilAlt } from 'react-icons/fa';
import * as Yup from 'yup';

import ErrorMessage from '@components/common/ErrorMessage';

import Button from '../common/Button';
import Input from '../common/Input';

import { SingleProductQuery, SINGLE_PRODUCT_QUERY } from './ProductDetails';

interface UpdateProductMutation {
  updateProduct: {
    id?: string;
  };
}

const validationSchema = Yup.object().shape({
  // image: Yup.mixed().required(),
  name: Yup.string().min(4).required(),
  price: Yup.number().integer().min(1).required(),
  description: Yup.string().min(10).required(),
  stock: Yup.string().min(1).required(),
});

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
    $stock: Int # $photo: Upload!
  ) {
    updateProduct(
      where: { id: $id }
      data: {
        name: $name
        description: $description
        price: $price
        stock: $stock
      }
    ) {
      id
    }
  }
`;

export default function UpdateProduct() {
  const router = useRouter();

  if (!router.query.id) router.push('/404').catch(console.error);

  const {
    data,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery<SingleProductQuery>(SINGLE_PRODUCT_QUERY, {
    variables: { id: router.query.id },
  });

  const initialValues = {
    // image: '',
    name: data?.product.name,
    price: data?.product.price,
    description: data?.product.description,
    stock: data?.product.stock,
  };

  const [updateProduct, { error, loading }] =
    useMutation<UpdateProductMutation>(UPDATE_PRODUCT_MUTATION);

  // TODO: add loader
  if (loadingProduct) return <p>Loading...</p>;
  if (errorProduct) return <ErrorMessage error={errorProduct} />;

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await updateProduct({
      variables: {
        id: router.query.id ?? '',
        name: values.name ?? '',
        description: values.description ?? '',
        price: +values.price!,
        stock: +values.stock!,
        // photo: values.image,
      },
    });

    if (!error) {
      router
        .push(`/products/${res.data!.updateProduct.id!}`)
        .catch(console.error);
    }
  };

  return (
    <>
      <ErrorMessage error={error!} />
      <div className="min-h-[550px] flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-full max-w-screen-md p-8 border border-gray-300 rounded-xl">
            <fieldset className="p-0 m-0 border-none disabled:opacity-50 disabled:pointer-events-none">
              {/* <Input type="file" name="image" /> */}
              <Input name="name" label="Name" placeholder="Car" />
              <Input
                name="price"
                type="number"
                label="Price"
                placeholder="10_000"
              />
              <Input
                name="stock"
                type="number"
                label="Number In Stock"
                placeholder="5"
              />
              <Input
                name="description"
                label="Description"
                placeholder="Nice car"
              />
            </fieldset>
            <Button
              title={loading ? 'updating product...' : 'Update product'}
              className="flex"
              variant="primary"
              type="submit"
              disabled={loading}
              iconClasses={loading ? 'animate-spin' : ''}
              Icon={loading ? BiLoader : FaPencilAlt}
              iconPosition={loading ? 'end' : 'start'}
              size="lg"
            />
          </Form>
        </Formik>
      </div>
    </>
  );
}
