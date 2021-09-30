# artblocks.io bot

The Discord bot for [ArtBlocks](http://artblocks.io/).

ArtBot is a Node.js application.  It uses the [Yarn Package Manager](https://yarnpkg.com/) to manage dependencies and run the application.  It can be interacted with via Discord messages.

## Running artbot

* Verify you have Node.js and npm installed.  If not, you can refer to the [Node.js official page](https://nodejs.org/) to get started.

```
node -v
npm -v
```

* Install Yarn Package Manager.  For detailed instructions, refer to the [Yarn official page](https://yarnpkg.com/getting-started/install).

```
npm install -g yarn
```

* Install tbe package dependencies
```
yarn install
```

* Join the a-t Discord Server

Artbot is based on the [discord.js](https://discord.js.org/) package, and is exclusively concerned with processing and sending Discord messages.  If you want to be able to interact with it, joining the Artbot test Discord server is the way to go.  <Insert invite or instructions for requesting one>
  
* Set up .env file to reference relevant Discord channels
  
```
<insert sample .env>
```

* Run the application
```
yarn start
````
