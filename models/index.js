const { sequelize, DataTypes } = require("./db.js");
const Product = require("./product.model.js");
const Type = require("./type.model.js");

const fs = require("fs");

async function initDatabase() {
  const { sequelize } = require("./models/index.js");

  try {
    let files = fs.readdirSync(path.join(__dirname, "models"));
    let alter = false;
    let lastModificationModels;
    try {
      lastModificationModels = JSON.parse(
        fs.readFileSync(path.join(__dirname, "lastModificationModels.json"))
      );
    } catch (err) {
      lastModificationModels = {};
    }
    for (let file of files) {
      if (file.endsWith(".model.js")) {
        let stats = fs.statSync(path.join(__dirname, "models", file));

        if (
          lastModificationModels[file] &&
          lastModificationModels[file] < stats.mtime
        ) {
          alter = true;
        }
        lastModificationModels[file] = stats.mtime;
      }
    }
    fs.writeFileSync(
      path.join(__dirname, "lastModificationModels.json"),
      JSON.stringify(lastModificationModels, null, 4)
    );
    await sequelize.sync({ alter });
    console.log("🚀 ~ initDatabase ~ alter:", alter);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

Product.belongsTo(Type, { foreignKey: "typeId", as: "type" });
Type.hasMany(Product, { foreignKey: "typeId", as: "products" });

module.exports = {
  sequelize,
  DataTypes,
  Product,
  Type,
};
