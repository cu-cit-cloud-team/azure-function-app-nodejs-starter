FROM mcr.microsoft.com/devcontainers/typescript-node:2-22-bookworm

# install some common utils
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends apt-transport-https lsb-release ca-certificates software-properties-common gnupg gnupg2 curl wget zip unzip jq nano vim

# install azure-functions-core-tools
RUN curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null \
  && sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs 2>/dev/null | cut -d'.' -f 1)/prod $(lsb_release -cs 2>/dev/null) main" > /etc/apt/sources.list.d/dotnetdev.list' \
  && apt-get update \
  && apt-get install -y azure-functions-core-tools-4 \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /var/tmp/* /tmp/* \
  && rm -rf /var/cache/apt/archives/*

# update npm and install some packages globally
RUN npm install --location=global npm \
  @biomejs/biome \
  commitizen \
  cz-git \
  diff-so-fancy \
  npm-check-updates \
  tsx \
  typescript \
  && npm cache clean --force \
  && rm -rf /var/tmp/* /tmp/*

# setup bash history
ARG USERNAME=node
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/command-history/.bash_history" \
  && mkdir /command-history \
  && touch /command-history/.bash_history \
  && chown -R $USERNAME /command-history \
  && echo "$SNIPPET" >> "/home/$USERNAME/.bashrc"
