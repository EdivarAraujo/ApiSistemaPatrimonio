import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';
const fs = require('fs')
const csv = require('csv-parser');

interface File  {
    path?: String;
}
 interface Requisicao{
    file: File;
}

 class InsertUseCsv{
    
    public async useCsvColaboradores(req: Requisicao,res: Response){
      
      try {
              const filePath = req.file.path;

                let newData: any[] = [];
                let unidades: any[] = [];
                let setores: any[] = [];
                let funcoes: any[] = [];

                fs.createReadStream(filePath)
                .pipe(csv())
                
                .on('data', async (data: any) => {

                  newData.push(data);

                  if(!setores.includes(data?.setor) && data.setor != ''){
                    setores.push(data?.setor);
                  }

                  if(!unidades.includes(data?.unidade) && data?.unidade != ''){
                    unidades.push(data?.unidade);
                  }

                  if(!funcoes.includes(data?.funcao) && data.funcao != ''){
                    funcoes.push(data?.funcao);
                  }
         
                })
           
                .on('end',() => {
                 try {

                  unidades.forEach( async (unidade) => {
                    try {
                      const Cliente = prismaClient.unity;
          
                      await Cliente.create({data:{nomeUnidade:unidade}});
          
                      return;
          
                  } catch (error) {
                      return console.log(error); 
                  }
                  });

                  setores.forEach( async (setor) => {
                    try {
                      const Cliente = prismaClient.sector;
          
                      await Cliente.create({data:{nomeSetor:setor}});
          
                      return;
          
                  } catch (error) {
                      return console.log(error); 
                  }
                  });

                  funcoes.forEach( async(funcao) => {
                    try {
                      const Cliente = prismaClient.function;
          
                      await Cliente.create({data:{nomeFuncao:funcao}});
          
                      return;
          
                  } catch (error) {
                      return console.log(error); 
                  }
                  });

                  newData.forEach(async(colaborador) => {
                    
                    const currentUnity = await prismaClient.unity.findFirst({ where: { nomeUnidade: colaborador.unidade}});
                    const currentSector = await prismaClient.sector.findFirst({ where: { nomeSetor: colaborador.setor}});
                    const currentFunction = await prismaClient.function.findFirst({ where: { nomeFuncao: colaborador.funcao}});
                    
                    let unidadeId = null;
                    let setorId = null;
                    let funcaoId = null;

                    if(currentUnity){
                      unidadeId = currentUnity.idUnidade as any;
                    }

                    if(currentSector){
                      setorId = currentSector.idSetor as any;
                    }

                    if(currentFunction){
                      funcaoId = currentFunction.idFuncao as any;
                    }

                    const newColaborador = {
                      codigo: colaborador.codigo == '' ? 0 : Number(colaborador.codigo),
                      numeroPatrimonio: Number(colaborador.numeroPatrimonio),
                      nome: colaborador.nome,
                      unidadeId: Number(unidadeId),
                      setorId: Number(setorId),
                      funcaoId: Number(funcaoId),
                      numeroChip1: colaborador.numeroChip1 == '' ? '00000000000' : colaborador.numeroChip1,
                      operadoraChip1: colaborador.operadoraChip1 == '' ? 'Nao definida' : colaborador.operadoraChip1,
                      numeroChip2: colaborador.numeroChip2 == '' ? '00000000000' : colaborador.numeroChip2,
                      operadoraChip2: colaborador.operadoraChip2 == '' ? 'Nao definida' : colaborador.operadoraChip2,
                    }
                    
                  try {
                      const Cliente = prismaClient.collaborator;
          
                      await Cliente.create({data:{
                        ...newColaborador
                      }
                      });
          
                      return ({message:'Novo colaborador cadastrado!'});
          
                  } catch (error) {
                      return console.log(error); 
                  }
                  })


                fs.promises.unlink(filePath);
                    return res.status(200).json({
                        unidades,
                        setores,
                        funcoes
                    });

                 } 
                 catch (error) {
                   throw new Error('erro')
                 }
         
               })

       
              } catch (error: unknown) {
                const { message } = error as Error; // I removed : { message: string } because it should be infered
    
                return res.status(500).json(message) 
            }
    }

}

export default new InsertUseCsv();

