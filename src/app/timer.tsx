import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

type SprintDuration = 25 | 50;

function getValidDuration(
  value: string | string[] | undefined
): SprintDuration {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsedValue = Number(rawValue);

  if (parsedValue === 25 || parsedValue === 50) {
    return parsedValue;
  }

  return 25;
}

export default function TimerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { duration } = useLocalSearchParams();

  const durationMinutes = getValidDuration(duration);

  const [secondsRemaining, setSecondsRemaining] = useState(
    durationMinutes * 60
  );

  const [isPaused, setIsPaused] = useState(false);

  const colors = {
    background: isDark ? '#111111' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    secondaryText: isDark ? '#aaaaaa' : '#555555',
    button: isDark ? '#ffffff' : '#111111',
    buttonText: isDark ? '#111111' : '#ffffff',
  };

  useEffect(() => {
    if (isPaused || secondsRemaining <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((seconds) => {
        if (seconds <= 1) {
          clearInterval(interval);
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const goToComplete = () => {
    router.push({
      pathname: '/complete',
      params: {
        duration: durationMinutes.toString(),
      },
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.course, { color: colors.secondaryText }]}>
        BIO 101
      </Text>

      <Text style={[styles.title, { color: colors.text }]}>
        Biology Lab Report
      </Text>

      <Text style={[styles.goal, { color: colors.secondaryText }]}>
        Write the introduction and methods section.
      </Text>

      <Text style={[styles.timer, { color: colors.text }]}>
        {formattedTime}
      </Text>

      <Text style={[styles.status, { color: colors.secondaryText }]}>
        {secondsRemaining === 0
          ? 'SPRINT COMPLETE'
          : isPaused
            ? 'PAUSED'
            : 'FOCUS'}
      </Text>

      {secondsRemaining > 0 && (
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.button },
          ]}
          onPress={() => setIsPaused(!isPaused)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: colors.buttonText },
            ]}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.finishButton}
        onPress={goToComplete}
      >
        <Text
          style={[
            styles.finishText,
            { color: colors.secondaryText },
          ]}
        >
          {secondsRemaining === 0 ? 'Continue' : 'Finish Early'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  course: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  goal: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 320,
  },
  timer: {
    fontSize: 72,
    fontWeight: '700',
    marginTop: 60,
    fontVariant: ['tabular-nums'],
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  button: {
    marginTop: 60,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  finishButton: {
    marginTop: 24,
    padding: 16,
  },
  finishText: {
    fontSize: 16,
  },
});