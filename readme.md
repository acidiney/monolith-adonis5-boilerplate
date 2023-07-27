# Modular Monolithic Boilerplate

This is a boilerplate that follows the principles of Domain-Driven Design (DDD) and Clean Architecture. It has been developed using the Adonis v5 framework and Vue.js, and requires a minimum environment with Node.js 16, RabbitMQ, MongoDB, and MySQL.

## Technologies

- Adonis v5
- Lucid (ORM)
- MongoDB Client
- Amqp (RabbitMQ)
- Vue.js 3
- Inertia.js

## Requirements

To use this boilerplate, make sure you have the following minimum requirements installed:

- \>= Node.js 16
- RabbitMQ
- MongoDB
- MySQL
- Linux (Linux environment is mandatory due to the FileSystem)

## Study Requirements

- TDD
- DDD
- Clean Arch
- Asynchronous Messaging (Optional, the boilerplate abstracts a lot)

## Installation

Follow the steps below to install and set up the project:

1. Clone the repository.
2. Navigate to the project folder.
3. Run the command `npm install` to install the dependencies.
4. Run the command `node ace migration:run` to migrate the migrations to the database.
5. Run the command `node ace db:sync` to synchronize the data from the seeders to the database.
6. Configure the environment files if necessary.
7. Run the command `npm run dev` to start the server.

> For the Linux environment, you may need to install build-essentials to provide the system with more development resources, such as `make`, for example.

## Project Structure

The project has the following directory structure:

- `app`: Contains all application modules.
  - `core`: Essential functions for the boilerplate's operation.
  - `infra`: Global functions of the framework.
  - `modules`: System modules.
    - `auth`: Authentication module with username and password, already incorporated.
    - `admin`: Available administrative module with complete ACL (Access Control List) configuration.
    - `@shared`: Code sharing between all application modules.
    - `addons`: Location where all modules not incorporated by default will be installed. These modules are ignored by Git.
- `commands`: Custom commands for execution in the project.
- `config`: Application configuration files.
- `contract`: Contracts and interfaces used by the modules.
- `providers`: Service and dependency providers.
- `resources`: Static resources, such as style files and images.
- `start`: Server startup and configuration files.
- `tests`: Automated tests (e2e, unit).

## Module Structure

Each module inside the `app/modules` folder follows a specific structure:

- `moduleName`:
  - `domain`:
    - `entities`: Module-specific domain entities.
    - `value-objects`: Module-specific value objects.
    - `usecases`: Declaration of use cases, their errors, inputs, and outputs.
    - `events`: Declaration of domain events.
  - `usecases`: Implementation of use cases using the ports and adapters pattern.
  - `framework`:
    - `infra`:
      - `db`: Migrations, seeders, models, mappers, and module-specific repositories.
      - `jobs`: Job registration using BullMQ.
      - `listeners`: Implementation of domain events.
      - `resources`: Email templates.
      - `services`: Additional service implementations.
    - `adapters`: Implementation of adapters for external libraries.
    - `main`:
      - `controllers`: Standard Adonis.js controllers.
      - `i18n`: Translation files for each language.
      - `validations`: Module-specific validations.
      - `router.ts`: File that registers routes, automatically read by the boilerplate's IoC.
      - `events.ts`: File to register domain events, automatically read by the boilerplate's IoC.
      - `socket.ts`: File to add real-time features using Socket.io, automatically read by the boilerplate's IoC.
    - `views`: Pages developed with Vue.js, rendered as an SPA using Inertia.js.

- `package.json`: Each module can have its own dependencies defined within this file. This is especially relevant for modules in the `addons` folder.

## Development

When developing your application with this boilerplate, it is recommended to follow the principles of DDD and Clean Architecture. The existing modules can be used as a reference to create new modules.

You can add new modules to the `app/modules/addons` folder, using the structure described above. Make sure your modules follow the principles of DDD and Clean Architecture, separating responsibilities correctly and maintaining modularity.

## Special Commands

The boilerplate has some special commands that can be executed to facilitate specific tasks during the project's development. These commands are useful for installing module dependencies, installing and updating addons, and synchronizing database seeders.

### Command `node ace addon:install:deps`

The command `node ace addon:install:deps` is used to install all dependencies of all modules installed in the project. This ensures that all necessary dependencies for the modules to work are automatically installed.

Example of use:
```
node ace addon:install:deps
```

### Command `node ace addon:install <addon-name>`

The command `node ace addon:install <addon-name>` is used to install a new addon in the project. This command simplifies the process of installing a specific addon, allowing you to easily add new features to the boilerplate.

Example of use:
```
node ace addon:install addon-name
```

### Command `node ace addon:update <addon-name>`

The command `node ace addon:update <addon-name>` is used to update an addon already installed in the project. With this command, you can keep the addons up to date with the latest versions, ensuring bug fixes and feature improvements.

Example of use:
```
node ace addon:update addon-name
```

### Command `node ace db:sync`

The command `node ace db:sync` is used to run only the seeders that have not been executed at the project level. This command is useful for synchronizing the current state of the database with changes in the seeders, allowing controlled and consistent updates to the database.

