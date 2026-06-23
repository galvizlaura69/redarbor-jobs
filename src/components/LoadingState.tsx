import { View, StyleSheet } from 'react-native';

function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar} />
        <View style={styles.textBlock}>
          <View style={styles.lineLarge} />
          <View style={styles.lineSmall} />
        </View>
      </View>

      <View style={styles.lineFull} />
      <View style={styles.lineMedium} />
    </View>
  );
}

interface LoadingStateProps {
  count?: number;
}

export function LoadingState({ count = 6 }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  textBlock: {
    marginLeft: 12,
    flex: 1,
  },
  lineLarge: {
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    width: '75%',
    marginBottom: 8,
  },
  lineSmall: {
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    width: '50%',
  },
  lineFull: {
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    width: '100%',
    marginBottom: 8,
  },
  lineMedium: {
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    width: '65%',
  },
});