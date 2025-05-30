import express from 'express';


const app = express();

app.get ("/expressData", (req, res) => {
    res.send ({ data: "This is the data from Express"});

});

app.get("requstFastAPIData", async (req, res) =>{
    const reponse = await fetch("http://127.0.0.1:8000/fastapiDATA");
    const result = await reponse.json

    res.send({ data: result.data})
});

app.get("/names/:name", (req, res) => {
    console.log(req.params.name);
    res.send({ data: `Your name is ${req.params.name}` });
});

const PORT = 8080;
app.listen(PORT, () => console.log('Server started on port', PORT));