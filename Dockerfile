# Use an official lightweight Python image
FROM python:3.10-slim

# Set system environment variables to optimize Python inside Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies needed for parsing PDFs or compiling binaries
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy only the requirements first to leverage Docker caching layers
COPY requirements.txt /app/

# Install Python package dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your FastAPI application code
COPY . /app/

# Expose the default FastAPI port (usually 8000)
EXPOSE 8000

# Command to run your FastAPI application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
