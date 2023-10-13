require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { createIndex } = require("./mapping");

const { Client } = require("@elastic/elasticsearch");



const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID,
  },
  auth: {
    username: process.env.CLOUD_USERNAME,
    password: process.env.PASSWORD,
  },
});

app.use(express.json());
app.use(cors());

const indexName = "product_index_temp";
createIndex(client, indexName);

app.post("/add-product", async (req, res) => {
  try {
    const product = req.body; // Assuming the request body contains the product data in JSON format
    console.log(product);
    const response = await client.index({
      index: indexName,
      body: product,
    });

    res.status(201).json({ message: "Product added successfully", response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add the product", details: error });
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const results = await client.search({
      index: indexName,
      body: {
        query: {
          multi_match: {
            query: searchTerm,
            fields: [
              "Product Name^2",
              "filters",
              "Usages",
              "Product Overview",
              "Pricing",
            ],
          },
        },
      },
    });
    res.json(results);
    console.log(results);
  } catch (e) {
    console.error(e);
  }
});

app.listen(3000, () => {
  console.log("Express app listening on port 3000");
});
