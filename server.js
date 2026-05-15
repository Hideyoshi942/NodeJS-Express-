import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT

const startServer = async () => {
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  
startServer();