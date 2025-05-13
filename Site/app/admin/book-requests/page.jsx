"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function AdminBookRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/admin/book-requests");
        const data = await res.json();
        setRequests(data.requests || []);
      } catch (error) {
        console.error("Failed to fetch book requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/book-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? updated.request : r))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteRequest = async (id) => {
    if (!confirm("Delete this book request?")) return;
    try {
      await fetch(`/api/admin/book-requests/${id}`, { method: "DELETE" });
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete request:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Book Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No book requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-muted">
              <tr className="text-left border-b">
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{req.title}</td>
                  <td className="p-3">{req.author}</td>
                  <td className="p-3 text-blue-600">{req.contactEmail}</td>
                  <td className="p-3">
                    <select
                      className="border px-2 py-1 rounded"
                      value={req.status}
                      disabled={updatingId === req._id}
                      onChange={(e) => updateStatus(req._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                      <option value="denied">Denied</option>
                    </select>
                  </td>
                  <td className="p-3">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteRequest(req._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
