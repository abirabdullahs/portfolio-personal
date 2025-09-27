import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

const gridVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (querySnapshot) => {
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-blue-300 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={gridVariants}
      >
        Products & Publications
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {products.length === 0 ? (
          <div className="text-gray-400">No products available.</div>
        ) : (
          products.slice(0, 6).map(product => (
            <motion.div
              key={product.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-4 flex flex-col items-center border border-blue-400/30 hover:scale-105 hover:shadow-blue-400 transition-transform duration-300 cursor-pointer"
              whileHover={{ scale: 1.08 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={gridVariants}
              onClick={() => { setSelectedProduct(product); setModalOpen(true); }}
            >
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-xl mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
              <div className="text-xs text-gray-200 mb-2 whitespace-pre-line line-clamp-3">{product.description}</div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white mt-2">{product.status}</span>
            </motion.div>
          ))
        )}
      </div>
      <a
        href="/PublicationsProducts"
        className="mt-6 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-blue-300 border border-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 glow-btn"
      >
        See All Products
      </a>
      {/* Modal Preview */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => setModalOpen(false)}>✕</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-300">{selectedProduct.name}</h2>
            <div className="text-gray-700 dark:text-gray-200 mb-4">{selectedProduct.description}</div>
            <a href={selectedProduct.link || "#"} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">
              {selectedProduct.status === "Pre-book" ? "Pre-Book" : "Shop Now"}
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPreview;
