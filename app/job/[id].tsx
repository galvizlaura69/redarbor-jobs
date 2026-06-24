import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useJobsStore } from '@/store/useJobsStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { FavoriteButton } from '@/components/FavoriteButton';
import { EmptyState } from '@/components/EmptyState';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CO', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const jobFromList = useJobsStore((s) =>
    s.jobs.find((j) => j.id === Number(id))
  );
  const jobFromFavorites = useFavoritesStore((s) =>
    s.favorites.find((j) => j.id === Number(id))
  );
  const job = jobFromList ?? jobFromFavorites;

  useLayoutEffect(() => {
    if (job) {
      navigation.setOptions({
        title: job.title,
        headerRight: () => <FavoriteButton job={job} size={24} />,
      });
    }
  }, [job]);

  if (!job) {
    return (
      <EmptyState
        title="Empleo no encontrado"
        message="Este empleo ya no está disponible."
        icon="briefcase-outline"
      />
    );
  }

  const handleApply = () => Linking.openURL(job.url);

  const handleShare = async () => {
    await Share.share({
      title: job.title,
      message: `Mira esta oferta: ${job.title} en ${job.company_name}\n${job.url}`,
    });
  };

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, sans-serif;
            font-size: 15px;
            color: #374151;
            line-height: 1.7;
            padding: 0 4px;
            margin: 0;
          }
          h1, h2, h3 { color: #1F2937; }
          a { color: #4F46E5; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; }
        </style>
      </head>
      <body>${job.description}</body>
    </html>
  `;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.companyRow}>
          {job.company_logo ? (
            <Image
              source={{ uri: job.company_logo }}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.logoFallback}>
              <Text style={styles.logoFallbackText}>
                {job.company_name.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.titleBlock}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company_name}</Text>
          </View>
        </View>

        <View style={styles.tags}>
          <View style={styles.tagCategory}>
            <Text style={styles.tagCategoryText}>{job.category}</Text>
          </View>
          {job.job_type && (
            <View style={styles.tagType}>
              <Text style={styles.tagTypeText}>{job.job_type}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#6B7280" />
          <Text style={styles.infoText}>
            {job.candidate_required_location || 'Mundial'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color="#6B7280" />
          <Text style={styles.infoText}>{formatDate(job.publication_date)}</Text>
        </View>
        {job.salary ? (
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={18} color="#6B7280" />
            <Text style={styles.infoText}>{job.salary}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionTitle}>Descripción del cargo</Text>
        <WebView
          source={{ html: htmlContent }}
          scrollEnabled={false}
          style={styles.webview}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Aplicar ahora</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={22} color="#4F46E5" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  logoFallback: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFallbackText: {
    color: '#4F46E5',
    fontWeight: '700',
    fontSize: 24,
  },
  titleBlock: {
    marginLeft: 16,
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  companyName: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tagCategory: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagCategoryText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  tagType: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagTypeText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  webview: {
    height: 600,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
});