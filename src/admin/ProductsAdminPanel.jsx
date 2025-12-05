import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  limit
} from "firebase/firestore";

const db = getFirestore(app);

export default function ProductsAdminPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  // User list modal state
  const [userListModal, setUserListModal] = useState({
    open: false,
    product: null,
    type: null,
    users: []
  });

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const snap = await getDocs(collection(db, "productsPublications"));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Form state
  const [form, setForm] = useState({
    name: "",
    tags: "",
    coverImage: "",
    galleryImages: "",
    description: "",
    sampleReadPdf: "",
    fullPdfDownload: "",
    releaseDate: "",
    price: "",
    status: "Published",
    featured: false
  });

  // Fill form when editing
  useEffect(() => {
    if (editProduct) {
      setForm({
        ...editProduct,
        tags: editProduct.tags?.join(", ") || "",
        galleryImages: editProduct.galleryImages?.join(", ") || "",
        releaseDate: editProduct.releaseDate
          ? new Date(editProduct.releaseDate.seconds * 1000)
              .toISOString()
              .slice(0, 10)
          : ""
      });
    } else {
      setForm({
        name: "",
        tags: "",
        coverImage: "",
        galleryImages: "",
        description: "",
        sampleReadPdf: "",
        fullPdfDownload: "",
        releaseDate: "",
        price: "",
        status: "Published",
        featured: false
      });
    }
  }, [editProduct, modalOpen]);

  // Generate next product code (6 digits)
  async function getNextProductCode() {
    const q = query(
      collection(db, "productsPublications"),
      orderBy("productCode", "desc"),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) return "000001";

    const lastCode = snap.docs[0].data().productCode || "000000";
    const next = (parseInt(lastCode, 10) + 1).toString().padStart(6, "0");
    return next;
  }

  // Add/Edit form submit
  async function handleFormSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...form,
      tags: (form.tags || "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
      galleryImages: (form.galleryImages || "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
      price: form.price ? Number(form.price) : null,
      releaseDate: form.releaseDate ? new Date(form.releaseDate) : null,
      updatedAt: serverTimestamp()
    };

    if (editProduct) {
      await updateDoc(doc(db, "productsPublications", editProduct.id), data);
      setProducts(products.map(p => (p.id === editProduct.id ? { ...p, ...data } : p)));
    } else {
      const code = await getNextProductCode();
      const newProduct = {
        ...data,
        productCode: code,
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, "productsPublications"), newProduct);
      setProducts([...products, { id: docRef.id, ...newProduct }]);
    }

    setSaving(false);
    setModalOpen(false);
  }

  // Delete product
  async function handleDelete(id) {
    await deleteDoc(doc(db, "productsPublications", id));
    setProducts(products.filter(p => p.id !== id));
  }

  // User List Modal functions
  async function openUserListModal(product, type) {
    const sub = type === "shopNow" ? "shopNowUsers" : "preBookUsers";
    const ref = collection(db, `productsPublications/${product.id}/${sub}`);
    const snap = await getDocs(ref);
    setUserListModal({
      open: true,
      product,
      type,
      users: snap.docs.map(doc => doc.data())
    });
  }
  function closeUserListModal() {
    setUserListModal({ open: false, product: null, type: null, users: [] });
  }

  // Close modal
  function closeModal() {
    setModalOpen(false);
    setEditProduct(null);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products & Publications Admin</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        onClick={() => {
          setEditProduct(null);
          setModalOpen(true);
        }}
      >
        Add New
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Code</th>
              <th className="p-2">Name</th>
              <th className="p-2">Tags</th>
              <th className="p-2">Status</th>
              <th className="p-2">Featured</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="p-2 font-mono">{product.productCode}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.tags?.join(", ")}</td>
                <td className="p-2">{product.status}</td>
                <td className="p-2">{product.featured ? "Yes" : "No"}</td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => {
                      setEditProduct(product);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => openUserListModal(product, "shopNow")}
                  >
                    Shop Now Users
                  </button>
                  <button
                    className="px-2 py-1 bg-purple-500 text-white rounded"
                    onClick={() => openUserListModal(product, "preBook")}
                  >
                    Pre-Book Users
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">
              {editProduct ? "Edit" : "Add"} Product/Publication
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Cover Image URL"
                value={form.coverImage}
                onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Gallery Images URLs (comma separated)"
                value={form.galleryImages}
                onChange={e => setForm(f => ({ ...f, galleryImages: e.target.value }))}
              />
              <textarea
                className="w-full border rounded px-3 py-2"
                placeholder="Description (rich text supported)"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Sample Read PDF Link"
                value={form.sampleReadPdf}
                onChange={e => setForm(f => ({ ...f, sampleReadPdf: e.target.value }))}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Full PDF Download Link"
                value={form.fullPdfDownload}
                onChange={e => setForm(f => ({ ...f, fullPdfDownload: e.target.value }))}
              />
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={form.releaseDate}
                onChange={e => setForm(f => ({ ...f, releaseDate: e.target.value }))}
              />
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                placeholder="Price"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              />
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              >
                <option value="Shop Now">Shop Now</option>
                <option value="Pre-book">Pre-book</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                />
                Feature this product/publication
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={saving}
              >
                {saving ? "Saving..." : editProduct ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* User List Modal */}
      {userListModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeUserListModal}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">
              {userListModal.type === "shopNow" ? "Shop Now" : "Pre-Book"} Users for{" "}
              {userListModal.product?.name}
            </h3>
            {userListModal.users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <table className="w-full border rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Name</th>
                    <th className="p-2">Contact</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {userListModal.users.map((u, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{u.name}</td>
                      <td className="p-2">{u.contact}</td>
                      <td className="p-2">
                        {u.timestamp
                          ? new Date(
                              u.timestamp.seconds
                                ? u.timestamp.seconds * 1000
                                : u.timestamp
                            ).toLocaleString()
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
