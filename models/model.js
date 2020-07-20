const Sequelize = require('sequelize');

const {Database, Login, Password, dbconf} = require('../config/config.js');
const EventModel = require('./Event.js');
const NewModel = require('./New.js');
const PhotoModel = require('./Photo.js');
const ProgramModel = require('./Program.js');
const ProjectModel = require('./Project.js');
const ReferenceModel = require('./Reference.js');
const UserModel = require('./User.js');

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL || `mysql://${Login}:${Password}@localhost:3306/${Database}`);

sequelize.sync({ force: false }).then(() => {
    console.log('sync done');
});

function models(sequelize) {
    var model =  {
        Event: EventModel(sequelize),
        User: UserModel(sequelize),
        New: NewModel(sequelize),
        Photo: PhotoModel(sequelize),
        Program: ProgramModel(sequelize),
        Project: ProjectModel(sequelize),
        Reference: ReferenceModel(sequelize)
    };

    model.Event.hasMany(model.Photo);
    model.New.hasMany(model.Reference);
    
    return model;
}

try {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection successfull');
        })
} catch (e) {
    console.error(e);
}

module.exports = {
        Event,
        New,
        User,
        Photo,
        Program,
        Project,
        Reference
    } =
    models(sequelize);