#!/bin/bash

# Create new session
tmux new-session -d -s lineup_dev;

# Launch PostgreSQL
tmux send-keys "cd ../backend/core/postgresql/docker && docker compose -f docker-compose.dev.yml up" Enter;

# Launch Cassandra
tmux split-window -v;
tmux send-keys "cd ../backend/chat-service/database && docker compose -f docker-compose.dev.yml up" Enter;

# Launch gateway (nginx)
tmux new-window;
tmux send-keys -t lineup_dev "cd ../backend/gateway && docker compose -f docker-compose.dev.yml up" Enter;

# Launch client (frontend)
tmux new-window;
tmux send-keys "cd ../client && npm run dev" Enter;

# Launch auth service (development mode)
tmux new-window;
tmux send-keys "cd ../backend/auth-service && npm run dev" Enter;

sleep 10;

# Launch signal service (development mode)
tmux split-window -v;
tmux send-keys "cd ../backend/signal-service && npm run dev" Enter;

# Launch room service (development mode)
tmux split-window -h -t 0;
tmux send-keys  "cd ../backend/room-service && npm run dev" Enter;

# Launch chat service (development mode)
tmux split-window -h -t 2;
tmux send-keys "cd ../backend/chat-service && npm run dev" Enter;

tmux attach -t lineup_dev;