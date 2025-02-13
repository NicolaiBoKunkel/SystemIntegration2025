from fastapi import FastAPI


app = FastAPI()


@app.get("/fastapiData")
def getFastAPIData():
    return { "data:" "Data from FastAPI"}

@app.get("/requestExpressData")
def getRequestExpressdData():
    reponse = request.get("http://127.0.0.1:8000/expressData").json()

    return reponse
