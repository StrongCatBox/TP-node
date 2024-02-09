const { Product, Type } = require("../models");

module.exports = function (app) {
  app.get("/v1/types", async function (req, res) {
    const types = await types.findAll({ include: ["product"] });
    res.json({ data: types, error: null });
  });

  app.get("/v1/types/:id", async function (req, res) {
    const Type = await Type.findByPk(req.params.id, {
      include: ["product"],
    });
    if (!Type) return res.json({ error: "not_found" });
    res.json({ data: Type });
  });

  app.post("/v1/types", async function (req, res) {
    const Type = await Type.create(req.body);
    if (!Type) return res.json({ error: "not_created" });
    res.json({ data: Type });
  });

  app.put("/v1/types/:id", async function (req, res) {
    const Type = await Type.findByPk(req.params.id);
    if (!Type) return res.json({ error: "not_found" });
    await Type.update(req.body);
    res.json({ data: Type, error });
  });

  app.delete("/v1/types/:id", async function (req, res) {
    const Type = await Type.findByPk(req.params.id);
    if (!Type) return res.json({ error: "not_found" });
    await Type.destroy();
    res.json({ data: Type, error });
  });
};
