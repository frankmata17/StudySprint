import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

type GoalResult = 'completed' | 'partial' | 'not_yet';
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

export default function CompleteScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { duration } = useLocalSearchParams();

  const durationMinutes = getValidDuration(duration);

  const colors = {
    background: isDark ? '#111111' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    secondaryText: isDark ? '#aaaaaa' : '#555555',
    button: isDark ? '#ffffff' : '#111111',
    buttonText: isDark ? '#111111' : '#ffffff',
  };

  const handleResult = (result: GoalResult) => {
    router.replace({
      pathname: '/',
      params: {
        result,
        duration: durationMinutes.toString(),
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.emoji}>🎉</Text>

      <Text style={[styles.title, { color: colors.text }]}>
        Sprint Complete!
      </Text>

      <Text style={[styles.time, { color: colors.secondaryText }]}>
        {durationMinutes} minutes focused
      </Text>

      <Text style={[styles.question, { color: colors.text }]}>
        Did you accomplish your goal?
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => handleResult('completed')}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Yes, I did!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => handleResult('partial')}
      >
        <Text style={[styles.secondaryText, { color: colors.secondaryText }]}>
          Partially
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => handleResult('not_yet')}
      >
        <Text style={[styles.secondaryText, { color: colors.secondaryText }]}>
          Not yet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace('/')}
      >
        <Text style={[styles.homeText, { color: colors.text }]}>
          Back to Home
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
  emoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 16,
  },
  time: {
    fontSize: 18,
    marginTop: 8,
  },
  question: {
    fontSize: 17,
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 16,
  },
  homeButton: {
    marginTop: 24,
  },
  homeText: {
    fontSize: 16,
    fontWeight: '600',
  },
});