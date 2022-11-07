# LOLGallery

league of legends heros gallery.

### How to Contribute?

Install pre-requisites

- Node.js
- npm

##### On Windows

- Install [Nodejs](https://nodejs.org/) ( Included npm )

##### On Linux

- Install Node.js & npm
    - Ubuntu
        ```bash
        apt install nodejs npm -y
        ```

    - CentOS
        ```bash
        dnf install nodejs npm -y
        ```

### Restore dependencies

```bash
yarn install --cwd web
yarn install --cwd crawler
```

### Run

run web

```bash
yarn dev
```

run crawler

```bash
yarn start
```
