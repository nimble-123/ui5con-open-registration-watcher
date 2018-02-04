# ui5con-open-registration-watcher

A simple website crawler to watch the ui5con website for open registration.

## How to use this tiny helper

Clone this repo

```sh
git clone git@github.com:nlsltz/ui5con-open-registration-watcher.git
cd ui5con-open-registration-watcher
```

Create your `.env` file from the example and edit to your preferences

```sh
cp .env.example .env
```

### Build and start from source

Install dependencies (i am using `yarn` instead of `npm`)

```sh
yarn
```

Start the application

```sh
yarn start
```

### Run as Docker Container

Start the service through `docker-compose` or build the image by your own and run it. Make sure you have set up the `.env` file before you run the service whether through `docker-compose` or by plain the `docker` command.

```sh
docker-compose up
```

```sh
docker build -t ui5con-open-registration-watcher .
docker run --env-file ./.env -p 3000:3000 -d ui5con-open-registration-watcher
```

### Access the web application

Point your browser to `http://localhost:3000/`. If everything went right you should see the web ui like in the screenshot below.

![Web UI](https://i.imgur.com/NgaaCph.png "Web UI build /w OpenUI5 Framework")

### Access the API

Trigger a GET request to `http://localhost:3000/api/v1/checkRegistration` with your prefered tool.

```sh
curl -i localhost:3000/api/v1/checkRegistration
```

If the registration is open you should see something like this.

![Registration seems to be open](https://i.imgur.com/HTGjGd1.png "Registration seems to be open")

If the registration is not open you should see something like this.

![Registration seems not to be open](https://i.imgur.com/kpdWY8t.png "Registration seems not to be open")

---
Copyright © 2018 Nils Lutz