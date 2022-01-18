.PHONY: up down wipe testuser
up:
	docker-compose up --build -d

down:
	docker-compose down

wipe:
	docker-compose down -v

testuser:
	docker exec steam-tracker-app curl --location --request POST 'http://localhost:5000/users' \
	--header 'Content-Type: application/json' \
	--data-raw '{"username":"user","password":"user","steamName":"76561198072072686"}'
