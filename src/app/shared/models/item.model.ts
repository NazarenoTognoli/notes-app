export interface Item {
  id: string;
  content: string;
  title: string;
  modificationDate: string;
}

export interface ReactiveItem {
  id: string;
  selected: boolean;
}
const date = new Date().toString();

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export const data:Item[] = [];

type Operations = 'delete' | 'post' | 'put' | 'get';

export function dummyDatabase(operation: Operations, newReference: Item = data[0]): Promise<Item[]> {
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
          } else {
            console.error("new reference required");
          }
          break;
      }
      resolve(data);
    }, 500); // Simula medio segundo de espera
  });
}