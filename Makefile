.PHONY: up down wipe
up:
	docker-compose up --build -d

down:
	docker-compose down

wipe:
	docker-compose down -v
