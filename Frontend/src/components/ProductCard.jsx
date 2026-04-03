import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category badge over image */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 rounded-md shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Content block */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-prime transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-gray-50 text-prime text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 hover:bg-prime hover:text-white transition-all duration-300 outline-none">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
