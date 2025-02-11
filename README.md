# Portfolio Project

## Description
This is a MERN stack portfolio project where users can:
- View blogs and specific blog posts
- View projects and specific project details
- Login using NextAuth with Google and GitHub authentication
- See messages saved in local storage
- Perform CRUD operations on blogs and projects

## Features
- **Authentication**: Users can log in using Google and GitHub via NextAuth.
- **Blog Management**: Users can view all blogs, view specific blog details, and perform CRUD operations on blogs.
- **Project Management**: Users can view all projects, view specific project details, and perform CRUD operations on projects.
- **Local Storage**: Messages are saved in local storage for quick access.

## Technologies Used
- **Frontend**: Next.js 15, Tailwind CSS
- **Authentication**: NextAuth
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Artreeus/portfolio-project.git
    ```

2. Navigate to the project directory:
    ```bash
    cd portfolio-project
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory and add the following environment variables:
    ```env
    NEXTAUTH_SECRET=http://localhost:3000
    MONGODB_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage
Once the project is set up and running, you can:
- Browse through the list of blogs and projects.
- Log in using your Google or GitHub account to access additional features.
- Create, read, update, and delete blogs and projects.
- View messages saved in local storage.

## Contribution
If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact me at [your-email@example.com].

---

Thank you for checking out my portfolio project!