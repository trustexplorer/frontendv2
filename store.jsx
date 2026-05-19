import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  url: "https://api.trustpadi.com",
  // url: "http://localhost:4000",

  // ─── Auth token ─────────────────────────────────────────────────────────────
  // Single source of truth for the token — always read from store, not localStorage directly
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),

  // ─── User / Dashboard ───────────────────────────────────────────────────────
  user: null,          // admin: list of all users | user: individual profile
  setUser: (user) => set({ user }),

  dashboard: null,     // logged-in user's own profile
  setDashboard: (dashboard) => set({ dashboard }),

  // ─── Reports ────────────────────────────────────────────────────────────────
  reports: [],         // admin: all reports | public: approved reports
  myReports: [],       // logged-in user's own reports
  setReports: (reports) => set({ reports }),

  // ─── Pagination ─────────────────────────────────────────────────────────────
  pagination: null,

  // ─── Loading ────────────────────────────────────────────────────────────────
  loading: false,

  // ─── getDashboard ────────────────────────────────────────────────────────────
  // Uses store token — no direct localStorage reads inside store actions
  getDashboard: async () => {
    const { url, token } = get();
    if (!token) return;
    try {
      const response = await fetch(`${url}/user/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        set({ dashboard: data.user });
      }
    } catch (error) {
      console.error("getDashboard error:", error);
    }
  },

  // ─── fetchReports (admin: all reports) ──────────────────────────────────────
  fetchReports: async (page = 1) => {
    const { url, token } = get();
    if (!token) return;
    try {
      set({ loading: true });
      const response = await fetch(`${url}/admin/all-reports?page=${page}&limit=20`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        // Backend now returns { reports, pagination }
        set({ reports: data.reports ?? data, pagination: data.pagination ?? null });
      }
    } catch (err) {
      console.error("fetchReports error:", err);
    } finally {
      set({ loading: false });
    }
  },

  // ─── fetchUsers (admin: all users) ──────────────────────────────────────────
  fetchUsers: async (page = 1) => {
    const { url, token } = get();
    if (!token) return;
    try {
      set({ loading: true });
      const response = await fetch(`${url}/admin/all-users?page=${page}&limit=20`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Backend returns { users, pagination }
        set({ user: data.users ?? data, pagination: data.pagination ?? null });
      }
    } catch (error) {
      console.error("fetchUsers error:", error);
    } finally {
      set({ loading: false });
    }
  },

  // ─── fetchUserReports (user: own reports) ───────────────────────────────────
  fetchUserReports: async (page = 1) => {
    const { url, token } = get();
    if (!token) return;
    try {
      set({ loading: true });
      const response = await fetch(`${url}/user/my-reports?page=${page}&limit=20`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        set({ myReports: data.reports ?? data, pagination: data.pagination ?? null });
      }
    } catch (err) {
      console.error("fetchUserReports error:", err);
    } finally {
      set({ loading: false });
    }
  },

  // ─── fetchAllReports (public: approved reports) ──────────────────────────────
  fetchAllReports: async (page = 1) => {
    const { url } = get();
    try {
      set({ loading: true });
      const response = await fetch(`${url}/user/all-reports?page=${page}&limit=20`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        set({ reports: data.reports ?? data, pagination: data.pagination ?? null });
      }
    } catch (err) {
      console.error("fetchAllReports error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
