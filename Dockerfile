FROM python:3.9-alpine
LABEL maintainer="md.rehbar@outlook.com"

COPY ./app /app
COPY ./requirements.txt /requirements.txt
COPY ./scripts /scripts

RUN pip install --upgrade pip && \
    apk add --no-cache nodejs npm && \
    pip install -r /requirements.txt && \
    adduser -DH app && \
    mkdir -p /home/app && \
    chown -R app:app /app && \
    chown -R app:app /home/app && \
    chmod -R +x /app && \
    chown -R app:app /scripts && \
    chmod -R +x /scripts 

WORKDIR /app
USER app