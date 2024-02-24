import { Router, Request, Response } from 'express'
import { TherapistController } from '../controllers/therapistController'

export class TherapistRoutes {
  private therapistController: TherapistController = new TherapistController()
  public route(): Router {
    const router = Router()

    /**
     * @swagger
     *
     * /therapists:
     *   get:
     *     summary: get therapists
     *     tags: [Therapists]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: query
     *         name: search
     *         description: full text search, searches in ('userName')
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: get therapists
     */
    router.get('/', (req: Request, res: Response) => {
      return this.therapistController.getTherapists(req, res)
    })

    /**
     * @swagger
     * /therapists:
     *   post:
     *     description: create Therapist
     *     tags: [Therapists]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: create therapist
     */
    router.post('/', (req: Request, res: Response) => {
      return this.therapistController.addTherapists(req, res)
    })

    return router
  }
}
