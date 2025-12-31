// 与 Supabase workout_logs 表字段完全一致（snake_case）
export interface WorkoutLog {
  id: string;
  user_id: string;
  workout_date: string;
  workout_type: string;
  duration_min: number;
  intensity: string;
  notes: string | null;
  created_at: string;
}

// 新增记录时的 payload（不需要 id, user_id, created_at）
export interface CreateWorkoutPayload {
  workout_date: string;
  workout_type: string;
  duration_min: number;
  intensity: string;
  notes?: string;
}

// 更新记录时的 payload（所有字段可选）
export interface UpdateWorkoutPayload {
  workout_date?: string;
  workout_type?: string;
  duration_min?: number;
  intensity?: string;
  notes?: string | null;
}
