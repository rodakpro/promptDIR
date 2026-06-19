# Coolify Deployment

This project is ready to deploy on Coolify with the included `Dockerfile`.

## App Settings

- Source: Git repository
- Repository: `git@github.com:rodakpro/promptDIR.git`
- Branch: `main` or your deployment branch
- Build pack: Dockerfile
- Dockerfile path: `Dockerfile`
- Port / exposed port: `3000`
- Health check path: `/`

## Environment Variables

No application-specific environment variables are required right now.

The Docker image sets:

- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`
- `HOSTNAME=0.0.0.0`
- `PORT=3000`

Add any future secrets in Coolify's environment variable UI, not in Git.

## Deploy Steps

1. Push this project to the Git repository.
2. In Coolify, create a new resource from the repository.
3. Select Dockerfile as the build pack.
4. Set the Dockerfile path to `Dockerfile`.
5. Set the exposed port to `3000`.
6. Configure your domain and SSL.
7. Deploy.

## Local Docker Check

```bash
docker build -t promptdir .
docker run --rm -p 3000:3000 promptdir
```

Then open `http://localhost:3000`.
