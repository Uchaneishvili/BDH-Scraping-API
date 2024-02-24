import { Response } from 'express'
import { Logger } from './Logger'

export enum ResponseStatusCodes {
  Success = 200,
  InternalServerError = 500,
  NotFound = 404,
  Created = 201,
}

export function successResponse(data: unknown, res: Response): void {
  res.status(ResponseStatusCodes.Success).json({
    status: 'SUCCESS',
    data,
  })
}

export function createdResponse(data: unknown, res: Response): void {
  res.status(ResponseStatusCodes.Created).json({
    status: 'SUCCESS',
    data,
  })
}

export function handleError(
  err: unknown,
  res: Response,
  message?: string
): void {
  const error = {
    status: 'FAILURE',
    message: message || 'MongoDB error',
    err,
  }
  Logger.error(error)
  res.status(ResponseStatusCodes.InternalServerError).json(error)
}
