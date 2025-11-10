"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get<{
        data: User[];
        total: number;
      }>("/api/users", {
        params: { page, limit, search },
      });
      setUsers(data.data);
      setTotal(data.total);
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.response?.data?.error || axiosError.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800 p-4">
      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border rounded px-3 py-2 w-64 dark:bg-gray-700 dark:text-white"
          value={search}
          onChange={(e) => {
            setPage(1); // reset page on search
            setSearch(e.target.value);
          }}
        />
        <div className="text-sm dark:text-gray-300">
          Page {page} of {totalPages || 1}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <div className="text-center py-4">Loading users...</div>}
      {error && (
        <div className="text-red-500 text-center py-4">Error: {error}</div>
      )}

      {!loading && !error && (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {["Name", "Email", "Created At", "Updated At"].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.updatedAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`px-3 py-1 border rounded ${
                p === page
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-white dark:bg-gray-700"
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
