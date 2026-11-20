# Sistema de Foros en Línea

Monorepositorio empresarial con frontend Angular desacoplado y dos microservicios Spring Boot independientes.

## Componentes

- `frontend/`: Angular, Bootstrap 5 y datos exclusivos en memoria.
- `user-service/`: usuarios, roles y autenticación.
- `forum-service/`: categorías, temas, comentarios y moderación.
- `database/schema_and_data.sql`: esquema y datos iniciales Oracle.

## Ejecución

```bash
docker compose up --build
```

La arquitectura no establece comunicación HTTP entre Angular y los microservicios. Los servicios usan Oracle Cloud de forma independiente.

