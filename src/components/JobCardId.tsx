import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useState, useMemo } from 'react';

import type { Job } from '@/types/jobs';
import { colors } from '@/theme/colors';
import { formatDate } from '@/utils/date';

interface JobCardIdProps {
  job: Job;
  onShare: () => void;
  onRedirect: () => void;
}

function buildHtmlContent(description: string): string {
  return `
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
      <body>${description}</body>
    </html>
  `;
}

export function JobCardId({ job, onShare, onRedirect }: JobCardIdProps) {
  const [imageError, setImageError] = useState(false);

  const showLogo = Boolean(job.company_logo) && !imageError;
  const htmlContent = useMemo(() => buildHtmlContent(job.description), [job.description]);
  const publishedDate = useMemo(
    () => formatDate(job.publication_date, 'es-CO', { month: 'long', day: 'numeric', year: 'numeric' }),
    [job.publication_date]
  );

  return (
    <View>
      <View style={styles.headerSection}>
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
              <Ionicons name="briefcase-outline" size={28} color={colors.primary} />
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
          <Ionicons name="location-outline" size={18} color={colors.gray500} />
          <Text style={styles.infoText}>
            {job.candidate_required_location || 'Mundial'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color={colors.gray500} />
          <Text style={styles.infoText}>{publishedDate}</Text>
        </View>

        {job.salary ? (
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={18} color={colors.gray500} />
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
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onRedirect}
          style={styles.applyButton}
          accessibilityRole="button"
          accessibilityLabel="Aplicar a este empleo"
        >
          <Text style={styles.applyButtonText}>Aplicar ahora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onShare}
          style={styles.shareButton}
          accessibilityRole="button"
          accessibilityLabel="Compartir empleo"
        >
          <Ionicons name="share-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
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
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    marginLeft: 16,
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.gray800,
  },
  companyName: {
    fontSize: 15,
    color: colors.gray500,
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tagCategory: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagCategoryText: {
    fontSize: 12,
    color: colors.primary,
  },
  tagType: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagTypeText: {
    fontSize: 12,
    color: colors.success,
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    color: colors.gray500,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.gray800,
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
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: colors.gray100,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
});
