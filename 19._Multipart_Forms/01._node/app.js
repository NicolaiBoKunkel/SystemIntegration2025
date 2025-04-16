import express from 'express';

const app = express();


app.use(express.urlencoded({ extended: true }));

import multer from 'multer';
//const upload = multer({ dest: '/uploads' });

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);	
        const uniqueFilename = `${uniquePrefix}-${file.originalname}`;

        cb(undefined, uniqueFilename);
    }
});

const uploads = multer({ storage });

app.post("/form", (req, res) => {
    console.log(req.body);
    delete req.body.password;
    res.send(req.body);
});


app.post("/fileform", uploads.single("file"), (req, res) => {
    console.log(req.body);
});

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));