import { Request } from 'express';
import { AuthService } from './auth.service';

export const authenticateUserByRequest = (
  authService: AuthService,
  request: Request,
) => {
  const accessToken =
    request.headers.authorization?.replace('Bearer ', '') ||
    request.cookies.jwt ||
    '';
  return authService.me(accessToken);
};
