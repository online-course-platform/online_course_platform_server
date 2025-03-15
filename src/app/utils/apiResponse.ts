import { Response } from 'express';

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>): void => {
  const responseData: TResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta
      ? {
          page: data.meta.page,
          limit: data.meta.limit,
          total: data.meta.total,
          totalPages: Math.ceil(data.meta.total / data.meta.limit),
        }
      : undefined,
    data: data.data,
  };

  res.status(data.statusCode).json(responseData);
};

// Success Response Helpers
export const sendSuccess = <T>(
  res: Response,
  data: T,
  options: {
    statusCode?: number;
    message?: string;
    meta?: TMeta;
  } = {},
) => {
  sendResponse(res, {
    statusCode: options.statusCode || 200,
    success: true,
    message: options.message || 'Operation successful',
    meta: options.meta,
    data,
  });
};

export const sendPaginated = <T>(
  res: Response,
  data: T,
  pagination: {
    page: number;
    limit: number;
    total: number;
  },
  message?: string,
) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: message || 'Paginated results retrieved successfully',
    meta: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
    },
    data,
  });
};

export const sendCreated = <T>(res: Response, data: T, message?: string) => {
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: message || 'Resource created successfully',
    data,
  });
};

// example usage

// Get single user
// const getUser = catchAsync(async (req: Request, res: Response) => {
//     const user = await userService.getUserById(req.params.id);
//     sendSuccess(res, user, {
//       message: 'User retrieved successfully'
//     });
//   });

// Get paginated users
// const getUsers = catchAsync(async (req: Request, res: Response) => {
//     const { page = 1, limit = 10 } = req.query;
//     const { data, total } = await userService.getPaginatedUsers({
//       page: Number(page),
//       limit: Number(limit)
//     });

//     sendPaginated(res, data, {
//       page: Number(page),
//       limit: Number(limit),
//       total
//     }, 'Users retrieved successfully');
//   });

// Create user
// const createUser = catchAsync(async (req: Request, res: Response) => {
//     const newUser = await userService.createUser(req.body);
//     sendCreated(res, newUser, 'User created successfully');
//   });
