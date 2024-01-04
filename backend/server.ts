import app from './src/configs/express';
import { SERVER_PORT } from './src/utils/constants';
import './src/configs/mongooose';

app
  .listen(SERVER_PORT, () => {
    console.log(`Server is running on port: ${SERVER_PORT}`);
  })
  .on('error', (error) => console.log(error));
