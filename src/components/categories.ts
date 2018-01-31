interface Mapping {
  color?: string;
}

const mapping: { [categoryId: string]: Mapping } = {
  good: { color: 'green' },
  bad: { color: 'red' },
  actions: { color: 'blue' },
};

const defaultMapping: Mapping = {};

export function getCategoryColor(categoryId: string) {
  return (mapping[categoryId] || defaultMapping).color;
}
