import CsvControllerCollaborator from '../controllers/CsvControllers/CsvControllerCollaborator';
import path from 'path';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware';


const upload = multer({
    storage: multer.diskStorage({
        destination: path.resolve('src/cache','csvCache') 
    })
})

export default class CsvRoutes {

    constructor(router){
        this.initDefineRoutes(router);
    }

    private initDefineRoutes(router){
                
        router.post('/InsertContributorsCsv',upload.single('file'),authMiddleware,CsvControllerCollaborator.useCsvColaboradores)
    }

}



