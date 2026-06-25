import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Job } from '../types/jobs';
import { FavoriteButton } from './FavoriteButton';
import { colors } from '@/theme/colors';
import { formatDate } from '@/utils/date';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const showLogo = Boolean(job.company_logo) && !imageError;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/job/${job.id}`)}
      style={styles.card}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${job.title} en ${job.company_name}`}
    >
      <View style={styles.header}>
        <View style={styles.companyRow}>
          {showLogo ? (
            <Image
              source={{ uri: job.company_logo! }}
              style={styles.logo}
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={styles.logoFallback}>
              <Ionicons name="briefcase-outline" size={24} color={colors.gray500} />
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
          <Ionicons name="location-outline" size={13} color={colors.gray400} />
          <Text style={styles.metaText}>
            {job.candidate_required_location || 'Worldwide'}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={13} color={colors.gray400} />
          <Text style={styles.metaText}>{formatDate(job.publication_date)}</Text>
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
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray100,
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
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray800,
  },
  company: {
    fontSize: 14,
    color: colors.gray500,
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
    color: colors.gray400,
    marginLeft: 4,
  },
  tags: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  categoryTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  typeTag: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
  },
});
