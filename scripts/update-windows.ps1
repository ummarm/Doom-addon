$ErrorActionPreference = "Stop"

$repoPath = "C:\server\Doom-addon"

Set-Location $repoPath
$beforeRevision = git rev-parse HEAD
git pull --ff-only
$afterRevision = git rev-parse HEAD

if ($beforeRevision -ne $afterRevision) {
    docker compose up -d --build --force-recreate
}
