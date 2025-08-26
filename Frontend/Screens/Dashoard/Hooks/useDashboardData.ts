import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { apiRequest } from "../../../Services/api";

interface TodayMedicine {
  _id: string;
  name: string;
  dosage: number;
  unit: string;
  times: { _id?: string; time: string; status: "Pending" | "Taken" | "Missed" }[];
}

interface UpcomingDose {
  name: string;
  dosage: number;
  unit: string;
  time: string;
}

type ApiResponse =
  | { error: true; message: string }
  | { todayDoses?: TodayMedicine[]; nextDose?: { _id: string; time: string; medicine: { name: string; dosage: number; unit: string } | null } };

export const useDashboardData = () => {
  const [todayMedicines, setTodayMedicines] = useState<TodayMedicine[]>([]);
  const [nextDose, setNextDose] = useState<UpcomingDose | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: RootState) => state.auth);

  const fetchDoses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest<ApiResponse>("/dose-log/doses/today", "GET");

      if (!("error" in res)) {
        setTodayMedicines(res.todayDoses ?? []);
        if (res.nextDose?.medicine) {
          setNextDose({
            name: res.nextDose.medicine.name,
            dosage: res.nextDose.medicine.dosage,
            unit: res.nextDose.medicine.unit,
            time: res.nextDose.time,
          });
        } else {
          setNextDose(null);
        }
      } else {
        console.error(res.message);
        setTodayMedicines([]);
        setNextDose(null);
      }
    } catch (err) {
      console.error("Error fetching doses:", err);
      setTodayMedicines([]);
      setNextDose(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const markDose = useCallback(
    async (scheduledId: string, status: "Taken" | "Missed") => {
      if (!user) return;
      try {
        const endpoint =
          status === "Taken"
            ? `/dose-log/doses/${scheduledId}/taken`
            : `/dose-log/doses/${scheduledId}/missed`;
        await apiRequest(endpoint, "PATCH");

        setTodayMedicines((prev) =>
          prev
            .map((med) => ({
              ...med,
              times: med.times.filter((t) => t._id !== scheduledId),
            }))
            .filter((med) => med.times.length > 0)
        );

        fetchDoses();
      } catch (err) {
        console.error(`Error marking dose ${status}:`, err);
      }
    },
    [user, fetchDoses]
  );

  const flatTimes = todayMedicines.flatMap((med, medIndex) =>
    med.times.map((t, timeIndex) => ({
      ...t,
      med,
      scheduledId: t._id || `${med._id}-${timeIndex}`,
    }))
  );

  useEffect(() => {
    fetchDoses();
  }, [fetchDoses]);

  return { todayMedicines, nextDose, flatTimes, loading, fetchDoses, markDose };
};
