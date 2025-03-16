import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync'
import { TUserRole } from '../modules/user/user.interface'

import { config } from '../config'
import { AppError } from '../utils/appError'
import User from '../modules/user/user.models'



const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // checking if the token is missing
    if (!token) {
      throw new AppError('You are not authorized!',403 )
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload

    const { role, userId, iat } = decoded

    // checking if the user is exist
    const user = await User.findById(userId)

    if (!user) {
      throw new AppError('This user is not found !',404 )
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted

    if (isDeleted) {
      throw new AppError('This user is deleted !',403 )
    }

    // checking if the user is blocked
    const userStatus = user?.status

    if (userStatus === 'blocked') {
      throw new AppError('This user is blocked ! !',403 )
    }

    // if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError('You are not authorized!',403 )
    }

    req.user = decoded as JwtPayload & {id:string, role: string }
    next()
  })
}

export default auth