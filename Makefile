# Default configuration
WEB_PORT ?= 3000
BACKEND_PORT ?= 8000
ADMIN_PORT ?= 3001

DC_DEV := docker-compose.yml
DC_PROD := docker-compose.yml -f docker-compose.prod.yml

# Load environment variables from .env if exists
ifneq ("$(wildcard .env)","")
    include .env
    export
endif

.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  help            Show this help message"
	@echo "  logs            Tail logs of all containers"
	@echo "  stop            Stop all containers"
	@echo "  dev             Start development environment (hot reload)"
	@echo "  prod            Start production environment (always builds images)"
	@echo "  restart-dev     Restart development environment"
	@echo "  restart-prod    Restart production environment"
	@echo "  rebuild-dev     Rebuild dev environment (use if deps change)"

.PHONY: logs
logs:
	docker compose logs -f

.PHONY: stop
stop:
	@echo "Stopping all containers..."
	docker compose down
	@echo "All containers stopped."

.PHONY: dev
dev:
	@echo "Starting development environment..."
	docker compose up -d
	@echo "Dev environment started."
	@echo "Web: http://localhost:$(WEB_PORT)"
	@echo "Backend: http://localhost:$(BACKEND_PORT)"
	@echo "Admin: http://localhost:$(ADMIN_PORT)"

.PHONY: prod
prod:
	@echo "Starting production environment..."
	docker compose -f $(DC_PROD) up -d --build
	@echo "Production environment started."
	@echo "Web: http://localhost:$(WEB_PORT)"
	@echo "Backend: http://localhost:$(BACKEND_PORT)"
	@echo "Admin: http://localhost:$(ADMIN_PORT)"

.PHONY: restart-dev
restart-dev:
	@echo "Restarting development environment..."
	$(MAKE) stop
	$(MAKE) dev

.PHONY: restart-prod
restart-prod:
	@echo "Restarting production environment..."
	$(MAKE) stop
	$(MAKE) prod

.PHONY: rebuild-dev
rebuild-dev:
	@echo "Rebuilding dev environment (fresh dependencies, fresh volumes)..."
	docker compose up -d --build --force-recreate -V
	@echo "Dev environment rebuilt."
