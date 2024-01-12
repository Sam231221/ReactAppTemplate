# WORKING WITH JSON-SERVER

yarn add json-server
add the following key-value pairs in the package.json unser scripts section:
"scripts": {
"start": "react-scripts start",
"json-server": "json-server --watch db.json --port 3001",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"
},

Run the following command inside react project
npm run json-server

Make sure it runs on different port.
the url resource exists in http://localhost:3001/users/ but not in http://localhost:3001

# WORKING WITH CONCURRENTLY PACKAGE

yarn add concurrently
We are using this package since we want npm start and npm run json-server to work at the same time.So It
can be used for crud operations later.
First concurrently will run then it will execute the precceding commands at same time
"start:dev":"concurrently \"npm start\" \"npm run json-server\"",

# Run Command

```
npm run start:dev
```
