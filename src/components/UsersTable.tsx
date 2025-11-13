    "use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import ConfirmDialog from "./ConfirmDialog";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: {
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}
const tableHeader = [
  "Name",
  "Email",
  "Role",
  "Created At",
  "Updated At",
  "Actions",
];

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null,
  });

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        data: User[];
        total: number;
      }>("/api/users", {
        params: { page, limit, search },
      });
      return data;
    },
  });

  const { data: rolesData } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        data: { id: string; name: string }[];
      }>("/api/roles");
      return data.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, roleName }: { id: string; roleName: string }) =>
      axiosInstance.put(`/api/users/${id}`, { roleName }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/api/users/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const users = data?.data || [];
  const roles = rolesData || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  console.log(users);

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
      {isLoading && <div className="text-center py-4">Loading users...</div>}
      {error && (
        <div className="text-red-500 text-center py-4">
          Error: {error.message}
        </div>
      )}

      {!isLoading && !error && (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {tableHeader.map((heading) => (
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
                <td colSpan={6} className="text-center py-4">
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
                    <select
                      value={user.role?.name || ""}
                      onChange={(e) =>
                        updateRoleMutation.mutate({
                          id: user.id,
                          roleName: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">No Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.updatedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setDeleteDialog({ isOpen: true, user });
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
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

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete User"
        message={`Are you sure you want to delete user "${
          deleteDialog.user?.name || deleteDialog.user?.email
        }"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={() => {
          if (deleteDialog.user) {
            deleteUserMutation.mutate(deleteDialog.user.id);
          }
          setDeleteDialog({ isOpen: false, user: null });
        }}
        onCancel={() => {
          setDeleteDialog({ isOpen: false, user: null });
        }}
      />
    </div>
  );
}
