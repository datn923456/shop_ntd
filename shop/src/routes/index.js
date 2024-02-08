const newsRouter = require('./news');
const siteRouter = require('./site');
const adminRouter = require('./admin');
const coursesRouter = require('./courses');

function route(app){

    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/admin', adminRouter);

    app.use('/', siteRouter);
      
}

module.exports = route;