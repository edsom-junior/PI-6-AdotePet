import {Router } from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pets = await prisma.pet.findMany();
    res.json(pets);
  } catch (error) {
    console.error( error);
    res.status(500).json({ error: ' erro ao buscar pets' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id }
    });
    if (!pet) {
      return res.status(404).json({ error: 'pet nao encontrado' });
    }
    res.json(pet);
  } catch (error) {
    console.error( error);
    res.status(500).json({ error: ' erro ao buscar pet' });
  }
});

router.post('/', requireAuth, async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'SHELTER') {
            return res.status(403).json({error: 'apenas abrigos podem cadastrar pets'});    
        }

        const {name, species, city, description} = req.body;

        if(!name || !species || !city) {
            return res.status(400).json({error: 'nome, especie e cidade sao obrigatorios'});
        }
        
        const pet = await prisma.pet.create({ data: {name, species,city, description, shelterId: req.user.id}});
        res.status(201).json(pet);


    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'erro ao cadastrar pet'});
    }
});

router.put('/:id', requireAuth, async (req,res) => {

  try{
    const id = req.params.id as string;
    const {name, species, city, description } = req.body;

    if(!req.user) {
      return res.status(401).json({error: 'nao autenticado'});
    }

    const pet = await prisma.pet.findUnique({where: { id }});
    if(!pet) {
      return res.status(404).json({error: 'voce so pode editar seus proprios pets'});
    }
    const updatedPet = await prisma.pet.update({
      where: { id },
      data: { name, species, city, description},

    });

    res.json(updatedPet);
  }catch (error) {
    console.error(error);
    res.status(500).json({error: 'erro ao atualizar pet'});
  }
});


  

export default router;  