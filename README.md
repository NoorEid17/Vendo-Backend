# Vendo-Backend

## Description

Vendo-Backend is a backend service for the Vendo application. It is built using Node.js, Express, and TypeORM, and connects to a MySQL database.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/vendo-backend.git
   cd vendo-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=password
   DB_NAME=mydatabase
   ```

## Usage

1. Start the server:

   ```sh
   npm start
   ```

2. The server will be running on `http://localhost:3000`.

## Configuration

Environment variables are used to configure the application. Default values are provided in the `config/config.ts` file. You can override these defaults by setting the corresponding variables in your `.env` file.

## Project Structure
