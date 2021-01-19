/* eslint-disable no-console */
import app from './app';

const port = process.env.PORT || 3700;

app.listen(port, () => {
  console.log(`Server UP at port: ${port}`);
});
