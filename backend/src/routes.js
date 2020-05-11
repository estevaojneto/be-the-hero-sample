const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const routes = express.Router();


routes.post('/sessions', SessionController.create);
routes.get('/profile', celebrate(
    {
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
    }
), ProfileController.index);

routes.get('/ngos', NgoController.index);
routes.post('/ngos', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3),
      email: Joi.string().required(),
      whatsapp: Joi.string().required().min(10),
      city: Joi.string().required(),
      state: Joi.string().required().length(2)
    })
}), NgoController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;