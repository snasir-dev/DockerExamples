# Docker Static HTML Site with NGINX

This project is a simple static HTML website hosted in a Docker container using NGINX. The purpose of this project is to help understand Docker fundamentals, such as building images, running containers, and using Docker volumes to sync files between a host machine and the container.

## Project Structure

```bash
.
├── Dockerfile # Instructions to build the Docker image
├── docker-compose.yml # Docker Compose file to orchestrate containers
├── index.html # The static HTML file that will be served
```

## Requirements

To run this project, you’ll need the following tools installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/snasir95/docker-hello-world.git
cd docker-hello-world
```

### 2. Run the Project

You can run the project using two different methods: via Docker Compose or manually by building the Docker image and running the container.

#### Option 1: Using Docker Compose

> [!NOTE]
> This is the recommended method.

1. In your terminal, navigate to the project directory and run:
   ```bash
   docker-compose up --build -d
   ```
1. Open a browser and visit: http://localhost:9000

1. Any changes made to index.html on your local machine will automatically be reflected in the browser because of Docker volume mounts.

#### Option 2: Manually Building and Running the Docker Image

If you want to manually build the Docker image and run it:

1. Build the Docker image:

   ```bash
   docker build -t docker-hello-world-img:1.0 .
   ```

1. Run the Docker container, mounting the volume from your local machine:

   ```bash
   docker run --name nginx-docker-hello -v "C:/path/to/your/project:/usr/share/nginx/html:ro" -d -p 9000:80 docker-hello-world-img:1.0
   ```

1. Open a browser and visit: http://localhost:9000

## File Explanation

- `index.html`: This file contains the HTML content for your static site.
- `Dockerfile`: Defines the base image (NGINX on Alpine), sets the working directory, and copies the static files to NGINX's default directory.
- `docker-compose.yml`: This file simplifies running the project by specifying services, build instructions, volume mounts, and port mapping.

### How It Works

- **Dockerfile**: It uses an official NGINX image based on Alpine Linux for lightweight and efficient performance. The HTML file is copied into the default NGINX serving directory, and NGINX is set up to serve the site.

- **Volume Mount**: The project directory is mounted as a volume, so any changes made to the `index.html` file are immediately reflected in the running container. This is handled using the `-v` flag in the `docker run` command or the volume section in the docker-compose.yml file.

## Clean Up

To stop and remove the container and image, run:

```bash
# For Option 1: Using Docker Compose
docker-compose down
```

Or, if you used the manual method:

```bash
# For Option 2: Manually Building and Running the Docker Image
docker rm -f nginx-docker-hello
docker rmi docker-hello-world-img:1.0
```

## Conclusion

This project demonstrates the basics of running a static website using Docker, NGINX, and volume mounts for easy development. Experiment with this setup to further your understanding of Docker.
