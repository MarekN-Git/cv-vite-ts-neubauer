# CV Project - Marek Neubauer

This project was developed using **React**, **Vite**, and **TypeScript**.
It serves as a demonstration of my skills in developing functional, responsive, and secure web applications.

### Getting Started with `docker-compose up -d`

## Libraries Used

- **Material UI & Icons**: For UI components and styling.
- **TanStack Query**: For data fetching and caching.
- **JWT Decode**: To decode JSON Web Tokens.
- **React Hook Form**: For form handling and validation.
- **Zustand**: For state management.
- **Prettier**: For code formatting.

## Docker Setup

- **Spring Backend**: Provides the API for the frontend.
- **Nginx**: Serves the frontend and handles routing.

## Features

- **Car Overview and Details**: View a list of cars with detailed information.
- **Filtering and Sorting**: Easily filter and sort the car list.
- **User Authentication**: Login using Basic Auth and verify access with Bearer Auth.
- **Session Persistence**: User state is maintained even after a page reload, as the token is stored in `localStorage`.
- **Role-Based Access**:
    - **User**: Has no special permissions.
    - **Admin**: Can add, edit, and delete cars from the list via the Cars Manager.

## Login Credentials

- **Admin**:
    - Email: `admin@email.com`
    - Password: `a1234`
- **User**:
    - Email: `user@email.com`
    - Password: `u1234`

## Simulated API Request Delays

To simulate real-world scenarios, API request delays have been added:

- `user/login`: 1 second
- `user/details/{id}`: 2 seconds
- `car/cars`: No delay
- `car/remove/{id}`: 1 second
- `car/create`: 1 second
