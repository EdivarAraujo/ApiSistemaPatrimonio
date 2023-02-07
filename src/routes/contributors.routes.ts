import {
    CreateCollaboratorController,
    UpdateCollaboratorController,
    FindAllCollaboratorController,
    FindCollaboratorController,
    ActionCollaboratorController,
} from "../controllers/CollaboratorControllers";
import authMiddleware from '../middlewares/authMiddleware';


export default class ContributorsRoutes {

    constructor(router){
        this.initDefineRoutes(router);
    }
    
    private initDefineRoutes(router){
        router.post('/createCollaborator',authMiddleware, CreateCollaboratorController.createCollaborator);
        router.put('/updateCollaborator/:idColaborador',authMiddleware, UpdateCollaboratorController.updateCollaborator);
        router.get('/findAllContributors',authMiddleware, FindAllCollaboratorController.findAllContributors);
        router.get('/findCollaborator/:idColaborador',authMiddleware, FindCollaboratorController.findCollaborator);
        router.put('/actionCollaborator/:idColaborador',authMiddleware, ActionCollaboratorController.actionCollaborator);
    }

}



