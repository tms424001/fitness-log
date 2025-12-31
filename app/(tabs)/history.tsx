import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';
import { WorkoutLog } from '../../src/types/workout';

const WORKOUT_TYPE_LABELS: Record<string, string> = {
  strength: '💪 力量训练',
  cardio: '🏃 有氧运动',
  yoga: '🧘 瑜伽',
  hiit: '🔥 HIIT',
  other: '🏋️ 其他',
};

const INTENSITY_LABELS: Record<string, string> = {
  low: '低强度',
  medium: '中强度',
  high: '高强度',
};

const INTENSITY_COLORS: Record<string, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

export default function History() {
  const { workouts, loading, error, fetchWorkouts, removeWorkout } = useWorkoutStore();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDelete = (workout: WorkoutLog) => {
    Alert.alert(
      '确认删除',
      `确定要删除这条记录吗？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeWorkout(workout.id);
              Alert.alert('成功', '记录已删除');
            } catch (err) {
              Alert.alert('错误', err instanceof Error ? err.message : '删除失败');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: WorkoutLog }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.workoutType}>
            {WORKOUT_TYPE_LABELS[item.workout_type] || item.workout_type}
          </Text>
          <View
            style={[
              styles.intensityBadge,
              { backgroundColor: INTENSITY_COLORS[item.intensity] || '#6B7280' },
            ]}
          >
            <Text style={styles.intensityText}>
              {INTENSITY_LABELS[item.intensity] || item.intensity}
            </Text>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.workout_date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.duration_min} 分钟</Text>
          </View>
        </View>

        {item.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            📝 {item.notes}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  if (loading && workouts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchWorkouts}>
          <Text style={styles.retryButtonText}>点击重试</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="fitness" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>暂无健身记录</Text>
            <Text style={styles.emptySubtext}>快去添加你的第一条记录吧！</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={fetchWorkouts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
  },
  errorText: {
    marginTop: 12,
    color: '#EF4444',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  intensityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  intensityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  notes: {
    marginTop: 12,
    fontSize: 14,
    color: '#4B5563',
    fontStyle: 'italic',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});
