
# Docker Prometheus Monitoring Integration

This project is based on the [Prometheus 101: Introduction](https://getanteon.com/blog/prometheus-101-introduction/) article, which provides an excellent guide for getting started with Prometheus for monitoring. Below is an outline of how this project is set up and how to run it.

## Overview

Prometheus is an open-source system monitoring and alerting toolkit, originally built at SoundCloud. It collects and stores metrics as time series data, providing powerful querying and alerting capabilities. This project integrates Prometheus with Docker for system monitoring, using containers to run both Prometheus and exporters like Node Exporter.

## Key Features

- **Prometheus Server**: The main component that scrapes and stores metrics from various sources.
- **Node Exporter**: A tool that collects hardware and OS metrics, which can be scraped by Prometheus.
- **Docker Integration**: Prometheus and its exporters are set up to run in Docker containers, simplifying deployment and configuration.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository/DockerExamples.git
cd docker-prometheus-monitoring-setup
```

### 2. Pull Prometheus and Node Exporter Docker Images

```bash
docker pull prom/prometheus
docker pull prom/node-exporter
```

### 3. Start Node Exporter

```bash
docker network create prometheus-demo
docker run -d -p 9100:9100 --net prometheus-demo --name=node_exporter prom/node-exporter
```

### 4. Start Prometheus Server

```bash
docker run -d -p 9090:9090 --net prometheus-demo --name=prometheus -v \$(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

### 5. Access Prometheus Dashboard

- Open your browser and navigate to `http://localhost:9090`.
- You can now monitor the metrics collected by Prometheus.

## Prometheus Configuration

The Prometheus configuration file (`prometheus.yml`) defines the scrape configurations and targets. Here's a simple example of how the configuration looks for scraping the Node Exporter:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['node_exporter:9100']
```

## References

This project is inspired by the article [Prometheus 101: Introduction](https://getanteon.com/blog/prometheus-101-introduction/#introduction-d5024e9e-23e8-4241-bbf1-1cf824a230d9). It provides a comprehensive guide to setting up and understanding the basics of Prometheus.

