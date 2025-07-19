FROM oven/bun:slim AS builder

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

ENV NEXT_PUBLIC_BACKEND_URL="http://localhost:7000"
ENV NEXT_PUBLIC_URL="http://localhost:3000"

RUN mv docker.next.config next.config.mjs

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["bun", "server.js"]