const {app} = require("./app.js")

const { PORT = 5432 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));