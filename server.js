import app from "./src/app.js";

const PORT = 3000

const startServer = async () => {
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  
startServer();