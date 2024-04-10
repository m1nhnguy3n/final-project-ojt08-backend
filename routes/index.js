const employeeRouter = require('./employee')
const authRouter = require('./auth');
const projectRouter = require('./project');
const trackingRouter = require('./tracking');
const skillRouter = require('./skill');
const positionRouter = require('./position');



function route(app) {
    app.use('/auth', authRouter);
    app.use('/employee', employeeRouter);
    app.use('/project', projectRouter);
    app.use('/skill', skillRouter);
    app.use('/tracking', trackingRouter);
    app.use('/position', positionRouter);
}

module.exports = route;
