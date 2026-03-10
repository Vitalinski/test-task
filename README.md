Test Task
Description

Login: To log in, use the username and phone number of any user from [JSONPlaceholder Users API](https://jsonplaceholder.typicode.com/users).

User Info: After login, the top section displays the logged-in user’s information.

Todos: The todos are displayed in a table using list virtualization, rendering 10 items at a time for better performance.

Features

Favorites: Click the ❤️/🤍 icon on a todo to toggle favorite status. Favorite todo`s ids are saved in localStorage, items can be viewed using the Favorites filter.

Filters: Multiple filters (status, user, search, favorites) work together, combining their criteria to show the final result.

Empty/loading States: Handled states when there are no todos or when filters return no results. Loading states for table and buttons.

Routing & Protection: Includes a NotFoundPage and route protection to prevent access to the todos page without logging in.

Error Handling: API errors are caught and handled gracefully.
