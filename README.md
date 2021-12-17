# Leaderboard [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Patryk-Rozwadowski_npm-leaderboard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Patryk-Rozwadowski_npm-leaderboard)
##### Lightweight and easy to use leaderboard module. With this package you can create easy scoreboard for your products, users with 

## Examples:
##### Default:

##### Custom:


## Installation:

### NPM:
`
npm install package-name
`

### YARN
`
yarn add package-name
`

## Usage:

Leaderboard will take size of its parent size (width and height). To be able use this package:

1. import leaderboard package:
	`import Leaderboard from "package-name";`

2. Create root div element with class in your HTML file: 
	`<div class="root"></div>`
	

## API

| Leaderboard properties | Type | Default Value | Description              |
| -------------  | --------    | - |----------------------        |
| `rootContainer`| HTMLElement | - |  Your root container for leaderboard. |
| `leaderboardData`| Object | - | Object with data which you want to put into Leaderboard |
| `options`| Object |- | Options object |

| Options | Type | Default Value | Description |
| -------------  | -------- | - |----------------------        |
| `headerTags`| String | "h5" | Display the help window. |
| `logs`| boolean | false | Display the help window. |
| `contentForEmptyRows`| String | "" | Display the help window. |

| Methods | Description |
| --------| ------------|
| init()  | Method for leaderboard initialization |
