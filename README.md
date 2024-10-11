# Godown Management Project

This project is a Godown Management System developed using Next.js. It helps in managing inventory, tracking stock levels, and organizing warehouse operations efficiently.

## Features

- **Inventory Management**: Search and analyze inventory.
- **User Authentication**: Secure login and registration for users (not implemented yet).
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side development.

## Project Structure
```
./godown-management
├── /src
│   ├── /app
│   │   ├── /assets
│   │   ├── /database
│   │   |   ├── godowns.json
│   │   |   └── items.json
│   │   ├── /login
│   │   |   ├── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
├── .gitignore
├── package.json
└── README.md
```

## Database Schema

The application utilizes three tables in the database:

### 1. `godown`

| Column        | Type   |
|---------------|--------|
| id            | Integer |
| name          | String  |
| parent_godown | String (Allows null) |

### 2. `items`

| Column                | Type    |
|-----------------------|---------|
| brand                 | String  |
| category              | String  |
| godown_id             | Integer |
| item_id               | Integer |
| image_url             | String  |
| name                  | String  |
| price                 | Decimal |
| quantity              | Integer |
| status                | String  |
| attributes.age_range  | String  |
| attributes.battery_required | Boolean |
| attributes.color      | String  |
| attributes.dimensions | String  |
| attributes.material    | String  |
| attributes.size       | String  |
| attributes.type       | String  |
| attributes.voltage     | Decimal |
| attributes.warranty_years | Integer |
| attributes.wattage    | Decimal |


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/godown-management.git
    ```
2. Navigate to the project directory:
    ```bash
    cd godown-management
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Running the Project

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact

For any inquiries or support, please contact [shrehanofficial@gmail.com](mailto:shrehanofficial@gmail.com).