Example of use:
```
node ace db:sync
```

### Conclusion

The special commands provided by the boilerplate facilitate some common tasks during the project's development. They allow you to install module dependencies, add new addons, update addons, and synchronize database seeders. Use these commands as needed to streamline your workflow and improve efficiency in the project's development.

## Communication Between Modules

Communication between the boilerplate modules occurs asynchronously, using the Outbox and Inbox patterns to ensure reliable and resilient exchange of information.

### Outbox and Inbox Patterns

The Outbox pattern is used when one module needs to inform another module about a specific action or event. When a module wants to send a message to another module, it registers this message in the Outbox. The Outbox then uses RabbitMQ, an asynchronous messaging system, to send this message to the destination module.

Upon receiving the message, the destination module places it in the Inbox for later processing. The Inbox is responsible for storing received messages and ensuring they are processed without loss.

This way, the modules can communicate independently, without the need for direct coupling. Each module can register relevant messages in the Outbox and receive corresponding messages in the Inbox, allowing efficient and flexible communication between different components of the system.

#### Study Requirements

To deepen

 the study of the Outbox and Inbox patterns, it is recommended to research and read about the following topics:

- Outbox Pattern: Exploration of the Outbox pattern and how it is used to ensure the delivery of asynchronous messages between modules.
- Inbox Pattern: Understanding of the Inbox pattern and how it is responsible for receiving and processing messages sent by other modules.
- RabbitMQ: Study of the RabbitMQ messaging tool, used by the Outbox to send and receive messages between modules.

These topics will provide a solid foundation for understanding and implementing asynchronous communication between the boilerplate's modules, ensuring a scalable and resilient architecture.

### Note

It is important to note that only the `@shared` module of the boilerplate is directly used, as it is part of the boilerplate itself. The other modules should communicate with each other using the Outbox and Inbox patterns, providing appropriate separation of responsibilities and promoting modularity and decoupling.

## Patterns and Design

In this boilerplate, some patterns and conventions are adopted to ensure code consistency and clarity. These patterns include the naming of database tables and the file naming style. Additionally, the declaration of use cases in the domain follows an organized namespace structure to include the contract, input, output, and related errors.

### Naming of Database Tables

In the database, all tables should be prefixed with the name of the module that precedes them. For example, all native tables of the boilerplate are prefixed with `core_`, such as `core_users` and `core_roles`. This naming pattern helps organize and differentiate tables related to each module.

### File Naming Style

The boilerplate adopts the file naming style in lowercase with dash-case (separation by hyphens). Regardless of the file type, such as models, controllers, services, validations, translations, etc., all should follow this pattern. For example: `user-model.js`, `auth-controller.js`, `email-service.js`.

This naming convention aids readability and organization of the project's files, making it easier to locate and identify each component.

### Declaration of Use Cases in the Domain

For the declaration of use cases in the domain, a pattern involving namespaces is used to include different parts related to the specific use case. This structure helps maintain well-defined responsibilities and facilitates understanding of the data flow.

The namespaces include the contract (contract), input, output, and errors related to the specific use case. This organization makes it easier to locate and group parts related to a specific use case, improving maintainability and scalability of the system.

The adoption of these patterns and conventions contributes to the consistency and organization of the source code in the project, facilitating development and maintenance. By following these practices, you will have more readable, cohesive, and understandable code, providing a better development experience and promoting effective collaboration among team members.

### Commits Conventional with Angular Conventional Commits

In the boilerplate, we adopt the conventional commits style using Angular Conventional Commits. This approach standardizes the way we write commit messages, making them more descriptive, consistent, and easy to understand.

#### Commit Conventions

We follow the following conventions for writing commit messages:

- `fix`: Used for bug fixes.
- `feat`: Used for adding a new feature.
- `docs`: Used for documentation changes.
- `chore`: Used for maintenance tasks, such as updating dependencies.
- `refactor`: Used for code refactorings.
- `style`: Used for changes related to code styles (spacing, formatting, etc.).
- `test`: Used for adding or modifying tests.

In addition to these prefixes, we also use an optional scope to indicate the module or component affected by the change. This helps identify the areas of the project impacted by the commit more easily.

#### Example of Commit Message

Below is an example of how a commit message can be structured:

```
feat(auth): Add password recovery functionality
```

In this example, the commit adds a new feature in the authentication module related to password recovery.

## Tests

The boilerplate has support for automated tests. Each module should have its own test folder with corresponding tests for each part of the module.

- Unit tests: Use the Jest framework to write unit tests for your modules.
- Integration tests: Use the Japa framework (from Adonis) to write integration tests for your modules.
- End-to-end (e2e) tests: Use the Playwright and Japa libraries to write e2e tests for your modules.

Make sure to keep the tests separated by type and located in the correct folders within the `tests` directory.

## Contribution

If you encounter any issues or have suggestions for improvements to the boilerplate, feel free to contribute. Open a new issue or send a pull request with your changes.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Updated on July 7, 2023

Acidiney Dias
