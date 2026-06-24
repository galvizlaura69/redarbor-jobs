import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { JOB_TYPES } from '@/constants/api';
import { CATEGORIES } from '@/constants/api';



interface FilterBarProps {
  selectedCategory: string;
  selectedJobType: string;
  onSelectCategory: (category: string) => void;
  onSelectJobType: (jobType: string) => void;
}

interface OptionRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function OptionRow({ label, selected, onPress }: OptionRowProps) {
  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
        {label}
      </Text>
      {selected && <Ionicons name="checkmark" size={20} color="#4F46E5" />}
    </TouchableOpacity>
  );
}

export function FilterBar({
  selectedCategory,
  selectedJobType,
  onSelectCategory,
  onSelectJobType,
}: FilterBarProps) {
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<'category' | 'type'>('category');

  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempJobType, setTempJobType] = useState(selectedJobType);

  const activeCount = (selectedCategory ? 1 : 0) + (selectedJobType ? 1 : 0);

  const handleOpen = () => {
    setTempCategory(selectedCategory);
    setTempJobType(selectedJobType);
    setVisible(true);
  };

  const handleApply = () => {
    onSelectCategory(tempCategory);
    onSelectJobType(tempJobType);
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
        >
          <Ionicons
            name="options-outline"
            size={18}
            color={activeCount > 0 ? '#4F46E5' : '#6B7280'}
          />
          <Text style={[styles.filterButtonText, activeCount > 0 && styles.filterButtonTextActive]}>
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
              onPress={() => onSelectCategory('')}
            >
               <Text style={styles.activeChipText}>{selectedCategory}</Text>
              <Ionicons name="close" size={14} color="#4F46E5" />
            </TouchableOpacity>
          )}
          {selectedJobType && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={() => onSelectJobType('')}
            >
              <Text style={styles.activeChipText}>{selectedJobType}</Text>
              <Ionicons name="close" size={14} color="#4F46E5" />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tabItem, tab === 'category' && styles.tabItemActive]}
              onPress={() => setTab('category')}
            >
              <Text style={[styles.tabText, tab === 'category' && styles.tabTextActive]}>
                Categoría
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, tab === 'type' && styles.tabItemActive]}
              onPress={() => setTab('type')}
            >
              <Text style={[styles.tabText, tab === 'type' && styles.tabTextActive]}>
                Tipo de empleo
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.optionsList}>
            {tab === 'category' && (
              <>
                <OptionRow
                  label="Todas las categorías"
                  selected={tempCategory === ''}
                  onPress={() => setTempCategory('')}
                />
                {CATEGORIES.map((cat) => (
                  <OptionRow
                    key={cat.value}
                    label={cat.label}
                    selected={tempCategory === cat.value}
                    onPress={() =>
                      setTempCategory(tempCategory === cat.value ? '' : cat.value)
                    }
                  />
                ))}
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
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  filterButtonActive: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#4F46E5',
  },
  badge: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  activeChips: {
    flex: 1,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    gap: 4,
  },
  activeChipText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#4F46E5',
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
    borderBottomColor: '#F9FAFB',
  },
  optionLabel: {
    fontSize: 15,
    color: '#374151',
  },
  optionLabelSelected: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});