import { ScrollView, Share, Linking, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { useJobsStore } from '@/store/useJobsStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { FavoriteButton } from '@/components/FavoriteButton';
import { EmptyState } from '@/components/EmptyState';
import { JobCardId } from '@/components/JobCardId';
import { colors } from '@/theme/colors';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const jobId = Number(id);

  const job =
    useJobsStore((s) => s.allJobs.find((j) => j.id === jobId)) ??
    useFavoritesStore((s) => s.favorites.find((j) => j.id === jobId));

  useLayoutEffect(() => {
    if (!job) return;
    navigation.setOptions({
      title: job.title,
      headerRight: () => <FavoriteButton job={job} size={24} />,
    });
  }, [job, navigation]);

  if (!job) {
    return (
      <EmptyState
        title="Empleo no encontrado"
        message="Este empleo ya no está disponible."
        icon="briefcase-outline"
      />
    );
  }

  const handleShare = async () => {
    await Share.share({
      title: job.title,
      message: `Mira esta oferta: ${job.title} en ${job.company_name}\n${job.url}`,
    });
  };

  const handleApply = () => Linking.openURL(job.url);

  return (
    <ScrollView style={styles.scroll}>
      <JobCardId job={job} onShare={handleShare} onRedirect={handleApply} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
