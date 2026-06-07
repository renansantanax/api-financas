#Instalar o NodeJS no conteiner
FROM node:20-alpine

#Criar o diretório da aplicação
WORKDIR /app

#Copiar os arquivos package*.json para o diretório da aplicação
COPY package*.json ./

#Instalar as dependências da aplicação
RUN npm install

#Copiar o restante dos arquivos da aplicação para o diretório da aplicação
COPY . .

#Expor a porta 3000 para acessar a aplicação
EXPOSE 3000

#Comando para iniciar a aplicação
CMD ["npm", "start"]