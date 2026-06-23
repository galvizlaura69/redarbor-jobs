import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { Category } from '../types/jobs';

const JOB_TYPES = ['full-time', 'contract', 'part-time', 'freelance', 'internship'];

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  selectedJobType: string;
  onSelectCategory: (category: string) => void;
  onSelectJobType: (jobType: string) => void;
}

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-3 py-1.5 rounded-full border mr-2 ${
        selected
          ? 'bg-indigo-600 border-indigo-600'
          : 'bg-white border-gray-200'
      }`}
    >
      <Text
        className={`text-xs font-medium ${
          selected ? 'text-white' : 'text-gray-600'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function FilterBar({
  categories,
  selectedCategory,
  selectedJobType,
  onSelectCategory,
  onSelectJobType,
}: FilterBarProps) {
  return (
    <View className="mb-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="mb-2"
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
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