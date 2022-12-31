#!/bin/bash

tmux new-session -d -s lineup_dev;
tmux send-keys "cd backend/postgres && docker compose -f docker-compose.dev.yml up" Enter;

tmux split-window -v;
tmux send-keys "cd backend/chat-service/database && docker compose -f docker-compose.dev.yml up" Enter;

tmux new-window;
tmux send-keys "cd client && npm run dev" Enter;


tmux new-window;
tmux send-keys -t lineup_dev "cd gateway && docker compose -f docker-compose.dev.yml up" Enter;

tmux new-window;
tmux send-keys "cd backend/auth-service && npm run dev" Enter;

sleep 10;

tmux split-window -h -t lineup_dev;
tmux send-keys  "cd backend/room-service && npm run dev" Enter;

tmux split-window -v -t 0;
tmux send-keys "cd backend/signal-service && npm run dev" Enter;

tmux split-window -v -t 2;
tmux send-keys "cd backend/chat-service && npm run dev" Enter;

tmux attach -t lineup_dev;