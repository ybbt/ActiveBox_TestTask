# Порядок сборки
1. Клонировать репозиторий

2. Установить необходимые модули:

			$ npm instal
			
3. Запустить сборку проекта:

			$ gulp finbuild
			
#  Структура проекта:

**/build** 					- собранный проект (появляется после запуска процесса сборки)

	**/css*	*				- файлы стилей

	**/fonts** 				- файлы шрифтов

	**/img** 					- файлы изображений

	**/js** 					- файлы сценариев

	**/libs** 				- файлы подключаемых сторонних библиотек

**/dev** 					- каталог разработки

	**/bem** 					- каталог для блоков по методологии БЭМ

		**/<block-name>** 	- каталог для файлов разметки, стилей и сценариев связанных с блоком по методологии БЭМ

	**/general** 				- каталог для файлов разметки и стилей, не связанные с методологие БЭМ

		**/abstract** 		- каталог для файлов стилей не связанных с методологией БЭМ

		**/data** 			- каталог с файлами для хранения переменных и объектов стилей и разметки

		**/fonts** 			- каталог для шрифтов, подключаемых с диска

		**/libs** 			- каталог для подключаемых сторонних библиотек

		**/img** 				- каталог для изображений

		**/pages** 			- каталог для страниц

			**/<page-name>** 	- каталог для файлов разметки, стилей и сценариев страниц

		**/svg**				- каталог для файлов векторной графики в формате svg
