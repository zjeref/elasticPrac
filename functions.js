exports.indexExists = async (indexName, client) => {
  const res = await client.indices.exists({ index: indexName });
  console.log(res);
  return res;
};


