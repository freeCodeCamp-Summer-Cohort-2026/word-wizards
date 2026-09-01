FROM node:26.8.1-trixie-slim AS base

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tini
RUN mkdir --parents /usr/src/app \
	&& chown -R node:node /usr/src/app

USER node

WORKDIR /usr/src/app

ENTRYPOINT ["tini", "--"]

FROM base AS development

COPY --chown=node:node package*.json ./
COPY --chown=node:node apps/web/package*.json apps/web/
COPY --chown=node:node packages/ packages/

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

CMD ["npm", "run", "dev"]

FROM development AS deps

RUN npm ci --production

FROM base AS production

# Get frontend build files
COPY --chown=node --from=deps usr/src/app/apps/web/.next .next
COPY --chown=node --from=deps usr/src/app/apps/web/public public
# Get scripts and dependencies
COPY --chown=node --from=deps usr/src/app/apps/web/package.json ./
COPY --chown=node --from=deps usr/src/app/node_modules node_modules

CMD ["npm", "run", "start"]
