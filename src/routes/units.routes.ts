import {
    CreateUnityController,
    FindUnityController,
    FindAllUnitsController,
    UpdateUnityController
} from '../controllers/UnityControllers';
import authMiddleware from '../middlewares/authMiddleware';


export default class UnitsRoutes {

    constructor(router){
        this.initDefineRoutes(router);
    }

    private initDefineRoutes(router){
                
        router.post('/newUnity',authMiddleware,CreateUnityController.createUnity);
        router.post('/updateUnity/:idUnidade',authMiddleware,UpdateUnityController.updateUnity);
        router.get('/findUnity/:idUnidade',authMiddleware,FindUnityController.findUnity);
        router.get('/findAllUnits',authMiddleware,FindAllUnitsController.findAllUnits);

    }

}



