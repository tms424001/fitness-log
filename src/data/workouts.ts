import { supabase } from '../lib/supabase';
import type { WorkoutLog, CreateWorkoutPayload, UpdateWorkoutPayload } from '../types/workout';

// 固定的演示用 user_id（无登录模式）
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

/**
 * 获取所有健身记录（按日期倒序）
 */
export async function listWorkoutLogs(): Promise<WorkoutLog[]> {
  const { data, error } = await supabase
    .from('workout_logs')
    .select('*')
    .eq('user_id', DEMO_USER_ID)
    .order('workout_date', { ascending: false });

  if (error) {
    throw new Error(`获取记录失败: ${error.message}`);
  }

  return data || [];
}

/**
 * 新增一条健身记录
 */
export async function createWorkoutLog(payload: CreateWorkoutPayload): Promise<WorkoutLog> {
  const { data, error } = await supabase
    .from('workout_logs')
    .insert({
      ...payload,
      user_id: DEMO_USER_ID,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`新增记录失败: ${error.message}`);
  }

  return data;
}

/**
 * 更新一条健身记录
 */
export async function updateWorkoutLog(id: string, patch: UpdateWorkoutPayload): Promise<WorkoutLog> {
  const { data, error } = await supabase
    .from('workout_logs')
    .update(patch)
    .eq('id', id)
    .eq('user_id', DEMO_USER_ID)
    .select()
    .single();

  if (error) {
    throw new Error(`更新记录失败: ${error.message}`);
  }

  return data;
}

/**
 * 删除一条健身记录
 */
export async function deleteWorkoutLog(id: string): Promise<void> {
  const { error } = await supabase
    .from('workout_logs')
    .delete()
    .eq('id', id)
    .eq('user_id', DEMO_USER_ID);

  if (error) {
    throw new Error(`删除记录失败: ${error.message}`);
  }
}
