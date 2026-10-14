import { INestApplication } from "@nestjs/common";

export function securityConfig(app: INestApplication): void {
    app.useSecurityHeaders();
    app.enableCors({
        methods: ["GET", "POST", "PATCH", "DELETE"],
        origin: process.env.ALLOWED_ORIGINS?.split(' '),
        allowedHeaders: ['Content-Type', 'Authorization']
    })
}