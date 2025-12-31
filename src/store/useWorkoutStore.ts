import { create } from 'zustand';
import type { WorkoutLog, CreateWorkoutPayload } from '../types/workout';
import * as workoutsApi from '../data/workouts';

interface WorkoutStore {
  workouts: WorkoutLog[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchWorkouts: () => Promise<void>;
  addWorkout: (payload: CreateWorkoutPayload) => Promise<void>;
  removeWorkout: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  loading: false,
  error: null,

  fetchWorkouts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await workoutsApi.listWorkoutLogs();
      set({ workouts: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  addWorkout: async (payload: CreateWorkoutPayload) => {
    set({ loading: true, error: null });
    try {
      const newWorkout = await workoutsApi.createWorkoutLog(payload);
      set((state) => ({
        workouts: [newWorkout, ...state.workouts],
        loading: false,
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      throw err; // 让 UI 层能捕获
    }
  },

  removeWorkout: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await workoutsApi.deleteWorkoutLog(id);
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
