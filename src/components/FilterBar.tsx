import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { JOB_TYPES } from '@/constants/api';
import { colors } from '@/theme/colors';
import { useJobsStore } from '@/store/useJobsStore';

interface FilterBarProps {
  selectedCategory: string;
  selectedJobType: string;
  onApply: (category: string, jobType: string) => void;
  onClearCategory: () => void;
  onClearJobType: () => void;
}

interface OptionRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function OptionRow({ label, selected, onPress }: OptionRowProps) {
  return (
    <TouchableOpacity
      style={styles.optionRow}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
        {label}
      </Text>
      {selected && <Ionicons name="checkmark" size={20} color={colors.primary} />}
    </TouchableOpacity>
  );
}

type FilterTab = 'category' | 'type';

export function FilterBar({
  selectedCategory,
  selectedJobType,
  onApply,
  onClearCategory,
  onClearJobType,
}: FilterBarProps) {
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<FilterTab>('category');
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempJobType, setTempJobType] = useState(selectedJobType);

  const categories = useJobsStore((s) => s.categories);
  const categoriesLoaded = useJobsStore((s) => s.categoriesLoaded);
  const loadCategories = useJobsStore((s) => s.loadCategories);

  const activeCount = (selectedCategory ? 1 : 0) + (selectedJobType ? 1 : 0);

  useEffect(() => {
    if (visible) loadCategories();
  }, [visible]);

  const handleOpen = () => {
    setTempCategory(selectedCategory);
    setTempJobType(selectedJobType);
    setVisible(true);
  };

  const handleApply = () => {
    onApply(tempCategory, tempJobType);
    setVisible(false);
  };

  const handleClear = () => {
    setTempCategory('');
    setTempJobType('');
  };

  const handleClose = () => {
    setTempCategory(selectedCategory);
    setTempJobType(selectedJobType);
    setVisible(false);
  };

  return (
    <>
      <View style={styles.triggerRow}>
        <TouchableOpacity
          style={[styles.filterButton, activeCount > 0 && styles.filterButtonActive]}
          onPress={handleOpen}
          accessibilityRole="button"
          accessibilityLabel={`Filtros${activeCount > 0 ? `, ${activeCount} activos` : ''}`}
        >
          <Ionicons
            name="options-outline"
            size={18}
            color={activeCount > 0 ? colors.primary : colors.gray500}
          />
          <Text
            style={[
              styles.filterButtonText,
              activeCount > 0 && styles.filterButtonTextActive,
            ]}
          >
            Filtros
          </Text>
          {activeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeChips}>
          {selectedCategory && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={onClearCategory}
              accessibilityRole="button"
              accessibilityLabel={`Quitar filtro ${selectedCategory}`}
            >
              <Text style={styles.activeChipText}>{selectedCategory}</Text>
              <Ionicons name="close" size={14} color={colors.primary} />
            </TouchableOpacity>
          )}
          {selectedJobType && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={onClearJobType}
              accessibilityRole="button"
              accessibilityLabel={`Quitar filtro ${selectedJobType}`}
            >
              <Text style={styles.activeChipText}>{selectedJobType}</Text>
              <Ionicons name="close" size={14} color={colors.primary} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity
              onPress={handleClose}
              accessibilityRole="button"
              accessibilityLabel="Cerrar filtros"
            >
              <Ionicons name="close" size={24} color={colors.gray800} />
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            {(['category', 'type'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tabItem, tab === t && styles.tabItemActive]}
                onPress={() => setTab(t)}
                accessibilityRole="tab"
                accessibilityState={{ selected: tab === t }}
              >
                <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                  {t === 'category' ? 'Categoría' : 'Tipo de empleo'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.optionsList}>
            {tab === 'category' && (
              <>
                <OptionRow
                  label="Todas las categorías"
                  selected={tempCategory === ''}
                  onPress={() => setTempCategory('')}
                />
                {!categoriesLoaded ? (
                  <ActivityIndicator
                    style={styles.loader}
                    color={colors.primary}
                  />
                ) : (
                  categories.map((cat) => (
                    <OptionRow
                      key={cat.id}
                      label={cat.name}
                      selected={tempCategory === cat.name}
                      onPress={() =>
                        setTempCategory(tempCategory === cat.name ? '' : cat.name)
                      }
                    />
                  ))
                )}
              </>
            )}

            {tab === 'type' && (
              <>
                <OptionRow
                  label="Todos los tipos"
                  selected={tempJobType === ''}
                  onPress={() => setTempJobType('')}
                />
                {JOB_TYPES.map((type) => (
                  <OptionRow
                    key={type.value}
                    label={type.label}
                    selected={tempJobType === type.value}
                    onPress={() =>
                      setTempJobType(tempJobType === type.value ? '' : type.value)
                    }
                  />
                ))}
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Limpiar filtros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Ver resultados</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: colors.white,
    gap: 6,
  },
  filterButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray500,
  },
  filterButtonTextActive: {
    color: colors.primary,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  activeChips: {
    flex: 1,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    gap: 4,
  },
  activeChipText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  modal: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray800,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray400,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  optionsList: {
    flex: 1,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray50,
  },
  optionLabel: {
    fontSize: 15,
    color: colors.gray700,
  },
  optionLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  loader: {
    marginTop: 32,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray500,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
});
