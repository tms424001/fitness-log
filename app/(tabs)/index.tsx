import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';

export default function Dashboard() {
  const router = useRouter();
  const { workouts, loading, error, fetchWorkouts } = useWorkoutStore();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // 计算统计数据
  const todayStr = new Date().toISOString().split('T')[0];
  const todayWorkouts = workouts.filter((w) => w.workout_date === todayStr);
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration_min, 0);
  const recentWorkout = workouts[0];

  return (
    <View style={styles.container}>
      {/* 统计卡片 */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{workouts.length}</Text>
          <Text style={styles.statLabel}>总记录</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayWorkouts.length}</Text>
          <Text style={styles.statLabel}>今日</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalMinutes}</Text>
          <Text style={styles.statLabel}>总分钟</Text>
        </View>
      </View>

      {/* 最近记录 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>最近一次锻炼</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#4F46E5" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : recentWorkout ? (
          <View style={styles.recentCard}>
            <Text style={styles.recentType}>{getTypeLabel(recentWorkout.workout_type)}</Text>
            <Text style={styles.recentDetail}>
              {recentWorkout.workout_date} · {recentWorkout.duration_min}分钟 · {getIntensityLabel(recentWorkout.intensity)}
            </Text>
            {recentWorkout.notes && (
              <Text style={styles.recentNotes}>{recentWorkout.notes}</Text>
            )}
          </View>
        ) : (
          <Text style={styles.emptyText}>暂无记录，快去添加吧！</Text>
        )}
      </View>

      {/* 快捷按钮 */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add')}
      >
        <Text style={styles.addButtonText}>+ 新增锻炼记录</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.historyButtonText}>查看历史记录</Text>
      </TouchableOpacity>
    </View>
  );
}

function getTypeLabel(type: string): string {
  const map: Record<string, string> = {
    strength: '💪 力量训练',
    cardio: '🏃 有氧运动',
    yoga: '🧘 瑜伽',
    hiit: '🔥 HIIT',
    other: '🏋️ 其他',
  };
  return map[type] || type;
}

function getIntensityLabel(intensity: string): string {
  const map: Record<string, string> = {
    low: '低强度',
    medium: '中强度',
    high: '高强度',
  };
  return map[intensity] || intensity;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  recentCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  recentType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  recentDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  recentNotes: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  historyButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
});
