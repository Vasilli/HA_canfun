ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN \
  apk add --no-cache --virtual .build-dependencies \
    build-base=0.5-r3 \
    linux-headers=6.5-r0 \
    py3-pip=23.3.1-r0 \
    python3-dev=3.11.6-r1 \
  \
  && apk add --no-cache \
   build-base \
   iproute2 \
   can-utils \
   nodejs \
   npm \
   git \
  \
   && cd /opt \
   && git clone https://github.com/Vasilli/HA_canfun.git \
   && cd /opt/HA_canfun \
   && npm install


# Copy data for add-on
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]

LABEL \
  io.hass.version="VERSION" \
  io.hass.type="addon" \
  io.hass.arch="armhf|aarch64|i386|amd64"



