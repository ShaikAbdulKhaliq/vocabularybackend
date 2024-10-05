const app = require('./app');

// Define the port to run the server
const PORT = process.env.PORT || 5000;

// Start the server on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
