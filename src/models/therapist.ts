import { model, Schema } from 'mongoose'
import { IGender, ITherapist } from '../types/therapists'

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
    gender: {
      type: Number,
      enum: [IGender.MALE, IGender.FEMALE],
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
