import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function SprintScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedMinutes, setSelectedMinutes] = useState(25);

  const colors = {
    background: isDark ? '#111111' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    secondaryText: isDark ? '#aaaaaa' : '#555555',
    card: isDark ? '#222222' : '#f2f2f2',
    button: isDark ? '#ffffff' : '#111111',
    buttonText: isDark ? '#111111' : '#ffffff',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.secondaryText }]}>
        NEXT SPRINT
      </Text>

      <Text style={[styles.title, { color: colors.text }]}>
        Biology Lab Report
      </Text>

      <Text style={[styles.subtitle, { color: colors.text }]}>
        What do you want to accomplish?
      </Text>

      <View style={[styles.goalBox, { backgroundColor: colors.card }]}>
        <Text style={[styles.goal, { color: colors.text }]}>
          Write the introduction and methods section.
        </Text>
      </View>

      <Text style={[styles.subtitle, { color: colors.text }]}>
        Choose your sprint length
      </Text>

      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: colors.card },
            selectedMinutes === 25 && {
              borderWidth: 2,
              borderColor: colors.text,
            },
          ]}
          onPress={() => setSelectedMinutes(25)}
        >
          <Text style={[styles.optionText, { color: colors.text }]}>
            25 min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: colors.card },
            selectedMinutes === 50 && {
              borderWidth: 2,
              borderColor: colors.text,
            },
          ]}
          onPress={() => setSelectedMinutes(50)}
        >
          <Text style={[styles.optionText, { color: colors.text }]}>
            50 min
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() =>
          router.push({
            pathname: '/timer',
            params: {
              duration: selectedMinutes.toString(),
            },
          })
        }
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Begin {selectedMinutes}-Minute Sprint
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={[styles.cancelText, { color: colors.secondaryText }]}>
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
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 10,
  },
  goalBox: {
    padding: 18,
    borderRadius: 14,
  },
  goal: {
    fontSize: 16,
    lineHeight: 24,
  },
  options: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    fontWeight: '600',
  },
  button: {
    marginTop: 32,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
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