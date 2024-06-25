import elderlycareRouter from './elderlycare-hub-route.js';
import authRouter from './authRoutes.js';
import reviewRouter from './reviewRoutes.js'

const initializeRoutes = (app) => {
    app.use('/elderlycare', elderlycareRouter);
    app.use('/api/users', authRouter);
    app.use('/api/reviews', reviewRouter);

}

export default initializeRoutes;