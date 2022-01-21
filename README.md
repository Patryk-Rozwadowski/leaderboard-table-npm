# Leaderboard [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Patryk-Rozwadowski_npm-leaderboard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Patryk-Rozwadowski_npm-leaderboard)

##### Lightweight, generic and easy to use leaderboard module. With this package you can create easy scoreboard for your products, users or for whatever you want!

##### Demo: https://patryk-rozwadowski.github.io/npm-leaderboard-doc/


## Installation:

### NPM:

`npm install leaderboard-table`

### YARN

`yarn add leaderboard-table`

### CDN

`https://unpkg.com/browse/leaderboard-table@1.0.3/dist/leaderboard.min.css`

`https://unpkg.com/browse/leaderboard-table@1.0.3/dist/leaderboard.min.js`

#### CDN usage:

##### index.html:

`<link rel="stylesheet" href="https://unpkg.com/browse/leaderboard-table@1.0.3/dist/leaderboard.min.css">`

`<script src="https://unpkg.com/browse/leaderboard-table@1.0.3/dist/leaderboard.min.js"></script>`

## Usage:

Leaderboard will take size of its parent size (width and height). To be use this package:

1. import leaderboard package:
   `import { Leaderboard } from "leaderboard-table";`

2. import leaderboard styles:
   `import "leaderboard-table/dist/leaderboard.min.css";`

3. Create root div element with class in your HTML file:
   `<div class="root"></div>`

---

## CSS style classes

### Containers

| Class                 | Description                           |
| --------------------- | ------------------------------------- |
| .lb                   | Root container for leaderboard module |
| .lb_col               | Column container                      |
| .lb_cell              | Leaderboard's cell styles             |
| .lb_cell_container    | Container of leaderboard's cell       |
| .lb_headers_container | Headers container                     |

### Typography

| Class                     | Description                     |
| ------------------------- | ------------------------------- |
| .lb_header_text_primary   | Primary styles for headers      |
| .lb_header_text_secondary | Secondary styles for subheaders |
| .lb_text_primary          | Primary styles for text         |
| .lb_text_secondary        | Secondary styles for text       |

---

## API

### Properties

| Leaderboard properties | Type        | Default Value | Description                                             |
| ---------------------- | ----------- | ------------- | ------------------------------------------------------- |
| `rootContainer`        | HTMLElement | -             | Your root container for leaderboard.                    |
| `leaderboardData`      | Object      | -             | Object with data which you want to put into Leaderboard |
| `options`              | Object      | -             | Options object                                          |

### Options

| Options               | Type    | Default Value | Description              |
| --------------------- | ------- | ------------- | ------------------------ |
| `headerTags`          | String  | "h5"          | Display the help window. |
| `logs`                | boolean | false         | Display the help window. |
| `contentForEmptyRows` | String  | ""            | Display the help window. |

### Methods

| Methods | Description                           |
| ------- | ------------------------------------- |
| init()  | Method for leaderboard initialization |
