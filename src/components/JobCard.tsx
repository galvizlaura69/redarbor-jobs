import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../types/jobs';
import { FavoriteButton } from './FavoriteButton';

interface JobCardProps {
  job: Job;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/job/${job.id}`)}
      style={styles.card}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.companyRow}>
          {job.company_logo ? (
            <Image
              source={{ uri: job.company_logo }}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.logoFallback}>
              <Text style={styles.logoText}>
                {job.company_name.charAt(0)}
              </Text>
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {job.title}
            </Text>
            <Text style={styles.company} numberOfLines={1}>
              {job.company_name}
            </Text>
          </View>
        </View>

        <FavoriteButton job={job} size={22} />
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={13} color="#9CA3AF" />
          <Text style={styles.metaText}>
            {job.candidate_required_location || 'Worldwide'}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={13} color="#9CA3AF" />
          <Text style={styles.metaText}>
            {formatDate(job.publication_date)}
          </Text>
        </View>
      </View>

      <View style={styles.tags}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{job.category}</Text>
        </View>

        {job.job_type && (
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>{job.job_type}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  logoFallback: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#4F46E5',
    fontSize: 18,
    fontWeight: '700',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  company: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  tags: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  categoryTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  typeTag: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
});