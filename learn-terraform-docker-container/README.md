# Instructions to run terraform-docker-container tutorial
Source for Tutorial: [(Official Docs) Terraform Quick Start Tutorial](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#quick-start-tutorial)

Open terminal in the same folder as this file.

## Prerequisites

To run Docker on your Windows 10 machine, you must use the Windows Subsystem for Linux (WSL2).  
Download and install WSL2 before moving on:  [Install WSL2 (Microsoft Docs)](https://learn.microsoft.com/en-us/windows/wsl/install)

Download Docker Desktop for Windows: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

After you install Terraform and Docker on your local machine, start Docker Desktop by searching for **Docker** from your **Start Menu** and selecting **Docker Desktop** in the search results.

When the whale icon appears in the system tray and stops animating, Docker Desktop is up and running, and is accessible from any terminal window (e.g., Git Bash or WSL2 shell).

For more information on Docker Desktop requirements for Windows, visit: [Docker Desktop on Windows - Docker Docs](https://docs.docker.com/desktop/install/windows-install/)


Run:

```
terraform init   # Initialize the provider and configuration
terraform plan   # See what Terraform will do
terraform apply  # Apply the changes (type 'yes' when prompted)
```
Then visit: http://localhost:8000