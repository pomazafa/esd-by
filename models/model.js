const Sequelize = require('sequelize');

const {Database, Login, Password, dbconf} = require('../config/config.js');
const EventModel = require('./Event.js');
const NewModel = require('./New.js');
const PhotoModel = require('./Photo.js');
const ProgramModel = require('./Program.js');
const ProjectModel = require('./Project.js');
const UserModel = require('./Users.js');
const CategoryModel = require('./Category.js');
const SubcategoryModel = require('./Subcategory.js');
const CategoryDocModel = require('./CategoryDoc.js');
const SubcategoryDocModel = require('./SubcategoryDoc.js');

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL || `mysql://${Login}:${Password}@localhost:3306/${Database}`);

sequelize.sync({ force: false }).then(() => {
    console.log('sync done');
});

const models = {
  Event: EventModel(sequelize),
  User: UserModel(sequelize),
  New: NewModel(sequelize),
  Photo: PhotoModel(sequelize),
  Program: ProgramModel(sequelize),
  Project: ProjectModel(sequelize),
  Category: CategoryModel(sequelize),
  Subcategory: SubcategoryModel(sequelize),
  CategoryDoc: CategoryDocModel(sequelize),
  SubcategoryDoc: SubcategoryDocModel(sequelize),
};

models.Event.hasMany(models.Photo);
models.Category.hasMany(models.Subcategory);
models.Category.hasMany(models.CategoryDoc);
models.Subcategory.hasMany(models.SubcategoryDoc);

try {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection successfull');
        })
} catch (e) {
    console.error(e);
}

module.exports = {
  ...models,
  sequelize,
};
