import {
    UserController
} from '../controllers/UserControllers';
import authMiddleware from '../middlewares/authMiddleware';
export default class UsersRoutes {

    constructor(router){
        this.initDefineRoutes(router);
    }

    private initDefineRoutes(router){

        router.post('/newUser',UserController.createUser);
    }
}



