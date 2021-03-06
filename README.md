## Descripción

Prueba Tecnica Propuesta por Kubide

API Rest de mensajeria de usuarios, para la gestión de sus datos, mensajes y notificaciones.

## Instalación

1.- Clonar el repositorio
```bash
$ git clone https://github.com/gustavotremont/mcfly-nestjs.git
```

2.- Instalar dependencías
```bash
$ npm i
```

3.- Crear documento .env en fichero raíz del proyecto, y crear las siguientes variables de entorno
```bash
# url de la bbdd local
BBDD_URI=mongodb://localhost:27017/mcfly
# secret key para el uso de JWT, pueden remplazarlo si quieren.
JWT_SECRET=b5cca393-9e50-42b8-a1cc-b79d5cbcd603
```

## Arrancar la app

```bash
$ npm run start
```

ahora pueden probar la api desde cualquier cliente de peticiones hhtp (Postman, thunderclient, Advanced REST Client)
en la carpeta 'endpoints' habrá una collección de endpoints en postman para su prueba rapida.

## Perfil

- Autor - Gustavo Tremont
- Linkedin - [linkedin.com/in/gustavotremont/](https://www.linkedin.com/in/gustavotremont/)
- Github - [gustavotremont](https://github.com/gustavotremont)
