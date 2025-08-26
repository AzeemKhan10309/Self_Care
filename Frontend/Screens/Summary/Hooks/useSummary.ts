import { useState, useEffect, useRef, useCallback } from "react";
import type { FlatList } from "react-native";
import { apiRequest } from "../../../Services/api";

export const getWeekday = (dateString: string) => {
  const d = new Date(dateString);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
};

export const generateMonthDates = (year: number, month: number) => {
  const dates: string[] = [];
  const d = new Date(year, month, 1);

  while (d.getMonth() === month) {
    dates.push(d.toISOString().split("T")[0]);
    d.setDate(d.getDate() + 1);
  }

  return dates;
};

export const sortLogsByTime = (logs: any[]) => {
  return logs.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};

export const useSummary = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
  const [doseLogs, setDoseLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const dateRange = generateMonthDates(today.getFullYear(), today.getMonth());
  const flatListRef = useRef<FlatList<string>>(null);

  const fetchDoseLogs = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const res = await apiRequest(`/dose-log/logs/?date=${date}`, "GET");
      const sorted = sortLogsByTime(res || []);
      setDoseLogs(sorted);
    } catch (err) {
      console.error("Failed to fetch dose logs", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoseLogs(selectedDate);
  }, [selectedDate, fetchDoseLogs]);

  useEffect(() => {
    const todayIndex = dateRange.findIndex(d => d === today.toISOString().split("T")[0]);
    if (todayIndex !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.01,
        });
      }, 200);
    }
  }, [dateRange, today]);

  return {
    today,
    selectedDate,
    setSelectedDate,
    doseLogs,
    loading,
    dateRange,
    flatListRef,
    fetchDoseLogs,
    getWeekday,
  };
};
