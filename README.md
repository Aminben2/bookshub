Cloud-Native Project README

Overview:

    Welcome to our cloud-native project! This project was developed collaboratively by Mohamed Amine Benomar and Mohamed Yassine Asnous. The aim of this project is to Develop a user-friendly web platform that serves as an online library, providing features for browsing, borrowing, purchasing, and managing books, enhancing accessibility to literature for all users..

Features:

    --> User Authentication: Allow users to sign up, log in, and manage their accounts securely.

    --> Book Catalog: Provide a comprehensive catalog of available books, including details such as title, author, genre, and availability status.

    --> Search Functionality: Implement a search feature to enable users to find specific books quickly.

    -->Book Details: Display detailed information about each book, including description, cover image, and reviews.

    --> Borrowing System: Enable users to borrow books from the library, with features for loan duration management and renewal.

    --> Buying Option: Offer users the ability to purchase books directly from the platform, with secure payment processing.

    --> Notifications: Send notifications to users for important events such as due dates for borrowed books or updates on purchased books.

    --> Admin Panel: Provide administrators with a dashboard to manage book inventory, user accounts, and overall system settings.

Setup Instructions:

    To run this project locally, follow these steps:
    Prerequisites:
        -- Docker installed on your machine
        -- Docker Compose installed on your machine
    Instructions:
        -- Clone the project repository from GitHub using the following command:
            git clone https://github.com/Aminben2/library
        -- Navigate to the project directory:
            cd library
    Additional Steps:
        -- Run the following command to build and start the Docker containers using Docker Compose:
            docker-compose up --build
    Once the containers are up and running, you should be able to access the web application locally in your browser using http://localhost:5173.

Usage:

    Registration/Login:
        If you're a new user, click on the "Sign Up" button to create an account. Otherwise, log in using your existing credentials.

    Browsing Books:
        Once logged in, you'll be redirected to the homepage where you can browse through the available books.
        Use the search bar to find specific books by title, author, or genre.

    Borrowing Books:
        To borrow a book, click on its title to view detailed information.
        If the book is available for borrowing, click on the "Borrow" button to add it to your      borrowed books list.  

    Admin Features (if applicable):
        If you have administrator privileges, you can access additional features such as managing book inventory and user accounts from the admin panel.
        To access the admin panel, log in using the following credentials:
            Username: admin
            Password: ADMIN@admin1

    Logout:
        Don't forget to log out of your account when you're done using the application. Click on the "Logout" button to securely log out.