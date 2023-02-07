import {
    CreateFunctionController,
    UpdateFunctionController,
    FindFunctionController,
    FindAllFunctionsController
} from '../controllers/FunctionControllers ';
import authMiddleware from '../middlewares/authMiddleware';

export default class FunctionsRoutes {

    constructor(router){
        this.initDefineRoutes(router);
    }

    private initDefineRoutes(router){
                
        router.post('/newFunction',authMiddleware,CreateFunctionController.createFunction);
        router.post('/updateFunction/:idFuncao',authMiddleware,UpdateFunctionController.updateFunction);
        router.get('/findFunction/:idFuncao',authMiddleware,FindFunctionController.findFunction);
        router.get('/findAllFunctions',authMiddleware,FindAllFunctionsController.findAllFunctions);

    }

}



