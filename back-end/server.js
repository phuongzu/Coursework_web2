const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const vocabRoutes = require('./api/routes/vocabRoutes');
const userRoutes = require('./api/routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://vudpgcs220099:1@phuongzu.xj9wb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
vocabRoutes(app); // Routes for vocabulary (RESTful)
app.use('/api/users', userRoutes); // Routes for user auth (register, login)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
