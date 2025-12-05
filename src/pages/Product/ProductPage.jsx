import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import SEO from '../../components/SEO';

const db = getFirestore(app);

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const ref = doc(db, 'productsPublications', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <SEO
        title={`${product.name} — Abir Hossen Abdullah`}
        description={product.description ? product.description.slice(0, 120) : 'Product or publication by Abir Hossen Abdullah.'}
        url={`https://abirabdullah.web.app/publications-products/${product.id}`}
      />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {product.coverImage && (
          <img src={product.coverImage} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" />
        )}
        <h1 className="text-3xl font-bold text-center mb-2">{product.name}</h1>
        <div className="flex gap-2 justify-center mb-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm">{product.tags?.join(' • ')}</span>
          <span className="text-green-700 font-bold text-xl">{product.price}৳</span>
          <span className="text-gray-700 text-base font-normal">{product.status}</span>
        </div>
        <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line mb-4 text-center">{product.description}</div>
        <div className="text-center mt-4">
          <a href="/publications-products" className="text-blue-600 hover:underline">← Back to all products</a>
        </div>
      </div>
    </div>
  );
}
