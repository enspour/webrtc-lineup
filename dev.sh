#!/bin/bash

tmux new-session -d -s lineup_dev;
tmux send-keys "cd backend/backend/postgres && docker compose -f docker-compose.dev.yml up" Enter;

tmux split-window -v;
tmux send-keys "cd backend/backend/chat-service/database && docker compose -f docker-compose.dev.yml up" Enter;

tmux new-window;
tmux send-keys "cd frontend/client && npm run dev" Enter;


tmux new-window;
tmux send-keys -t lineup_dev "cd backend/gateway && docker compose -f docker-compose.dev.yml up" Enter;

tmux new-window;
tmux send-keys "cd backend/backend/auth-service && npm run dev" Enter;

sleep 10;

tmux split-window -h -t lineup_dev;
tmux send-keys  "cd backend/backend/room-service && npm run dev" Enter;

tmux split-window -v -t 0;
tmux send-keys "cd backend/backend/signal-service && npm run dev" Enter;

tmux split-window -v -t 2;
tmux send-keys "cd backend/backend/chat-service && npm run dev" Enter;

tmux attach -t lineup_dev;