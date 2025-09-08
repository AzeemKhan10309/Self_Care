import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { apiRequest } from "../../../Services/api";

export interface Medicine {
  _id: string;
  name: string;
  dose: string;
  time: string;
  quantity: string;
}

export const useUserMedicines = (userId: string) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchMedicines = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest(`/medicines/getall?ownerId=${userId}`, "GET");

      if (data?.medicines) {
        setMedicines(data.medicines);
      } else {
        setError(data?.message || "Failed to fetch medicines");
      }
    } catch (err) {
      setError("Something went wrong while fetching medicines");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const deleteMedicine = useCallback(
    async (medicineId: string) => {
      setDeleting(medicineId);
      setError(null);
      try {
        const data: any = await apiRequest(`/medicines/${medicineId}`, "DELETE");
        if (data?.error) {
          setError(data.message);
          return;
        }
        setMedicines((prev) => prev.filter((med) => med._id !== medicineId));
        setSuccess("Medicine deleted successfully");
      } catch (err) {
        setError("Failed to delete medicine");
      } finally {
        setDeleting(null);
      }
    },
    []
  );

  const refreshMedicines = useCallback(() => {
    return fetchMedicines();
  }, [fetchMedicines]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return {
    medicines,
    loading,
    deleting,
    error,
    success,
    fetchMedicines,
    refreshMedicines,
    deleteMedicine,
  };
};
