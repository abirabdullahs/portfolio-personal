import React, { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { app } from "../../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const db = getFirestore(app);

export default function PublicationsProducts() {
  // Helper to extract Drive file ID
  function extractDriveId(link) {
    const match = link.match(/\/d\/([\w-]+)/);
    return match ? match[1] : '';
  }
  // Sample PDF modal state
  const [samplePdfModal, setSamplePdfModal] = useState({ open: false, link: null });

  useEffect(() => {
    function handleOpenSamplePdf(e) {
      setSamplePdfModal({ open: true, link: e.detail });
    }
    window.addEventListener('openSamplePdf', handleOpenSamplePdf);
    return () => window.removeEventListener('openSamplePdf', handleOpenSamplePdf);
  }, []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filterTag, setFilterTag] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [checkoutType, setCheckoutType] = useState(null); // 'shopNow' or 'preBook'

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "productsPublications"));
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // 🔹 Get unique tags and years
  const allTags = Array.from(new Set(products.flatMap((p) => p.tags || [])));
  const allYears = Array.from(
    new Set(
      products
        .map((p) => {
          if (!p.releaseDate) return null;
          const d = p.releaseDate.seconds
            ? new Date(p.releaseDate.seconds * 1000)
            : new Date(p.releaseDate);
          return d.getFullYear();
        })
        .filter(Boolean)
    )
  );

  // 🔹 Apply filters
  let filtered = products;
  if (filterTag) filtered = filtered.filter((p) => p.tags?.includes(filterTag));
  if (filterYear)
    filtered = filtered.filter((p) => {
      if (!p.releaseDate) return false;
      const d = p.releaseDate.seconds
        ? new Date(p.releaseDate.seconds * 1000)
        : new Date(p.releaseDate);
      return d.getFullYear().toString() === filterYear;
    });

  // 🔹 Split featured and normal
  const featured = filtered.filter((p) => p.featured);
  const nonFeatured = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4 font-[Quicksand,Poppins,sans-serif]" style={{ fontFamily: 'Hind Siliguri, Quicksand, Poppins, sans-serif' }}>
      <SEO title="Products & Publications — Abir Hossen Abdullah" description="Books, products, and publications by Abir Hossen Abdullah. Shop, pre-book, and read samples." url="https://abirabdullah.web.app/publications-products" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-400">
          Products & Publications
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select
            className="px-3 py-2 rounded border"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">All Categories</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded border"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All Years</option>
            {allYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-yellow-600">Featured</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {featured.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={() => setSelected(product)}
                      onShopNow={() => { setCheckoutProduct(product); setCheckoutType('shopNow'); }}
                      onPreBook={() => { setCheckoutProduct(product); setCheckoutType('preBook'); }}
                      featured
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Non-featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {nonFeatured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => setSelected(product)}
                  onShopNow={() => { setCheckoutProduct(product); setCheckoutType('shopNow'); }}
                  onPreBook={() => { setCheckoutProduct(product); setCheckoutType('preBook'); }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} onCheckout={setCheckoutProduct} />
      )}

      {/* Sample PDF Modal */}
      {samplePdfModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 relative animate-fadeIn flex flex-col items-center">
            <button className="absolute top-3 right-3 text-gray-500 text-2xl" onClick={() => setSamplePdfModal({ open: false, link: null })}>✕</button>
            <h2 className="text-xl font-bold mb-4">একটু পড়ে দেখুন</h2>
            <div className="relative w-full flex flex-col items-center">
              <iframe
                src={`https://drive.google.com/file/d/${extractDriveId(samplePdfModal.link)}/preview#page=1`}
                title="Sample PDF"
                className="w-full max-w-[320px] h-[420px] border rounded"
                allow="autoplay"
                allowFullScreen
              ></iframe>
              {/* Lock overlay for >10 pages (visual only) */}
              <div className="absolute bottom-0 left-0 w-full h-16 flex flex-col items-center justify-center bg-white/80 pointer-events-none">
                <span className="text-3xl text-gray-700 mb-1">🔒</span>
                <span className="text-gray-700 font-bold text-sm">বাকি পেজ দেখতে কিনুন</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutProduct && checkoutType && (
        <CheckoutModal product={checkoutProduct} type={checkoutType} onClose={() => { setCheckoutProduct(null); setCheckoutType(null); }} />
      )}
    </div>
  );
}

