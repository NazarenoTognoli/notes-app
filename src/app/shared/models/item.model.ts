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

export const data:Item[] = [
  {id:generateId(), title:"title one", modificationDate:date, content:"The placeholder is text shown when the <mat-form-field> label is floating but the input is empty. It is used to give the user an additional hint about what they should type in the input. The placeholder can be specified by setting the placeholder attribute on the <input> or <textarea> element. In some cases that <mat-form-field> may use the placeholder as the label (see the form field label documentation)."},
  {id:generateId(), title:"title two", modificationDate:date, content:"The <mat-form-field> allows you to associate error messages with your matNativeControl. By default, these error messages are shown when the control is invalid and the user has interacted with (touched) the element or the parent form has been submitted. If you wish to override this behavior (e.g. to show the error as soon as the invalid control is dirty or when a parent form group is invalid), you can use the errorStateMatcher property of the matNativeControl. The property takes an instance of an ErrorStateMatcher object. An ErrorStateMatcher must implement a single method isErrorState which takes the FormControl for this matNativeControl as well as the parent form and returns a boolean indicating whether errors should be shown. (true indicating that they should be shown, and false indicating that they should not.)"},
  {id:generateId(), title:"title three", modificationDate:date, content:"A global error state matcher can be specified by setting the ErrorStateMatcher provider. This applies to all inputs. For convenience, ShowOnDirtyErrorStateMatcher is available in order to globally cause input errors to show when the input is dirty and invalid."}
];

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
          }
          break;
      }
      resolve(data);
    }, 500); // Simula medio segundo de espera
  });
}