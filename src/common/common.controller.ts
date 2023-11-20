import { Controller, Get } from '@nestjs/common';

@Controller('common')
export class CommonController {
  @Get('health')
  health() {
    return {
      success: true,
      message: 'ok',
      data: {
        running: true,
      },
      micro: 'token-cards',
    };
  }
}
