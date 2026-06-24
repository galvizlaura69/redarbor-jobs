import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

import type { Job } from '@/types/jobs';

interface Props {
    job: Job;
    onShare: () => void;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CO', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

export function JobCardId({ job, onShare }: Props) {
    const [imageError, setImageError] = useState(false); 

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
        <View>
            <View style={styles.headerSection}>
                <View style={styles.companyRow}>
                    {job.company_logo && !imageError ? (
                        <Image
                            source={{ uri: job.company_logo }}
                            style={styles.logo}
                            resizeMode="contain"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <View style={styles.logoFallback}>
                            <Ionicons
                                name="briefcase-outline"
                                size={28}
                                color="#4F46E5"
                            />
                        </View>
                    )}

                    <View style={styles.titleBlock}>
                        <Text style={styles.jobTitle}>{job.title}</Text>
                        <Text style={styles.companyName}>
                            {job.company_name}
                        </Text>
                    </View>
                </View>
                <View style={styles.tags}>
                    <View style={styles.tagCategory}>
                        <Text style={styles.tagCategoryText}>
                            {job.category}
                        </Text>
                    </View>

                    {job.job_type && (
                        <View style={styles.tagType}>
                            <Text style={styles.tagTypeText}>
                                {job.job_type}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* INFO */}
            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={18} color="#6B7280" />
                    <Text style={styles.infoText}>
                        {job.candidate_required_location || 'Mundial'}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                    <Text style={styles.infoText}>
                        {formatDate(job.publication_date)}
                    </Text>
                </View>

                {job.salary && (
                    <View style={styles.infoRow}>
                        <Ionicons name="cash-outline" size={18} color="#6B7280" />
                        <Text style={styles.infoText}>{job.salary}</Text>
                    </View>
                )}
            </View>

            {/* DESCRIPTION */}
            <View style={styles.descriptionSection}>
                <Text style={styles.descriptionTitle}>
                    Descripción del cargo
                </Text>

                <WebView
                    source={{ html: htmlContent }}
                    scrollEnabled={false}
                    style={{ height: 600 }}
                />
            </View>

            {/* ACTIONS */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={onShare} style={styles.shareButton}>
                    <Ionicons name="share-outline" size={22} color="#4F46E5" />
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
        color: '#6B7280',
    },
    descriptionSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    actions: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    shareButton: {
        backgroundColor: '#F3F4F6',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
});