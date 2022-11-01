import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';

import { Product } from '@components/types';
import formatMoney from '@lib/formatMoney';

interface CartItemProps {
  product: Product;
}

export default function CartItem({ product }: CartItemProps) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-x-8 border border-gray-100 shadow-xs p-4 rounded-xl mb-4">
      <div className="overflow-hidden border-2 rounded-xl">
        <Image
          src={product.photo.image.publicUrlTransformed}
          alt={product.name}
          width="100%"
          height="100%"
          className="object-cover"
          layout="responsive"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <Link href={`products/${product.id}`}>
            <a className="text-3xl font-semibold hover:underline">
              {product.name}
            </a>
          </Link>
          <p className="text-3xl font-semibold">{formatMoney(product.price)}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center border-2 rounded-xl">
            <button
              type="button"
              className="h-full px-6 py-2 text-2xl transition hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-6 py-2 text-2xl">1</span>
            <button
              type="button"
              className="h-full px-6 py-2 text-2xl transition hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="p-4 text-gray-500 rounded-full hover:bg-gray-100"
            >
              <FaRegHeart size={20} />
            </button>
            <span className='relative before:absolute before:content-[""] before:w-[2px] before:h-6 before:bg-gray-200 before:-top-3 before:bottom-0' />
            <button
              type="button"
              className="p-4 text-red-500 rounded-full hover:bg-gray-100"
            >
              <AiFillDelete size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
