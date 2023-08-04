require("dotenv").config();
const { app } = require("./setup/express");
const { PageNotFound, SendError } = require("./utils/utils");

const RouteHandler = require("./routes/index");

app.use("/api/users", RouteHandler);

app.use(SendError);
app.use(PageNotFound);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});