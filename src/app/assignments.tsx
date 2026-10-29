import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { assignments } from '@/data/assignments';

export default function AssignmentsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    background: isDark ? '#111111' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    secondaryText: isDark ? '#aaaaaa' : '#555555',
    card: isDark ? '#222222' : '#f2f2f2',
    button: isDark ? '#ffffff' : '#111111',
    buttonText: isDark ? '#111111' : '#ffffff',
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Assignments
      </Text>

      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        Keep track of what you need to get done.
      </Text>

      <View style={styles.list}>
        {assignments.map((assignment) => (
          <TouchableOpacity
            key={assignment.id}
            style={[
              styles.card,
              { backgroundColor: colors.card },
            ]}
            onPress={() => {
              // We'll make this open assignment details later.
            }}
          >
            <Text
              style={[
                styles.course,
                { color: colors.secondaryText },
              ]}
            >
              {assignment.course}
            </Text>

            <Text
              style={[
                styles.assignmentTitle,
                { color: colors.text },
              ]}
            >
              {assignment.title}
            </Text>

            <View style={styles.details}>
              <Text
                style={[
                  styles.detail,
                  { color: colors.secondaryText },
                ]}
              >
                {assignment.due}
              </Text>

              <Text
                style={[
                  styles.detail,
                  { color: colors.secondaryText },
                ]}
              >
                {assignment.estimatedTime}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.button },
        ]}
        onPress={() => router.push('/add-assignment')}
      >
        <Text
          style={[
            styles.buttonText,
            { color: colors.buttonText },
          ]}
        >
          + Add Assignment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text
          style={[
            styles.backText,
            { color: colors.secondaryText },
          ]}
        >
          Back
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
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 28,
  },
  list: {
    gap: 12,
  },
  card: {
    padding: 20,
    borderRadius: 16,
  },
  course: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  detail: {
    fontSize: 14,
  },
  button: {
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    fontSize: 16,
  },
});