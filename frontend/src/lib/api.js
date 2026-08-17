import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API });

export const api = {
  getPackages: (platform, service) =>
    client.get(`/packages`, { params: { platform, service } }).then((r) => r.data),
  createOrder: (payload) => client.post(`/orders`, payload).then((r) => r.data),
  lookupOrders: (params) => client.get(`/orders/lookup`, { params }).then((r) => r.data),
  boost: (payload) => client.post(`/boost`, payload).then((r) => r.data),
  contact: (payload) => client.post(`/contact`, payload).then((r) => r.data),
  stats: () => client.get(`/stats`).then((r) => r.data),
  adminLogin: (password) => client.post(`/admin/login`, { password }).then((r) => r.data),
  adminOrders: (token, status) =>
    client
      .get(`/admin/orders`, { params: { status }, headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.data),
  adminUpdateOrder: (token, id, payload) =>
    client
      .patch(`/admin/orders/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.data),
};

export default api;
