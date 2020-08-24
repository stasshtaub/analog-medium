# analog-medium

## Инструкция для развёртывания

### Установка зависимостей

```
npm install
```

### Запуск json-server

```
npm run start-json-server
```

> По-умолчанию сервер запускается на localhost:3000/ с задержкой ответов 200ms. Поменять хост, порт и задержку можно в файле package.json в скрипте 'start-json-server':
>
> ```
> json-server --watch db.json --host http://somehost.loc --port 3000 --delay 200
> ```

> При изменении хоста и/или порта в 'start-json-server' также измените свойство baseUrl в src/plugins/axios :
>
> ```
> axios.defaults.baseURL = "http://somehost.loc:3000";
> ```

### Компиляция и запуск dev-сборки

```
npm run serve
```
