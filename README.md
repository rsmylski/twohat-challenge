# twohat-challenge
> Purpose: Parse conversation json data to discover
> more about the conversations and how the data was
> originally processed.

## Installation and Building
```shell
npm install
npm run build
```

## Usage
To see a summary about the data file run: 
```shell
node build/app.js
```

To see more detailed information about each section, run with the desired options:
```shell
node build/app.js --filtered
node build/app.js --flags
node build/app.js --topics
node build/app.js --players
node build/app.js --repeated
node build/app.js --filteredRepeated
```
