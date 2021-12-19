FROM python:3.8-slim

RUN useradd appuser

ENV ROOT_PATH=/apps/hello-world

RUN mkdir -p ${ROOT_PATH}

WORKDIR ${ROOT_PATH}

RUN python3 -m venv venv

COPY ./requirements.txt ./requirements.txt

RUN ./venv/bin/pip install --upgrade pip && \
    ./venv/bin/pip install --no-cache-dir --upgrade -r requirements.txt

COPY app app

COPY entrypoint.sh .
COPY alembic.ini .

RUN chmod +x entrypoint.sh

RUN chown -R appuser:appuser ./

USER appuser

EXPOSE 8080

CMD ["./entrypoint.sh"]
