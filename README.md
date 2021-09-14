# Weather Vortex Client

Client for Weather Vortex Project.

| Branch | Status                                                                                                                                                                                                                                   | Link                                                                               |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `main` | [![Deploy to Github Pages](https://github.com/Weather-Vortex/weather-vortex-client/actions/workflows/deploy.yml/badge.svg?branch=main&event=push)](https://github.com/Weather-Vortex/weather-vortex-client/actions/workflows/deploy.yml) | [Weather Vortex Client](https://weather-vortex.github.io/weather-vortex-client/#/) |

---

**Table of Contents**

- [How To](#how-to)
  - [Project setup](#project-setup)
  - [Develop](#compiles-and-hot-reloads-for-development)
  - [Test](#test-project)
  - [Build](#compiles-and-minifies-for-production)

## How To

### Project setup

After clone this project, run this command to install all necessary dependencies:

```
npm i
```

### Compiles and hot-reloads for development

This command enable hot-reloads!

> After have modified a source file, save any change and wait for reloading. You'll see your changes in your browser without reloading the page.

```
npm run serve
```

### Test project

To run unit tests, use this command:

```
npm run test:unit
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Containerization

To build your container: `sudo docker build -t antonioparolisi/wv-client .`

To run your container: `sudo docker run -it -p 8080:80 antonioparolisi/wv-client`

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
