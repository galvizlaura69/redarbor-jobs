import { ScrollView, View, StyleSheet } from 'react-native';
import { Category } from '../types/jobs';
import { FilterChip } from './FilterChip';

const JOB_TYPES = ['full-time', 'contract', 'part-time', 'freelance', 'internship'];

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  selectedJobType: string;
  onSelectCategory: (category: string) => void;
  onSelectJobType: (jobType: string) => void;
}

export function FilterBar({
  categories,
  selectedCategory,
  selectedJobType,
  onSelectCategory,
  onSelectJobType,
}: FilterBarProps) {
  return (
    <View style={styles.container}>
      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <FilterChip
          label="All categories"
          selected={selectedCategory === ''}
          onPress={() => onSelectCategory('')}
        />

        {categories.map((cat) => (
          <FilterChip
            key={cat.id}
            label={cat.name}
            selected={selectedCategory === cat.slug}
            onPress={() =>
              onSelectCategory(
                selectedCategory === cat.slug ? '' : cat.slug
              )
            }
          />
        ))}
      </ScrollView>

      {/* Job types */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <FilterChip
          label="All types"
          selected={selectedJobType === ''}
          onPress={() => onSelectJobType('')}
        />

        {JOB_TYPES.map((type) => (
          <FilterChip
            key={type}
            label={type}
            selected={selectedJobType === type}
            onPress={() =>
              onSelectJobType(selectedJobType === type ? '' : type)
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  scroll: {
    paddingHorizontal: 16,
  },
});