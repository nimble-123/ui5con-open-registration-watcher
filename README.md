# ui5con-open-registration-watcher

A simple website crawler to watch the ui5con website for open registration.

## How to use this tiny helper

Clone this repo

```sh
git clone git@github.com:nlsltz/ui5con-open-registration-watcher.git
cd ui5con-open-registration-watcher
```

Install dependencies (i am using `yarn` instead of `npm`)

```sh
yarn
```

Create your `.env` file from the example and edit to your preferences

```sh
cp .env.example .env
```

Finally start the watcher

```sh
yarn start
```

---

If the registration is open you should see something like this.

![Registration seems to be open](https://i.imgur.com/HTGjGd1.png "Registration seems to be open")

If the registration is not open you should see something like this.

![Registration seems not to be open](https://i.imgur.com/kpdWY8t.png "Registration seems not to be open")

---

### TODO

* Add simple API
* Add UI consuming the API
* Bundle as Docker image/container

---
Copyright © 2018 Nils Lutz