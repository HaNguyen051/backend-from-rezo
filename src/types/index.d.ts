//data type
import {Role , User as UserPrisma } from '@prisma/client'

declare global {
  namespace Express {
      interface User extends UserPrisma{
        Role? : Role 
    }
  }
}