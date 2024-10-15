# InterIIT Dev Team Selection Task
> ### Warehouse Tree-view application

### Tech Used
* Frontend: React.js
* Backend: Node.js, Express.js
* Database: MongoDB
* Styling: Custom CSS for animations and transitions for smooth UI interactions.
* Version Control: Managed via GitHub for source code tracking and collaboration.
* Deployment: The application is containerized using Docker and deployed on DigitalOcean. It uses Caddy as a reverse proxy and and static file server handling SSL termination, and domain hosting is set up via freedomain.one.

### How to Run Locally
#### Prerequisites
* Docker and Docker Compose installed on your machine.

#### Steps to Run the Project

1. Clone the repository:
    ```
    git clone https://github.com/moonfraction/Warehouse_treeview_app.git
    cd Warehouse_treeview_app
    ```
2. Configure enviroment variables:
    * For each directory containing a `sample.env` file (`./mern-godown-backend`, `./mern-godown-frontend`, and `./`), copy it to `.env` in the same location:
    ```
    cp mern-godown-backend/sample.env mern-godown-backend/.env
    cp mern-godown-frontend/sample.env mern-godown-frontend/.env
    cp ./sample.env ./.env
    ```
3. Run the application: Use Docker Compose to build and run the services.
    ```
    docker-compose up --build -d
    ```
4. The application will be accessible at:
    * `https://warehousetree.localhost` for the frontend.
    * `https://api.warehousetree.localhost` for the API.
5. Stop the application
    ```
    docker-compose down
    ```

### Deployment Links
[Frontend](https://warehousetree.work.gd/)
[Backend](https://api.warehousetree.work.gd/)

### Demonstration

[Demo-video link](https://drive.google.com/file/d/14drASK0hx7bFdMfkC5sMDGhSDFougD0F/view?usp=sharing)