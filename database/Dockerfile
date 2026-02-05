FROM postgres:16-alpine

# Copy initialization scripts
COPY 01-create-schema.sql /docker-entrypoint-initdb.d/
