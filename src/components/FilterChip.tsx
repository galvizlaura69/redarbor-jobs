import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
      ]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#4F46E5', 
    borderColor: '#4F46E5',
  },
  chipUnselected: {
    backgroundColor: '#fff',
    borderColor: '#E5E7EB', 
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280', 
  },
  textSelected: {
    color: '#fff',
  },
});