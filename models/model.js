const Sequelize = require('sequelize');

const {Database, Login, Password, dbconf} = require('../config/config.js');
const EventModel = require('./Event.js');
const NewModel = require('./New.js');
const PhotoModel = require('./Photo.js');
const ProgramModel = require('./Program.js');
const ProjectModel = require('./Project.js');
const UserModel = require('./User.js');

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
};

models.Event.hasMany(models.Photo);

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
