                    Movie Finder Application
                        Overview
The Movie Finder application is designed to address common issues users face when searching for movie information. It provides a user-friendly interface for searching movies, viewing detailed information, and managing user authentication. The application features various components to enhance the user experience, including authentication forms, genre filtering, movie cards, and search functionality.

                    Features
User Authentication: Allows users to register, log in, and manage their accounts. Includes functionality for password reset and logout.
Search Functionality: Enables users to search for movies by title and filter results by genre.
Movie Details: Displays comprehensive information about each movie, including posters, ratings, and overviews.
Responsive Design: Fully responsive design for optimal viewing on desktops, tablets, and mobile phones.
                Components
AuthenticationForm

Handles user authentication, including login, registration, password reset, and logout.
Provides error handling and feedback messages.
GenreFilter

Allows users to filter movies by genre.
Provides a dropdown menu for selecting genres.
MovieCard

Displays movie details such as title, poster, overview, rating, and release date.
Includes functionality to toggle between a truncated and full overview of the movie.
MovieList

Renders a list of MovieCard components in a responsive grid layout.
Displays a message when no movies are found.
SearchBar

Provides a search input field for users to search for movies by title.
                Technology Stack
Frontend:
React: JavaScript library for building interactive user interfaces.
Tailwind CSS: Utility-first CSS framework for designing a modern and responsive UI.
Firebase: Used for authentication and user management.
