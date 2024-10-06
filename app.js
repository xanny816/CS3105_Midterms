const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const rateLimiter = require("./middleware/rateLimitMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);
app.use(rateLimiter);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
