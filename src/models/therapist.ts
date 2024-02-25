import { model, Schema } from 'mongoose'
import { ITherapist } from '../types/therapists'

const schema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    zipCode: {
      type: String,
    },

    city: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'therapists',
    writeConcern: {
      w: 'majority',
      wtimeout: 15000,
    },
    read: 'nearest',
  }
)

const TherapistModel = model<ITherapist>('therapist', schema)
export default TherapistModel
