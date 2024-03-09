# Project Details

This is a frontend coding assesment project for a company. The project is a simple web application that allows users to view a list of random users and view their profiles.

## How to run the project

- Clone the repository
- Run `yarn install` to install the dependencies
- Run `yarn build` to build the project
- Run `yarn start` to start the production server
- Open `http://localhost:3000` in your browser

## Technologies used

- React.js (Next.js)
- TypeScript
- Tailwind CSS
- Zustand
- React Icons
- Axios
- Country Flags - https://gitlab.com/catamphetamine/country-flag-icons
- Random User API - https://randomuser.me

## Features

- View a list of random users on Home page
- View user profile by clicking on a user
- Search for users by name
- Filter users by gender
- View user location on map
- View user's country flag

## Considerations

**API**
I used the Random User API to fetch random users. This API only gives us a single endpoint to fetch a list of user. It does have pagination support but there was no way to fetch a specific user by ID. I had to fetch the entire list of users (I fetched 1000 users) and store it in Zustand global store and then filter the user by ID to view the user's profile page. I also implemented the pagination on client side i.e. I fetched the entire list of users and then paginated the list on the client side from global store. This is not ideal for a production application but it works for this project.

**State Management**
I used Zustand for state management because it's a simple and lightweight state management library that works well with React. It is also easy to use and has a small API surface.

**Country Flags**:
I used this package for fetching country flags https://gitlab.com/catamphetamine/country-flag-icons. It's a simple package that provides SVG icons for country flags based on country's ISO2 code.
