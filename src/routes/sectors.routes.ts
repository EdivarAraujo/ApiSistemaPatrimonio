import {
    CreateSectorController,
    UpdateSectorController,
    FindSectorController,
    FindAllSectorsController
} from '../controllers/SectorControllers';
import authMiddleware from '../middlewares/authMiddleware';


export default class SectorsRoutes {

    constructor(router){
        this.initDefineRoutes(router);
    }

    private initDefineRoutes(router){
                
        router.post('/newSector',authMiddleware,CreateSectorController.createSector);
        router.post('/updateSector/:idSetor',authMiddleware,UpdateSectorController.updateSector);
        router.get('/findSector/:idSetor',authMiddleware,FindSectorController.findSector);
        router.get('/findAllSectors',authMiddleware,FindAllSectorsController.findAllSectors);

    }

}



