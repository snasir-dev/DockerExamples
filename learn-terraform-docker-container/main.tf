# Official Terraform Quick Start Tutorial - Source: https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#quick-start-tutorial

# Define required providers for this Terraform configuration
terraform {
  required_providers {
    docker = {
      # Specify the source of the Docker provider.
      # "kreuzwerker/docker" is a community-maintained provider on the Terraform Registry.
      source = "kreuzwerker/docker"

      # Use version 3.x of the Docker provider, but not 4.0 or newer.
      version = "~> 3.0.1"
    }
  }
}

# Configure the Docker provider
provider "docker" {
  # On Windows, Docker is exposed through a named pipe (Windows-specific).
  # This connects Terraform to the local Docker Engine.
  host = "npipe:////.//pipe//docker_engine"
}

# Pull the official nginx Docker image from Docker Hub
resource "docker_image" "nginx" {
  # Name of the Docker image to pull
  name = "nginx"

  # Don't keep the image locally after container is removed (optional)
  keep_locally = false
}

# Create a Docker container using the nginx image
resource "docker_container" "nginx" {
  # Use the image ID from the docker_image resource above
  image = docker_image.nginx.image_id

  # Name to assign to the running container - This is what will show up under "Name" in Docker Desktop or when running `docker ps`
  name = "learn-terraform-docker-container"

  # Map ports: host port 8000 -> container port 80
  ports {
    internal = 80   # Port exposed by the nginx container
    external = 8000 # Port exposed on your local machine
  }
}

#====================================================
# Steps to run this Terraform configuration (IMPORTANT MUST RUN WITHIN THE DIRECTORY WHERE THIS FILE IS LOCATED):
# 1. Initialize Terraform to download the Docker provider - Initialize the project, which downloads a plugin called a provider that lets Terraform interact with Docker.
#   terraform init

# 1b. Run 'terraform plan' to see what Terraform will do without making any changes. This needs Docker Desktop to be running or will fail. 
#   terraform plan   

# 2. Provision the NGINX server container with apply. When Terraform asks you to confirm type yes and press ENTER.
# Note: This will ask to confirm the action. Will show output similar to 'terraform plan'. Once we type 'yes' will create the container.
#   terraform apply  
# To skip the confirmation prompt can use this command instead.
#   terraform apply -auto-approve 

# 3. Verify the existence of the NGINX container by visiting localhost:8000 in your web browser or running 'docker ps' to see the container.

# 4. To clean up and remove the created docker container:
#   terraform destroy -auto-approve

# To clean up the .terraform folder and the terraform.tfstate files run command:
#   rm -rf .terraform terraform.tfstate terraform.tfstate.backup
#====================================================
