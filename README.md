# Node Express Mongoose Template

This is a template for building applications using Node.js, Express, and Mongoose. It includes a structured approach to organizing your code and handling your MongoDB database with Mongoose.

## Features

- Organized project structure
- Mongoose as ORM for MongoDB
- Bunyan for logging
- Environment-specific configurations

## Configuration

### Development

- Define required variables in `development.json`.

### Production

- Define required variables as environment variables in your remote setup.

## Database

- **MongoDB**

## Project Structure

- `models`: Contains Mongoose model definitions.
- `controllers`: Contains business logic for handling requests.
- `routes`: Contains Express route definitions, which should correspond to controllers.
- `middlewares`: Contains custom middleware functions.
- `config`: Contains configuration files and settings.

## Logging

- All logging should be done using `req.log`, which utilizes Bunyan.
- For model-level logging, pass `req.log` to underlying layers.

## Contributing

We welcome contributions to this project. To maintain consistency and quality, please follow these guidelines:

1. **Models**: Every MongoDB collection should have a corresponding Mongoose model in the `models` folder.
2. **Controllers and Routes**: The `controllers` and `routes` folders should mirror each other. Each route in `routes` should have a corresponding file or folder in `controllers`.
3. **Logging**: Use `req.log` for logging purposes. For model-level operations, ensure `req.log` is passed to the required layers.

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
