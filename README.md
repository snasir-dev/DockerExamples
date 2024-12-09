# DockerExamples

**DockerExamples** is a collection of Dockerized projects showcasing practical setups for learning and development. The repository includes examples of fullstack applications like MERN (MongoDB, ExpressJS, React, Node.js), .NET with PostgreSQL, microservices architectures highlighting inter-container communication, and monitoring solutions with Prometheus and Grafana. It showcases practical applications using Docker Compose, NGINX, and modern development tools for real-world containerization and orchestration insights.

## Prerequisites

Before running any of the projects, ensure the following prerequisites are met:

- Docker installed on your machine: [Get Docker](https://docs.docker.com/get-docker/)
- **Docker Desktop** (mandatory for Windows and macOS users): [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/snasir95/DockerExamples.git
   cd DockerExamples
   ```

2. Ensure Docker is running on your machine.

## Running the Projects

1. Navigate to any project folder containing a `docker-compose.yaml` file (e.g., `docker-react-vite-project`, `docker-mongodb-express`).

2. Use the following command to build and start the Docker containers:

   ```bash
   docker-compose up --build -d
   ```

3. To stop and remove the containers, use:
   ```bash
   docker-compose down
   ```

## Example Projects

- **docker-react-vite-project**: React frontend with a Vite setup.
- **docker-mongodb-express**: Backend service using Node.js/Express and MongoDB.
- **docker-fullstack-NEXTjs**: A full-stack project leveraging Next.js.

Each folder is independently runnable and includes all necessary configurations.

## License

This repository is licensed under the MIT License.
