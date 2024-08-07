**Данный проект - решение тестового задания ГРИНАТОМ CaseLab JS 2024.**

**Автор решения - Халилов Т. Р.**
---
### Шаги для запуска решения

1. **Клонируйте репозиторий на локальную машину**

2. **Запустите фронтенд- и бекенд-часть приложения**
   
--
# UPD ВАЖНО: node-модули на гитхаб репозиторий не запушились (или запушились и были удалены), поэтому перед выполнением следующих инструкций необходимо:

 1) В корневой папке проекта запустить команду npm install (она подтянет все необходимые зависимости, основываясь на инструкциях, содержащихся в файле package.json.)

 2) В директории ./directus запустить команду npm install (она подтянет все необходимые зависимости directus, основываясь на инструкциях, содержащихся в файле package.json в папке ./directus.)
         На одной из локальных машин, на которых я пробовал запустить сайт, npm install в обоих случаях работала некорректно с первого раза. Проблема решалась просто повторным запуском npm install в соответствующей директории, тогда он выполнялся без ошибок.
--
   Далее:

   В командной строке в директории ./directus запустите команду npx directus start
   В командной строке в главной директории (в основной директории проекта) запустите команду npm run dev

   После запуска фронт- и бек-части приложения фронт-часть будет доступна по url `http://localhost:3000`,
   бек-часть: по `http://localhost:8055`

   ВАЖНО: В принципе все зависимости находятся внутри проекта
   (поэтому он весит больше 0.5гб, я не разобрался, как это пофиксить,
   но основновная часть (порядка 0.4гб) - это directus), поэтому, полагаю, запустить на локальной машине будет возможно.
   
   Однако я не уверен в этом до конца, поскольку на контейнеризацию проекта не хватило времени, запуск не гарантирован.
   Прошу обратить большее внимание на демонстрацию работы проекта в скриншотах и гифках, расположенных ниже.

4. **Доступ к админке бекенда**

   Логин: `admin@admin.com`
   Пароль: `admin`
   Изображения в админке находятся в папке imgs `http://localhost:8055/admin/files/folders/42a32831-4053-4112-b07c-822e31b2b5a0`,
   но фронтенд-часть получает изображения из коллекции images (`http://localhost:8055/admin/content/images`). Если захотите убрать / добавить изображение на фронтенд-части, удаляйте и добавляйте изображения в этой коллекцию.
---

## Решение

Стек который использовался:

- Фреймворк React
- package manager vite
- Стейт-менеджер Mobx
- Упрощение фетчинга изображений: ajax
- бекенд - self-hosted directus

Выполнение тестового задания включало шаги:

1.  построение макета сайта на html / css с примерным видом модального окна
2.  инициализация проекта через vite
3.  подключение библиотек
4.  разработка архитектуры фронтенд-части приложения
5.  создание шаблонов react-компонентов
6.  тестирование работы шаблонов на пробных изображениях
7.  создание директории бекенда directus внутри директории проекта
8.  написание бекенд-части обработки запросов с фронтенда (файл index.js в директории stores/directusCl) с помощью @directus/sdk
9.  написание клиентской части для отправки запросов на сервер (requestHandler.js c @directus/sdk) и файла для работи с mobx (файл images-store.js), в котором также содержится функция для подбора размеров модального окна для разных размеров изображений, получаемых с сервера, и разных размеров окон, на которых отрисовывается приложение
10. создание коллекции файлов на бекенд части, загрузка файлов в коллекцию, отрисовка файлов с сервера в react-компонентах
11. финальный дебаггинг (на который почти не осталось времени)

---

## Реализованные задачи

Основные:

1.  Загрузка фото на backend через админку Directus (которая открывается в браузере по localhost:8055).
2.  Отображение списка загруженных фото и возможность кликнуть по фото для его открытия в большем размере во всплывающем окне

Дополнительные:

1.  При загрузке изображений любых размеров и соотношений сторон верстка не ломается;
2.  Мобильная (адаптивная) верстка (вроде того);
3.  Переключение между изображениями внутри всплывающего окна
    (в ТЗ было указано "реализовать переключение фото внутри альбома по стрелкам", но поскольку альбомы не реализованы, переключение реализовано в рамках всех изображений, которые есть на странице);

p.s. пояснение относительно header с названием проекта, автором решения и ссылками на github и codewars - о нем в ТЗ ничего не было, просто добавил, чтобы было красиво.

---

## Демонстрация работы
Демонстрация приложения в формате скриншотов:

При обычном размере экрана:
![image](https://github.com/user-attachments/assets/4815095f-cd42-43b3-8f24-6310424bfa91)
![image](https://github.com/user-attachments/assets/d6cebbdb-1f7b-479e-b433-1a757ef46e3e)
![image](https://github.com/user-attachments/assets/acbe6b7c-a3af-4e14-b67a-ea784a64ce20)
![image](https://github.com/user-attachments/assets/46e30575-a2ea-4812-8157-acddc387b872)

При размере экрана телефона в портретной и альбомной ориентациях:
![image](https://github.com/user-attachments/assets/bb6427ac-2ecb-4641-a1ba-f68979fc36d0)
![image](https://github.com/user-attachments/assets/bce71a34-42d8-4e6b-a9fc-e0ba9cbc9978)
![image](https://github.com/user-attachments/assets/770480aa-412a-4212-995b-4ecc74e35f23)


---
Демонстрация работы приложения в формате gif:

Демонстрация работы приложения при обычном размере экрана:
![main](https://github.com/user-attachments/assets/af675386-4287-4a58-992b-12d13822f0f8)

Демонстрации работы приложения при размере экрана телефона в портретной и альбомной ориентациях:
![mobile - Trim](https://github.com/user-attachments/assets/da6bfa5e-15e0-4ded-8b96-b8265560784b)

Бекенд:
![trim-directus](https://github.com/user-attachments/assets/7dbd58a9-9e46-4846-8386-8fcbe0704dc1)
