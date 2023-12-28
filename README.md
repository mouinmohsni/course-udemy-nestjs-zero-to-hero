<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
    <h1>Course Udemy NestJS Zero to Hero - Modern TypeScript Back-end Development</h1>
    </p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).



### Nest.js Cheatsheet

## Nest CLI

- `npm i -g @nestjs/cli`

## Packages

- `npm add class-validator class-transformer`
- `npm add typeorm @nestjs/typeorm mysql2`
- `npm add @nestjs/mapped-types`
- `npm add install bcrypt`
- ## JWT
- `npm add @nestjs/jwt @nestjs/passport passport passport-jwt`
- `npm add @types/passport-jwt`
- ## env
- `npm install -g cross-env`
- `npm add @nestjs/config`

## Commands

- `npm run start:dev` / `yarn start:dev` / 
- `nest generate controller` / `nest g co` /  `nest g controller <name>`
- `nest generate service` / `nest g s` / `nest g s`/ `nest g service <name> --no-spec`
- `nest generate modue <name>` / `nest g mo` /`nest g modue <name>`
- `nest g class address/dto/create-address.dto --no-spec`

## Decorators

- `@Injectable()`: Make a resource injectable via DI
- `@Controller('route')`:
- `@Get()`, `@Post('user/:id/update')`
- `@HttpCode(HttpStatus.GONE)`: Change http status
- `@Param() params`: All url params, `@Param('id')`: Only id param
- `@Query() params`: All url params, `@Query('id')`: Only id param
- `@Body() body`: All body values, `@Body('id')`: Only id value
- `@Res() response`: Response object from express
- `@IsNumber()`, `@IsString()`: Validations

## Imports
- `import { Body, Controller, Get, Param, Post } from '@nestjs/common';`
- `import { IsNumber, IsString } from 'class-validator';` - Validation

## help link
[How to create custom (separate file) repository in NestJS 9 with TypeORM 0.3.x](https://stackoverflow.com/questions/74542474/how-to-create-custom-separate-file-repository-in-nestjs-9-with-typeorm-0-3-x)


