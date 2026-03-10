Test Task
Description

This project is a Todo App built with Vue 3 and TypeScript.

Login: To log in, use the name and phone number of any user from JSONPlaceholder Users API.

User Info: After login, the top section displays the logged-in user’s information.

Todos: The bottom section shows a table of todos.

Features

Favorites: Click the ❤️/🤍 icon on a todo to toggle favorite status. Favorite todo`s ids are saved in localStorage, items can be viewed using the Favorites filter.

Filters: Multiple filters (status, user, search, favorites) work together, combining their criteria to show the final result.

Empty/loading States: Handled states when there are no todos or when filters return no results. Loading states for table and buttons.

Routing & Protection: Includes a NotFoundPage and route protection to prevent access to the todos page without logging in.

Error Handling: API errors are caught and handled gracefully.