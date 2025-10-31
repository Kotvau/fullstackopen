require("dotenv").config();
const mongoose = require("mongoose");

// yhdistetään MongoDB:hen
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const db = mongoose.connection.db;

    // vaihdetaan kokoelman nimi "people" -> "persons"
    await db.collection("people").rename("persons");
    console.log("✅ Collection renamed from 'people' to 'persons'");

    // tarkistetaan mitä kokoelmia tietokannassa nyt on
    const collections = await db.listCollections().toArray();
    console.log(
      "📦 Collections in DB:",
      collections.map((c) => c.name)
    );

    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Error:", err));
