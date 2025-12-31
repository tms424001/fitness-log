import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';

const WORKOUT_TYPES = [
  { value: 'strength', label: '💪 力量' },
  { value: 'cardio', label: '🏃 有氧' },
  { value: 'yoga', label: '🧘 瑜伽' },
  { value: 'hiit', label: '🔥 HIIT' },
  { value: 'other', label: '🏋️ 其他' },
];

const INTENSITIES = [
  { value: 'low', label: '低' },
  { value: 'medium', label: '中' },
  { value: 'high', label: '高' },
];

export default function AddWorkout() {
  const router = useRouter();
  const { addWorkout, loading } = useWorkoutStore();

  const [workoutType, setWorkoutType] = useState('strength');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState('medium');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async () => {
    // 验证
    const durationNum = parseInt(duration, 10);
    if (!durationNum || durationNum <= 0) {
      Alert.alert('错误', '请输入有效的时长');
      return;
    }

    try {
      await addWorkout({
        workout_type: workoutType,
        duration_min: durationNum,
        intensity,
        notes: notes.trim() || undefined,
        workout_date: date,
      });
      Alert.alert('成功', '记录已保存！', [
        { text: '确定', onPress: () => router.push('/history') },
      ]);
    } catch (err) {
      Alert.alert('错误', (err as Error).message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 日期 */}
      <View style={styles.field}>
        <Text style={styles.label}>日期</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* 运动类型 */}
      <View style={styles.field}>
        <Text style={styles.label}>运动类型</Text>
        <View style={styles.optionsRow}>
          {WORKOUT_TYPES.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.optionButton,
                workoutType === type.value && styles.optionButtonActive,
              ]}
              onPress={() => setWorkoutType(type.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  workoutType === type.value && styles.optionTextActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 时长 */}
      <View style={styles.field}>
        <Text style={styles.label}>时长（分钟）</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="number-pad"
          placeholder="例如：30"
        />
      </View>

      {/* 强度 */}
      <View style={styles.field}>
        <Text style={styles.label}>强度</Text>
        <View style={styles.optionsRow}>
          {INTENSITIES.map((int) => (
            <TouchableOpacity
              key={int.value}
              style={[
                styles.optionButton,
                styles.intensityButton,
                intensity === int.value && styles.optionButtonActive,
              ]}
              onPress={() => setIntensity(int.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  intensity === int.value && styles.optionTextActive,
                ]}
              >
                {int.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 备注 */}
      <View style={styles.field}>
        <Text style={styles.label}>备注（可选）</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="今天练了什么？感觉如何？"
          multiline
          numberOfLines={3}
        />
      </View>

      {/* 提交按钮 */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>保存记录</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  intensityButton: {
    flex: 1,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
