import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { assignments } from '@/data/assignments';

export default function AddAssignmentScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const colors = {
    background: isDark ? '#111111' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    secondaryText: isDark ? '#aaaaaa' : '#555555',
    input: isDark ? '#222222' : '#f2f2f2',
    button: isDark ? '#ffffff' : '#111111',
    buttonText: isDark ? '#111111' : '#ffffff',
    error: '#d32f2f',
  };

  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim() || !course.trim()) {
      setError('Please enter an assignment name and course.');
      return;
    }

    assignments.push({
      id: Date.now().toString(),
      title: title.trim(),
      course: course.trim(),
      due: dueDate.trim() || 'No due date',
      estimatedTime: estimatedTime.trim() || 'Time not estimated',
    });

    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Add Assignment
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>
        Assignment Name
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            color: colors.text,
          },
        ]}
        placeholder="e.g. Biology Lab Report"
        placeholderTextColor={colors.secondaryText}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, { color: colors.text }]}>
        Course
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            color: colors.text,
          },
        ]}
        placeholder="e.g. BIO 101"
        placeholderTextColor={colors.secondaryText}
        value={course}
        onChangeText={setCourse}
        autoCapitalize="characters"
      />

      <Text style={[styles.label, { color: colors.text }]}>
        Due Date
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            color: colors.text,
          },
        ]}
        placeholder="e.g. September 30"
        placeholderTextColor={colors.secondaryText}
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Text style={[styles.label, { color: colors.text }]}>
        Estimated Study Time
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            color: colors.text,
          },
        ]}
        placeholder="e.g. 50 min"
        placeholderTextColor={colors.secondaryText}
        value={estimatedTime}
        onChangeText={setEstimatedTime}
      />

      {error !== '' && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.button },
        ]}
        onPress={handleSave}
      >
        <Text
          style={[
            styles.buttonText,
            { color: colors.buttonText },
          ]}
        >
          Save Assignment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text
          style={[
            styles.cancelText,
            { color: colors.secondaryText },
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  error: {
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 18,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
  },
});