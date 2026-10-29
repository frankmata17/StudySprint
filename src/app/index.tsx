import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

type GoalResult = 'completed' | 'partial' | 'not_yet';

let totalSprintsToday = 0;
let totalFocusMinutes = 0;
let lastSprintResult: GoalResult | null = null;
let lastSprintDuration = 0;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { result, duration } = useLocalSearchParams();

  const [sprintsToday, setSprintsToday] = useState(totalSprintsToday);
  const [focusMinutes, setFocusMinutes] = useState(totalFocusMinutes);
  const [lastResult, setLastResult] =
    useState<GoalResult | null>(lastSprintResult);
  const [lastDuration, setLastDuration] = useState(lastSprintDuration);

  const processedSprint = useRef<string | null>(null);

  useEffect(() => {
    const currentResult = Array.isArray(result) ? result[0] : result;
    const currentDuration = Array.isArray(duration) ? duration[0] : duration;

    if (!currentResult || !currentDuration) {
      return;
    }

    const minutes = Number(currentDuration);

    if (
      (currentResult === 'completed' ||
        currentResult === 'partial' ||
        currentResult === 'not_yet') &&
      (minutes === 25 || minutes === 50)
    ) {
      const sprintKey = `${currentResult}-${minutes}`;

      if (processedSprint.current === sprintKey) {
        return;
      }

      processedSprint.current = sprintKey;

      totalSprintsToday += 1;
      totalFocusMinutes += minutes;
      lastSprintResult = currentResult as GoalResult;
      lastSprintDuration = minutes;

      setSprintsToday(totalSprintsToday);
      setFocusMinutes(totalFocusMinutes);
      setLastResult(lastSprintResult);
      setLastDuration(lastSprintDuration);
    }
  }, [result, duration]);

  const colors = {
    background: isDark ? '#111111' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    secondaryText: isDark ? '#aaaaaa' : '#555555',
    card: isDark ? '#222222' : '#f2f2f2',
    button: isDark ? '#ffffff' : '#111111',
    buttonText: isDark ? '#111111' : '#ffffff',
  };

  const getResultText = () => {
    if (lastResult === 'completed') {
      return 'Goal completed 🎉';
    }

    if (lastResult === 'partial') {
      return 'Goal partially completed';
    }

    if (lastResult === 'not_yet') {
      return 'Goal not completed yet';
    }

    return '';
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.greeting, { color: colors.text }]}>
        Good evening 👋
      </Text>

      <Text style={[styles.title, { color: colors.text }]}>
        Ready to study?
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardLabel, { color: colors.secondaryText }]}>
          TODAY'S PROGRESS
        </Text>

        <Text style={[styles.focusTime, { color: colors.text }]}>
          {focusMinutes} min
        </Text>

        <Text style={[styles.description, { color: colors.secondaryText }]}>
          {sprintsToday}{' '}
          {sprintsToday === 1 ? 'study sprint' : 'study sprints'} completed
          today.
        </Text>
      </View>

      {lastResult && (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardLabel, { color: colors.secondaryText }]}>
            LAST SPRINT
          </Text>

          <Text style={[styles.result, { color: colors.text }]}>
            {getResultText()}
          </Text>

          <Text style={[styles.description, { color: colors.secondaryText }]}>
            {lastDuration} minutes focused
          </Text>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardLabel, { color: colors.secondaryText }]}>
          NEXT UP
        </Text>

        <Text style={[styles.assignment, { color: colors.text }]}>
          Biology Lab Report
        </Text>

        <Text style={[styles.description, { color: colors.secondaryText }]}>
          Due tomorrow • 25 min sprint
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => router.push('/sprint')}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Start a Sprint
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.assignmentsButton}
        onPress={() => router.push('/assignments')}
      >
        <Text
          style={[
            styles.assignmentsText,
            { color: colors.text },
          ]}
        >
          View Assignments
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
  greeting: {
    fontSize: 18,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  focusTime: {
    fontSize: 32,
    fontWeight: '700',
  },
  result: {
    fontSize: 20,
    fontWeight: '600',
  },
  assignment: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    marginTop: 4,
  },
  button: {
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  assignmentsButton: {
    padding: 16,
    alignItems: 'center',
  },
  assignmentsText: {
    fontSize: 16,
    fontWeight: '600',
  },
});