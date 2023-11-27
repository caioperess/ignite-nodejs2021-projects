import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  refresh_token: string;
  access_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  private usersTokensRepository: IUsersTokensRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    dateProvider: IDateProvider,
  ) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute(token: string): Promise<IResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const access_token = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    const expires_date = this.dateProvider.addTime(
      auth.refresh_token_expires_time,
      'hour',
    );

    await this.usersTokensRepository.create({
      expires_date: expires_date,
      refresh_token,
      user_id: user_id,
    });

    return { refresh_token, access_token };
  }
}
