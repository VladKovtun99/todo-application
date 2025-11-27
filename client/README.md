# Client

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## Configuration

This application uses runtime configuration loaded from `/config.json`. This allows you to deploy the same build to different environments without rebuilding.

### Configuration Files

- **`public/config.json`** - Production configuration (deployed to Firebase)
- **`public/config.dev.json`** - Development configuration (for local development)

### Switching Between Configurations

For **local development**, rename or copy `config.dev.json` to `config.json`:

```bash
cp public/config.dev.json public/config.json
```

For **production deployment**, ensure `config.json` contains production values (API URL, etc.).

### Configuration Structure

```json
{
  "production": true,
  "googleApi": {
    "clientId": "your-client-id",
    "apiKey": "your-api-key",
    "discoveryDoc": "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    "scopes": "https://www.googleapis.com/auth/calendar"
  },
  "apiUrl": "https://your-api-url.com/api"
}
```

The configuration is loaded at application startup via `AppConfigService` before any components are initialized.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
