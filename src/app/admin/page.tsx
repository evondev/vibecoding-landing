"use client";

import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity_left: number;
  created_at: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  zalo: string;
  email: string;
  registered_at: string;
}

interface Order {
  id: number;
  customer_id: number;
  product_id: number;
  amount: number;
  status: string;
  order_code: string;
  ordered_at: string;
  customer_name: string;
  customer_phone: string;
  product_name: string;
}

type Tab = "products" | "customers" | "orders";

// ─── Helpers ──────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ thanh toán",
  paid: "Đã thanh toán",
  cancelled: "Đã hủy",
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

// ─── Modal wrapper ────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer">✕</button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white";

// ─── Products Tab ─────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", quantity_left: "" });

  const load = () => fetch("/api/admin/products").then(r => r.json()).then(setProducts);
  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm({ name: "", price: "", description: "", quantity_left: "200" });
    setModal("add");
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({ name: p.name, price: String(p.price), description: p.description, quantity_left: String(p.quantity_left) });
    setModal("edit");
  }

  async function save() {
    const body = { name: form.name, price: Number(form.price), description: form.description, quantity_left: Number(form.quantity_left) };
    if (modal === "add") {
      await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch(`/api/admin/products/${editing!.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    setModal(null);
    load();
  }

  async function del(id: number) {
    if (!confirm("Xóa sản phẩm này?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{products.length} sản phẩm</p>
        <button onClick={openAdd} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg">+ Thêm sản phẩm</button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tên sản phẩm</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Còn lại</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">#{p.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-orange-600 font-semibold">{fmt(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={`font-semibold ${p.quantity_left === 0 ? "text-red-500" : "text-gray-700"}`}>
                    {p.quantity_left === -1 ? "Không giới hạn" : p.quantity_left}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{p.created_at?.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="cursor-pointer text-blue-500 hover:text-blue-700 text-xs font-medium">Sửa</button>
                    <button onClick={() => del(p.id)} className="cursor-pointer text-red-400 hover:text-red-600 text-xs font-medium">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Field label="Tên sản phẩm *">
              <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Giá (VND) *">
              <input className={inputCls} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </Field>
            <Field label="Mô tả">
              <textarea className={inputCls} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </Field>
            <Field label="Số lượng còn lại (-1 = không giới hạn)">
              <input className={inputCls} type="number" value={form.quantity_left} onChange={e => setForm(f => ({ ...f, quantity_left: e.target.value }))} />
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={save} className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg text-sm">Lưu</button>
              <button onClick={() => setModal(null)} className="cursor-pointer flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg text-sm">Hủy</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Customers Tab ────────────────────────────────────────
function CustomersTab() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", zalo: "", email: "" });

  const load = () => fetch("/api/admin/customers").then(r => r.json()).then(setCustomers);
  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm({ name: "", phone: "", zalo: "", email: "" });
    setModal("add");
  }

  function openEdit(c: Customer) {
    setEditing(c);
    setForm({ name: c.name, phone: c.phone, zalo: c.zalo, email: c.email });
    setModal("edit");
  }

  async function save() {
    if (modal === "add") {
      await fetch("/api/admin/customers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch(`/api/admin/customers/${editing!.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setModal(null);
    load();
  }

  async function del(id: number) {
    if (!confirm("Xóa khách hàng này?")) return;
    await fetch(`/api/admin/customers/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{customers.length} khách hàng</p>
        <button onClick={openAdd} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg">+ Thêm khách hàng</button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Phone / Zalo</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Đăng ký</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">#{c.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div>{c.phone}</div>
                  {c.zalo && c.zalo !== c.phone && <div className="text-xs text-gray-400">Zalo: {c.zalo}</div>}
                </td>
                <td className="px-4 py-3 text-gray-500">{c.email}</td>
                <td className="px-4 py-3 text-gray-400">{c.registered_at?.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(c)} className="cursor-pointer text-blue-500 hover:text-blue-700 text-xs font-medium">Sửa</button>
                    <button onClick={() => del(c.id)} className="cursor-pointer text-red-400 hover:text-red-600 text-xs font-medium">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Thêm khách hàng" : "Chỉnh sửa khách hàng"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Field label="Tên *">
              <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Số điện thoại">
              <input className={inputCls} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </Field>
            <Field label="Zalo">
              <input className={inputCls} value={form.zalo} onChange={e => setForm(f => ({ ...f, zalo: e.target.value }))} />
            </Field>
            <Field label="Email">
              <input className={inputCls} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </Field>
            <div className="flex gap-3 pt-2">
              <button onClick={save} className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg text-sm">Lưu</button>
              <button onClick={() => setModal(null)} className="cursor-pointer flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg text-sm">Hủy</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Order | null>(null);
  const [form, setForm] = useState({ customer_id: "", product_id: "", amount: "", status: "pending", order_code: "" });
  const [error, setError] = useState("");

  const load = () => fetch("/api/admin/orders").then(r => r.json()).then(setOrders);
  useEffect(() => {
    load();
    fetch("/api/admin/customers").then(r => r.json()).then(setCustomers);
    fetch("/api/admin/products").then(r => r.json()).then(setProducts);
  }, []);

  function openAdd() {
    setError("");
    setForm({ customer_id: "", product_id: "", amount: "", status: "pending", order_code: "" });
    setModal("add");
  }

  function openEdit(o: Order) {
    setError("");
    setEditing(o);
    setForm({ customer_id: String(o.customer_id), product_id: String(o.product_id), amount: String(o.amount), status: o.status, order_code: o.order_code });
    setModal("edit");
  }

  // Tự điền giá sản phẩm khi chọn sản phẩm
  function handleProductChange(pid: string) {
    const p = products.find(x => x.id === Number(pid));
    setForm(f => ({ ...f, product_id: pid, amount: p ? String(p.price) : f.amount }));
  }

  async function save() {
    setError("");
    const body = { customer_id: Number(form.customer_id), product_id: Number(form.product_id), amount: Number(form.amount), status: form.status, order_code: form.order_code };
    const url = modal === "add" ? "/api/admin/orders" : `/api/admin/orders/${editing!.id}`;
    const res = await fetch(url, { method: modal === "add" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Có lỗi xảy ra"); return; }
    setModal(null);
    load();
    // Refresh products để cập nhật quantity
    fetch("/api/admin/products").then(r => r.json()).then(setProducts);
  }

  async function del(id: number) {
    if (!confirm("Xóa đơn hàng này? Số lượng sản phẩm sẽ được hoàn lại.")) return;
    await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    load();
    fetch("/api/admin/products").then(r => r.json()).then(setProducts);
  }

  const totalRevenue = orders.filter(o => o.status === "paid").reduce((sum, o) => sum + o.amount, 0);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Tổng đơn</p>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Đã thanh toán</p>
          <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === "paid").length}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Doanh thu</p>
          <p className="text-2xl font-bold text-blue-600">{fmt(totalRevenue)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{orders.length} đơn hàng</p>
        <button onClick={openAdd} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg">+ Thêm đơn hàng</button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Số tiền</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Mã đơn</th>
              <th className="px-4 py-3">Ngày mua</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">Chưa có đơn hàng nào</td></tr>
            )}
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">#{o.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{o.customer_name}</div>
                  <div className="text-xs text-gray-400">{o.customer_phone}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{o.product_name}</td>
                <td className="px-4 py-3 font-semibold text-orange-600">{fmt(o.amount)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLOR[o.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABEL[o.status] ?? o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{o.order_code}</td>
                <td className="px-4 py-3 text-gray-400">{o.ordered_at?.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(o)} className="cursor-pointer text-blue-500 hover:text-blue-700 text-xs font-medium">Sửa</button>
                    <button onClick={() => del(o.id)} className="cursor-pointer text-red-400 hover:text-red-600 text-xs font-medium">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Thêm đơn hàng" : "Chỉnh sửa đơn hàng"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Field label="Khách hàng *">
              <select className={inputCls} value={form.customer_id} onChange={e => setForm(f => ({ ...f, customer_id: e.target.value }))}>
                <option value="">-- Chọn khách hàng --</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>)}
              </select>
            </Field>
            <Field label="Sản phẩm *">
              <select className={inputCls} value={form.product_id} onChange={e => handleProductChange(e.target.value)}>
                <option value="">-- Chọn sản phẩm --</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} — {fmt(p.price)} (còn {p.quantity_left === -1 ? "∞" : p.quantity_left})</option>)}
              </select>
            </Field>
            <Field label="Số tiền (VND) *">
              <input className={inputCls} type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            </Field>
            <Field label="Trạng thái">
              <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="pending">Chờ thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </Field>
            <Field label="Mã đơn hàng">
              <input className={inputCls} value={form.order_code} onChange={e => setForm(f => ({ ...f, order_code: e.target.value }))} placeholder="VD: BRAIN12345" />
            </Field>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button onClick={save} className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg text-sm">Lưu</button>
              <button onClick={() => setModal(null)} className="cursor-pointer flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg text-sm">Hủy</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
const TABS: { key: Tab; label: string }[] = [
  { key: "products", label: "Sản phẩm" },
  { key: "customers", label: "Khách hàng" },
  { key: "orders", label: "Đơn hàng" },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("products");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm">🧠</span>
        <div>
          <h1 className="font-bold text-gray-900">AI Brain Tool — Admin</h1>
          <p className="text-xs text-gray-400">Quản lý sản phẩm, khách hàng và đơn hàng</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`cursor-pointer px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "products" && <ProductsTab />}
        {tab === "customers" && <CustomersTab />}
        {tab === "orders" && <OrdersTab />}
      </div>
    </div>
  );
}
