export interface Item {
  id: number;
  content: string;
  creationDate: string;
  modificationDate: string;
}

export interface ReactiveItem {
  id: number;
  selected: boolean;
}
const date = new Date().toString();

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export const data:Item[] = [
  { id: 1, content: "Items number ", creationDate: date, modificationDate: date },
  { id: 2, content: "Items number ", creationDate: date, modificationDate: date },
  { id: 3, content: "Items number ", creationDate: date, modificationDate: date },
  { id: 4, content: "Items number ", creationDate: date, modificationDate: date },
  { id: 5, content: "Items number ", creationDate: date, modificationDate: date },
];

type Operations = 'delete' | 'post' | 'put' | 'get';

export function dummyDatabase(operation: Operations, newReference: Item = { id: 0, content: '', creationDate: '', modificationDate: '' }): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => { // Simula la latencia de una base de datos
      const index = data.findIndex(item => item.id === newReference.id);

      switch (operation) {
        case 'put':
          if (index !== -1) {
            data[index] = newReference;
          }
          break;

        case 'delete':
          if (index !== -1) {
            data.splice(index, 1);
          }
          break;

        case 'post':
          if (!data.some(item => item.id === newReference.id)) {
            data.push(newReference);
          }
          break;
      }
      resolve(data);
    }, 500); // Simula medio segundo de espera
  });
}