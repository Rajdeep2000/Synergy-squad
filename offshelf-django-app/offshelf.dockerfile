FROM python:3.9.6-slim

USER root

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        gcc \
        libc-dev \
        python3-dev \
        libpq-dev \
        libjpeg-dev \
        libtiff5-dev \
        libfreetype6-dev \
        zlib1g-dev \
        liblcms2-dev \
        libwebp-dev \
        python3-mysqldb\
        default-libmysqlclient-dev \
        portaudio19-dev \
        curl \
        wget \
        sudo \
        nano \
        && rm -rf /var/lib/apt/lists/*

ENV SQL_SERVER_HOST=mysql-container

COPY requirements.txt /app/
ADD ./entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

RUN python -m pip install --upgrade pip
RUN pip install drf-yasg -U
RUN pip install mysqlclient
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# Expose the port your application runs on
EXPOSE 8000

# Start your application
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "your_project_name.wsgi:application"]

ENTRYPOINT ["/entrypoint.sh"]
