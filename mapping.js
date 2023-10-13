const { indexExists } = require("./functions");

const mapping = {
  properties: {
    "Product Name": { type: "text" },
    "Brand Name": { type: "keyword" },
    "Product Overview": { type: "text" },
    "Key Benefits": { type: "text" },
    Ingredients: { type: "text" },
    Usage: {
      type: "nested",
      properties: {
        "Who Should Use": { type: "text" },
        "How to Use": { type: "text" },
        "Duration of Usage for Good Results": { type: "text" },
        "Target Benefits": { type: "text" },
        Suitability: { type: "text" },
      },
    },
    Logistics: {
      type: "nested",
      properties: {
        "Return Policy": { type: "text" },
        "Shipping Information": { type: "text" },
        Availability: { type: "text" },
        "Cancellation Policy": { type: "text" },
        "Contact Information": { type: "text" },
      },
    },
    Pricing: {
      type: "nested",
      properties: {
        Price: { type: "keyword" },
        "Discounts & Offers": { type: "text" },
        "Payment Options": { type: "text" },
      },
    },
    "Other Information": {
      type: "nested",
      properties: {
        Certification: { type: "text" },
        "Warnings/Disclaimer": { type: "text" },
        "Shelf Life": { type: "text" },
        Other: { type: "text" },
      },
    },
    "Primary Category": { type: "text" },
    "Secondary Category": { type: "keyword" },
    filters: {
      type: "nested",
      properties: {
        "filter name": { type: "keyword" },
        "filter option": { type: "keyword" },
      },
    },
  },
};

exports.createIndex = async (client, indexName ) => {
  try {
    const exisitingIndex = await indexExists(indexName, client);
    if (exisitingIndex) return;
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: mapping.properties,
        },
      },
    });
    console.log(`Index "${indexName}" created successfully.`);
  } catch (error) {
    console.error(`Error creating index: ${error}`);
  }
};
