# [Enyata Academy API](https://documenter.getpostman.com/view/9053858/UVJZpz8g)

## Introduction

[Enyata Academy API](https://documenter.getpostman.com/view/9053858/UVJZpz8g) is a HTTP REST API built for the Enyata Academy platform, it consists of different endpoints which is plugged into the frontend.

## Overview

**What you can do with this API:**

- Signup as a user
- Signin as user
- Signin as an Admin e.t.c

## [Documentation](https://documenter.getpostman.com/view/9053858/UVJZpz8g)

[Read more in the documentation.](https://documenter.getpostman.com/view/9053858/UVJZpz8g)

## Set Up Development

- Check that the latest version on nodejs is installed:

```
  node --version
  >> v14.4.0 or greater
```

- Clone the enyata-academy repo and cd into it:

```bash
  git clone https://github.com/MoyinoluwaA/Enyata-Academy-Project-T2-Backend
  cd Enyata-Academy-Project-T2-Backend
```

- Install dependencies:

```bash
  npm install
```

- Create a `.env` file in the root folder and add all the configuration in the `.env.example` file to it. Make sure you replace the values with the right values:

```
  # General settings
    DATABASE_URL = <DATABASE_URL> Use a postgres database
    ADMIN_FIRSTNAME = <ADMIN_FIRSTNAME>
    ADMIN_LASTNAME = <ADMIN_LASTNAME>
    ADMIN_EMAIL = <ADMIN_EMAIL>
    ADMIN_PASSWORD = <ADMIN_PASSWORD>
    ADMIN_PHONE = <ADMIN_PHONE>
    TOKEN_KEY = <TOKEN_KEY>
    MAIL_HOST = <mail_host>
    MAIL_PORT = <mail_port>
    SMTP_USERNAME = <smtp_username>
    SMTP_PASSWORD = <smtp_password>
    CLIENT_URL = <CLIENT_URL>

```

- Run the application with the command:

```
  npm start
```
