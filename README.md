# NotesApp

In this web app you can perform CRUD operations on notes with a great UX, responsive design and reactive elements to various conditionals to ensure a focus on usability.

This app is the frontend side of a Restful API made in ASP.NET, SQL and Entity Framework, the backend side should be in a public repo at the same [Github Profile](https://github.com/NazarenoTognoli).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Instructions

Instructions for how to use the APP UI below.

### Notes Creation

- Click "Add" to start the creation of a note, the editor will open.
- Fill the fields to add the data of the note.
- Click "Confirm" to finish the creation of the note or click "Cancel" to cancel the creation. 

### Notes Removing (At least one selected note is required)

- Click "select" to enter selection mode or hover a note and then click the checkbox to enter selection mode.
- Click "cancel" while the selection mode is active to turn off the selection mode.

- Click the checkbox of a note to select it.

- Click "del" to remove a selected note.

### Notes Editing and Reading

- Click the body of the note you want to modify to enter editing mode, the editor will open.
- Fill the fields to change the data of the note.
- Click "Confirm" to confirm the editing of the note or click "Cancel" to cancel the editing.

### Filter notes by content and by title

- Click the search-bar at the left-top of the UI.
- Fill the field with the value you want to find.
- Click the "X" at the right of search-bar to quit the filter or remove the value of the field to do it.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
