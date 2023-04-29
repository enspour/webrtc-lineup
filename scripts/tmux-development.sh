#!/bin/bash

SCRIPT_DIR=$(dirname $0)

cd $SCRIPT_DIR/..

WORK_DIR=$(pwd)

cd $WORK_DIR/app

docker compose -f docker-compose.dev.yml up --build -d

# Create new session
tmux new-session -d -s lineup_dev;

# Watch postgresql logs
tmux send-keys "docker logs -f lineup_dev_postgresql" Enter;

# Watch cassandra logs
tmux split-window -v;
tmux send-keys "docker logs -f lineup_dev_cassandra" Enter;

# Watch gateway (nginx) logs
tmux new-window;
tmux send-keys "docker logs -f lineup_dev_gateway" Enter;

# Watch client logs
tmux new-window;
tmux send-keys "docker logs -f lineup_dev_client" Enter;

# Watch auth service logs
tmux new-window;
tmux send-keys "docker logs -f lineup_dev_auth-service" Enter;

sleep 10;

# Watch signal service logs
tmux split-window -v;
tmux send-keys "docker logs -f lineup_dev_signal-service" Enter;

# Watch room service logs
tmux split-window -h -t 0;
tmux send-keys  "docker logs -f lineup_dev_room-service" Enter;

# Watch chat service logs
tmux split-window -h -t 2;
tmux send-keys "docker logs -f lineup_dev_chat-service" Enter;

tmux attach -t lineup_dev;

docker compose -f docker-compose.dev.yml down