import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface Product {
  id: number;
  title: string;
  description?: string;
  price?: number;
  image?: { meta: { download_url: string } } | string;
  features?: string[];
  specs?: Record<string, string | number>;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v2/pages/${id}/`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product. Status: ${response.status}`);
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;

  if (error) {
    return (
      <div className="product-error">
        <h2>Error Loading Product</h2>
        <p>{error}</p>
        <Link to="/products" className="back-button">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <Link to="/products" className="back-button">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price ? product.price.toFixed(2) : 'N/A'}</p>
          <p className="description">{product.description || "No description available."}</p>

          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <button className="add-to-cart" onClick={() => addToCart(product, quantity)}>
            Add to Cart
          </button>

          {product.features && (
            <div className="product-features">
              <h2>Key Features</h2>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.specs && (
            <div className="product-specs">
              <h2>Specifications</h2>
              <table>
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                      <td>{value.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
