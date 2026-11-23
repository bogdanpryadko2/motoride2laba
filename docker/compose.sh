set -eu

MOTORIDE_FRONTEND_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
export MOTORIDE_FRONTEND_DIR
motoride_backend_dir=${MOTORIDE_BACKEND_DIR:-"$HOME/project/MotoRideLab3Api"}
motoride_project=${MOTORIDE_COMPOSE_PROJECT:-motoridelab3api}

if [ -d /Applications/Docker.app/Contents/Resources/bin ]; then
    PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
    export PATH
fi

if [ ! -f "$motoride_backend_dir/docker-compose.yml" ]; then
    printf '%s\n' "Backend Compose not found: $motoride_backend_dir/docker-compose.yml" >&2
    exit 1
fi

if [ ! -f "$motoride_backend_dir/.env" ]; then
    printf '%s\n' "Backend environment not found: $motoride_backend_dir/.env" >&2
    exit 1
fi

case "${1:-up}" in
    up) set -- up -d --build --wait --wait-timeout 120 ;;
    down) set -- down ;;
    status) set -- ps ;;
    logs) set -- logs --tail 100 ;;
    *) printf '%s\n' 'Usage: sh docker/compose.sh [up|down|status|logs]' >&2; exit 1 ;;
esac

exec docker compose \
    --project-directory "$motoride_backend_dir" \
    --env-file "$motoride_backend_dir/.env" \
    --project-name "$motoride_project" \
    -f "$motoride_backend_dir/docker-compose.yml" \
    -f "$MOTORIDE_FRONTEND_DIR/compose.frontend.yml" \
    "$@"
