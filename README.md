




# Dev

1. Colocar las variables de entorno en un archivo `.env` en la raíz del proyecto. Ejemplo:

```
PORT=
PUBLIC_PATH=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PORT=
POSTGRES_PASSWORD=


NODE_ENV=
```

2. Correr la base de datos con docker-compose:

```bash
docker compose up
```

3. Aplicar las migraciones:

```bash
npx prisma migrate dev --name init
```

## Testing

Para correr los tests se debe tener el archivo `.env.test` en la raíz del proyecto.

Una vez creado el archivo, se puede correr el comando:

```bash
npm run test

npm run test:watch
```