import express from 'express';
import cors from 'cors';

const app = express();
const port: number = 5000;

app.use(cors());

app.get('/api', (req, res) => {
  res.send({
    data: "Hello React World"
  });
})

app.listen(port, () => console.log(`Server is running on port ${5000}`));

