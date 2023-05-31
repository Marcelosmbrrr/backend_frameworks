import { Global, Module } from "@nestjs/common";
import { PrismaService } from './prisma.service';

// About global module: https://progressivecoder.com/how-to-use-global-modules-in-nestjs/
// Classes like helpers or utilities and database configuration classes are good as Global Modules
// This is for sharing services and other resources between modules instead of use export/import

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }
