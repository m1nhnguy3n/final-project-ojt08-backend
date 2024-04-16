const employeeRouter = require('./employee')
const authRouter = require('./auth');
const projectRouter = require('./project');
const trackingRouter = require('./tracking');
const skillRouter = require('./skill');
const positionRouter = require('./position');
const technologyRouter =require('./technology')


function route(app) {
    app.use('/auth', authRouter);
    app.use('/employees', employeeRouter);
    app.use('/projects', projectRouter);
    app.use('/skill', skillRouter);
    app.use('/tracking', trackingRouter);
    app.use('/position', positionRouter);
    app.use('/technology', technologyRouter);

}

module.exports = route;