/* 🔹 Card Component */
function ProductCard({ product, featured }) {
  return (
    <a
      href={`/publications-products/${product.id}`}
      className={`bg-white dark:bg-gray-900 ${
        featured ? "border-2 border-yellow-400" : ""
      } rounded-xl shadow-lg p-4 flex flex-col gap-3 hover:scale-[1.03] transition-all cursor-pointer w-[325px]`}
    >
      {product.coverImage ? (
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-[310px] h-[438px] object-cover rounded-lg mb-2"
          style={{ aspectRatio: '1/1.414' }}
        />
      ) : null}
      <div className="flex flex-wrap gap-2 mb-2">
        {product.tags?.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
        {product.description?.slice(0, 80)}
        {product.description?.length > 80 ? "..." : ""}
      </p>
      <div className="text-blue-600 font-bold text-xl mb-2">{product.price ? `${product.price}৳` : ''}</div>
      <div className="flex gap-2 flex-wrap mt-auto">
        {product.status === "Pre-book" ? (
          <span className="px-3 py-1 bg-purple-600 text-white rounded shadow text-lg">Pre-Book</span>
        ) : product.status === "Shop Now" ? (
          <span className="px-3 py-1 bg-blue-600 text-white rounded shadow text-lg">Shop Now</span>
        ) : null}
  {product.sampleReadPdf && product.sampleReadPdf.includes('drive.google.com') && (
          <span className="px-3 py-1 bg-green-600 text-white rounded shadow text-lg">একটু পড়ে দেখুন</span>
        )}
      </div>
    </a>
  );
}

/* 🔹 Modal Component */
function ProductModal({ product, onClose, onCheckout }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-8 relative animate-fadeIn">
        <button className="absolute top-3 right-3 text-gray-500 text-2xl" onClick={onClose}>
          ✕
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-3 items-center">
            {product.coverImage ? (
              <img src={product.coverImage} alt={product.name} className="w-[210px] h-[297px] object-cover rounded-lg mb-2" />
            ) : null}
            {product.galleryImages && product.galleryImages.length > 0 && (
              <div className="flex gap-2 flex-wrap justify-center mb-2">
                {product.galleryImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`Gallery ${idx+1}`} className="w-16 h-24 object-cover rounded" />
                ))}
              </div>
            )}
            
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="text-blue-600 font-bold text-2xl mb-2">{product.price ? `${product.price}৳` : ''}</div>
            <div className="whitespace-pre-line text-gray-700 dark:text-gray-200 mb-2">{product.description}</div>
            <div className="flex gap-2 flex-wrap mt-2">
              {product.status === "Pre-book" ? (
                <button
                  className="px-3 py-1 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition text-lg"
                  onClick={() => onCheckout(product, 'preBook')}
                >
                  Pre-Book
                </button>
              ) : product.status === "Shop Now" ? (
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition text-lg"
                  onClick={() => onCheckout(product, 'shopNow')}
                >
                  Shop Now
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Checkout Modal */
function CheckoutModal({ product, type, onClose }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // get last order code
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(1));
      const snapshot = await getDocs(q);
      let lastCode = "000000";
      if (!snapshot.empty) {
        lastCode = snapshot.docs[0].data().orderCode || "000000";
      }
      // increment code
      const newCode = String(parseInt(lastCode) + 1).padStart(6, "0");
      // save user info under product subcollection
      const sub = type === 'shopNow' ? 'shopNowUsers' : 'preBookUsers';
      await addDoc(collection(db, `productsPublications/${product.id}/${sub}`), {
        name,
        contact,
        timestamp: new Date(),
        orderCode: newCode,
      });
      // also save order for admin analytics
      await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        userName: name,
        userContact: contact,
        orderCode: newCode,
        type: type === 'shopNow' ? "ShopNow" : "PreBook",
        createdAt: new Date(),
      });
      setSuccessCode(newCode);
    } catch (err) {
      console.error(err);
      alert("Failed to submit order.");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
        <button className="absolute top-3 right-3 text-gray-500 text-2xl" onClick={onClose}>
          ✕
        </button>

        {successCode ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
            <p className="mb-2">Your booking/order code:</p>
            <p className="text-3xl font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded">{successCode}</p>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Complete Your {type === 'shopNow' ? "Order" : "Pre-Booking"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your Name"
                className="px-3 py-2 rounded border"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Contact (Phone/Email)"
                className="px-3 py-2 rounded border"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
