import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

const app = express()

app.use(express.json())
app.set("view engine", "ejs")

app.get('/', function (req, res) {
    res.render("TaskManager.ejs");
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})