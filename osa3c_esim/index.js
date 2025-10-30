require("dotenv").config();
const express = require("express"); // haetaan kirjasto, tuodaan Express-moduuli ohjelmaan
const Note = require("./models/note");
const app = express(); // luodaan palvelin app luomalla express sovellus

//LISÄYS:::
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

//TAulukko tyhjennetty....
let notes = [];

app.use(express.static("dist"));
//const morgan = require("morgan");

//Middlewaret tähän:
app.use(express.json()); //json parserin lisäys)
app.use(requestLogger);
//morgan.token("body", (req) => JSON.stringify(req.body));
//app.use(
// morgan(":method :url :status :res[content-length] - :response-time ms :body")
//);

app.get("/", (request, response) => {
  //  määritellään reitti
  response.send("<h1>Hello World!</h1>");
});

// kaikki muistiinpanot
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  //virhe siirtyy virheidenkäsittelymiddlewarelle.
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    //Muistiinpano-oliot luodaan Note-konstruktorifunktiolla
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler);

//  PALVELIMEN KÄYNNISTYS
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
